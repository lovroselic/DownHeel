// -- main --
/**
 * 
 */

function test() {
    let time = TIMER.time();
    console.log("time", time);
    console.log(Timer.MSH_String(time));
 }


$(function () {
    console.clear();
    console.info("*****************************************");

    TIMER = new Timer("Main");
    setTimeout(test, 1111);


    console.info("*****************************************");



    console.info("*****************************************");
});