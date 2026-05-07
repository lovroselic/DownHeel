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

        const QM = new QuadMap(QM_map, [W, maxY, 0], [0, minY, minZ]);
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