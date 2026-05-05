/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";

/** textures */
const TEXTURE_LIST = [
    "RockWall_SDXL_003",
    "Snow_001", "Snow_002", "Snow_003", "Snow_004", "Snow_005", "Snow_006", "Snow_007", "Snow_008", "Snow_009", "Snow_010", "Snow_011",
].sort();

/** Decals */
const DECAL_PAINTINGS = [].sort();

/** Crests */

const DECAL_CRESTS = [].sort();

//lights
const LIGHT_DECALS = [

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