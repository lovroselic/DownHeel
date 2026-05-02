/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
"use strict";


class PlaneLimits {
    constructor(width = null, wawelength = 64, drawMaxHeight = null, drawMinHeight = null, open = false, leftStop = 0, rightStop = null) {
        if (width === null || drawMaxHeight === null || drawMinHeight === null) {
            console.log(arguments);
            throw "PlaneLimits: Required arguments not provided!";
        }
        this.width = width;
        this.leftStop = leftStop;
        this.rightStop = rightStop || this.width - 16;
        this.open = open;
        this.WL = wawelength;
        this.drawMaxHeight = Math.floor(drawMaxHeight);
        this.drawMinHeight = Math.floor(drawMinHeight);
        this.mid = Math.floor((this.drawMaxHeight + this.drawMinHeight) / 2);
        this.amp = this.drawMaxHeight - this.drawMinHeight;
    }
}

class Plane {
    constructor(map = null, planeLimits = null, layer = null, texture = null, speedFactor = null, color = "#000") {
        if (map === null || layer === null || texture === null || speedFactor === null) {
            console.log(arguments);
            throw "Plane constructor: Required arguments not provided!";
        }
        this.DATA = {};
        this.DATA.map = map;
        this.layer = layer;
        this.CTX = LAYER[this.layer];
        this.planeLimits = planeLimits;
        this.texture = texture;
        this.speedFactor = speedFactor;
        this.color = color;
        this.position = 0.0;
    }
    getPosition() {
        return Math.round(this.position);
    }
    getLastMovement() {
        return this.moved;
    }
    move(timeLapse, speed, dir) {
        this.moved = dir * (timeLapse * speed * this.speedFactor / 1000);
        this.position += this.moved;
    }
}

class Parallax {
    constructor(planes) {
        this.planes = planes;
    }
    movePlanes(timeLapse, speed, dir = 1) {
        for (let pl of this.planes) {
            pl.move(timeLapse, speed, dir);
        }
    }
}

class PSNG {
    constructor(seed = 666) {
        this.M = 4294967296;
        this.A = 1664525;
        this.C = 1;
        this.Z = seed >>> 0;
    }
    next() {
        this.Z = (Math.imul(this.A, this.Z) + this.C) >>> 0;
        /**
         * returns a value from -0.5 to 0.5
         */
        return this.Z / this.M - 0.5;
    }
}

class PerlinNoise {
    constructor(planeLimits, divisor = 1) {
        this.planeLimits = planeLimits;
        this.divisor = divisor;
        this.x = 0;
        this.psng = new PSNG();
        this.a = this.psng.next();
        this.b = this.psng.next();
        if (this.planeLimits.open) {
            this.a = 0.5;
            this.b = 0.5;
        }
        this.pos = [];
        while (this.x < this.planeLimits.width) {
            if (this.x % (this.planeLimits.WL / this.divisor) === 0) {
                this.a = this.b;
                if (this.planeLimits.open &&
                    (this.x < this.planeLimits.WL / this.divisor || this.planeLimits.width - this.x <= 2 * (this.planeLimits.WL / this.divisor))) {
                    this.b = 0.5;
                } else {
                    this.b = this.psng.next();
                }
                this.pos.push(this.a * this.planeLimits.amp / (this.divisor ** PERLIN.INI.divisor_exponent));
            } else {
                this.pos.push(this.interpolate() * this.planeLimits.amp / (this.divisor ** PERLIN.INI.divisor_exponent));
            }
            this.x++;
        }
    }
    interpolate() {
        let ft = Math.PI * ((this.x % (this.planeLimits.WL / this.divisor)) / (this.planeLimits.WL / this.divisor));
        let f = (1 - Math.cos(ft)) * 0.5;
        return this.a * (1 - f) + this.b * f;
    }
    smoothStep() {
        let t = (this.x % (this.planeLimits.WL / this.divisor)) / (this.planeLimits.WL / this.divisor);
        let f = 6 * t ** 5 - 15 * t ** 4 + 10 * t ** 3;
        return this.a * (1 - f) + this.b * f;
    }
    get() {
        return Uint16Array.from(this.pos.map(x => Math.round(x + this.planeLimits.mid)));
    }
}

const PERLIN = {
    VERSION: "1.01",
    CSS: "color: #2ACBE8",
    NAME: "PERLIN",
    INI: {
        divisor_base: 2,
        divisor_exponent: 2.1,
    },
    fade(t, mode = "smootherstep") {
        switch (mode) {
            case "cosine":
                return (1 - Math.cos(Math.PI * t)) * 0.5;

            case "smoothstep":
                return t * t * (3 - 2 * t);

            case "smootherstep":
            default:
                return t * t * t * (t * (t * 6 - 15) + 10);
        }
    },
    generateValueNoise1D(width, wavelength, seed = 666, smooth = "smootherstep") {
        width = Math.max(1, parseInt(width, 10) || 1);
        wavelength = Math.max(1, parseFloat(wavelength) || 1);

        const rng = new PSNG(seed);
        const latticeCount = Math.ceil((width - 1) / wavelength) + 3;
        const lattice = [];

        for (let i = 0; i < latticeCount; i++) {
            lattice.push(rng.next()); // -0.5 ... +0.5
        }

        const out = new Array(width);

        for (let x = 0; x < width; x++) {
            const gx = x / wavelength;
            const i0 = Math.floor(gx);
            const t = gx - i0;
            const f = this.fade(t, smooth);

            out[x] = Math.lerp(lattice[i0], lattice[i0 + 1], f);
        }

        return out;
    },
    generateFractalNoise1D({
        width,
        seed = 666,
        wavelength = 32,                //large: smother, slower turns
        octaves = 1,                    //more octaves more detail
        persistence = 0.5,              //lower - less detail, higher more detail
        lacunarity = 2.0,               //how quickly wavelength shrinks per octave.
        smooth = "smootherstep"
    }) {
        width = Math.max(1, parseInt(width, 10) || 1);
        seed = parseInt(seed, 10) || 666;
        wavelength = Math.max(1, parseFloat(wavelength) || 1);
        octaves = Math.max(1, parseInt(octaves, 10) || 1);
        persistence = Math.clamp(parseFloat(persistence), 0, 1);
        lacunarity = Math.max(1.01, parseFloat(lacunarity) || 2.0);

        const values = new Array(width).fill(0);

        let amplitude = 1.0;
        let amplitudeSum = 0.0;
        let wl = wavelength;

        for (let octave = 0; octave < octaves; octave++) {
            const octaveSeed = (seed + (octave + 1) * 10007) >>> 0;
            const octaveValues = this.generateValueNoise1D(width, wl, octaveSeed, smooth);

            for (let x = 0; x < width; x++) {
                values[x] += octaveValues[x] * amplitude;
            }

            amplitudeSum += amplitude;
            amplitude *= persistence;
            wl /= lacunarity;
        }

        if (amplitudeSum > 0) {
            for (let x = 0; x < width; x++) {
                values[x] /= amplitudeSum;
                values[x] = Math.clamp(values[x], -0.5, 0.5);
            }
        }

        return values;
    },
    drawLine(plane, CTX = null) {
        CTX = CTX || plane.CTX;
        CTX.strokeStyle = plane.color;
        let data = plane.DATA.map;
        CTX.beginPath();
        CTX.moveTo(0, data[0]);
        for (let i = 1; i < data.length; i++) {
            CTX.lineTo(i, data[i]);
        }
        CTX.stroke();
    },
    drawShape(plane, from = 0, length = null, CTX = null) {
        CTX = CTX || plane.CTX;
        CTX.fillStyle = plane.color;
        this.draw(plane, CTX, from, length);
    },
    drawPattern(plane, from = 0, length = null, CTX = null) {
        CTX = CTX || plane.CTX;
        let pattern = CTX.createPattern(TEXTURE[plane.texture], 'repeat');
        CTX.fillStyle = pattern;
        this.draw(plane, CTX, from, length);
    },
    draw(plane, CTX, from, length) {
        let data = plane.DATA.map;
        length = length || data.length;
        CTX.beginPath();
        CTX.moveTo(0, data[from]);
        for (let i = 1; i < length; i++) {
            CTX.lineTo(i, data[from + i]);
        }
        CTX.lineTo(CTX.canvas.width, CTX.canvas.height);
        CTX.lineTo(0, CTX.canvas.height);
        CTX.lineTo(0, data[from]);
        CTX.closePath();
        CTX.fill();
    },
    generateNoise(planeLimits, octaves) {
        let results = [];
        for (let i = 0; i < octaves; i++) {
            let divisor = PERLIN.INI.divisor_base ** i;
            let perlin = new PerlinNoise(planeLimits, divisor);
            results.push(perlin.pos);
        }
        return results;
    },
    combineNoise(perlins) {
        let LN = perlins[0].length;
        let summed = [];
        for (let i = 0; i < LN; i++) {
            let total = 0;
            for (let j = 0; j < perlins.length; j++) {
                total += perlins[j][i];
            }
            summed.push(total);
        }
        return summed;
    },
    getNoise(planeLimits, octaves) {
        let noise = this.combineNoise(this.generateNoise(planeLimits, octaves));
        return Uint16Array.from(noise.map(x => x + planeLimits.mid));
    }
};

//END
console.log(`%c${PERLIN.NAME} ${PERLIN.VERSION} loaded.`, PERLIN.CSS);