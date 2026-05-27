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
4 : {
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
};