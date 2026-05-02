// -- main --
/**
 * directionDeg = biasDeg + raw * 2 * amplitude;
 */
$(function () {
    console.clear();
    console.info("*****************************************");

    const n1 = PERLIN.generateValueNoise1D(128, 32, 666, "smootherstep");

    console.log("length", n1.length);
    console.log("min", Math.min(...n1));
    console.log("max", Math.max(...n1));
    console.log("first 16", n1.slice(0, 16));

    const a = PERLIN.generateValueNoise1D(128, 32, 666, "smootherstep");
    const b = PERLIN.generateValueNoise1D(128, 32, 666, "smootherstep");
    const c = PERLIN.generateValueNoise1D(128, 32, 667, "smootherstep");

    console.log("same seed equal:", JSON.stringify(a) === JSON.stringify(b));
    console.log("different seed different:", JSON.stringify(a) !== JSON.stringify(c));

    console.info("*****************************************");

    const nf = PERLIN.generateFractalNoise1D({
        width: 128,
        seed: 666,
        wavelength: 32,
        octaves: 3,
        persistence: 0.5,
        lacunarity: 2.0,
        smooth: "smootherstep"
    });

    console.log("length", nf.length);
    console.log("min", Math.min(...nf));
    console.log("max", Math.max(...nf));
    console.log("first 16", nf.slice(0, 16));

    const f1 = PERLIN.generateFractalNoise1D({
        width: 128,
        seed: 666,
        wavelength: 32,
        octaves: 3,
        persistence: 0.5,
        lacunarity: 2.0,
        smooth: "smootherstep"
    });

    const f2 = PERLIN.generateFractalNoise1D({
        width: 128,
        seed: 666,
        wavelength: 32,
        octaves: 3,
        persistence: 0.5,
        lacunarity: 2.0,
        smooth: "smootherstep"
    });

    console.log("same:", JSON.stringify(f1) === JSON.stringify(f2));

    console.info("*****************************************");
});