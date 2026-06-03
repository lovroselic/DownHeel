/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";
const MAP_SCORE_MANAGER = {
    VERSION: "1.0",
    CSS: "color: #A86",
    ENTRIES: 30,
    init(map_score_object) {
        if (localStorage[PRG.SG]) {
            const loaded = JSON.parse(localStorage.getItem(PRG.SG));
            const LK = Object.keys(loaded);
            const MK = Object.keys(map_score_object);
            if (LK.length === MK.length) {
                for (const key of Object.keys(map_score_object)) {
                    delete map_score_object[key];
                }

                Object.assign(map_score_object, loaded);
            } else {
                for (const key of LK) {
                    map_score_object[key] = loaded[key];
                }
            }

        } else {
            for (const level in map_score_object) {
                const active = map_score_object[level].active;
                if (!active) this.expandLevel(map_score_object, level);
            }
            localStorage.setItem(PRG.SG, JSON.stringify(map_score_object));
        }
    },
    expandLevel(map_score_object, level) {
        let levelObj = map_score_object[level];
        levelObj.scores = {};
        levelObj.scores.names = Array(this.ENTRIES).fill(map_score_object[level].name);
        levelObj.scores.values = Array(this.ENTRIES);
        for (let i = 0; i < this.ENTRIES; i++) {
            levelObj.scores.values[i] = levelObj.score + (i * levelObj.increment);
        }
        map_score_object[level].active = true;
    }
};

console.log(`%cMAP_SCORE_MANAGER v${MAP_SCORE_MANAGER.VERSION} for DownHeel loaded.`, MAP_SCORE_MANAGER.CSS);