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

    { srcName: "Wall/MountainWall_100.webp", name: "MountainWall_100" },
    { srcName: "Wall/MountainWall_101.webp", name: "MountainWall_101" },
    { srcName: "Wall/MountainWall_102.webp", name: "MountainWall_102" },
    { srcName: "Wall/MountainWall_103.webp", name: "MountainWall_103" },
    { srcName: "Wall/MountainWall_104.webp", name: "MountainWall_104" },
    { srcName: "Wall/MountainWall_105.webp", name: "MountainWall_105" },
    { srcName: "Wall/MountainWall_106.webp", name: "MountainWall_106" },
    { srcName: "Wall/MountainWall_107.webp", name: "MountainWall_107" },
    { srcName: "Wall/MountainWall_108.webp", name: "MountainWall_108" },
    { srcName: "Wall/MountainWall_109.webp", name: "MountainWall_109" },
    { srcName: "Wall/MountainWall_110.webp", name: "MountainWall_110" },
    { srcName: "Wall/MountainWall_111.webp", name: "MountainWall_111" },
    { srcName: "Wall/MountainWall_112.webp", name: "MountainWall_112" },
    { srcName: "Wall/MountainWall_113.webp", name: "MountainWall_113" },
    { srcName: "Wall/MountainWall_114.webp", name: "MountainWall_114" },
    { srcName: "Wall/MountainWall_115.webp", name: "MountainWall_115" },
    { srcName: "Wall/MountainWall_116.webp", name: "MountainWall_116" },
    { srcName: "Wall/MountainWall_117.webp", name: "MountainWall_117" },
    { srcName: "Wall/MountainWall_118.webp", name: "MountainWall_118" },
    { srcName: "Wall/MountainWall_119.webp", name: "MountainWall_119" },
    { srcName: "Wall/MountainWall_120.webp", name: "MountainWall_120" },
    { srcName: "Wall/MountainWall_121.webp", name: "MountainWall_121" },
    { srcName: "Wall/MountainWall_122.webp", name: "MountainWall_122" },
    { srcName: "Wall/MountainWall_123.webp", name: "MountainWall_123" },
    { srcName: "Wall/MountainWall_124.webp", name: "MountainWall_124" },
    { srcName: "Wall/MountainWall_125.webp", name: "MountainWall_125" },
    { srcName: "Wall/MountainWall_126.webp", name: "MountainWall_126" },
    { srcName: "Wall/MountainWall_127.webp", name: "MountainWall_127" },
    { srcName: "Wall/MountainWall_128.webp", name: "MountainWall_128" },
    { srcName: "Wall/MountainWall_129.webp", name: "MountainWall_129" },
    { srcName: "Wall/MountainWall_130.webp", name: "MountainWall_130" },
    { srcName: "Wall/MountainWall_131.webp", name: "MountainWall_131" },
    { srcName: "Wall/MountainWall_132.webp", name: "MountainWall_132" },
    { srcName: "Wall/MountainWall_133.webp", name: "MountainWall_133" },
    { srcName: "Wall/MountainWall_134.webp", name: "MountainWall_134" },
    { srcName: "Wall/MountainWall_135.webp", name: "MountainWall_135" },
    { srcName: "Wall/MountainWall_136.webp", name: "MountainWall_136" },
    { srcName: "Wall/MountainWall_137.webp", name: "MountainWall_137" },
    { srcName: "Wall/MountainWall_138.webp", name: "MountainWall_138" },
    { srcName: "Wall/MountainWall_139.webp", name: "MountainWall_139" },
    { srcName: "Wall/MountainWall_140.webp", name: "MountainWall_140" },
    { srcName: "Wall/MountainWall_141.webp", name: "MountainWall_141" },
    { srcName: "Wall/MountainWall_142.webp", name: "MountainWall_142" },
    { srcName: "Wall/MountainWall_143.webp", name: "MountainWall_143" },
    { srcName: "Wall/MountainWall_144.webp", name: "MountainWall_144" },
    { srcName: "Wall/MountainWall_145.webp", name: "MountainWall_145" },
    { srcName: "Wall/MountainWall_146.webp", name: "MountainWall_146" },
    { srcName: "Wall/MountainWall_147.webp", name: "MountainWall_147" },
    { srcName: "Wall/MountainWall_148.webp", name: "MountainWall_148" },
    { srcName: "Wall/MountainWall_149.webp", name: "MountainWall_149" },
    { srcName: "Wall/MountainWall_150.webp", name: "MountainWall_150" },
    { srcName: "Wall/MountainWall_151.webp", name: "MountainWall_151" },
    { srcName: "Wall/MountainWall_152.webp", name: "MountainWall_152" },


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

    //lights
    { srcName: "Lights/AlpineLight_153.webp", name: "AlpineLight_153" },
    { srcName: "Lights/AlpineLight_154.webp", name: "AlpineLight_154" },
    { srcName: "Lights/AlpineLight_155.webp", name: "AlpineLight_155" },
    { srcName: "Lights/AlpineLight_156.webp", name: "AlpineLight_156" },
    { srcName: "Lights/AlpineLight_157.webp", name: "AlpineLight_157" },
    { srcName: "Lights/AlpineLight_158.webp", name: "AlpineLight_158" },
    { srcName: "Lights/AlpineLight_159.webp", name: "AlpineLight_159" },
    { srcName: "Lights/AlpineLight_160.webp", name: "AlpineLight_160" },
    { srcName: "Lights/AlpineLight_161.webp", name: "AlpineLight_161" },
    { srcName: "Lights/AlpineLight_162.webp", name: "AlpineLight_162" },
    { srcName: "Lights/AlpineLight_163.webp", name: "AlpineLight_163" },
    { srcName: "Lights/AlpineLight_164.webp", name: "AlpineLight_164" },
    { srcName: "Lights/AlpineLight_165.webp", name: "AlpineLight_165" },
    { srcName: "Lights/AlpineLight_166.webp", name: "AlpineLight_166" },
    { srcName: "Lights/AlpineLight_167.webp", name: "AlpineLight_167" },
];

console.log("%cAssets for DownHeel ready.", "color: orange");