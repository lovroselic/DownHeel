/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";

/** textures */
const TEXTURE_LIST = [
    "RockWall_SDXL_003",
    "MountainWall_100", "MountainWall_101", "MountainWall_102", "MountainWall_103", "MountainWall_104", "MountainWall_105", "MountainWall_106", "MountainWall_107", "MountainWall_108", "MountainWall_109", "MountainWall_110", "MountainWall_111",
    "MountainWall_112", "MountainWall_113", "MountainWall_114", "MountainWall_115", "MountainWall_116", "MountainWall_117", "MountainWall_118", "MountainWall_119", "MountainWall_120", "MountainWall_121", "MountainWall_122", "MountainWall_123",
    "MountainWall_124", "MountainWall_125", "MountainWall_126", "MountainWall_127", "MountainWall_128", "MountainWall_129", "MountainWall_130", "MountainWall_131", "MountainWall_132", "MountainWall_133", "MountainWall_134", "MountainWall_135",
    "MountainWall_136", "MountainWall_137", "MountainWall_138", "MountainWall_139", "MountainWall_140", "MountainWall_141", "MountainWall_142", "MountainWall_143", "MountainWall_144", "MountainWall_145", "MountainWall_146", "MountainWall_147",
    "MountainWall_148", "MountainWall_149", "MountainWall_150", "MountainWall_151", "MountainWall_152",
    "Snow_001", "Snow_002", "Snow_003", "Snow_004", "Snow_005", "Snow_006", "Snow_007", "Snow_008", "Snow_009", "Snow_010", "Snow_011",
].sort();

/** Decals */
const DECAL_PAINTINGS = [
    "Warnings_001", "Warnings_002", "Warnings_003", "Warnings_004", "Warnings_005", "Warnings_006", "Warnings_007", "Warnings_008", "Warnings_009", "Warnings_010", "Warnings_011", "Warnings_012",
    "Warnings_013", "Warnings_014", "Warnings_015", "Warnings_016", "Warnings_017", "Warnings_018", "Warnings_019", "Warnings_020",
    "Warnings_030", "Warnings_031", "Warnings_032", "Warnings_033", "Warnings_034", "Warnings_035", "Warnings_036", "Warnings_037", "Warnings_038", "Warnings_039", "Warnings_040", "Warnings_041",
    "Warnings_042", "Warnings_043", "Warnings_044", "Warnings_045", "Warnings_046", "Warnings_047", "Warnings_048", "Warnings_049", "Warnings_050", "Warnings_051", "Warnings_052", "Warnings_053",
    "Warnings_054", "Warnings_055", "Warnings_056",
    "NewDommes_001", "NewDommes_002", "NewDommes_003", "NewDommes_004", "NewDommes_005", "NewDommes_006", "NewDommes_007", "NewDommes_008", "NewDommes_009", "NewDommes_010", "NewDommes_011", "NewDommes_012",
    "NewDommes_013", "NewDommes_014", "NewDommes_015", "NewDommes_016", "NewDommes_017", "NewDommes_018", "NewDommes_019", "NewDommes_020", "NewDommes_021", "NewDommes_022", "NewDommes_023", "NewDommes_024",
    "NewDommes_025", "NewDommes_026", "NewDommes_027", "NewDommes_028", "NewDommes_029", "NewDommes_030", "NewDommes_031", "NewDommes_032", "NewDommes_033", "NewDommes_034", "NewDommes_035", "NewDommes_036",
    "NewDommes_037", "NewDommes_038", "NewDommes_039", "NewDommes_040", "NewDommes_041", "NewDommes_042", "NewDommes_043", "NewDommes_044", "NewDommes_045", "NewDommes_046", "NewDommes_047", "NewDommes_048",
    "NewDommes_049", "NewDommes_050", "NewDommes_051", "NewDommes_052", "NewDommes_053", "NewDommes_054", "NewDommes_055", "NewDommes_056", "NewDommes_057", "NewDommes_058", "NewDommes_059", "NewDommes_060",
    "NewDommes_061", "NewDommes_062", "NewDommes_063", "NewDommes_064", "NewDommes_065", "NewDommes_066", "NewDommes_067", "NewDommes_068", "NewDommes_069", "NewDommes_070", "NewDommes_071", "NewDommes_072",
    "NewDommes_073", "NewDommes_074", "NewDommes_075", "NewDommes_076", "NewDommes_077", "NewDommes_078", "NewDommes_079", "NewDommes_080", "NewDommes_081", "NewDommes_082", "NewDommes_083", "NewDommes_084",
    "NewDommes_085", "NewDommes_086", "NewDommes_087", "NewDommes_088", "NewDommes_089", "NewDommes_090", "NewDommes_091", "NewDommes_092", "NewDommes_093", "NewDommes_094", "NewDommes_095", "NewDommes_096",
    "NewDommes_097", "NewDommes_098", "NewDommes_099", "NewDommes_100", "NewDommes_101", "NewDommes_102", "NewDommes_103", "NewDommes_104", "NewDommes_105", "NewDommes_106", "NewDommes_107", "NewDommes_108",
    "NewDommes_109", "NewDommes_110", "NewDommes_111", "NewDommes_112", "NewDommes_113", "NewDommes_114", "NewDommes_115", "NewDommes_116", "NewDommes_117", "NewDommes_118", "NewDommes_119", "NewDommes_120",
    "NewDommes_121", "NewDommes_122", "NewDommes_123", "NewDommes_124", "NewDommes_125", "NewDommes_126", "NewDommes_127", "NewDommes_128", "NewDommes_129", "NewDommes_130", "NewDommes_131", "NewDommes_132",
    "NewDommes_133", "NewDommes_134", "NewDommes_135", "NewDommes_136", "NewDommes_137", "NewDommes_138", "NewDommes_139", "NewDommes_140", "NewDommes_141", "NewDommes_142", "NewDommes_143", "NewDommes_144",
    "NewDommes_145", "NewDommes_146", "NewDommes_147", "NewDommes_148", "NewDommes_149", "NewDommes_150", "NewDommes_151", "NewDommes_152", "NewDommes_153", "NewDommes_154", "NewDommes_155", "NewDommes_156",
    "NewDommes_157", "NewDommes_158", "NewDommes_159", "NewDommes_160", "NewDommes_161", "NewDommes_162", "NewDommes_163", "NewDommes_164", "NewDommes_165", "NewDommes_166", "NewDommes_167", "NewDommes_168",
    "NewDommes_169", "NewDommes_170", "NewDommes_171", "NewDommes_172", "NewDommes_173", "NewDommes_174", "NewDommes_175", "NewDommes_176", "NewDommes_177", "NewDommes_178", "NewDommes_179", "NewDommes_180",
    "NewDommes_181", "NewDommes_182", "NewDommes_183", "NewDommes_184", "NewDommes_185", "NewDommes_186", "NewDommes_187", "NewDommes_188", "NewDommes_189", "NewDommes_190", "NewDommes_191", "NewDommes_192",
    "NewDommes_193", "NewDommes_194", "NewDommes_195", "NewDommes_196", "NewDommes_197", "NewDommes_198", "NewDommes_199", "NewDommes_200", "NewDommes_201", "NewDommes_202", "NewDommes_203", "NewDommes_204",
    "NewDommes_205", "NewDommes_206", "NewDommes_207", "NewDommes_208", "NewDommes_209", "NewDommes_210", "NewDommes_211", "NewDommes_212", "NewDommes_213", "NewDommes_214", "NewDommes_215", "NewDommes_216",
    "NewDommes_217", "NewDommes_218", "NewDommes_219", "NewDommes_220", "NewDommes_221", "NewDommes_222", "NewDommes_223", "NewDommes_224", "NewDommes_225", "NewDommes_226", "NewDommes_227", "NewDommes_228",
    "NewDommes_229", "NewDommes_230", "NewDommes_231", "NewDommes_232", "NewDommes_233", "NewDommes_234", "NewDommes_235", "NewDommes_236", "NewDommes_237", "NewDommes_238", "NewDommes_239", "NewDommes_240",
    "NewDommes_241", "NewDommes_242", "NewDommes_243", "NewDommes_244", "NewDommes_245", "NewDommes_246", "NewDommes_247", "NewDommes_248", "NewDommes_249", "NewDommes_250", "NewDommes_251", "NewDommes_252",
    "NewDommes_253", "NewDommes_254", "NewDommes_255", "NewDommes_256", "NewDommes_257", "NewDommes_258", "NewDommes_259", "NewDommes_260", "NewDommes_261", "NewDommes_262", "NewDommes_263", "NewDommes_264",
    "NewDommes_265", "NewDommes_266", "NewDommes_267", "NewDommes_268", "NewDommes_269", "NewDommes_270", "NewDommes_271", "NewDommes_272", "NewDommes_273", "NewDommes_274", "NewDommes_275", "NewDommes_276",
    "NewDommes_277", "NewDommes_278", "NewDommes_279", "NewDommes_280", "NewDommes_281", "NewDommes_282", "NewDommes_283", "NewDommes_284", "NewDommes_285", "NewDommes_286", "NewDommes_287", "NewDommes_288",
    "NewDommes_289", "NewDommes_290", "NewDommes_291", "NewDommes_292", "NewDommes_293", "NewDommes_294", "NewDommes_295", "NewDommes_296", "NewDommes_297", "NewDommes_298", "NewDommes_299", "NewDommes_300",
    "NewDommes_301", "NewDommes_302", "NewDommes_303", "NewDommes_304", "NewDommes_305", "NewDommes_306", "NewDommes_307", "NewDommes_308", "NewDommes_309", "NewDommes_310", "NewDommes_311", "NewDommes_312",
    "NewDommes_313", "NewDommes_314", "NewDommes_315", "NewDommes_316", "NewDommes_317", "NewDommes_318", "NewDommes_319", "NewDommes_320", "NewDommes_321", "NewDommes_322", "NewDommes_323", "NewDommes_324",
    "NewDommes_325", "NewDommes_326", "NewDommes_327", "NewDommes_328", "NewDommes_329", "NewDommes_330", "NewDommes_331", "NewDommes_332", "NewDommes_333", "NewDommes_334", "NewDommes_335", "NewDommes_336",
    "NewDommes_337", "NewDommes_338", "NewDommes_339", "NewDommes_340", "NewDommes_341", "NewDommes_342", "NewDommes_343", "NewDommes_344", "NewDommes_345", "NewDommes_346", "NewDommes_347", "NewDommes_348",
    "NewDommes_349", "NewDommes_350", "NewDommes_351", "NewDommes_352", "NewDommes_353", "NewDommes_354", "NewDommes_355", "NewDommes_356", "NewDommes_357", "NewDommes_358", "NewDommes_359", "NewDommes_360",
    "NewDommes_361", "NewDommes_362", "NewDommes_363", "NewDommes_364", "NewDommes_365", "NewDommes_366", "NewDommes_367", "NewDommes_368", "NewDommes_369", "NewDommes_370", "NewDommes_371", "NewDommes_372",
    "NewDommes_373", "NewDommes_374", "NewDommes_375", "NewDommes_376", "NewDommes_377", "NewDommes_378", "NewDommes_379", "NewDommes_380", "NewDommes_381", "NewDommes_382", "NewDommes_383", "NewDommes_384",
    "NewDommes_385", "NewDommes_386", "NewDommes_387", "NewDommes_388", "NewDommes_389", "NewDommes_390", "NewDommes_391", "NewDommes_392", "NewDommes_393", "NewDommes_394", "NewDommes_395", "NewDommes_396",
    "NewDommes_397", "NewDommes_398", "NewDommes_399", "NewDommes_400", "NewDommes_401", "NewDommes_402", "NewDommes_403", "NewDommes_404", "NewDommes_405", "NewDommes_406", "NewDommes_407", "NewDommes_408",
    "NewDommes_409", "NewDommes_410", "NewDommes_411", "NewDommes_412", "NewDommes_413", "NewDommes_414", "NewDommes_415", "NewDommes_416", "NewDommes_417", "NewDommes_418", "NewDommes_419", "NewDommes_420",
    "NewDommes_421", "NewDommes_422", "NewDommes_423", "NewDommes_424", "NewDommes_425", "NewDommes_426", "NewDommes_427", "NewDommes_428", "NewDommes_429", "NewDommes_430", "NewDommes_431", "NewDommes_432",
    "NewDommes_433", "NewDommes_434", "NewDommes_435", "NewDommes_436", "NewDommes_437", "NewDommes_438", "NewDommes_439", "NewDommes_440", "NewDommes_441", "NewDommes_442", "NewDommes_443", "NewDommes_444",
    "NewDommes_445", "NewDommes_446", "NewDommes_447", "NewDommes_448", "NewDommes_449", "NewDommes_450", "NewDommes_451", "NewDommes_452", "NewDommes_453", "NewDommes_454", "NewDommes_455", "NewDommes_456",
    "NewDommes_457", "NewDommes_458", "NewDommes_459", "NewDommes_460", "NewDommes_461", "NewDommes_462", "NewDommes_463", "NewDommes_464", "NewDommes_465", "NewDommes_466", "NewDommes_467", "NewDommes_468",
    "NewDommes_469", "NewDommes_470", "NewDommes_471", "NewDommes_472", "NewDommes_473", "NewDommes_474", "NewDommes_475", "NewDommes_476", "NewDommes_477", "NewDommes_478", "NewDommes_479", "NewDommes_480",
    "NewDommes_481", "NewDommes_482", "NewDommes_483", "NewDommes_484", "NewDommes_485", "NewDommes_486", "NewDommes_487", "NewDommes_488", "NewDommes_489", "NewDommes_490", "NewDommes_491", "NewDommes_492",
    "NewDommes_493", "NewDommes_494", "NewDommes_495", "NewDommes_496", "NewDommes_497", "NewDommes_498", "NewDommes_499", "NewDommes_500", "NewDommes_501", "NewDommes_502", "NewDommes_503", "NewDommes_504",
    "NewDommes_505", "Retro_Games_9400", "Retro_Games_9401", "Retro_Games_9402", "Retro_Games_9403", "Retro_Games_9404", "Retro_Games_9405", "Retro_Games_9406", "Retro_Games_9407", "Retro_Games_9408", "Retro_Games_9409"
].sort();

/** Crests */

const DECAL_CRESTS = [].sort();

//lights
const LIGHT_DECALS = [
    "AlpineLight_153", "AlpineLight_154", "AlpineLight_155", "AlpineLight_156", "AlpineLight_157", "AlpineLight_158", "AlpineLight_159", "AlpineLight_160", "AlpineLight_161", "AlpineLight_162", "AlpineLight_163", "AlpineLight_164",
    "AlpineLight_165", "AlpineLight_166", "AlpineLight_167",
].sort();

//panorama
const PANORAMA_DECALS = [
    "AlpinePanorama_168", "AlpinePanorama_169", "AlpinePanorama_170", "AlpinePanorama_171", "AlpinePanorama_172", "AlpinePanorama_173", "AlpinePanorama_174", "AlpinePanorama_175", "AlpinePanorama_176", "AlpinePanorama_177", "AlpinePanorama_178", "AlpinePanorama_179",
    "AlpinePanorama_180", "AlpinePanorama_181", "AlpinePanorama_182",
    "AlpinePanorama_183", "AlpinePanorama_184", "AlpinePanorama_185", "AlpinePanorama_186", "AlpinePanorama_187", "AlpinePanorama_188", "AlpinePanorama_189", "AlpinePanorama_190", "AlpinePanorama_191", "AlpinePanorama_192", "AlpinePanorama_193", "AlpinePanorama_194",
    "BackAlpinePanorama_195", "BackAlpinePanorama_196", "BackAlpinePanorama_197", "BackAlpinePanorama_198", "BackAlpinePanorama_199"
].sort();

//arch
const ARCH_DECALS = [
    "Arch_200", "Arch_201", "Arch_202", "Arch_203",
].sort();;

//sky
const SKY_DECALS = [
    "Sky_204", "Sky_205", "Sky_206",
].sort();

const TRIGGER_DECALS = [];
const LAIR_DECALS = [].sort();

const CONTAINER_LIST = [];
if (typeof CONTAINER_ITEM_TYPE !== "undefined") {

    for (const container in CONTAINER_ITEM_TYPE) {
        CONTAINER_LIST.push(container);
    }
}
console.log("%cMAP for MazEditor loaded.", "color: #888");