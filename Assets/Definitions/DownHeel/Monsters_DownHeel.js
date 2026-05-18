/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

/**
 * definition of:
 *      monsters
 *      scrolls
 *      other item types
 */

"use strict";
console.log("%cMonsters for DownHeel loaded.", "color: #888");

const HERO_TYPE = {
    ThePrincess: {
        name: "ThePrincess",
        model: "SlidingPrincess",
        //texture: "BluePrincess",
        scale: 2.0 / 2 ** 4,
        rotateToNorth: Math.PI,
        material: MATERIAL.princess,
        moveSpeed: 2.0
    },
    /*ThePrincess: {
        name: "ThePrincess",
        model: "Princess",
        texture: "BluePrincess",
        scale: 2.0 / 2 ** 4,
        rotateToNorth: Math.PI,
        material: MATERIAL.princess,
        moveSpeed: 2.0
    }*/
};
