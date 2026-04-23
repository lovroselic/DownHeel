/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";

/** textures */
const TEXTURE_LIST = [
    "FuturisticTexture_001", "FuturisticTexture_002", "FuturisticTexture_003", "FuturisticTexture_004", "FuturisticTexture_005", "FuturisticTexture_006", "FuturisticTexture_007", "FuturisticTexture_008", "FuturisticTexture_009", "FuturisticTexture_010", "FuturisticTexture_011", "FuturisticTexture_012",
    "FuturisticTexture_013", "FuturisticTexture_014", "FuturisticTexture_015", "FuturisticTexture_016", "FuturisticTexture_017", "FuturisticTexture_018", "FuturisticTexture_019", "FuturisticTexture_020", "FuturisticTexture_021", "FuturisticTexture_022", "FuturisticTexture_023", "FuturisticTexture_024",
    "FuturisticTexture_025", "FuturisticTexture_026", "FuturisticTexture_027", "FuturisticTexture_028", "FuturisticTexture_029", "FuturisticTexture_030", "FuturisticTexture_031", "FuturisticTexture_032", "FuturisticTexture_033", "FuturisticTexture_034", "FuturisticTexture_035", "FuturisticTexture_036",
    "FuturisticTexture_037", "FuturisticTexture_038", "FuturisticTexture_039", "FuturisticTexture_040", "FuturisticTexture_041", "FuturisticTexture_042", "FuturisticTexture_043", "FuturisticTexture_044", "FuturisticTexture_045", "FuturisticTexture_046", "FuturisticTexture_047", "FuturisticTexture_048",
    "FuturisticTexture_049", "FuturisticTexture_050", "FuturisticTexture_051", "FuturisticTexture_052", "FuturisticTexture_053", "FuturisticTexture_054", "FuturisticTexture_055", "FuturisticTexture_056", "FuturisticTexture_057", "FuturisticTexture_058", "FuturisticTexture_059", "FuturisticTexture_060",
    "FuturisticTexture_061", "FuturisticTexture_062", "FuturisticTexture_063", "FuturisticTexture_064", "FuturisticTexture_065", "FuturisticTexture_066", "FuturisticTexture_067", "FuturisticTexture_068", "FuturisticTexture_069", "FuturisticTexture_070", "FuturisticTexture_071", "FuturisticTexture_072",
    "FuturisticTexture_073", "FuturisticTexture_074", "FuturisticTexture_075", "FuturisticTexture_076", "FuturisticTexture_077", "FuturisticTexture_078", "FuturisticTexture_079", "FuturisticTexture_080", "FuturisticTexture_081", "FuturisticTexture_082", "FuturisticTexture_083", "FuturisticTexture_084",
    "FuturisticTexture_085", "FuturisticTexture_086", "FuturisticTexture_087", "FuturisticTexture_088", "FuturisticTexture_089", "FuturisticTexture_090", "FuturisticTexture_091", "FuturisticTexture_092", "FuturisticTexture_093", "FuturisticTexture_094", "FuturisticTexture_095", "FuturisticTexture_096",
    "FuturisticTexture_097", "FuturisticTexture_098", "FuturisticTexture_099", "FuturisticTexture_100", "FuturisticTexture_101", "FuturisticTexture_102", "FuturisticTexture_103", "FuturisticTexture_104", "FuturisticTexture_105", "FuturisticTexture_106", "FuturisticTexture_107", "FuturisticTexture_108",
    "FuturisticTexture_109", "FuturisticTexture_110", "FuturisticTexture_111", "FuturisticTexture_112", "FuturisticTexture_113", "FuturisticTexture_114", "FuturisticTexture_115", "FuturisticTexture_116", "FuturisticTexture_117", "FuturisticTexture_118", "FuturisticTexture_119", "FuturisticTexture_120",
    "FuturisticTexture_121", "FuturisticTexture_122", "FuturisticTexture_123", "FuturisticTexture_124", "FuturisticTexture_125", "FuturisticTexture_126", "FuturisticTexture_127", "FuturisticTexture_128", "FuturisticTexture_129", "FuturisticTexture_130", "FuturisticTexture_131", "FuturisticTexture_132",
    "Sand1", "Sand10", "Sand11", "Sand12", "Sand13", "Sand14", "Sand15", "Sand16", "Sand2", "Sand3", "Sand4", "Sand5",
    "Sand6", "Sand7", "Sand8", "Sand9"
].sort();

/** Decals */
const DECAL_PAINTINGS = [].sort();

/** Crests */

const DECAL_CRESTS = [].sort();

//lights
const LIGHT_DECALS = [
    "FuturisticLight_001", "FuturisticLight_002", "FuturisticLight_003", "FuturisticLight_004", "FuturisticLight_005", "FuturisticLight_006", "FuturisticLight_007", "FuturisticLight_008", "FuturisticLight_009", "FuturisticLight_010", "FuturisticLight_011", "FuturisticLight_012",
    "FuturisticLight_013", "FuturisticLight_014", "FuturisticLight_015", "FuturisticLight_016",
    "Moon50", "Moon51", "Moon52", "Moon54", "Moon55", "Moon56", "Moon58", "Moon59", "Moon60", "Moon62", "Moon63",
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