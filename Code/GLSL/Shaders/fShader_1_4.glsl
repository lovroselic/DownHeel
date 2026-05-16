#version 300 es
///fShader///
/*
* v1.4 (patched)
* DownHeel - specular fixes
* debugging functions removed, check 1.3 or earlier for them
* flexible occlusion map
*/

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
precision highp sampler3D;
#else
precision mediump float;
precision mediump sampler3D;
#endif

struct Material {
    vec3 ambientColor;
    vec3 diffuseColor;
    vec3 specularColor;
    float shininess;

    // roughness:
    //   0.05 = very shiny
    //   0.25 = leather / satin
    //   0.65 = neutral old-material fallback
    //   0.90 = matte cloth
    //
    // metallic:
    //   0.0 = normal material
    //   1.0 = metal
    //
    // fresnelStrength:
    //   0.0 = disabled / neutral
    //   0.15 - 0.35 = useful shiny edge boost

    float roughness;
    float metallic;
    float fresnelStrength;
};

const int N_LIGHTS = 1;                                         // replaced before compiling

uniform vec3 uPointLights[N_LIGHTS];
uniform vec3 uLightColors[N_LIGHTS];
uniform vec3 uLightDirections[N_LIGHTS];
uniform sampler2D uSampler;
uniform vec3 uCameraPos;
uniform Material uMaterial;

uniform sampler3D uOcclusionMap;
uniform vec3 uGridSize;
uniform vec2 uOcclusionOrigin;                                   // world X/Z origin of the occlusion texture
uniform float uOcclusionResolution;                              // texels per world unit

uniform float innerAmbientStrength;
uniform float innerDiffuseStrength;
uniform float innerSpecularStrength;

uniform bool uUnlitTexture;                         //returns just texel colour

in vec3 FragPos;                                    // WORLD space 
in vec3 v_normal;                                   // WORLD space 
in vec2 vTextureCoord;

//bloody hardcoded constants
const vec3 innerLightColor = vec3(1.0f, 1.0f, 1.0f);
const vec3 GLOBAL_AMBIENT = vec3(0.05f);

const float DEFAULT_ROUGHNESS = 0.65f;
const float MIN_ROUGHNESS = 0.04f;

const float PL_AmbientStrength = 9.99f;                          //9.99
const float PL_DiffuseStrength = 50.0f;                          //50.0
const float PL_SpecularStrength = 5.0f;                          //2.5

const float IGNORE_ALPHA = 0.1f;
const int MAX_STEPS = 999;                                       // Max steps for raycasting loop - 99
const float EPSILON = 0.005f;                                    // don't enter the wall, check for occlusion - 0.005
const float PL_AMBIENT_OCCLUSION = 0.10f;                        // how much of ambient light gets through occlusion - 0.225
const float PL_DIFFUSE_OCCLUSION = 0.10f;                        // how much of diffused light gets through occlusion - 0.30
const float PL_AMBIENT_ILLUMINATION_REDUCTION = 0.02f;           // how much of ambient light gets through in reverse direction - 0.02
const float PL_DIFUSSE_ILLUMINATION_REDUCTION = 0.05f;           // how much of ambient light gets through in reverse direction - 0.05
const float PL_DIFUSSE_LIGHT_HALO_REDUCTION = 0.25f;             // intensity of light halo - 0.40
const float ATTNF = 0.3f;                                       // linear arrenuation factor 0.25
const float ATTNF2 = 0.8f;                                      // quadratic attenuation factor 0.75
const float HATTNF = 1.5f;                                       // light halo -- linear arrenuation factor - 1.5
const float HATTNF2 = 6.0f;                                      // light halo quadratic attenuation factor - 5.0
const float MAXLIGHT = 0.999f;                                   // max contribution to avoid overburning; - 0.999
const float IGNORED_ATTN_DISTANCE = 0.012f;                      // distance after attenuation starts taking effect - 0.012
const float ILLUMINATION_CUTOFF = 0.10f;                         // remove flickering, light FOV - 0.10
const float BEHIND_LIGHT_FACTOR = 0.02f;                         // ambient illumination behind light source - 0.02f
const float DISTANCE_LIGHT = 0.25f;                             // force illumination near the light source  - 0.475
const float LIGHT_POS_Y_OFFSET = 0.35f;                          // vertical light position change 
const float INTO_WALL = 0.01f;                                   // into wall target raycast offset: 0.01
const float RAY_ORIGIN_BIAS = EPSILON * 5.0f;

out vec4 fragColor;

// ----------------------------------------------------------------------------
// Function prototypes
// ----------------------------------------------------------------------------
float getMaterialRoughness();

vec3 CalcLight(
    vec3 lightPosition,
    vec3 FragPos,
    vec3 viewDir,
    vec3 normal,
    vec3 pointLightColor,
    float shininess,
    vec3 ambientColor,
    vec3 diffuseColor,
    vec3 specularColor,
    float roughness,
    float metallic,
    float fresnelStrength,
    float ambientStrength,
    float diffuseStrength,
    float specularStrength,
    int inner,
    vec3 lightDirection,
    vec3 baseColor,
    out vec3 specularOut
);

bool Raycast3D(vec3 rayOrigin3D, vec3 rayTarget3D, float illumination);
bool isOmniDirectional(vec3 dir);
vec3 worldToOcclusionCoord(vec3 position3D);
bool isOccludedTexel(ivec3 texel);
bool isOccluded(vec3 position3D);

// ----------------------------------------------------------------------------

void main(void) {
    vec4 texelColor = texture(uSampler, vTextureCoord);
    if (texelColor.a < IGNORE_ALPHA)
        discard;

    if (uUnlitTexture) {
        fragColor = texelColor;
        return;
    }

    vec3 baseColor = texelColor.rgb;

    vec3 ambientColor = uMaterial.ambientColor;
    vec3 diffuseColor = uMaterial.diffuseColor;
    vec3 specularColor = uMaterial.specularColor;
    float shininess = uMaterial.shininess;
    float roughness = getMaterialRoughness();
    float metallic = uMaterial.metallic;
    float fresnelStrength = uMaterial.fresnelStrength;

    vec3 norm = normalize(v_normal);
    vec3 viewDir = normalize(uCameraPos - FragPos);

    vec3 specularTotal = vec3(0.0f);
    vec3 specularPart = vec3(0.0f);

    // "Inner" light from camera position 
    vec3 innerLight = CalcLight(uCameraPos, FragPos, viewDir, norm, innerLightColor, shininess, ambientColor, diffuseColor, specularColor, roughness, metallic, fresnelStrength, innerAmbientStrength, innerDiffuseStrength, innerSpecularStrength, 1, viewDir, baseColor, specularPart);

    specularTotal += specularPart;

    vec3 PL_output = vec3(0.0f);

    for (int i = 0; i < N_LIGHTS; i++) {

        if (uPointLights[i].x < 0.0f)
            continue;

        PL_output += CalcLight(uPointLights[i], FragPos, viewDir, norm, uLightColors[i], shininess, ambientColor, diffuseColor, specularColor, roughness, metallic, fresnelStrength, PL_AmbientStrength, PL_DiffuseStrength, PL_SpecularStrength, 0, uLightDirections[i], baseColor, specularPart);

        specularTotal += specularPart;
    }

    vec3 nonSpecularLight = innerLight + PL_output;

    // Texture color affects ambient/diffuse.
    // Specular is added separately so shiny highlights remain visible.
    vec3 diffuseFinal = baseColor * max(nonSpecularLight, GLOBAL_AMBIENT);
    vec3 finalColor = diffuseFinal + specularTotal;

    fragColor = vec4(clamp(finalColor, 0.0f, 1.0f), texelColor.a);
    //fragColor = texelColor; //de-*fucking-bug
}

// ----------------------------------------------------------------------------
// Material helpers
// ----------------------------------------------------------------------------

float getMaterialRoughness() {
    if (uMaterial.roughness <= 0.0f)
        return DEFAULT_ROUGHNESS;

    return clamp(uMaterial.roughness, MIN_ROUGHNESS, 1.0f);
}

// ----------------------------------------------------------------------------
// Lighting
// ----------------------------------------------------------------------------

vec3 CalcLight(
    vec3 lightPosition,
    vec3 FragPos,
    vec3 viewDir,
    vec3 normal,
    vec3 pointLightColor,
    float shininess,
    vec3 ambientColor,
    vec3 diffuseColor,
    vec3 specularColor,
    float roughness,
    float metallic,
    float fresnelStrength,
    float ambientStrength,
    float diffuseStrength,
    float specularStrength,
    int inner,
    vec3 lightDirection,
    vec3 baseColor,
    out vec3 specularOut
) {

    specularOut = vec3(0.0f);

    if (inner == 0)
        lightPosition.y -= LIGHT_POS_Y_OFFSET;

    float lightPosDistance = distance(lightPosition, FragPos);
    vec3 lightToFrag = normalize(FragPos - lightPosition);                    // lightToFrag: light -> fragment (incoming direction)
    vec3 fragToLight = -lightToFrag;                                            // fragToLight: fragment -> light (Lambert)
    vec3 dirLight = normalize(lightDirection);                               // for directional cone checks (if not omni)
    float invDistance = 1.0f / (lightPosDistance + EPSILON);
    float attenuation = invDistance / (ATTNF + ATTNF2 * lightPosDistance);

    // -------------------- directional cone illumination --------------------
    // illumination in [0..1], based on angle between (light forward) and (light -> frag)
    float cone = 1.0f;
    float illumination = 1.0f;
    if (inner == 0 && !isOmniDirectional(lightDirection)) {
        cone = dot(lightToFrag, dirLight);                              // <0 means behind the light
        illumination = max(cone, 0.0f);
    }

    vec3 ambientLight = vec3(0.0f);

    // If fragment is behind the directional light, return only a tiny ambient (no occlusion).
    if (inner == 0 && !isOmniDirectional(lightDirection) && cone < -ILLUMINATION_CUTOFF) {
        ambientLight = pointLightColor * ambientStrength * attenuation * ambientColor * BEHIND_LIGHT_FACTOR;
        return ambientLight;
    }

    // Occlusion (only meaningful for non-inner light)
    bool occluded = false;
    if (inner == 0) {
        occluded = Raycast3D(lightPosition, FragPos, illumination);
    }
    bool isLight = (lightPosDistance < DISTANCE_LIGHT);

    // -------------------- ambient --------------------
    if (inner == 1) {
        ambientLight = pointLightColor * ambientStrength * ambientColor;
    } else {
        ambientLight = pointLightColor * ambientStrength * attenuation * ambientColor;
    }

    // -------------------- diffuse --------------------
    // Lambert uses frag->light, not light->frag
    float diffLight = max(dot(normal, fragToLight), 0.0f);
    float diffView = max(dot(normal, viewDir), 0.0f);
    float diff = 0.95f * diffLight + 0.05f * diffView;

    vec3 diffuselight = pointLightColor * diff * diffuseStrength * attenuation * diffuseColor;
    diffuselight *= 1.0f - metallic * 0.65f;

    // -------------------- specular --------------------
    // Blinn-Phong using half vector.
    float gloss = 1.0f - roughness;

    float maxSpecPower = max(shininess, 8.0f);
    float specPower = mix(8.0f, maxSpecPower, gloss);

    vec3 halfDir = normalize(fragToLight + viewDir);
    float NoH = max(dot(normal, halfDir), 0.0f);
    float spec = pow(NoH, specPower);
    float NoV = max(dot(normal, viewDir), 0.0f);                            // Fresnel edge shine.
    float fresnel = pow(1.0f - NoV, 5.0f) * fresnelStrength;

    vec3 nonMetalSpecColor = specularColor;                                           // Non-metal highlights are mostly specularColor.
    vec3 metalSpecColor = baseColor * specularColor;                                  // Metal highlights are tinted toward the base texture color.
    vec3 finalSpecColor = mix(nonMetalSpecColor, metalSpecColor, metallic);

    float specAmount = (spec + fresnel * gloss) * gloss;                              // Keep matte materials from sparkling.
    float lightFacing = step(0.0001f, diffLight);
    specAmount *= lightFacing;

    vec3 specularLight = pointLightColor * specAmount * specularStrength * attenuation * finalSpecColor;

    // -------------------- illumination reductions / occlusion --------------------
    if (illumination < ILLUMINATION_CUTOFF) {
        if (isLight) {
            float invlightDistance = 1.0f / max(lightPosDistance, EPSILON);
            float attenuationHalo = invlightDistance / (HATTNF + HATTNF2 * lightPosDistance);
            float haloReduction = PL_DIFUSSE_LIGHT_HALO_REDUCTION * attenuationHalo;
            diffuselight *= haloReduction;
            specularLight *= haloReduction;
        } else {
            diffuselight *= PL_DIFUSSE_ILLUMINATION_REDUCTION;
            specularLight *= PL_DIFUSSE_ILLUMINATION_REDUCTION;
        }

        if (lightPosDistance > IGNORED_ATTN_DISTANCE) {
            ambientLight *= PL_AMBIENT_ILLUMINATION_REDUCTION;
        }
    } else if (occluded && inner == 0) {
        return PL_AMBIENT_OCCLUSION * ambientLight + PL_DIFFUSE_OCCLUSION * diffuselight;
    }

    // -------------------- returns  --------------------
    specularOut = clamp(specularLight, 0.0f, MAXLIGHT);                  // Specular is returned separately via out parameter.
    return clamp(ambientLight + diffuselight, 0.0f, MAXLIGHT);
}

// -------------------------- Raycasting / occlusion --------------------------

bool Raycast3D(vec3 rayOrigin3D, vec3 rayTarget3D, float illumination) {
    vec3 direction = rayTarget3D - rayOrigin3D;
    float dirLen = length(direction);

    if (dirLen < EPSILON)
        return false;

    vec3 dirNorm = direction / dirLen;

    vec3 step = vec3(direction.x > EPSILON ? 1.0f : (direction.x < -EPSILON ? -1.0f : 0.0f), direction.y > EPSILON ? 1.0f : (direction.y < -EPSILON ? -1.0f : 0.0f), direction.z > EPSILON ? 1.0f : (direction.z < -EPSILON ? -1.0f : 0.0f));

    // Pull target slightly back so the destination cell does not shadow itself.
    vec3 cellTarget = floor(rayTarget3D - dirNorm * INTO_WALL);

    // Push origin slightly forward to avoid immediately hitting the light's own cell.
    rayOrigin3D = rayOrigin3D + dirNorm * RAY_ORIGIN_BIAS;
    vec3 currentCell = floor(rayOrigin3D);

    const float INF = 1e30f;
    vec3 tDelta = vec3(INF);
    vec3 tMax = vec3(INF);

    // X axis
    if (step.x != 0.0f) {
        tDelta.x = 1.0f / abs(direction.x);
        float nextBoundaryX = (step.x > 0.0f) ? floor(rayOrigin3D.x) + 1.0f : floor(rayOrigin3D.x);

        tMax.x = abs((nextBoundaryX - rayOrigin3D.x) / direction.x);
    }

    // Y axis, world height
    if (step.y != 0.0f) {
        tDelta.y = 1.0f / abs(direction.y);
        float nextBoundaryY = (step.y > 0.0f) ? floor(rayOrigin3D.y) + 1.0f : floor(rayOrigin3D.y);

        tMax.y = abs((nextBoundaryY - rayOrigin3D.y) / direction.y);
    }

    // Z axis, world map-width direction
    if (step.z != 0.0f) {
        tDelta.z = 1.0f / abs(direction.z);
        float nextBoundaryZ = (step.z > 0.0f) ? floor(rayOrigin3D.z) + 1.0f : floor(rayOrigin3D.z);

        tMax.z = abs((nextBoundaryZ - rayOrigin3D.z) / direction.z);
    }

    for (int i = 0; i < MAX_STEPS; i++) {
        // Do not let the destination cell shadow itself.
        if (all(equal(currentCell, cellTarget))) {
            return false;
        }

        // Important: currentCell is WORLD/grid space.
        // isOccluded() handles conversion to occlusion texture space.
        if (isOccluded(currentCell)) {
            return true;
        }

        if (tMax.x <= tMax.y && tMax.x <= tMax.z) {
            currentCell.x += step.x;
            tMax.x += tDelta.x;
        } else if (tMax.y <= tMax.z) {
            currentCell.y += step.y;
            tMax.y += tDelta.y;
        } else {
            currentCell.z += step.z;
            tMax.z += tDelta.z;
        }
    }

    return false;
}

bool isOccluded(vec3 position3D) {
    vec3 occCoord = worldToOcclusionCoord(position3D);
    return isOccludedTexel(ivec3(floor(occCoord)));
}

vec3 worldToOcclusionCoord(vec3 position3D) {
    float occResolution = max(uOcclusionResolution, 1.0f);

    // Shared mapping:
    // world X -> texture X
    // world Z -> texture Y
    vec2 texXY = (vec2(position3D.x, position3D.z) - uOcclusionOrigin) * occResolution;

    // depth == 1:
    //   2.5D zMap/heightmap-style occlusion.
    //   Texture Z is always 0.
    //
    // depth > 1:
    //   Old 3D-grid layout:
    //   world Y -> texture Z.
    float texZ = 0.0f;

    if (uGridSize.z > 1.5f) {
        texZ = position3D.y * occResolution;
    }

    return vec3(texXY.x, texXY.y, texZ);
}

bool isOccludedTexel(ivec3 texel) {
    ivec3 size = ivec3(uGridSize);

    if (any(lessThan(texel, ivec3(0))) || any(greaterThanEqual(texel, size))) {
        return false;
    }

    float occ = texelFetch(uOcclusionMap, texel, 0).r;
    return occ >= 0.5f;
}

bool isOmniDirectional(vec3 dir) {
    return length(dir) < 0.01f;
}
