/* ****** Slot Game JS by Zino Adidi ****** */
/*  Derivco recruitment test solution 2020  */

import * as util from './controllers/Util.js';
import {reels} from "./models/Reel.js";
import {config} from "./config.js";
import {Storage} from './models/Storage.js';

const spin_btn = document.querySelector("#spin_btn");
const storage = new Storage(reels, config.initialBalance);

let listOfSpinningReels = [];
let numberOfSpinningReels = 0;
let spinInProgress = false;

// create data binding for UI
let reelContainer = new Vue({
    el: '#reel-container',
    data: {
        reelArray: reels
    }
});

function handleSpinRequest() {
    /* call spin reel function on each reel */
    //
    // game.disableInteraction();
    //
    // deduct users balance
    //document.querySelector("#balanceInput").value = game.deductBalance(2);
    spinInProgress = true;

    let reels = reelContainer.reelArray;
    /*loop through reel array and trigger spin requests for each reel it contains*/
    reels.forEach(function(reel, reelId){
        createSpin(reel, reelId);
        createStopSpin(reelId);
    });
}

// attach timer to spin request and update global reel object //
function createSpin(reelArray, reelId){
    listOfSpinningReels[reelId] = setInterval(function(){
        // rearrange content of array
        let lastItemInReel = reelArray.pop();
        reelArray.unshift(lastItemInReel);

        //update binded reel object with new data
        reelContainer.reelArray[reelId] = reelArray;

    }, config.spinSpeed);

    console.log("newly created:"+reelId, listOfSpinningReels[reelId]);
    numberOfSpinningReels ++;
}

function createStopSpin(reelId){
    //stop spinning reel after a period time using timeout
    let reelStoppageTime = config.spinningTime +
        (config.stopIntervalBetweenReels * numberOfSpinningReels);
    setTimeout(
        function(){
            let intervalToClear = listOfSpinningReels[reelId];
            console.log("stopping now:"+reelStoppageTime);
            console.log("reel to stop:"+intervalToClear);
            clearInterval(intervalToClear);
           // delete listOfSpinningReels[reelId];
            numberOfSpinningReels --;
            if(isLastReel()){
                spinCompleted();
            }
        },
        reelStoppageTime
    );

    console.log("stoppage time:"+reelStoppageTime)
}

function isLastReel(){
    return numberOfSpinningReels <= 0;
}

function resetGameArea(){
    console.log(listOfSpinningReels);
    numberOfSpinningReels = 0;
    listOfSpinningReels = [];
}

function calculateScore() {

}

function spinCompleted() {
    calculateScore();
    resetGameArea();
}

/* setup game area */
spin_btn.addEventListener("click",function(){handleSpinRequest()});
util.setupGameArea();

/* hide loading screen */
setTimeout(util.stopLoad, 4000);
