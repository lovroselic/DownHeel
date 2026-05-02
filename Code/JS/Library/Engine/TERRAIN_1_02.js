/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
"use strict";

const TERRAIN = {
    VERSION: "1.01",
    CSS: "color: #2ACBE8",
    NAME: "TerrainGenerator 1D",
    INI: {
        planes: 3,
        planes_max: [0.95, 0.7, 0.5],
        planes_min: [0.5, 0.3, 0.15],
        speed_factor: [1.0, 0.25, 0.125],
        WL: [256, 96, 64],
        open: [true, false, false],
        octaves: [1, 4, 3]
    },
    createClassic(W, H, plane_layers, textures, colors) {
        //colors default
        if (!colors) {
            colors = ["#0E0", '#444', '#888'];
        }
        let planes = [];
        for (let i = 0; i < TERRAIN.INI.planes; i++) {
            let PL = new PlaneLimits(W, TERRAIN.INI.WL[i], TERRAIN.INI.planes_max[i] * H, TERRAIN.INI.planes_min[i] * H, TERRAIN.INI.open[i]);
            let Noise = PERLIN.getNoise(PL, TERRAIN.INI.octaves[i]);
            let plane = new Plane(Noise, PL, plane_layers[i], textures[i], TERRAIN.INI.speed_factor[i], colors[i]);
            planes.push(plane);
        }
        let px = new Parallax(planes);
        return px;
    },
    drawParallax(px) {
        for (let pl of px.planes) {
            PERLIN.drawShape(pl);
        }
    },
    drawParallaxSlice(px, W) {
        for (let pl of px.planes) {
            PERLIN.drawPattern(pl, pl.getPosition(), W);
        }
    },
    sampleMin(data, start, end, window) {
        let min = Infinity;
        let minIndex = -1;
        for (let index = start; index <= end; index += window) {
            if (data[index] < min) {
                min = data[index];
                minIndex = index;
            }
        }
        return [min, minIndex];
    }
};

//END
console.log(`%c${TERRAIN.NAME} ${TERRAIN.VERSION} loaded.`, TERRAIN.CSS);