/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
"use strict";

//////////////////////////////////////
// QUAD_MAP              by LS      //
// requires GRID, LS_Matrix         //
//////////////////////////////////////
/*
current implementation considers the surface path to be developed in x dimension
*/

/*
TODO:
   
  
known bugs:

*/

const QUAD_MAP = {
    VERSION: "1.0",
    CSS: "color: #0C8",
    create(GA, terrain) {
        const H = GA.height;
        const W = GA.width;
        const QM_map = Array(W * H);                                //regardles of dimensionality, only surface - depth 0 is considered
        const direction = terrain.direction.values;
        const width = terrain.width.values;
        const slope = terrain.slope.values;

        let startY = 0;
        let startZ = 0;
        let maxY = H;
        let minY = 0;
        let minZ = 0;
        let prevWidth = width[0] ?? 1;                                  

        for (let x = 0; x < W; x++) {
            const dirVal = direction[x];
            const dirRad = Math.radians(dirVal);
            const widthVal = width[x];
            const slopeVal = slope[x];
            const slopeRad = Math.radians(slopeVal);

            //update Z
            const beforeZ = startZ;
            const afterZ = startZ - Math.tan(slopeRad);
            minZ = Math.min(minZ, afterZ);

            //base y
            const beforeYTopBase = startY;
            const afterYTopBase = startY + Math.tan(dirRad);

            for (let y = 0; y < H; y++) {
                const index = y * W + x;

                const beforeYTop = beforeYTopBase + y * prevWidth;
                const beforeYBottom = beforeYTop + prevWidth;

                const afterYTop = afterYTopBase + y * widthVal;
                const afterYBottom = afterYTop + widthVal;

                QM_map[index] = new QuadNode(
                    x,
                    x + 1,
                    beforeZ,
                    afterZ,
                    beforeYTop,
                    beforeYBottom,
                    afterYTop,
                    afterYBottom
                );

                minY = Math.min(minY, beforeYTop, beforeYBottom, afterYTop, afterYBottom);
                maxY = Math.max(maxY, beforeYTop, beforeYBottom, afterYTop, afterYBottom);
            }
            startY = afterYTopBase;
            startZ = afterZ;
            prevWidth = widthVal;
        }

        const QM = new QuadMap(QM_map, [W, maxY, 0], [0, minY, minZ]);
        return QM;
    },
};

//END
console.log(`%cQUAD_MAP ${QUAD_MAP.VERSION} loaded.`, QUAD_MAP.CSS);


class QuadMap {
    constructor(map, max, min) {
        this.map = map;
        this.max = Vector3.from_array(max);
        this.min = Vector3.from_array(min);
    }
}

class QuadNode {
    constructor(beforeX, afterX, beforeZ, afterZ, beforeYTop, beforeYBottom, afterYTop, afterYBottom) {
        this.beforeX = beforeX;
        this.afterX = afterX;
        this.beforeZ = beforeZ;
        this.afterZ = afterZ;
        this.beforeYTop = beforeYTop;
        this.beforeYBottom = beforeYBottom;
        this.afterYTop = afterYTop;
        this.afterYBottom = afterYBottom;

        this.array = new Float32Array([
            beforeX, beforeZ, beforeYTop,
            afterX, afterZ, afterYTop,
            afterX, afterZ, afterYBottom,
            beforeX, beforeZ, beforeYBottom
        ]);
    }
}