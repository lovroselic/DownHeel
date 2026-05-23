/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";
const MAP_SCORE_MANAGER = {
    VERSION: "1.0",
    CSS: "color: #A86",
    ENTRIES: 10,
    init(map_score_object) {
        if (localStorage[PRG.SG]) {
            console.log("deal with loading ....");
        } else {
            console.info(" ----- creating map scores from scratch ------ ");
            for (const level in map_score_object) {
                const active = map_score_object[level].active;
                console.log("level:", level, "active", active);
                if (!active) {

                }
            }

        }
    }
};

console.log(`%cMAP_SCORE_MANAGER v${MAP_SCORE_MANAGER.VERSION}for DownHeel loaded.`, MAP_SCORE_MANAGER.CSS);