#version 300 es
///fShader///
/*
* v1.3 (patched)
* Taxxon - lighting space/sign consistency fixes
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
};

const int N_LIGHTS = 1;                                         // replaced before compiling
//float illumination;

uniform vec3 uPointLights[N_LIGHTS];
uniform vec3 uLightColors[N_LIGHTS];
uniform vec3 uLightDirections[N_LIGHTS];
uniform sampler2D uSampler;
uniform vec3 uCameraPos;
uniform Material uMaterial;

uniform sampler3D uOcclusionMap;
uniform vec3 uGridSize;

uniform float innerAmbientStrength;
uniform float innerDiffuseStrength;
uniform float innerSpecularStrength;

in vec3 FragPos;                                    // WORLD space 
in vec3 v_normal;                                   // WORLD space 
in vec2 vTextureCoord;

//bloody hardcoded constants
const vec3 innerLightColor = vec3(1.0f, 1.0f, 1.0f);
const vec3 GLOBAL_AMBIENT = vec3(0.05f);
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
    float ambientStrength,
    float diffuseStrength,
    float specularStrength,
    int inner,
    vec3 lightDirection
);

bool Raycast3D(vec3 rayOrigin3D, vec3 rayTarget3D, float illumination);
bool isOccluded(vec3 position3D);
vec3 worldToNormalizedTexCoord3D(vec3 position3D);
bool isOmniDirectional(vec3 dir);

//debuggers - don't remove !
vec3 debugDisplay(bool occluded);
vec3 illuminationDisplay(float illumination);
vec3 occlusionDisplay(bool occluded);
vec3 RayDebug(vec3 rayOrigin3D, vec3 rayTarget3D, float illumination);

// ----------------------------------------------------------------------------

void main(void) {
    vec3 ambientColor = uMaterial.ambientColor;
    vec3 diffuseColor = uMaterial.diffuseColor;
    vec3 specularColor = uMaterial.specularColor;
    float shininess = uMaterial.shininess;

    vec3 norm = normalize(v_normal);
    vec3 viewDir = normalize(uCameraPos - FragPos);

    // "Inner" light from camera position 
    vec3 innerLight = CalcLight(uCameraPos, FragPos, viewDir, norm, innerLightColor, shininess, ambientColor, diffuseColor, specularColor, innerAmbientStrength, innerDiffuseStrength, innerSpecularStrength, 1, viewDir);

    vec3 PL_output = vec3(0.0f);
    for (int i = 0; i < N_LIGHTS; i++) {
        if (uPointLights[i].x < 0.0f)
            continue;

        PL_output += CalcLight(uPointLights[i], FragPos, viewDir, norm, uLightColors[i], shininess, ambientColor, diffuseColor, specularColor, PL_AmbientStrength, PL_DiffuseStrength, PL_SpecularStrength, 0, uLightDirections[i]);
    }

    vec3 light = innerLight + PL_output;

    vec4 texelColor = texture(uSampler, vTextureCoord);
    if (texelColor.a < IGNORE_ALPHA)
        discard;

    // fragColor = vec4(texelColor.rgb * light, texelColor.a);
    fragColor = vec4(texelColor.rgb * max(light, GLOBAL_AMBIENT), texelColor.a);

    // Debug option - don't delete!!!
    // fragColor = vec4(normalize(v_normal) * 0.5 + 0.5, 1.0);
    // fragColor = vec4(texture(uSampler, vTextureCoord).rgb, 1.0);
    // fragColor = vec4(light, 1.0);
    // fragColor = vec4(uMaterial.diffuseColor, 1.0);
}

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
    float ambientStrength,
    float diffuseStrength,
    float specularStrength,
    int inner,
    vec3 lightDirection
) {

    if (inner == 0) lightPosition.y -= LIGHT_POS_Y_OFFSET;

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
    bool occluded = Raycast3D(lightPosition, FragPos, illumination);

    // Debug helpers
    //bool occluded = false;
    // return debugDisplay(occluded);
    // return illuminationDisplay(illumination);
    // return occlusionDisplay(isOccluded(RayDebug(lightPosition, FragPos, illumination)));
    // return occlusionDisplay(occluded);

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
    //float diff = diffLight;

    vec3 diffuselight = pointLightColor * diff * diffuseStrength * attenuation * diffuseColor;

    // -------------------- specular --------------------
    // reflect() expects the incoming vector pointing *towards* the surface, i.e. light->frag.
    vec3 reflectDir = reflect(lightToFrag, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0f), shininess);
    vec3 specularLight = pointLightColor * spec * specularStrength * attenuation * specularColor;

    // -------------------- illumination reductions / occlusion --------------------
    if (illumination < ILLUMINATION_CUTOFF) {
        if (isLight) {
            float invlightDistance = 1.0f / max(lightPosDistance, EPSILON);
            float attenuationHalo = invlightDistance / (HATTNF + HATTNF2 * lightPosDistance);
            diffuselight *= PL_DIFUSSE_LIGHT_HALO_REDUCTION * attenuationHalo;
        } else {
            diffuselight *= PL_DIFUSSE_ILLUMINATION_REDUCTION;
        }

        if (lightPosDistance > IGNORED_ATTN_DISTANCE) {
            ambientLight *= PL_AMBIENT_ILLUMINATION_REDUCTION;
        }
    } else if (occluded && inner == 0) {
        return PL_AMBIENT_OCCLUSION * ambientLight + PL_DIFFUSE_OCCLUSION * diffuselight;
    }

    return clamp(ambientLight + diffuselight + specularLight, 0.0f, MAXLIGHT);
}

// -------------------------- Raycasting / occlusion --------------------------

bool Raycast3D(vec3 rayOrigin3D, vec3 rayTarget3D, float illumination) {
    vec3 direction = rayTarget3D - rayOrigin3D;
    float dirLen = length(direction);
    if (dirLen < EPSILON)
        return false;

    vec3 dirNorm = direction / dirLen;

    vec3 step = vec3(direction.x > EPSILON ? 1.0f : (direction.x < -EPSILON ? -1.0f : 0.0f), direction.y > EPSILON ? 1.0f : (direction.y < -EPSILON ? -1.0f : 0.0f), direction.z > EPSILON ? 1.0f : (direction.z < -EPSILON ? -1.0f : 0.0f));

    float illumination2 = (illumination + EPSILON) * (illumination + EPSILON);

    // pull back continuously
    vec3 cellTarget = floor(rayTarget3D - dirNorm * INTO_WALL * illumination2);

    // walk cells
    rayOrigin3D = rayOrigin3D + dirNorm * RAY_ORIGIN_BIAS;
    vec3 currentCell = floor(rayOrigin3D);

    const float INF = 1e30f;
    vec3 tDelta = vec3(INF);
    vec3 tMax = vec3(INF);

    // X axis
    if (step.x != 0.0f) {
        tDelta.x = 1.0f / abs(direction.x);
        float nextBoundaryX = (step.x > 0.0f) ? (floor(rayOrigin3D.x) + 1.0f) : floor(rayOrigin3D.x);
        tMax.x = abs((nextBoundaryX - rayOrigin3D.x) / direction.x);
    }

    // Y axis
    if (step.y != 0.0f) {
        tDelta.y = 1.0f / abs(direction.y);
        float nextBoundaryY = (step.y > 0.0f) ? (floor(rayOrigin3D.y) + 1.0f) : floor(rayOrigin3D.y);
        tMax.y = abs((nextBoundaryY - rayOrigin3D.y) / direction.y);
    }

    // Z axis
    if (step.z != 0.0f) {
        tDelta.z = 1.0f / abs(direction.z);
        float nextBoundaryZ = (step.z > 0.0f) ? (floor(rayOrigin3D.z) + 1.0f) : floor(rayOrigin3D.z);
        tMax.z = abs((nextBoundaryZ - rayOrigin3D.z) / direction.z);
    }

    for (int i = 0; i < MAX_STEPS; i++) {
        if (isOccluded(currentCell)) {
            return true;
        }

        if (all(equal(currentCell, cellTarget))) {
            return false;
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
    ivec3 cell = ivec3(floor(position3D));

    // swap y/z to match texture layout
    ivec3 texel = ivec3(cell.x, cell.z, cell.y);
    ivec3 size  = ivec3(uGridSize);

    if (any(lessThan(texel, ivec3(0))) || any(greaterThanEqual(texel, size))) {
        return false;
    }

    float occ = texelFetch(uOcclusionMap, texel, 0).r;
    return occ >= 0.5f;
}

vec3 worldToNormalizedTexCoord3D(vec3 position3D) {
    // need to swap z and y
    return vec3(position3D.x / uGridSize.x, position3D.z / uGridSize.y, position3D.y / uGridSize.z);
}

bool isOmniDirectional(vec3 dir) {
    return length(dir) < 0.01f;
}

// -------------------------- DEBUG helpers ----------------------------

vec3 debugDisplay(bool occluded) {
    if (occluded)
        return vec3(1.0f, 0.0f, 0.0f);
    return vec3(0.0f, 1.0f, 0.0f);
}

vec3 occlusionDisplay(bool occluded) {
    if (occluded)
        return vec3(0.5f, 0.0f, 0.0f);
    return vec3(0.0f, 0.1f, 0.0f);
}

vec3 illuminationDisplay(float illumination) {
    return vec3(0.0f, illumination, 0.0f);
}

vec3 RayDebug(vec3 rayOrigin3D, vec3 rayTarget3D, float illumination) {
    vec3 direction = rayTarget3D - rayOrigin3D;
    float illumination2 = (illumination + EPSILON) * (illumination + EPSILON);
    vec3 adjustedTarget = rayTarget3D + normalize(direction) * INTO_WALL * illumination2;
    return adjustedTarget;
}