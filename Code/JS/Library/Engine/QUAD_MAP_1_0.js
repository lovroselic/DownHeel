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
    INI: {
        TILING_RESOLUTION: 20, //10
    },
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

            // centerline before/after
            const beforeCenterY = startY;
            const afterCenterY = startY + Math.tan(dirRad);

            for (let y = 0; y < H; y++) {
                const index = y * W + x;

                const beforeYTop = beforeCenterY + (y - H / 2) * prevWidth;
                const beforeYBottom = beforeYTop + prevWidth;

                const afterYTop = afterCenterY + (y - H / 2) * widthVal;
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
            startY = afterCenterY;
            startZ = afterZ;
            prevWidth = widthVal;
        }

        const QM = new QuadMap(QM_map, [W, maxY, 0], [0, minY, minZ], W, H);
        return QM;
    },
    paintTopDown(QM, layer = "surface", options = {}) {

        const toCanvas = (x, y) => {
            return new Point(
                cfg.padding + (x - minX) * sx,
                cfg.padding + (y - minY) * sy
            );
        };


        const CTX = LAYER[layer];
        const canvas = CTX.canvas;

        const cfg = {
            background: "#101010",
            fill: "rgba(42, 203, 232, 0.28)",
            topLine: "#2ACBE8",
            bottomLine: "#A7F070",
            sectionLine: "rgba(255,255,255,0.16)",
            centerLine: "rgba(255,255,255,0.35)",
            text: "#DDD",
            padding: 8,
            sectionEvery: 8,
            drawSections: true,
            drawCenter: true,
            drawLabels: true,
            ...options
        };

        ENGINE.clearLayer(layer);
        ENGINE.fillLayer(layer, cfg.background);

        const W = Math.round(QM.max.x - QM.min.x);
        const H = Math.round(QM.map.length / W);

        const minX = QM.min.x;
        const maxX = QM.max.x;
        const minY = QM.min.y;
        const maxY = QM.max.y;

        const worldW = Math.max(maxX - minX, 0.0001);
        const worldH = Math.max(maxY - minY, 0.0001);

        const drawW = canvas.width - 2 * cfg.padding;
        const drawH = canvas.height - 2 * cfg.padding;

        const sx = drawW / worldW;
        const sy = drawH / worldH;



        const topPts = [];
        const bottomPts = [];

        // top boundary: y row 0, top edge
        for (let x = 0; x < W; x++) {
            const node = QM.map[x];

            if (x === 0) {
                topPts.push(toCanvas(node.beforeX, node.beforeYTop));
            }

            topPts.push(toCanvas(node.afterX, node.afterYTop));

        }

        // bottom boundary: last y row, bottom edge, reversed for polygon fill
        const bottomRow = H - 1;

        for (let x = W - 1; x >= 0; x--) {
            const node = QM.map[bottomRow * W + x];

            bottomPts.push(toCanvas(node.afterX, node.afterYBottom));

            if (x === 0) {
                bottomPts.push(toCanvas(node.beforeX, node.beforeYBottom));
            }
        }

        // filled strip
        CTX.beginPath();

        for (let i = 0; i < topPts.length; i++) {
            const p = topPts[i];

            if (i === 0) CTX.moveTo(p.x, p.y);
            else CTX.lineTo(p.x, p.y);
        }

        for (const p of bottomPts) {
            CTX.lineTo(p.x, p.y);
        }

        CTX.closePath();
        CTX.fillStyle = cfg.fill;
        CTX.fill();

        // top boundary
        CTX.strokeStyle = cfg.topLine;
        CTX.lineWidth = 2;
        CTX.beginPath();

        for (let i = 0; i < topPts.length; i++) {
            const p = topPts[i];

            if (i === 0) CTX.moveTo(p.x, p.y);
            else CTX.lineTo(p.x, p.y);
        }

        CTX.stroke();

        // bottom boundary
        CTX.strokeStyle = cfg.bottomLine;
        CTX.lineWidth = 2;
        CTX.beginPath();

        for (let i = 0; i < bottomPts.length; i++) {
            const p = bottomPts[i];

            if (i === 0) CTX.moveTo(p.x, p.y);
            else CTX.lineTo(p.x, p.y);
        }

        CTX.stroke();

        // cross-section lines
        if (cfg.drawSections) {
            for (let x = 0; x < W; x += cfg.sectionEvery) {
                const topNode = QM.map[x];
                const bottomNode = QM.map[bottomRow * W + x];

                const a = toCanvas(topNode.beforeX, topNode.beforeYTop);
                const b = toCanvas(bottomNode.beforeX, bottomNode.beforeYBottom);

                ENGINE.drawLine(CTX, a, b, cfg.sectionLine, 1);
            }

            // final cross-section at the far end
            const topNode = QM.map[W - 1];
            const bottomNode = QM.map[bottomRow * W + W - 1];

            const a = toCanvas(topNode.afterX, topNode.afterYTop);
            const b = toCanvas(bottomNode.afterX, bottomNode.afterYBottom);

            ENGINE.drawLine(CTX, a, b, cfg.sectionLine, 1);
        }

        // center line
        if (cfg.drawCenter) {
            CTX.strokeStyle = cfg.centerLine;
            CTX.lineWidth = 1;
            CTX.beginPath();

            for (let x = 0; x < W; x++) {
                const topNode = QM.map[x];
                const bottomNode = QM.map[bottomRow * W + x];

                const cx = topNode.beforeX;
                const cy = (topNode.beforeYTop + bottomNode.beforeYBottom) * 0.5;
                const p = toCanvas(cx, cy);

                if (x === 0) CTX.moveTo(p.x, p.y);
                else CTX.lineTo(p.x, p.y);
            }

            // final center endpoint
            const topNode = QM.map[W - 1];
            const bottomNode = QM.map[bottomRow * W + W - 1];

            const cx = topNode.afterX;
            const cy = (topNode.afterYTop + bottomNode.afterYBottom) * 0.5;
            const p = toCanvas(cx, cy);

            CTX.lineTo(p.x, p.y);
            CTX.stroke();
        }

        if (cfg.drawLabels) {
            CTX.fillStyle = cfg.text;
            CTX.font = "12px Consolas, monospace";
            CTX.fillText(`Surface top-down: ${W} x ${H}`, 8, 14);
            CTX.fillText(`Y range: ${minY.toFixed(2)} ... ${maxY.toFixed(2)}`, 8, 28);
        }
    },
    paintSideSlope(QM, layer = "sideslope", options = {}) {
        const CTX = LAYER[layer];
        const canvas = CTX.canvas;

        const cfg = {
            background: "#101010",
            fill: "rgba(255, 179, 71, 0.22)",
            slopeLine: "#FFB347",
            groundLine: "#666",
            gridLine: "#242424",
            sectionLine: "rgba(255,255,255,0.16)",
            text: "#DDD",
            padding: 24,
            sectionEvery: 8,
            drawSections: true,
            drawLabels: true,
            ...options
        };

        ENGINE.clearLayer(layer);
        ENGINE.fillLayer(layer, cfg.background);

        const mapW = Math.round(QM.max.x - QM.min.x);
        const minX = QM.min.x;
        const maxX = QM.max.x;

        const minZ = QM.min.z;
        const maxZ = QM.max.z;

        const worldW = Math.max(maxX - minX, 0.0001);
        const worldH = Math.max(maxZ - minZ, 0.0001);

        const drawW = canvas.width - 2 * cfg.padding;
        const drawH = canvas.height - 2 * cfg.padding;

        const sx = drawW / worldW;
        const sz = drawH / worldH;

        const toCanvas = (x, z) => {
            return new Point(
                cfg.padding + (x - minX) * sx,
                cfg.padding + (maxZ - z) * sz
            );
        };

        // horizontal guide lines
        for (let i = 0; i <= 4; i++) {
            const t = i / 4;
            const z = maxZ * (1 - t) + minZ * t;
            const p0 = toCanvas(minX, z);
            const p1 = toCanvas(maxX, z);

            ENGINE.drawLine(CTX, p0, p1, cfg.gridLine, 1);
        }

        // vertical guide lines
        for (let x = 0; x <= mapW; x += cfg.sectionEvery) {
            const p0 = toCanvas(x, maxZ);
            const p1 = toCanvas(x, minZ);

            ENGINE.drawLine(CTX, p0, p1, cfg.gridLine, 1);
        }

        // collect slope profile points from row 0
        const pts = [];

        for (let x = 0; x < mapW; x++) {
            const node = QM.map[x];

            if (x === 0) {
                pts.push(toCanvas(node.beforeX, node.beforeZ));
            }

            pts.push(toCanvas(node.afterX, node.afterZ));
        }

        // filled slope silhouette
        CTX.beginPath();

        for (let i = 0; i < pts.length; i++) {
            const p = pts[i];

            if (i === 0) CTX.moveTo(p.x, p.y);
            else CTX.lineTo(p.x, p.y);
        }

        const last = pts[pts.length - 1];
        const first = pts[0];

        CTX.lineTo(last.x, canvas.height - cfg.padding);
        CTX.lineTo(first.x, canvas.height - cfg.padding);
        CTX.closePath();

        CTX.fillStyle = cfg.fill;
        CTX.fill();

        // slope profile line
        CTX.strokeStyle = cfg.slopeLine;
        CTX.lineWidth = 2;
        CTX.beginPath();

        for (let i = 0; i < pts.length; i++) {
            const p = pts[i];

            if (i === 0) CTX.moveTo(p.x, p.y);
            else CTX.lineTo(p.x, p.y);
        }

        CTX.stroke();

        // optional segment divider lines from profile to bottom
        if (cfg.drawSections) {
            for (let x = 0; x < mapW; x += cfg.sectionEvery) {
                const node = QM.map[x];
                const p = toCanvas(node.beforeX, node.beforeZ);

                ENGINE.drawLine(
                    CTX,
                    p,
                    new Point(p.x, canvas.height - cfg.padding),
                    cfg.sectionLine,
                    1
                );
            }

            const lastNode = QM.map[mapW - 1];
            const p = toCanvas(lastNode.afterX, lastNode.afterZ);

            ENGINE.drawLine(
                CTX,
                p,
                new Point(p.x, canvas.height - cfg.padding),
                cfg.sectionLine,
                1
            );
        }

        // bottom reference line
        ENGINE.drawLine(
            CTX,
            new Point(cfg.padding, canvas.height - cfg.padding),
            new Point(canvas.width - cfg.padding, canvas.height - cfg.padding),
            cfg.groundLine,
            1
        );

        if (cfg.drawLabels) {
            CTX.fillStyle = cfg.text;
            CTX.font = "12px Consolas, monospace";

            CTX.fillText(`Side slope: ${mapW} segments`, 8, 14);
            CTX.fillText(`Z range: ${minZ.toFixed(2)} ... ${maxZ.toFixed(2)}`, 8, 28);
            CTX.fillText(`start`, cfg.padding + 4, cfg.padding + 14);
            CTX.fillText(`finish`, canvas.width - cfg.padding - 48, canvas.height - cfg.padding - 6);
        }
    },
    create_zMap(QM, GA, TR = QUAD_MAP.INI.TILING_RESOLUTION) {
        const minX = Math.floor(QM.min.x);
        const minY = Math.floor(QM.min.y);
        const sizeX = Math.ceil(QM.max.x) - minX;
        const sizeY = Math.ceil(QM.max.y) - minY;
        const xSize = sizeX * TR;
        const ySize = sizeY * TR;
        const zMap_array = new Float32Array(xSize * ySize);
        zMap_array.fill(Infinity);

        for (const [i, node] of QM.map.entries()) {
            const yA_top = (node.beforeYTop - minY) * TR;
            const yA_bottom = (node.beforeYBottom - minY) * TR;
            const yB_top = (node.afterYTop - minY) * TR;
            const yB_bottom = (node.afterYBottom - minY) * TR;

            for (let t = 0; t < TR; t++) {
                const x = node.beforeX * TR + t;
                const T = (t + 0.5) / TR;
                const yBegin = Math.max(0, Math.floor(Math.lerp(yA_top, yB_top, T)));
                const yEnd = Math.min(ySize, Math.ceil(Math.lerp(yA_bottom, yB_bottom, T)));
                const z = Math.lerp(node.beforeZ, node.afterZ, T);
                for (let y = yBegin; y < yEnd; y++) {
                    let index = x + y * xSize;
                    if (GA.map[i] === MAPDICT.EMPTY) {
                        zMap_array[index] = z;                                                                      // only empty grids are passable
                    }
                }
            }
        }
        const zMap = new ZMap(zMap_array, QM.max, QM.min, xSize, ySize, minX, minY, TR);
        return zMap;
    },
    paintZMap(zMap, layer = "zmap", options = {}) {
        const CTX = LAYER[layer];
        const canvas = CTX.canvas;

        const cfg = {
            background: "#000000",
            text: "#DDE0DD",
            drawLabels: true,

            // dark -> bright blue
            dark: [0, 8, 28],
            bright: [42, 203, 232],

            ...options
        };

        const CW = canvas.width;
        const CH = canvas.height;

        const xSize = zMap.xSize;
        const ySize = zMap.ySize;

        const minZ = zMap.min.z;
        const maxZ = zMap.max.z;
        const zRange = Math.max(maxZ - minZ, 0.000001);

        const img = CTX.createImageData(CW, CH);
        const data = img.data;

        // initialize whole image to opaque black
        for (let i = 0; i < data.length; i += 4) {
            data[i] = 0;
            data[i + 1] = 0;
            data[i + 2] = 0;
            data[i + 3] = 255;
        }

        for (let py = 0; py < CH; py++) {
            const zy = Math.floor(py / CH * ySize);

            for (let px = 0; px < CW; px++) {
                const zx = Math.floor(px / CW * xSize);
                const z = zMap.map[zMap.index(zx, zy)];

                if (z === Infinity) continue;   // stays black

                const t = Math.clamp((z - minZ) / zRange, 0, 1);

                const r = Math.round(Math.lerp(cfg.dark[0], cfg.bright[0], t));
                const g = Math.round(Math.lerp(cfg.dark[1], cfg.bright[1], t));
                const b = Math.round(Math.lerp(cfg.dark[2], cfg.bright[2], t));

                const i = (px + py * CW) * 4;
                data[i] = r;
                data[i + 1] = g;
                data[i + 2] = b;
                data[i + 3] = 255;
            }
        }

        CTX.putImageData(img, 0, 0);

        if (cfg.drawLabels) {
            CTX.fillStyle = cfg.text;
            CTX.font = "12px Consolas, monospace";
            CTX.fillText(`ZMap: ${xSize} x ${ySize}, canvas ${CW} x ${CH}`, 8, 14);
            CTX.fillText(`Z range: ${minZ.toFixed(2)} ... ${maxZ.toFixed(2)}`, 8, 28);
            CTX.fillText(`black = outside slope`, 8, 42);
        }
    },
    toTextureMap(zMap) {
        //expected zMap of tiling resolution 1! more than that and you will not have same coord system!!
        /** 0 - light can pass through */

        const paddedWidth = POT(zMap.xSize);
        const paddedHeight = POT(zMap.ySize);
        console.log("toTextureMap zMap", zMap, "paddedWidth", paddedWidth, "paddedHeight", paddedHeight);
        const pixelData = new Uint8Array(paddedWidth * paddedHeight).fill(255);
        for (let y = 0; y < zMap.ySize; y++) {
            for (let x = 0; x < zMap.xSize; x++) {
                let zIndex = y * zMap.xSize + x;
                let tIndex = y * paddedWidth + x;
                if (zMap.map[zIndex] < Infinity) {
                    pixelData[tIndex] = 0;
                }
            }
        }
        return pixelData;
    }
};

//END
console.log(`%cQUAD_MAP ${QUAD_MAP.VERSION} loaded.`, QUAD_MAP.CSS);


class QuadMap {
    constructor(map, max, min, W, H) {
        this.map = map;
        this.max = Vector3.from_array(max);
        this.min = Vector3.from_array(min);
        this.W = W;
        this.H = H;
    }
    indexOutOfBounds(index) {
        return index < 0 || index >= this.map.length;
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
    getSurfaceCenter() {
        const A = Math.lerp(this.beforeYTop, this.beforeYBottom, 0.5);
        const B = Math.lerp(this.afterYTop, this.afterYBottom, 0.5);
        const y = Math.lerp(A, B, 0.5);
        return new FP_Grid(this.beforeX + 0.5, y);
    }
}

class ZMap {
    constructor(map, max, min, xSize, ySize, minX, minY, resolution) {
        this.map = map;
        this.max = max;
        this.min = min;
        this.xSize = xSize;
        this.ySize = ySize;
        this.minX = minX;
        this.minY = minY;
        this.resolution = resolution;
    }
    index(ix, iy) {
        return ix + iy * this.xSize;
    }
    getZ(worldX, worldY) {
        const ix = Math.floor((worldX - this.minX) * this.resolution);
        const iy = Math.floor((worldY - this.minY) * this.resolution);
        if (ix < 0 || ix >= this.xSize || iy < 0 || iy >= this.ySize) return Infinity;
        return this.map[this.index(ix, iy)];
    }
    isOnSurface(worldX, worldY) {
        return this.getZ(worldX, worldY) !== Infinity;
    }
}