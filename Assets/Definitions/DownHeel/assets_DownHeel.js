/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
//Assets for DownHeel
"use strict";



/** END */

LoadFonts = [

    { srcName: "C64_Pro-STYLE.ttf", name: "C64" },
    { srcName: "ArcadeClassic.ttf", name: "Arcade" },
    { srcName: "carolingia_fixed.ttf", name: "Carolingia" },
    { srcName: "CPU.ttf", name: "CPU" },
];

LoadTextures = [
    /** textures used by shaders */
    { srcName: "Shading/Fire_color_map_512.webp", name: "Fire_color_map" },
    { srcName: "Shading/fire_noise_512.webp", name: "Fire_noise" },

    /**wall, floor, ceil */
    { srcName: "Wall/RockWall_SDXL_003.jpg", name: "RockWall_SDXL_003" },

    { srcName: "Wall/Snow_001.jpg", name: "Snow_001" },
    { srcName: "Wall/Snow_002.jpg", name: "Snow_002" },
    { srcName: "Wall/Snow_003.jpg", name: "Snow_003" },
    { srcName: "Wall/Snow_004.jpg", name: "Snow_004" },
    { srcName: "Wall/Snow_005.jpg", name: "Snow_005" },
    { srcName: "Wall/Snow_006.jpg", name: "Snow_006" },
    { srcName: "Wall/Snow_007.jpg", name: "Snow_007" },
    { srcName: "Wall/Snow_008.jpg", name: "Snow_008" },
    { srcName: "Wall/Snow_009.jpg", name: "Snow_009" },
    { srcName: "Wall/Snow_010.jpg", name: "Snow_010" },
    { srcName: "Wall/Snow_011.jpg", name: "Snow_011" },


    //objects
    { srcName: "ObjectTextures/BluePrincess.webp", name: "BluePrincess" },

    //title
    { srcName: "Title/DownHeel_title_768.webp", name: "Title" },

    //explosions
    //{ srcName: "ObjectTextures/Explosion2.webp", name: "Explosion2" },
    //{ srcName: "ObjectTextures/Explosion3.webp", name: "Explosion" },
    //{ srcName: "ObjectTextures/Tile.webp", name: "Tile" },
    //{ srcName: "ObjectTextures/WoodTexture.webp", name: "WoodTexture" },
    //{ srcName: "ObjectTextures/RedLiquid.jpg", name: "RedLiquid" },
    //{ srcName: "ObjectTextures/FireTexture.webp", name: "FireTexture" },
    //{ srcName: "ObjectTextures/FireTexture2.webp", name: "FireTexture2" },
    //{ srcName: "ObjectTextures/FireTexture2_Blue.webp", name: "FireTexture2_Blue" },
    //{ srcName: "ObjectTextures/FireTexture2_Green.webp", name: "FireTexture2_Green" },
    //{ srcName: "ObjectTextures/RedFireTexture.webp", name: "RedFireTexture" },
    //{ srcName: "ObjectTextures/BluBallTexture.webp", name: "BluBallTexture" },
];

LoadAudio = [
    { srcName: "LaughingSkull - Anomalous Anomalies.mp3", name: "Title" },

    //action sounds
    //{ srcName: "Explosion1.mp3", name: "Explosion" },

];

LoadShaders = [
    'vShader_1_2.glsl', 'fShader_1_4.glsl', 'pick_vShader_1_0.glsl', 'pick_fShader_1_0.glsl',
    'particle_render_fShader_1_1.glsl', 'particle_render_vShader_1_0.glsl', 'particle_transform_fShader_1_0.glsl', 'particle_transform_vShader_1_1.glsl',
    'model_vShader_1_2.glsl', 'fire_transform_vShader_1_0.glsl', 'fire_render_fShader_1_0.glsl',
    'shadow_vShader_1_0.glsl', 'shadow_fShader_1_0.glsl'
];

//LoadObjects = [  ];

LoadModels = [
    "ThePrincess.gltf",
];

LoadSprites = [
    { srcName: "UI/AvatarPrincess200w.webp", name: "Avatar" },
    { srcName: "UI/Heart64.webp", name: "Heart" },
];

console.log("%cAssets for DownHeel ready.", "color: orange");