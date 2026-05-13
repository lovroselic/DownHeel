/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";

/** textures */
const TEXTURE_LIST = [
    "RockWall_SDXL_003",
    "MountainWall_100", "MountainWall_101", "MountainWall_102", "MountainWall_103", "MountainWall_104", "MountainWall_105", "MountainWall_106", "MountainWall_107", "MountainWall_108", "MountainWall_109", "MountainWall_110", "MountainWall_111",
    "MountainWall_112", "MountainWall_113", "MountainWall_114", "MountainWall_115", "MountainWall_116", "MountainWall_117", "MountainWall_118", "MountainWall_119", "MountainWall_120", "MountainWall_121", "MountainWall_122", "MountainWall_123",
    "MountainWall_124", "MountainWall_125", "MountainWall_126", "MountainWall_127", "MountainWall_128", "MountainWall_129", "MountainWall_130", "MountainWall_131", "MountainWall_132", "MountainWall_133", "MountainWall_134", "MountainWall_135",
    "MountainWall_136", "MountainWall_137", "MountainWall_138", "MountainWall_139", "MountainWall_140", "MountainWall_141", "MountainWall_142", "MountainWall_143", "MountainWall_144", "MountainWall_145", "MountainWall_146", "MountainWall_147",
    "MountainWall_148", "MountainWall_149", "MountainWall_150", "MountainWall_151", "MountainWall_152",
    "Snow_001", "Snow_002", "Snow_003", "Snow_004", "Snow_005", "Snow_006", "Snow_007", "Snow_008", "Snow_009", "Snow_010", "Snow_011",
].sort();

/** Decals */
const DECAL_PAINTINGS = [].sort();

/** Crests */

const DECAL_CRESTS = [].sort();

//lights
const LIGHT_DECALS = [
    "AlpineLight_153", "AlpineLight_154", "AlpineLight_155", "AlpineLight_156", "AlpineLight_157", "AlpineLight_158", "AlpineLight_159", "AlpineLight_160", "AlpineLight_161", "AlpineLight_162", "AlpineLight_163", "AlpineLight_164",
    "AlpineLight_165", "AlpineLight_166", "AlpineLight_167",
].sort();

const TRIGGER_DECALS = [];
const LAIR_DECALS = [].sort();

const CONTAINER_LIST = [];
if (typeof CONTAINER_ITEM_TYPE !== "undefined") {

    for (const container in CONTAINER_ITEM_TYPE) {
        CONTAINER_LIST.push(container);
    }
}
console.log("%cMAP for MazEditor loaded.", "color: #888");