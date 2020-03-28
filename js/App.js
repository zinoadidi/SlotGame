/* ****** Slot Game JS by Zino Adidi ****** */
/*  Derivco recruitment test solution 2020  */

import * as util from './controllers/Util.js';
import {reels, activeReelModel} from "./models/Reel.js";
import {config} from "./config.js";
import {Storage} from './models/Storage.js';

const spin_btn = document.querySelector("#spin_btn");
const storage = new Storage(reels, config.initialBalance);

let activeReels = [];
let numOfSpinningReels = 0;
let spinInProgress = false;
let spinStartTime = new Date();
// create data binding for UI
let reelsContainer =  reels;

function handleSpinRequest() {
    /* call spin reel function on each reel */
    //
    // game.disableInteraction();
    //
    // deduct users balance
    //document.querySelector("#balanceInput").value = game.deductBalance(2);
    spinInProgress = true;
    spinStartTime = new Date();

    console.log("=====================")
    console.log("check things 0ut")
    console.log("activeReels")
    console.log(activeReels)
    console.log("=====================")

    /*loop through reel array and trigger spin requests for each reel it contains*/
    reelsContainer.forEach(function(reel, reelId){
        numOfSpinningReels ++;
        createSpinReel(reel, reelId);
    });
}

function getReelStopTime(reelId) {
    // example total spin time for reel 1 will be 2000 + (500 * 1)
    // based on requirement document
    let reelStopTime = 0;

    if(activeReels[reelId]){
        console.log("---------------start stop time exists")
        console.log(reelId)
        console.dir(activeReels[reelId])
        console.log("---------------end stop time exists")
        reelStopTime = activeReels[reelId]['reelStopTime'];
    }else{
        console.log("---------------start new stop time")
        console.log(config.intervalBetweenReels)
        console.log(numOfSpinningReels)
        console.log("---------------end new stop time")
        reelStopTime = config.spinTime + (config.intervalBetweenReels * numOfSpinningReels);
        activeReels[reelId] =  {
            ...activeReelModel
        };
        activeReels[reelId].reelStopTime = reelStopTime;

    }
    console.log(reelStopTime);
    return reelStopTime;
}

function getTimeSpentSpinning() {
    console.log("time spent :"+spinStartTime)
    console.log("new date:"+new Date())
    console.log("time spent spinning:"+(new Date() - spinStartTime))
    return new Date() - spinStartTime;
}

function createSpinReel(reelArray, reelId){

    let reelStopTime = getReelStopTime(reelId);
    let timeSinceReelStarted = getTimeSpentSpinning();

    console.log("=============================")
    console.log("spin request")

    console.log("config.spinSpeed:"+config.spinSpeed)
    console.log("numOfSpinningReels:"+numOfSpinningReels)
    console.log("spinStartTime:"+spinStartTime)
    console.log("Date - spinStartTime:")
    console.log("timeSinceReelStarted < reelStopTime:"+timeSinceReelStarted < reelStopTime)
    console.log("=============================")

    setTimeout(
        spinReel,
        config.spinSpeed,
        reelId
    )
}

function spinReel(reelId){
    // rearrange content of array
    let reelArray = reelsContainer[reelId];
    let lastItemInReel = reelArray.pop();
    reelArray.unshift(lastItemInReel);

    console.log(reelsContainer[reelId]);
    //update reel object with new data
    reelsContainer[reelId] = reelArray;
    console.log(reelsContainer[reelId]);
    updateReelUI();

    if( getTimeSpentSpinning() < getReelStopTime(reelId)){
        /// continue to spin reel if its not time to stop reel
        createSpinReel(reelArray, reelId);
    }else{
        numOfSpinningReels --;
        if(isLastReel()){
            spinCompletedForAllReels();
        }
    }
}

function updateReelUI(){

    // find slots in each reel roll and update with latest content of reel array
    reelsContainer.forEach(function (reel, index) {
        document.querySelector(`#RSlot${index}0`).src = reel[0].image;
        document.querySelector(`#RSlot${index}1`).src = reel[1].image;
        document.querySelector(`#RSlot${index}2`).src = reel[2].image;
    });

}

function isLastReel(){
    return numOfSpinningReels <= 0;
}

function resetGameArea(){
    spinInProgress = false;
    numOfSpinningReels = 0;
    activeReels = [];
    spinStartTime = new Date();
}

function calculateScore() {

}


function spinCompletedForAllReels() {
    calculateScore();
    resetGameArea();
}

/* setup game area */
spin_btn.addEventListener("click",function(){handleSpinRequest()});
util.setupGameArea();
updateReelUI();
/* hide loading screen */
setTimeout(util.stopLoad, 3000);
