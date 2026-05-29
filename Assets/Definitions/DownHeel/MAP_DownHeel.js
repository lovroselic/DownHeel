/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";
console.log("%cMAP for DownHeel loaded.", "color: #888");
/**
 * entry texts
 * 132, 173
 */

const MAP_TEXT = {
    1: {
        text: "This is an easy slope. I can probably just rush through it.",
    },
    2: {
        text: "Not ever road leads to Rome. Some lead to hospital.",
    },
    3: {
        text: "Braking is not a crime.",
    },
    4: {
        text: "Stir carefully.",
    },
    5: {
        text: "At least in this forest I will not be attacked.",
    },
    6: {
        text: "Mind the walls.",
    },
    7: {
        text: "Don't get lost.",
    },
    8: {
        text: "Catch the rhythm.",
    },
    9: {
        text: "Keep your eyes on the path. This one may look easy, but then you are dead.",
    },
    10: {
        text: "This will go fast. Try to survive.",
    },
};

/** Map definitions */
const MAP = {
    1: {
        name: "Easy Peasy",
        data: '{"width":"128","height":"3","depth":1,"map":"AA27BB2AA115BAA23BAA5BAA67$AA20BB2AA14BAA3BAA9BAA54BAA27BAA8"}',
        wall: "MountainWall_123",
        floor: "Snow_002",
        frontPanorama: "AlpinePanorama_176",
        leftPanorama: "AlpinePanorama_170",
        rightPanorama: "AlpinePanorama_181",
        backPanorama: "BackAlpinePanorama_195",
        archPanorama: "Arch_200",
        skyPanorama: "Sky_204",
        start: '[128,5]',
        decals: '[[249,3,"Warnings_018","picture"],[16,3,"Warnings_002","picture"],[320,3,"Warnings_031","picture"],[286,3,"Warnings_050","picture"],[273,3,"NewDommes_305","picture"],[29,3,"NewDommes_179","picture"],[277,3,"NewDommes_086","picture"],[39,3,"NewDommes_309","picture"],[86,3,"NewDommes_406","picture"],[356,3,"NewDommes_285","picture"]]',
        lights: '[[16,5,"AlpineLight_162","standardYellowVeryFaint"],[321,5,"AlpineLight_165","standardYellowTouch"]]',
        terrain: '{"direction":{"parameters":{"seed":666,"amplitude":45,"wavelength":3,"octaves":4,"persistence":0.1,"lacunarity":3,"biasDeg":0,"smooth":"smootherstep","minDeg":-45,"maxDeg":45,"decimals":3},"values":[-33.051,-28.42,-29.859,-35.588,-19.737,20.866,35.621,38.612,33.146,25.006,11.641,-25.562,-37.954,-23.549,6.948,22.366,19.382,16.098,17.564,19.822,23.324,18.896,13.404,-24.618,-36.621,-34.868,-21.101,-21.477,-9.677,7.655,18.492,14.769,11.562,7.865,3.571,-7.66,-16.852,-23.092,-32.33,-37.343,-41.374,-33.794,-26.911,-26.517,-37.582,-31.488,-30.766,-8.698,-0.399,-4.3,-14.846,-17.078,-9.203,18.853,32.597,29.327,40.162,40.403,26.991,-7.18,-21.174,-28.512,-32.997,-40.158,-21.864,20.607,29.092,23.791,8.908,6.166,-2.573,-14.952,-18.332,-8.384,16.686,25.869,20.648,2.43,-3.72,-6.86,-6.769,-3.922,-5.061,12.651,19.156,19.724,6.952,5.715,-2.904,-28.066,-28.56,-18.842,11.085,21.784,24.691,19.751,25.229,14.233,-2.766,-13.667,-14.563,-32.973,-34.745,-21.742,14.379,26.672,20.586,5.14,-5.851,-5.555,-8.793,-18.967,-19.61,-31.232,-40.728,-28.57,-1.423,4.795,13.39,28.377,35.949,29.81,16.404,16.314,8.456,-29.02,-36.792,-35.308]},"width":{"parameters":{"seed":777,"amplitude":1.5,"wavelength":7,"octaves":4,"persistence":0.15,"lacunarity":3,"biasWidth":1,"smooth":"smootherstep","minWidth":0.75,"maxWidth":2,"decimals":3},"values":[0.75,0.75,0.75,0.75,0.75,0.75,0.75,0.75,0.75,0.75,0.836,1.319,1.802,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1.873,1.783,1.61,1.541,1.538,1.489,1.341,1.153,1.027,1.142,1.253,1.163,1.028,1.012,1.01,0.946,0.937,0.983,0.894,0.833,0.897,0.882,0.975,0.965,0.988,0.993,1.015,1.039,1.149,1.256,1.298,1.315,1.311,1.192,0.946,0.75,0.75,0.75,0.75,0.75,0.75,0.75,0.813,1.113,1.31,1.411,1.366,1.444,1.456,1.404,1.443,1.509,1.523,1.534,1.561,1.476,1.457,1.426,1.273,1.217,1.248,1.298,1.215,1.254,1.209,1.138,1.124,1.119,1.199,1.331,1.376,1.482,1.765,1.867,1.792,1.548,1.383,1.321,1.147,1.026,1.028,1.05,1.263,1.497,1.809,2,2,2,2,1.991,1.413,0.75,0.75,0.75,0.75,0.75]},"slope":{"parameters":{"seed":888,"amplitude":30,"wavelength":12,"octaves":3,"persistence":0.65,"lacunarity":2,"biasSlope":15,"smooth":"smootherstep","minSlope":5,"maxSlope":35,"decimals":3},"values":[5.305,5,5,7.637,12.388,16.211,17.171,17.583,18.723,19.012,18.095,15.899,15.12,14.615,13.053,12.171,11.682,11.211,13.55,16.524,18.054,19.016,20.511,23.512,24.569,25.119,25.977,24.092,19.34,12.258,7.016,5,5,5,5,5,5,5,9.357,9.747,7.706,5.976,8.389,13.86,22.487,29.86,34.587,35,35,35,35,35,35,29.794,26.875,28.352,33.942,35,33.668,27.898,25.818,26.43,27.388,25.446,22.912,22.232,20.936,18.942,17.006,16.027,16.374,18.104,18.752,16.88,10.899,6.284,5,5,5,5,5.619,9.234,11.718,13.214,13.512,12.423,9.45,8.463,9.381,11.679,12.117,11.217,8.819,5.077,5,5,5,5,5,5,7.307,13.591,18.415,22.761,25.806,25.519,22.378,17.521,15.961,17.058,20.976,24.904,26.784,25.034,22.482,21.221,21.198,18.209,15.311,15.547,15.98,14.271,9.384,7.163,8.181,12.249,14.229,13.516]}}',
    }
    ,
    2: {
        name: "Squeezzy",
        data: '{"width":"128","height":"4","depth":1,"map":"AA24BB2AA23BB3AA4BAA4BAA5BAA4BAA2BAA3BAA7BAA3BAA4BAA4BB3AA31BAA26BABABABAA6BAA5BAA4BB2AA12BB2AA4BABAA7BAA8BABAA13B$AA11BAA9BAA7BAA5BAA5BAA2BB2AA12BAA17BAA4BAA12BAA15BB2AA10BAA70BABAA2BABAA8BAA2BABABAA3BB3ABABAA3BAA4BB4ABB2AA3BB2ABB2ABAA2BAA2BB2ABB4ABAA2BA"}',
        wall: "MountainWall_126",
        floor: "Snow_001",
        frontPanorama: "AlpinePanorama_169",
        leftPanorama: "AlpinePanorama_194",
        rightPanorama: "AlpinePanorama_191",
        backPanorama: "BackAlpinePanorama_199",
        archPanorama: "Arch_201",
        skyPanorama: "Sky_205",
        start: '[128,5]',
        decals: '[[143,3,"Warnings_042","picture"],[21,3,"Warnings_051","picture"],[406,3,"Warnings_033","picture"],[291,3,"Warnings_052","picture"],[169,3,"Warnings_031","picture"],[189,3,"Warnings_039","picture"],[66,3,"Warnings_043","picture"],[201,3,"NewDommes_352","picture"],[452,3,"NewDommes_099","picture"],[333,3,"NewDommes_449","picture"],[209,3,"NewDommes_120","picture"],[214,3,"NewDommes_104","picture"],[353,3,"NewDommes_275","picture"],[222,3,"NewDommes_100","picture"],[236,3,"NewDommes_278","picture"],[371,3,"NewDommes_187","picture"],[249,3,"NewDommes_314","picture"],[30,3,"NewDommes_419","picture"],[5,3,"NewDommes_396","picture"],[259,3,"NewDommes_283","picture"],[394,3,"NewDommes_156","picture"],[150,3,"NewDommes_027","picture"],[417,3,"NewDommes_369","picture"],[54,3,"NewDommes_352","picture"],[438,3,"NewDommes_102","picture"],[443,3,"NewDommes_267","picture"],[12,3,"NewDommes_390","picture"],[147,3,"NewDommes_272","picture"],[402,3,"NewDommes_043","picture"],[40,3,"NewDommes_244","picture"],[185,3,"NewDommes_191","picture"],[468,3,"NewDommes_135","picture"],[85,3,"NewDommes_209","picture"],[345,3,"NewDommes_392","picture"],[91,3,"NewDommes_413","picture"],[101,3,"NewDommes_287","picture"],[487,3,"NewDommes_492","picture"],[305,3,"NewDommes_162","picture"],[308,3,"NewDommes_323","picture"],[272,3,"NewDommes_279","picture"],[266,3,"Warnings_036","picture"]]',
        lights: '[[272,5,"AlpineLight_155","standardYellowTouch"],[292,5,"AlpineLight_155","standardYellowTouch"],[189,5,"AlpineLight_155","standardYellowTouch"],[222,5,"AlpineLight_155","standardYellowTouch"],[236,5,"AlpineLight_155","standardYellowTouch"],[46,5,"AlpineLight_167","standardYellowTouch"]]',
        terrain: '{"direction":{"parameters":{"seed":553,"amplitude":45,"wavelength":2.5,"octaves":5,"persistence":0.05,"lacunarity":5,"biasDeg":0,"smooth":"smootherstep","minDeg":-45,"maxDeg":45,"decimals":3},"values":[-32.747,-14.808,24.644,25.562,13.397,10.182,10.498,12.658,13.681,16.585,18.548,4.511,-15.077,-14.233,21.274,41.437,22.031,-18.279,-22.764,0.247,10.531,13.379,18.364,17.17,6.675,-3.2,-10.226,-21.824,-21.458,16.402,38.459,24.419,-0.603,-2.853,-10.025,-13.951,-12.697,-9.939,-10.45,-20.714,-25.546,-14.287,4.449,2.079,-19.171,-30.608,-16.06,19.485,20.884,-14.955,-31.172,-24.24,-8.218,-9.63,-22.502,-27.285,-19.818,-5.33,-5.094,27.154,40.366,40.272,35.609,33.852,20.938,17.625,19.926,17.745,14.745,-11.575,-24.699,-7.709,21.197,26.177,20.433,17.325,4.264,-18.526,-13.666,20.724,36.19,31.506,29.519,22.985,-10.119,-26.672,-17.358,1.359,6.084,11.444,12.195,8.207,-3.112,-6.995,0.228,-0.42,-13.173,-39.045,-40.41,-31.507,-28.451,-27.496,-26.456,-27.28,9.214,23.397,15.924,0.746,1.41,-15.177,-21.922,-4.574,31.439,33.657,9.148,1.535,5.389,10.809,14.782,27.826,35.062,35.416,33.336,34.917,40.696,43.513,16.276,-34.18]},"width":{"parameters":{"seed":555,"amplitude":1.75,"wavelength":7,"octaves":5,"persistence":0.15,"lacunarity":3,"biasWidth":1.1,"smooth":"smootherstep","minWidth":0.75,"maxWidth":2,"decimals":3},"values":[0.75,0.75,0.75,0.75,0.75,0.75,0.75,0.75,0.75,0.75,0.75,1.317,1.971,2,2,2,2,2,1.993,1.861,1.909,1.893,1.897,1.675,1.186,0.75,0.75,0.75,0.75,0.75,0.75,0.75,1.198,1.726,1.951,2,1.976,1.859,1.934,2,2,2,2,2,1.805,1.236,0.75,0.75,0.75,0.75,0.75,0.75,0.75,0.75,1.107,1.263,1.232,1.417,1.792,1.867,1.876,2,2,2,1.981,1.778,1.471,1.244,0.985,0.75,0.75,0.75,1.027,1.179,1.23,1.348,1.292,1.23,1.262,1.451,1.641,1.867,2,2,2,2,2,1.783,1.096,0.75,0.75,0.75,0.774,1.003,1.233,1.476,1.735,1.982,2,1.958,1.628,1.414,1.294,1.016,0.881,0.82,0.807,0.884,1.037,1.105,1.197,1.124,1.043,1.149,1.387,1.458,1.501,1.582,1.359,1.198,1.308,1.515,1.593,1.684,1.782,1.872,1.907,1.896]},"slope":{"parameters":{"seed":546,"amplitude":30,"wavelength":12,"octaves":4,"persistence":0.65,"lacunarity":3,"biasSlope":20,"smooth":"smootherstep","minSlope":10,"maxSlope":36,"decimals":3},"values":[22.609,15.934,16.785,17.754,10.184,15.035,15.321,18.619,15.21,21.176,18.21,14.434,13.206,12.063,10.116,12.476,21.984,17.78,20.243,21.659,23.544,21.372,26.071,29.372,30.18,27.003,33.167,34.761,32.575,31.658,22.014,19.565,28.829,16.614,19.287,16.635,16.745,21.81,18.759,19.701,23.641,20.91,15.08,12.821,12.639,10,11.424,12.429,10,10,10,14.883,10.583,10,13.459,15.44,10,13.591,10,10,10,10,10,18.827,15.719,14.285,18.969,26.372,25.783,36,35.857,36,36,36,32.533,31.949,28.575,25.292,24.355,19.729,21.174,25.533,24.679,32.458,27.202,26.907,24.493,25.155,25.859,19.716,22.619,21.114,12.222,13.107,10.802,15.002,13.82,16.341,15.761,10,10,10,10,14.765,20.671,22.057,20.452,16.462,10,12.787,20.226,24.682,13.234,23.499,23.777,20.339,14.994,24.77,17.31,16.062,17.193,14.516,16.839,13.736,21.856,14.215,12.116,13.437]}}',
    }
    ,
    3: {
        name: "Narrow",
        data: '{"width":"160","height":"3","depth":1,"map":"AA14BB2AA2BAA3BB2ABB2AA3BAA2BB2AA3BB2AA4BAA7BAA3BAA2BAA2BABAA3BB2ABB2AA7BAA5BAA7BAA3BAA8BAA2BB2AA2BAA18BAA6BB2AA3BAA7BABAA8BAA25BAA3BAA16BAA7BAA8BAA2BAA3BAA34BAA3BAA12$AA12BAA19BAA14BAA36BAA108"}',
        wall: "MountainWall_129",
        floor: "Snow_004",
        frontPanorama: "AlpinePanorama_169",
        leftPanorama: "AlpinePanorama_189",
        rightPanorama: "AlpinePanorama_192",
        backPanorama: "BackAlpinePanorama_196",
        archPanorama: "Arch_202",
        skyPanorama: "Sky_206",
        start: '[160,5]',
        decals: '[[174,3,"NewDommes_222","picture"],[180,3,"NewDommes_175","picture"],[17,3,"NewDommes_030","picture"],[186,3,"Warnings_035","picture"],[28,3,"NewDommes_076","picture"],[190,3,"NewDommes_018","picture"],[353,3,"Warnings_052","picture"],[197,3,"NewDommes_015","picture"],[200,3,"NewDommes_286","picture"],[42,3,"NewDommes_384","picture"],[368,3,"NewDommes_325","picture"],[50,3,"NewDommes_291","picture"],[213,3,"NewDommes_315","picture"],[206,3,"NewDommes_352","picture"],[375,3,"NewDommes_419","picture"],[218,3,"NewDommes_133","picture"],[61,3,"NewDommes_483","picture"],[226,3,"Warnings_003","picture"],[388,3,"Warnings_012","picture"],[230,3,"NewDommes_201","picture"],[73,3,"NewDommes_268","picture"],[398,3,"NewDommes_010","picture"],[241,3,"NewDommes_443","picture"],[84,3,"NewDommes_142","picture"],[246,3,"NewDommes_325","picture"],[409,3,"NewDommes_213","picture"],[252,3,"NewDommes_227","picture"],[95,3,"NewDommes_083","picture"],[418,3,"NewDommes_283","picture"],[261,3,"NewDommes_199","picture"],[103,3,"NewDommes_363","picture"],[112,3,"NewDommes_134","picture"],[270,3,"NewDommes_102","picture"],[427,3,"NewDommes_326","picture"],[120,3,"NewDommes_182","picture"],[283,3,"NewDommes_294","picture"],[130,3,"NewDommes_464","picture"],[453,3,"NewDommes_012","picture"],[296,3,"NewDommes_149","picture"],[138,3,"NewDommes_046","picture"],[302,3,"NewDommes_157","picture"],[465,3,"NewDommes_284","picture"],[147,3,"NewDommes_023","picture"],[313,3,"NewDommes_150","picture"],[437,3,"NewDommes_331","picture"]]',
        lights: '[[17,5,"AlpineLight_160","standardYellowTouch"],[186,5,"AlpineLight_155","standardYellowTouch"],[353,5,"AlpineLight_162","standardYellowTouch"],[42,5,"AlpineLight_160","standardYellowTouch"],[213,5,"AlpineLight_157","standardYellowTouch"],[388,5,"AlpineLight_163","standardYellowTouch"],[84,5,"AlpineLight_164","standardYellowTouch"],[261,5,"AlpineLight_166","standardYellowTouch"],[302,5,"AlpineLight_158","standardYellowTouch"],[147,5,"AlpineLight_158","standardYellowTouch"],[313,5,"AlpineLight_166","standardYellowTouch"],[3,5,"AlpineLight_162","standardYellowTouch"],[368,5,"AlpineLight_153","standardYellowTouch"],[61,5,"AlpineLight_162","standardYellowTouch"],[73,5,"AlpineLight_153","standardYellowTouch"],[409,5,"AlpineLight_155","standardYellowTouch"],[95,5,"AlpineLight_159","standardYellowTouch"],[427,5,"AlpineLight_163","standardYellowTouch"],[112,5,"AlpineLight_160","standardYellowTouch"],[130,5,"AlpineLight_155","standardYellowTouch"],[465,5,"AlpineLight_155","standardYellowTouch"],[453,5,"AlpineLight_166","standardYellowTouch"],[343,3,"AlpineLight_157","standardYellowTouch"],[180,5,"AlpineLight_159","standardYellowTouch"],[197,5,"AlpineLight_155","standardYellowTouch"],[206,5,"AlpineLight_154","standardYellowTouch"],[174,5,"AlpineLight_162","standardYellowTouch"],[375,5,"AlpineLight_164","standardYellowTouch"],[230,5,"AlpineLight_160","standardYellowTouch"],[398,5,"AlpineLight_162","standardYellowTouch"],[252,5,"AlpineLight_160","standardYellowTouch"],[120,5,"AlpineLight_157","standardYellowTouch"],[138,5,"AlpineLight_157","standardYellowTouch"],[437,5,"AlpineLight_161","standardYellowTouch"]]',
        terrain: '{"direction":{"parameters":{"seed":2,"amplitude":45,"wavelength":3,"octaves":8,"persistence":0.025,"lacunarity":5,"biasDeg":0,"smooth":"smootherstep","minDeg":-45,"maxDeg":45,"decimals":3},"values":[33.83,32.848,30.896,31.504,22.194,-4.508,-13.589,-15.828,-19.832,-18.898,-15.355,-5.361,-3.118,-4.445,-13.395,-15.401,-13.257,-5.416,-1.981,-3.59,-6.041,-5.799,-7.382,-14.813,-18.094,-20.868,-31.433,-37.125,-29.818,-9.863,-2.657,4.783,24.864,34.032,30.199,18.677,15.87,21.345,37.348,43.75,35.568,11.167,2.001,3.362,5.205,7.202,11.543,23.892,28.37,15.977,-15.06,-26.599,-18.777,1.17,8.765,0.076,-22.921,-29.247,-26.077,-17.362,-14.587,-15.19,-17.532,-18.197,-7.554,22.665,32.51,34.082,36.665,36.776,25.052,-6.687,-17.949,-16.607,-6.95,-3.534,-2.908,-1.86,-2.138,-9.364,-30.523,-38.093,-20.673,26.999,43.899,38.419,20.378,14.368,19.678,32.382,37.041,35.445,29.791,28.171,14.878,-18.83,-31.033,-20.547,6.573,16.789,9.126,-14.764,-23.17,-25.609,-32.744,-33.359,-24.175,4.857,17.21,13.368,3.449,0.244,-0.787,-1.236,-2.025,-6.583,-13.087,-16.646,-11.583,0.06,6.552,14.23,35.316,43.07,33.22,6.205,-2.531,4.121,22.393,30.629,22.06,3.331,-4.31,-6.179,-8.956,-9.782,-3.749,16.102,23.711,24.703,29.677,30.586,30.087,25.889,24.455,24.538,25.44,25.697,11.277,-27.076,-41.103,-37.755,-23.22,-18.747,-5.326,30.825,44.182,35.588,17.14,8.025]},"width":{"parameters":{"seed":2,"amplitude":1.75,"wavelength":7,"octaves":5,"persistence":0.15,"lacunarity":3,"biasWidth":1,"smooth":"smootherstep","minWidth":1,"maxWidth":1.25,"decimals":3},"values":[1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.176,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1.236,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.005,1,1.015,1.097,1.106,1.006,1.008,1.161,1.206,1.248,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.151,1,1,1,1,1,1,1,1,1.071,1.25,1.25,1.204,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25]},"slope":{"parameters":{"seed":3,"amplitude":35,"wavelength":12,"octaves":4,"persistence":0.65,"lacunarity":3,"biasSlope":20,"smooth":"smootherstep","minSlope":15,"maxSlope":38,"decimals":3},"values":[38,37.637,36.628,37.344,26.579,34.392,37.201,38,38,38,33.777,34.119,38,38,34.253,30.806,30.238,24.821,20.613,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,16.539,15,15,15,15,15,15,15,15,15,15.894,22.009,17.069,18.564,15,15,15,15,15,15,15,15,15,15,15,22.578,19.063,20.795,21.99,28.495,33.246,34.829,38,31.241,24.391,26.377,24.497,19.602,15.556,21.083,21.757,21.575,17.829,15,15,15,15.877,21.239,18.882,23.976,28.202,34.291,30.978,19.763,24.276,27.795,15,26.105,21.612,20.854,15,19.525,16.995,21.49,16.045,15,15,19.171,15,20.968,15,15,15,15,15.084,29.064,22.846,33.543,31.879,31.497,27.96,34.956,34.204,24.872,27.702,20.227,33.222,33.707,30.033,28.99,24.993,15,21.209,18.555,15,15,15,17.254,29.077,30.355,38,36.432,24.136,18.01,26.241,19.448,19.924,18.838,19.072,26.434,20.625,21.357,27.102,23.058,31.418,30.186,38,35.67,38,38]}}',
    }
    ,
    4: {
        name: "Curvy",
        data: '{"width":"132","height":"3","depth":1,"map":"AA18BB2AA24BAA60BAA2BAA11BAA5BAA11BAA34BAA7BAA2BAA4BABAA2BABAA2BAA6BB2ABAA7BAA5BAA6BAA4BAA2BAA4BAA41BAA20BAA45BAA2BAA3BB2AA2BB3AA2BAB$BB4ABB4AA2BAA3BB2AA2BB5A"}',
        wall: "MountainWall_132",
        floor: "Snow_005",
        frontPanorama: "AlpinePanorama_194",
        leftPanorama: "AlpinePanorama_190",
        rightPanorama: "AlpinePanorama_193",
        backPanorama: "BackAlpinePanorama_197",
        archPanorama: "Arch_203",
        skyPanorama: "Sky_204",
        start: '[132,5]',
        decals: '[[270,3,"Retro_Games_6005","picture"],[10,3,"NewDommes_503","picture"],[20,3,"NewDommes_025","picture"],[287,3,"NewDommes_288","picture"],[26,3,"GameScreens060","picture"],[294,3,"C64Games_3242","picture"],[32,3,"NewDommes_276","picture"],[311,3,"NewDommes_165","picture"],[186,3,"FluxDommes4052","picture"],[320,3,"MontyMole99","picture"],[61,3,"C64Games_3104","picture"],[81,3,"C64Games_3200","picture"],[349,3,"C64Games_3321","picture"],[89,3,"Retro_Games_6015","picture"],[357,3,"LadyTut102","picture"],[238,3,"AtariST_Games_4049","picture"],[110,3,"C64Games_3121","picture"],[377,3,"WhoDaresWins10","picture"],[256,3,"Retro_Games_7037","picture"]]',
        lights: '[[3,5,"AlpineLight_164","standardYellowTouch"],[270,5,"AlpineLight_158","standardYellowTouch"],[10,5,"AlpineLight_161","standardYellowTouch"],[20,5,"AlpineLight_153","standardYellowTouch"],[287,5,"AlpineLight_167","standardYellowTouch"],[26,5,"AlpineLight_163","standardYellowTouch"],[294,5,"AlpineLight_165","standardYellowTouch"],[40,5,"AlpineLight_156","standardYellowTouch"],[46,5,"AlpineLight_162","standardYellowTouch"],[314,5,"AlpineLight_158","standardYellowTouch"],[186,5,"AlpineLight_165","standardYellowTouch"],[322,5,"AlpineLight_153","standardYellowTouch"],[63,5,"AlpineLight_154","standardYellowTouch"],[333,5,"AlpineLight_164","standardYellowTouch"],[74,5,"AlpineLight_162","standardYellowTouch"],[342,5,"AlpineLight_155","standardYellowTouch"],[83,5,"AlpineLight_155","standardYellowTouch"],[349,5,"AlpineLight_161","standardYellowTouch"],[89,5,"AlpineLight_157","standardYellowTouch"],[357,5,"AlpineLight_164","standardYellowTouch"],[238,5,"AlpineLight_155","standardYellowTouch"],[110,5,"AlpineLight_162","standardYellowTouch"],[377,5,"AlpineLight_164","standardYellowTouch"],[256,5,"AlpineLight_154","standardYellowTouch"],[0,5,"AlpineLight_162","standardYellowTouch"],[264,5,"AlpineLight_161","standardYellowTouch"],[278,5,"AlpineLight_161","standardYellowTouch"]]',
        terrain: '{"direction":{"parameters":{"seed":4,"amplitude":85,"wavelength":3,"octaves":8,"persistence":0.05,"lacunarity":5,"biasDeg":0,"smooth":"smootherstep","minDeg":-90,"maxDeg":90,"decimals":3},"values":[63.474,34.354,-45.728,-72.918,-55.23,7.725,34.877,18.531,-16.268,-27.905,-6.689,31.044,46.195,51.691,53.224,52.543,36.359,-11.332,-29.208,-24.74,-36.074,-36.505,-38.306,-29.555,-30.452,-32.511,-47.251,-46.556,-39.771,-25.653,-20.121,-23.308,-32.23,-44.125,-27.208,12.347,19.288,34.52,52.192,67.514,65.052,73.907,77.097,62.661,16.172,2.152,-12.618,-42.807,-62.748,-53.893,-43.911,-46.051,-42.509,-51.791,-52.426,-27.496,48.539,65.594,61.456,44.874,35.516,24.302,-4.827,-11.817,-16.069,-42.464,-51.001,-53.538,-66.23,-67.875,-52.446,-10.565,4.045,-3.75,-23.546,-23.608,-12.965,16.912,28.516,24.394,14.845,17.461,19.956,14.539,18.262,30.977,58.234,68.141,40.266,-35.632,-65.131,-62.953,-59.386,-61.096,-62.316,-67.63,-65.965,-45.21,34.249,64.672,36.287,-45.413,-76.787,-48.582,45.17,70.663,57.83,3.253,-17.318,-25.293,-48.757,-54.418,-54.836,-41.986,-36.52,-25.999,1.4,18.225,-2.898,-55.501,-73.907,-51.525,16.649,45.369,32.263,18.32,13.767,27.768,62.794,72.879,64.796,32.416]},"width":{"parameters":{"seed":9,"amplitude":2,"wavelength":7,"octaves":5,"persistence":0.02,"lacunarity":3,"biasWidth":1.5,"smooth":"smootherstep","minWidth":1,"maxWidth":2,"decimals":3},"values":[2,2,2,2,1.987,1.643,1.502,1.494,1.446,1.252,1,1,1,1,1,1,1,1,1.052,1.402,1.584,1.615,1.571,1.37,1.032,1,1,1,1,1,1,1,1.14,1.504,1.655,1.667,1.674,1.669,1.618,1.553,1.503,1.484,1.486,1.511,1.667,1.98,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1.972,1.636,1.476,1.454,1.478,1.573,1.717,1.868,2,2,2,2,2,2,2,2,2,2,2,2,1.96,1.803,1.67,1.592,1.576,1.577,1.626,1.753,1.924,2,2,2,2,1.855,1.387,1,1,1,1,1,1,1.06,1.799,2,2,2,2,2,2,2,2,2,2,2,2,2,1.607,1.091,1,1,1,1,1.259,1.708,2,2,2,2,2,1.755,1.455,1.178]},"slope":{"parameters":{"seed":5,"amplitude":40,"wavelength":12,"octaves":4,"persistence":0.99,"lacunarity":3,"biasSlope":20,"smooth":"smootherstep","minSlope":10,"maxSlope":36,"decimals":3},"values":[35.925,25.686,19.423,28.105,24.273,21.877,23.018,10,21.021,11.031,10,15.729,18.407,18.764,29.493,26.256,12.478,22.491,22.812,36,23.789,27.192,26.462,19.735,10,14.595,20.636,20.655,10,25.18,10,10,15.881,10,18.082,10.713,11.945,12.364,12.857,10,17.198,16.733,25.027,25.356,36,27.174,30.354,10,23.748,20.812,13.985,28.665,14.397,13.47,21.767,10.113,23.24,10.247,10,10,10,13.237,16.158,28.491,30.183,36,35.619,19.965,21.279,32.93,20.157,33.702,32.237,36,33.613,36,36,35.057,16.87,10,10,15.47,20.159,12.789,10,10,10.817,26.903,36,26.201,26.059,15.764,21.338,28.347,30.298,34.743,25.933,36,36,23.784,20.698,36,36,18.722,36,21.522,25.611,10,12.552,24.731,26.186,17.982,16.307,26.837,36,36,27.872,36,28.135,25.206,18.998,28.761,32.95,23.813,26.775,36,36,33.538,36,36,36,36]}}',
    }
    ,
    5: {
        name: "Cosy Forest Path",
        data: '{"width":"148","height":"3","depth":1,"map":"AA444$"}',
        wall: "WinterForest_209",
        floor: "Snow_011",
        frontPanorama: "AlpinePanorama_184",
        leftPanorama: "AlpinePanorama_182",
        rightPanorama: "AlpinePanorama_170",
        backPanorama: "BackAlpinePanorama_199",
        archPanorama: "Arch_200",
        skyPanorama: "Sky_205",
        start: '[148,5]',
        terrain: '{"direction":{"parameters":{"seed":6,"amplitude":90,"wavelength":3,"octaves":8,"persistence":0.2,"lacunarity":5,"biasDeg":0,"smooth":"smootherstep","minDeg":-120,"maxDeg":120,"decimals":3},"values":[63.022,46.128,-5.57,-32.046,-44.7,-49.884,-56.025,-60.615,-33.359,-21.737,-15.318,-42.967,-64.694,-43.053,-40.569,-21.284,-43.072,-43.702,-35.549,-38.183,-45.75,-53.005,-48.033,-21.797,-22.79,-25.028,-29.131,-34.412,-28.114,-29.386,-30.641,-15.488,19.104,10.893,13.768,22.418,23.242,19.951,46.905,31.044,39.005,-10.34,-10.172,-5.022,-7.468,-8.34,-20.59,-11.368,-3.039,-10.647,-31.926,-50.565,-5.144,27.384,48.509,49.865,43.533,19.106,22.519,-22.64,-54.387,-48.926,-16.208,15.18,10.772,7.194,6.83,5.243,-20.608,-49.304,-37.454,25.032,29.448,28.046,-19.656,-26.736,-17.763,25.178,57.611,46.052,-26.308,-43.404,-62.779,-49.23,-45.721,-35.724,-49.71,-57.053,-62.087,-24.595,-31.185,-24.523,-0.958,-23.234,14.426,53.01,65.338,35.904,-18.187,-58.131,-39.302,30.941,38.111,44.773,45.676,41.083,26.316,-45.103,-47.793,-45.001,23.151,33.516,14.156,-50.386,-63.592,-50.225,26.606,68.549,41.672,4.533,3.968,14.109,-7.804,18.266,6.442,19.469,22.775,17.643,-52.424,-76.779,-45.803,30.982,43.622,46.563,7.432,-29.132,-14.554,-22.79,-10.95,-14.391,25.255,51.697,34.731,78.828,64.094,31.076,-24.684,-41.35]},"width":{"parameters":{"seed":10,"amplitude":2,"wavelength":7,"octaves":5,"persistence":0.05,"lacunarity":3,"biasWidth":1.5,"smooth":"smootherstep","minWidth":1.25,"maxWidth":1.5,"decimals":3},"values":[1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.398,1.25,1.25,1.25,1.25,1.25,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.49,1.25,1.25,1.25,1.25,1.25,1.25,1.462,1.5,1.5,1.5,1.5,1.459,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.3,1.404,1.451,1.445,1.497,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.331,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.25,1.25,1.25,1.25,1.25,1.377,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5]},"slope":{"parameters":{"seed":13,"amplitude":40,"wavelength":12,"octaves":4,"persistence":1,"lacunarity":3,"biasSlope":25,"smooth":"smootherstep","minSlope":20,"maxSlope":30,"decimals":3},"values":[30,30,30,30,30,30,29.532,29.588,30,30,30,20,29.507,30,22.92,20,20,23.481,30,30,24.179,30,30,30,30,30,30,30,30,30,30,30,21.917,30,30,30,30,30,30,30,30,26.215,30,30,30,30,24.195,30,30,30,30,30,28.28,30,30,30,29.996,30,27.695,28.9,29.674,30,20.909,24.103,20,20,20,20,21.202,20,23.983,30,20,20,25.539,21.61,23.023,23.79,23.155,20,27.075,20,30,30,29.622,27.221,20,20,28.749,20,20,25.964,20,30,25.812,30,28.093,29.2,30,30,30,30,24.899,20.072,30,23.36,27.889,20.409,30,30,30,20,20,20,24.713,30,30,30,25.972,30,30,30,20,22.162,30,30,30,22.45,30,20,30,23.078,23.231,24.192,24.237,23.467,20,20,20,20,23.551,20,30,30,30,30,20,20]}}',
    }
    ,
    6: {
        name: "Slalom",
        data: '{"width":"128","height":"3","depth":1,"map":"AA12BB2AA59BAA3BAA13BAA12BAA8BABAA3BAA7BAA4BB2ABAA20BAA5BAA12BAA5BAA3BB2ABAA9BAA12BAA7BB2AA2BAA10BAA8BAA2BAA9BAA15$AA64BABB2ABAA2BABAA2BB2ABB4AA6BB2ABAA2BB2AA4BAA4BAA4"}',
        wall: "MountainWall_149",
        floor: "Snow_010",
        frontPanorama: "AlpinePanorama_172",
        leftPanorama: "AlpinePanorama_187",
        rightPanorama: "AlpinePanorama_191",
        backPanorama: "BackAlpinePanorama_195",
        archPanorama: "Arch_201",
        skyPanorama: "Sky_206",
        start: '[128,5]',
        decals: '[[11,3,"RetroGames_2169","picture"],[269,3,"CrawlMaster114","picture"],[277,3,"C64Games_3290","picture"],[23,3,"TheHobbit89","picture"],[284,3,"JetSetWilly88","picture"],[157,3,"NewDommes_430","picture"],[301,3,"Tutanham12","picture"],[50,3,"AtariST_Games_4033","picture"],[58,3,"Retro_Games_7038","picture"],[317,3,"Jetpac3","picture"],[71,3,"C64Games_3070","picture"],[331,3,"C64Games_3050","picture"],[344,3,"C64Games_3213","picture"],[107,3,"RetroGames_2134","picture"],[368,3,"FemDommes_26820","picture"],[118,3,"ReturnToCastleWolfenstein13","picture"],[179,3,"LSL102","picture"]]',
        lights: '[[4,5,"AlpineLight_153","standardYellowTouch"],[136,5,"AlpineLight_154","standardYellowTouch"],[146,5,"AlpineLight_166","standardYellowTouch"],[158,5,"AlpineLight_156","standardYellowTouch"],[169,5,"AlpineLight_162","standardYellowTouch"],[179,5,"AlpineLight_162","standardYellowTouch"],[319,5,"AlpineLight_159","standardYellowTouch"],[71,5,"AlpineLight_153","standardYellowTouch"],[345,5,"AlpineLight_164","standardYellowTouch"],[83,5,"AlpineLight_166","standardYellowTouch"],[107,5,"AlpineLight_160","standardYellowTouch"],[118,5,"AlpineLight_162","standardYellowTouch"],[371,5,"AlpineLight_165","standardYellowTouch"]]',
        terrain: '{"direction":{"parameters":{"seed":11,"amplitude":90,"wavelength":3,"octaves":8,"persistence":0.2,"lacunarity":5,"biasDeg":0,"smooth":"smootherstep","minDeg":-120,"maxDeg":120,"decimals":3},"values":[63.371,41.542,25.394,11.114,25.859,2.646,4.79,6.876,13.101,13.827,25.445,15.704,7.797,-21.539,-55.404,-52.806,-47.752,-31.211,-31.4,-23.354,12.337,29.696,47.105,40.548,47.531,51.874,19.857,1.025,14.46,12.975,5.856,-4.648,-44.908,-70.891,-55.731,-22.057,-12.081,3.467,-0.898,15.535,4.001,8.627,2.951,13.265,35.121,39.088,9.39,-32.674,-48.228,-43.265,-31.74,-29.083,-31.589,-31.319,-25.817,-22.932,-42.47,-39.765,-38.221,-15.515,19.608,-9.007,-23.669,-19.622,-12.17,51.731,44.203,61.303,26.028,9.302,2.925,-19.489,-32.843,-29.669,-3.542,-2.736,17.433,41.05,58.554,46.922,62.044,61.109,56.401,-13.166,-40.47,-36.93,-45.438,-49.075,-52.906,-44.173,-44.874,-30.66,-49.768,-56.363,-23.724,15.996,55.073,13.59,-40.436,-58.415,-40.266,16.947,38.149,37.588,12.146,-11.749,-21.778,-22.281,-2.896,5.552,34.597,61.59,41.094,11.015,0.427,17.173,6.525,9.514,-2.216,-31.384,-53.985,-24.825,35.162,58.802,61.552,17.332,9.028,12.929]},"width":{"parameters":{"seed":10,"amplitude":2,"wavelength":7,"octaves":5,"persistence":0.05,"lacunarity":3,"biasWidth":1.5,"smooth":"smootherstep","minWidth":1.25,"maxWidth":2,"decimals":3},"values":[2,2,2,2,2,2,1.905,1.899,1.861,1.865,2,2,2,2,2,2,2,2,2,1.817,1.744,1.746,1.775,1.901,2,2,2,2,2,2,2,1.939,1.398,1.25,1.25,1.25,1.25,1.25,1.633,2,2,2,2,2,2,2,2,2,2,2,2,2,1.905,1.49,1.25,1.25,1.25,1.25,1.25,1.25,1.462,1.617,1.651,1.639,1.618,1.459,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.3,1.404,1.451,1.445,1.497,1.621,1.704,1.766,1.854,1.93,1.963,1.928,1.8,1.581,1.331,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.695,2,2,2,2,2]},"slope":{"parameters":{"seed":13,"amplitude":40,"wavelength":2,"octaves":4,"persistence":0.1,"lacunarity":3,"biasSlope":25,"smooth":"smootherstep","minSlope":5,"maxSlope":30,"decimals":3},"values":[30,30,30,30,30,30,30,30,30,30,30,14.915,7.324,13.627,28.899,30,30,30,30,30,23.921,22.683,16.76,18.137,18.756,21.617,23.309,8.431,5,18.808,30,30,26.242,20.702,12.467,30,30,30,30,30,30,30,23.34,15.453,7.212,22.868,30,30,30,17.809,12.957,5,5,6.563,23.04,30,30,30,18.715,19.205,14.991,19.93,23.505,30,30,25.369,15.679,22.717,30,22.824,10.703,5,5,11.632,28.042,24.211,17.242,30,30,30,30,30,30,30,30,30,30,27.512,5,7.651,15.812,10.497,5,5,5,5,5,14.998,30,16.545,5,19.206,30,30,29.688,17.684,5.492,7.592,6.653,13.474,19.709,9.236,5,26.541,30,30,30,30,23.289,24.799,30,29.725,20.785,18.848,26.428,20.441,16.836,22.294]}}',
    }
    ,
    7: {
        name: "Pac Slide",
        data: '{"width":"140","height":"5","depth":1,"map":"AA28BB2AA2BAA27BAA5BAA2BAA3BAA6BAA19BABAA17BAA9BB2AA6BABB3AA4BAA6BABAA4BAA3BAA2BAA5BB2AA7BAA2BABAA7BAA3BAA8BAA3BAA14BAA3BAA2BAA2BAA4BAA32BAA6BAA2BAA21$BABAA2BABAA3BAA8BAA21BAA2BAA5BAA36BAA31BAA59BAA23BAA9BAA9BAA167"}',
        wall: "MountainWall_148",
        floor: "Snow_009",
        frontPanorama: "AlpinePanorama_171",
        leftPanorama: "AlpinePanorama_194",
        rightPanorama: "AlpinePanorama_170",
        backPanorama: "AlpinePanorama_180",
        archPanorama: "Arch_203",
        skyPanorama: "Sky_204",
        start: '[280,5]',
        decals: '[[7,3,"TheHobbit99","picture"],[288,3,"NewDommes_376","picture"],[151,3,"NewDommes_492","picture"],[432,3,"AtariST_Games_4044","picture"],[18,3,"NewDommes_077","picture"],[298,3,"NewDommes_337","picture"],[441,3,"GameScreens009","picture"],[163,3,"C64_ZX_Classics118","picture"],[308,3,"NewDommes_143","picture"],[30,3,"NewDommes_265","picture"],[173,3,"Warnings_054","picture"],[316,3,"Ishar14","picture"],[599,3,"RetroGames_2121","picture"],[180,3,"TombRaider113","picture"],[45,3,"AtariST_Games_4030","picture"],[327,3,"C64Games_3253","picture"],[190,3,"LSL31","picture"],[475,3,"C64Games_3078","picture"],[56,3,"NewDommes_339","picture"],[338,3,"Unknown501","picture"],[344,3,"Commando201","picture"],[348,3,"C64Games_3155","picture"],[352,3,"LaraCroft123","picture"],[215,3,"Prince41","picture"],[496,3,"NewDommes_447","picture"],[78,3,"MoonZX","picture"],[228,3,"TombRaider111","picture"],[509,3,"RetroGames061","picture"],[97,3,"Witcher113","picture"],[523,3,"C64Games_3152","picture"],[105,3,"GameScreen1018","picture"],[253,3,"NewDommes_422","picture"],[671,3,"Warnings_013","picture"],[543,3,"CrawlMaster112","picture"],[271,3,"NewDommes_249","picture"],[553,3,"Scramble60","picture"],[416,3,"NewDommes_232","picture"]]',
        lights: '[[288,5,"AlpineLight_159","standardYellowTouch"],[18,5,"AlpineLight_159","standardYellowTouch"],[445,5,"AlpineLight_158","standardYellowTouch"],[180,5,"AlpineLight_158","standardYellowTouch"],[612,5,"AlpineLight_154","standardYellowTouch"],[201,5,"AlpineLight_153","standardYellowTouch"],[352,5,"AlpineLight_160","standardYellowTouch"],[85,5,"AlpineLight_153","standardYellowTouch"],[653,5,"AlpineLight_163","standardYellowTouch"],[105,5,"AlpineLight_162","standardYellowTouch"],[671,5,"AlpineLight_165","standardYellowTouch"],[260,5,"AlpineLight_154","standardYellowTouch"],[553,5,"AlpineLight_157","standardYellowTouch"]]',
        terrain: '{"direction":{"parameters":{"seed":231,"amplitude":90,"wavelength":4,"octaves":5,"persistence":0.2,"lacunarity":5,"biasDeg":0,"smooth":"smootherstep","minDeg":-120,"maxDeg":120,"decimals":3},"values":[78.753,59.295,31.172,13.717,16.774,20.486,-12.701,-57.538,-53.369,-56.489,-0.595,30.194,44.52,35.654,-5.923,-45.8,-60.102,-41.899,-12.042,-9.525,-1.735,-0.37,-24.138,-27.741,-30.419,-38.124,-50.653,-27.153,-32.777,-28.623,8.504,41.177,45.86,43.046,9.189,-34.197,-36.671,-36.605,-12.274,-33.097,-17.29,-19.092,0.828,34.35,25.301,16.249,-0.672,-16.559,-9.89,-14.652,26.725,58.057,58.621,61.485,41.014,46.056,32.839,28.534,17.146,-33.07,-33.573,-27.265,1.517,54.239,61.507,57.379,51.863,22.868,9.003,20.319,62.934,70.741,69.967,53.931,6.749,-35.957,-46.768,-26.915,-15.61,5.85,0.289,9.995,-16.998,-28.216,-34.416,-44.022,-29.473,-35.958,-17.196,-35.783,-20.141,-23.525,-27.72,-39.666,-37.503,-47.678,-47.397,-50.063,-19.132,4.937,4.106,5.176,31.776,46.624,34.162,40.239,23.976,27.66,20.079,14.219,-1.259,10.626,-4.267,-8.444,-33.263,-50.594,-67.816,-71.103,-21.464,-4.091,3.939,4.619,-5.89,-8.597,-32.794,-16.234,17.221,28.001,31.255,23.96,18.952,19.355,12.88,14.162,-15.476,-33.567,-34.106,-36.535,-33.774,-19.334]},"width":{"parameters":{"seed":101,"amplitude":2,"wavelength":5,"octaves":5,"persistence":0.1,"lacunarity":3,"biasWidth":1.35,"smooth":"smootherstep","minWidth":1.2,"maxWidth":2,"decimals":3},"values":[2,2,2,2,2,2,2,1.823,1.2,1.2,1.2,1.2,1.2,1.958,2,2,2,2,1.758,1.365,1.297,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.389,1.88,2,1.956,2,2,2,2,2,1.858,1.326,1.2,1.2,1.2,1.291,1.63,1.957,2,1.852,1.503,1.236,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.6,2,2,2,2,2,2,2,2,2,2,2,2,2,1.528,1.2,1.2,1.2,1.2,1.2,2,2,2,2,2,2,2,2,2,1.41,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.848,2,2,2,2,1.2,1.2,1.2,1.2,1.2,1.759,2,2,2,1.599,1.2,1.2,1.2,1.2,1.2,1.2,1.2]},"slope":{"parameters":{"seed":131,"amplitude":40,"wavelength":2,"octaves":5,"persistence":0.1,"lacunarity":3,"biasSlope":25,"smooth":"smootherstep","minSlope":5,"maxSlope":35,"decimals":3},"values":[35,35,29.175,32.933,35,11.82,5,7.261,22.114,31.875,35,16.776,5,14.93,35,35,35,35,21.826,7.787,5,5,5,23.896,35,35,35,35,35,35,35,32.706,28.812,12.311,5,5,5,11.454,26.333,26.12,22.414,35,35,31.626,15.549,5.798,5,8.852,23.417,22.792,20.854,33.578,35,16.187,5,5.13,22.688,17.717,7.799,26.711,35,35,35,31.375,15.74,35,35,35,25.889,8.739,5,5,5,18.284,29.976,23.058,17.641,6.87,5,5,5,19.322,35,35,35,34.074,35,24.732,17.655,11.535,5.729,31.497,35,35,32.189,18.652,5,14.254,24.697,35,35,25.015,5,15.328,28.356,21.443,23.015,34.937,35,35,35,29.087,5,6.799,19.728,35,35,35,31.771,35,35,32.409,14.146,15.559,19.714,29.35,35,35,35,35,35,22.604,10.267,16.912,33,30.946,26.559,15.226,11.724,24.639]}}',
    }
    ,
    9: {
        name: "Long and Winding",
        data: '{"width":"196","height":"3","depth":1,"map":"AA19BB2AA225BAA3BB2AA5BB2AA18BAA2BAA4BAA2BAA2BAA17BAA19BAA7BAA12BABAA15BAA7BAA12BAA3BB2AA11BAA6BAA59$AA14BAA41BAA30BAA6BAA20"}',
        wall: "MountainWall_102",
        floor: "Snow_007",
        frontPanorama: "AlpinePanorama_191",
        leftPanorama: "AlpinePanorama_179",
        rightPanorama: "AlpinePanorama_181",
        backPanorama: "BackAlpinePanorama_197",
        archPanorama: "Arch_203",
        skyPanorama: "Sky_204",
        start: '[196,5]',
        decals: '[[151,3,"GatewayToApshai140","picture"],[545,3,"LeisureSuitLarry91","picture"],[23,3,"C64Games_3293","picture"],[61,3,"C64Games_3320","picture"],[484,3,"RetroGames_2074","picture"],[493,3,"RetroGames_2074","picture"],[567,3,"C64Games_3203","picture"],[135,3,"C64Games_3203","picture"],[97,3,"SpaceQuest103","picture"],[35,5,"SpaceQuest103","picture"],[77,5,"Kangaroo50","picture"],[521,5,"GameScreens060","picture"],[568,5,"NewDommes_396","picture"],[418,3,"NewDommes_396","picture"]]',
        terrain: '{"direction":{"parameters":{"seed":131,"amplitude":82,"wavelength":4,"octaves":5,"persistence":0.05,"lacunarity":5,"biasDeg":0,"smooth":"smootherstep","minDeg":-120,"maxDeg":120,"decimals":3},"values":[69.306,58.846,37.985,14.543,10.585,7.329,16.922,24.197,26.511,14.54,-22.789,-63.541,-73.174,-63.085,-36.504,-11.433,-10.412,-4.788,13.807,37.709,40.234,28.326,-12.737,-52.187,-67.661,-55.395,-25.434,6.638,19.621,24.972,45.241,58.797,64.82,56.421,29.257,2.976,2.664,-10.106,-41.189,-69.065,-78.581,-74.63,-60.703,-49.084,-40.48,-37.152,-5.259,21.127,34.553,34.66,36.728,42.647,42.297,45.431,61.9,70.552,75.557,72.357,51.134,37.685,32.418,27.983,19.01,12.322,9.504,7.693,-22.118,-47.327,-52.297,-57.823,-56.625,-61.807,-60.954,-49.434,-23.941,2.393,10.351,4.218,4.267,0.026,1.714,7.496,34.253,59.859,66.456,52.639,18.44,-17.522,-23.716,-29.417,-41.751,-51.593,-54.649,-46.998,-27.77,-13.174,-11.59,-10.194,-7.852,-4.758,-8.619,-3.821,19.341,40.478,48.485,31.111,-12.033,-60.912,-73.392,-66.253,-43.944,-9.767,-2.073,-7.632,-16.6,-26.836,-34.65,-23.614,5.373,29.501,39.225,33.636,43.341,47.111,49.951,42.45,15.143,-4.54,-11.871,-3.102,27.941,57.016,67.881,54.782,32.403,9.393,3.001,-8.994,-28.502,-48.971,-55.804,-58.258,-55.014,-53.211,-47.315,-47.349,-20.365,0.482,9.203,0.972,-7.399,-13.742,-21.635,-26.856,-32.997,-43.09,-45.565,-46.658,-54.436,-64.986,-69.798,-59.692,-12.49,27.79,35.039,33.529,32.461,24.549,22.52,24.77,24.335,21.83,21.052,18.317,2.348,-14.763,-20.991,-19.304,-28.801,-32.146,-36.481,-22.262,20.883,62.71,77.821,69.745,38.792,13.432,5.263,5.779,-14.261,-37.54,-42.181,-42.296,-26.166,-4.299]},"width":{"parameters":{"seed":15,"amplitude":2,"wavelength":5,"octaves":5,"persistence":0.05,"lacunarity":3,"biasWidth":1.5,"smooth":"smootherstep","minWidth":1.5,"maxWidth":2,"decimals":3},"values":[2,2,1.971,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.858,2,2,2,1.78,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.616,2,2,2,2,2,2,2,2,2,2,1.52,1.5,1.5,1.5,1.5,2,2,2,2,2,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.545,1.695,1.932,2,2,2,2,2,2,2,2,2,1.531,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.509,1.693,1.975,2,2,2,1.816,1.5,1.5,1.5,1.5,1.5,1.526,1.816,1.885,1.921,1.894,1.834,1.774,1.72,1.889,2,2,2,2,2,2,2,2,2,2,1.986,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.557,1.636,1.596,1.73,1.982,2,2,2,2,1.835,1.74,1.783,1.766,1.987,2,2,2,2,2,2,2,2,2,2,1.886,1.778,1.707,1.756,1.613,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.82,2,2,2,1.899,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5]},"slope":{"parameters":{"seed":13,"amplitude":40,"wavelength":2,"octaves":5,"persistence":0.01,"lacunarity":3,"biasSlope":20,"smooth":"smootherstep","minSlope":5,"maxSlope":36,"decimals":3},"values":[36,36,36,36,36,36,34.327,36,36,33.819,23.659,10.366,5,9.104,21.172,36,36,36,36,27.792,17.852,15.559,12.839,13.532,14.235,15.931,17.521,5,5,10.451,36,28.858,20.652,14.857,8.796,29.525,36,36,36,36,36,36,19.251,9.457,5,17.959,36,31.418,26.327,15.393,5.58,5,5,5,20.049,36,36,33.928,16.134,13.994,11.336,16.313,21.068,30.402,36,23.639,9.182,18.589,28.148,14.896,5,5,5,6.283,23.717,16.333,8.615,30.457,36,36,30.175,35.483,36,35.546,29.871,36,36,22.384,5,5,9.826,5,5,5,5,5,5,10.249,35.523,13.189,5,15.234,36,31.212,23.985,10.229,5,5,5,8.126,15.665,5.563,5,19.699,36,36,36,32.235,14.61,21.362,28.678,21.726,13.93,15.766,18.698,14.697,10.915,16.96,23.241,36,36,36,20.379,22.372,23.585,9.653,5,5,5,5,5,5,5,22.033,36,36,19.376,9.346,5,5,5,5,5,5,5,5,5,5,5,14.489,36,36,36,17.393,5,10.995,36,32.872,27.867,26.06,24.96,26.111,27.605,32.621,36,12.929,5,7.098,25.233,7.863,5,5,5,14.389,32.187,25.946,19.512,11.276,5,24.608,36,36,24.894,10.164,5,23.276]}}',
    }
    ,
    10: {
        name: "Steepy",
        data: '{"width":"160","height":"3","depth":1,"map":"AA23BB2AA154BAA19BAA38BAA18BAA4BABAA8BAA5BAA15BAA28BAA2BAA16BAA8BABAA3BB2ABB2AA33BAA4BB2AA21$AA32BAA16BB2ABB2A"}',
        wall: "MountainWall_133",
        floor: "Snow_006",
        frontPanorama: "AlpinePanorama_184",
        leftPanorama: "AlpinePanorama_179",
        rightPanorama: "AlpinePanorama_174",
        backPanorama: "BackAlpinePanorama_196",
        archPanorama: "Arch_200",
        skyPanorama: "Sky_205",
        start: '[160,5]',
        decals: '[[2,3,"NewDommes_122","picture"],[30,3,"MontyMole112","picture"],[43,3,"NewDommes_389","picture"],[376,3,"C64Games_3307","picture"],[334,3,"Retro_Games_7054","picture"],[24,3,"NewDommes_172","picture"],[391,3,"C64Games_3148","picture"],[405,3,"C64Games_3001","picture"]]',
        lights: '[[18,5,"AlpineLight_158","standardYellowTouch"],[368,5,"AlpineLight_162","standardYellowTouch"],[409,5,"AlpineLight_162","standardYellowTouch"],[425,5,"AlpineLight_166","standardYellowTouch"],[127,5,"AlpineLight_165","standardYellowTouch"],[456,5,"AlpineLight_164","standardYellowTouch"]]',
        terrain: '{"direction":{"parameters":{"seed":16,"amplitude":82,"wavelength":4,"octaves":5,"persistence":0.05,"lacunarity":5,"biasDeg":0,"smooth":"smootherstep","minDeg":-120,"maxDeg":120,"decimals":3},"values":[61.997,49.928,3.063,-48.472,-61.423,-48.582,6.635,50.426,63.084,65.863,53.778,46.424,47.633,42.712,47.034,45.811,47.899,47.268,47.626,45.473,46.195,39.375,21.221,6.167,3.522,0.183,-19.101,-30.323,-37.163,-32.999,-26.04,-15.8,-11.634,-5.212,23.256,57.053,59.83,61.926,58.612,53.262,55.258,49.385,20.007,-1.435,-5.748,-7.336,-9.642,-17.116,-20.357,-25.593,-26.399,-25.951,-27.973,-21.939,4.721,24.863,35.471,27.333,-16.838,-51.983,-64.142,-43.577,2.777,57.833,74.931,60.12,31.203,-8.532,-12.629,-5.317,17.982,40.715,46.242,39.269,25.268,15.088,9.784,4.716,-30.831,-67.392,-77.129,-71.239,-63.09,-51.815,-52.884,-51.482,-47.779,-37.621,-41.578,-25.82,11.318,51.868,67.165,62.367,64.174,69.612,66.919,58.864,42.662,23.283,18.673,28.025,38.4,55.84,55.411,56.375,54.242,48.657,43.851,36.121,13.766,-20.568,-28.218,-28.316,-25.489,-29.98,-26.255,-33.944,-44.555,-53.966,-57.052,-37.418,8.307,59.709,78.21,73.364,44.808,23.069,20.718,9.136,-13.771,-39.475,-49.722,-42.253,-1.591,38.751,46.123,36.128,-11.746,-64.857,-71.423,-61.297,-20.206,20.855,30.945,16.332,-22.616,-64.404,-78.527,-72.249,-72.582,-71.76,-70.112,-67.305,-49.388,-24.805,-19.847,-15.27,11.296,46.667]},"width":{"parameters":{"seed":16,"amplitude":2,"wavelength":5,"octaves":5,"persistence":0.05,"lacunarity":3,"biasWidth":1.6,"smooth":"smootherstep","minWidth":1.6,"maxWidth":2,"decimals":3},"values":[2,2,2,1.6,1.6,1.6,1.6,1.6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1.98,1.715,1.682,1.612,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.94,2,2,2,2,2,2,2,2,2,2,1.908,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,2,2,2,2,1.663,1.6,1.6,1.6,1.6,1.6,2,2,2,2,2,1.878,1.6,1.6,1.6,1.689,2,2,2,2,2,2,1.945,1.925,1.703,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,2,2,2,2,2,2,2]},"slope":{"parameters":{"seed":16,"amplitude":40,"wavelength":2,"octaves":5,"persistence":0.01,"lacunarity":3,"biasSlope":25,"smooth":"smootherstep","minSlope":12,"maxSlope":40,"decimals":3},"values":[40,25.578,12,26.609,40,40,40,40,40,40,40,36.645,26.128,15.634,12,12.392,19.198,37.493,40,40,40,36.768,22.159,18.103,14.019,12.71,12,27.3,40,18.63,12,27.805,40,39.713,17.561,32.817,40,39.165,30.957,12,12,12,12,12,12,31.9,40,40,40,40,36.024,40,40,40,40,30.107,12,12,12,12,12,30.89,40,40,35.333,17.1,12,23.795,40,18.337,12,13.676,39.361,12.695,12,12,12,12,13.778,31.91,40,35.374,19.967,14.622,12,21.921,35.005,40,40,36.231,14.391,12.595,12,12,12,32.856,40,40,40,40,40,26.862,12,26.111,40,34.756,28.838,32.111,35.178,37.069,39.641,15.752,12,12,24.011,36.425,40,31.483,13.819,21.368,28.878,12,12,12,23.571,38.434,40,39.074,25.934,40,40,40,39.886,21.7,12,15.558,26.568,13.21,12,12,12,12.338,34.549,12,12,12,24.242,12,12,17.124,40,38.38,31.971,35.726,39.601,23.417,12,21.499,36.429,40]}}',
    }
};

const MAP_DESCRIPTION = {
    1: {
        maxSlope: 35,
        avgSlope: 16,
        len: Math.round(128 * 7.5),
        maxSpeed: 230,
        difficulty: "Easy",
    },
    2: {
        maxSlope: 36,
        avgSlope: 19,
        len: Math.round(128 * 7.5),
        maxSpeed: 248,
        difficulty: "Medium",
    },
    3: {
        maxSlope: 38,
        avgSlope: 23,
        len: Math.round(160 * 7.5),
        maxSpeed: 299,
        difficulty: "Hard",
    },
    4: {
        maxSlope: 36,
        avgSlope: 23,
        len: Math.round(130 * 7.5),
        maxSpeed: 220,
        difficulty: "Medium",
    },
    5: {
        maxSlope: 30,
        avgSlope: 26,
        len: Math.round(148 * 7.5),
        maxSpeed: 305,
        difficulty: "Easy",
    },
    6: {
        maxSlope: 30,
        avgSlope: 21,
        len: Math.round(128 * 7.5),
        maxSpeed: 260,
        difficulty: "Easy",
    },
    7: {
        maxSlope: 35,
        avgSlope: 23,
        len: Math.round(140 * 7.5),
        maxSpeed: 290,
        difficulty: "Medium",
    },
    8: {
        maxSlope: 35,
        avgSlope: 23,
        len: Math.round(150 * 7.5),
        maxSpeed: 290,
        difficulty: "Medium",
    },
    9: {
        maxSlope: 36,
        avgSlope: 20,
        len: Math.round(196 * 7.5),
        maxSpeed: 230,
        difficulty: "Medium",
    },
    10: {
        maxSlope: 40,
        avgSlope: 26,
        len: Math.round(160 * 7.5),
        maxSpeed: 230,
        difficulty: "Hard",
    },
};

const MAP_SCORES = {
    1: {
        active: false,
        name: "The Princess",
        score: 80,
        increment: 1.2,
    },
    2: {
        active: false,
        name: "The Princess",
        score: 80,
        increment: 1.1,
    },
    3: {
        active: false,
        name: "The Princess",
        score: 85,
        increment: 1.05,
    },
    4: {
        active: false,
        name: "The Princess",
        score: 85,
        increment: 1.025,
    },
    5: {
        active: false,
        name: "The Princess",
        score: 90,
        increment: 1.03,
    },
    6: {
        active: false,
        name: "The Princess",
        score: 80,
        increment: 1.02,
    },
    7: {
        active: false,
        name: "The Princess",
        score: 95,
        increment: 1.2,
    },
    8: {
        active: false,
        name: "The Princess",
        score: 95,
        increment: 1.25,
    },
    9: {
        active: false,
        name: "The Princess",
        score: 100,
        increment: 1.5,
    },
    10: {
        active: false,
        name: "The Princess",
        score: 100,
        increment: 1.5,
    },
};