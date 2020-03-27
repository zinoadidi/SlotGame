class SlotGameEngine{
    constructor(){
        this.storage = {
            'set': function(name,value){
                this['db'][name] = value;
                sessionStorage.db = JSON.stringify(this['db']);
            },
            'get': function(name){
                this['db'] = JSON.parse(sessionStorage.db);
                return this['db'][name];
            },
            'db': {
                'reelObjects':{},
                'totalReels':0,
                'balance':0
            }
        }
    }

     static config (reelObjects, balance) {
        storageModel.set('balance',balance);
        reelObjects = gameUI.attachReels(reelObjects);
        storageModel.set('reelObjects',reelObjects);

        //this.stopLoad();
    };

    gameUI = {
        attachReels: function(reelObjects){
            // attempt to create reels and symbols
            // attach this bjects to game UI with styles
            try{
                for(var count = 0; count < reelObjects.length; count ++){

                    var reelContainer = document.querySelector("#reel-container");
                    var reelSizeOnPage = Math.round(12/reelObjects.length);
                    if(reelObjects.length > 6) reelSizeOnPage = 1;
                    var reel = document.createElement("DIV");
                    reel.id = 'reel'+count;
                    reel.className = `reel w3-col s${reelSizeOnPage} m${reelSizeOnPage} l${reelSizeOnPage} w3-border-left w3-border-right`;
                    var counter = 0;
                    /// assign symbols to reel
                    while( counter < reelObjects[count].images.length){
                        var reelImage = document.createElement("IMG");
                        reelImage.src = reelObjects[0].images[counter].src;
                        reelImage.className = 'reel-symbol';
                        reel.appendChild(reelImage);
                        counter ++;
                    }
                    // draw reel on UI
                    reelContainer.appendChild(reel);

                    /// attach dom id's to reel object
                    reelObjects[count]['id'] = reel.id;
                }
                return reelObjects;
            }catch(ex){
                console.log(ex);
            }
        }
    };
    createReelObj = function(numOfReels,imagesArray){
        // return reel object in promise
        this.storageModel.set('totalReels',numOfReels);
        return new Promise(function(resolve ,reject){
            let reelObject = [];
            let images = [];
            if(imagesArray && numOfReels>0){
                try{
                    // load images
                    for(let counter =0; counter < imagesArray.length; counter ++){
                        var imageName = imagesArray[counter].split("/");
                        imageName =imageName[imageName.length-1]
                        imageName =imageName.split(".");
                        imageName =imageName[0]
                        images[counter] = {
                            "symbolId": counter,
                            "src": imagesArray[counter],
                            "imageName": imageName
                        }
                    }
                    // create reels object
                    for(let counter =0; counter < numOfReels; counter ++){
                        reelObject[counter] = {"images":""}
                        reelObject[counter].images = images;
                    }

                    resolve(reelObject);
                }catch(ex){
                    reject(Error(ex));
                }
            }else{
                reject(new Error("Kindly provide value for images and number of reels"));
            }
        });
    };

    spinReel = function(reel,index){

        reel = this.storageModel.get('reelObjects');
        // console.log(reel[0].images[0]);

        reel = reel[index];


        let firstElement = reel['images'].shift();
        reel['images'].push(firstElement);

        //removed dom manipulation temorary
        for (let count = 0;count < reel['images'].length; count++){
            let DOMReel = document.querySelector(`#${reel.id}`);
            DOMReel.childNodes[count]['src'] = reel['images'][count].src;
        }
        let reelObjects = this.storageModel.get('reelObjects');
        reelObjects[index] = reel;
        this.storageModel.set('reelObjects',reelObjects);

        // return Promise.resolve(reel);

    };

    deductBalance = function(amountToDeduct){
        var newBalance = parseInt(this.storageModel.get('balance')) - parseInt(amountToDeduct);
        this.storageModel.set('balance',newBalance);
        return newBalance;
    };

    enableInteraction = function(){
        var itemsToDisable = document.querySelectorAll(".interactable");
        itemsToDisable.forEach(function(item) {
            item.classList.remove('visible');
        });
    };

    disableInteraction = function(){
        var itemsToEnable = document.querySelectorAll(".interactable");

        itemsToEnable.forEach(function(item) {
            item.classList.add('visible');
        });
    };

    startLoad = function() {
        var loadingScr = document.querySelector(".loadingbar");
        loadingScr.classList.remove('hidden');
    };

    stopLoad = function(){
        var loadingScr = document.querySelector(".loadingbar");
        loadingScr.classList.add('hidden');
        //show display area for first time
        loadingScr = document.querySelector("#display");
        loadingScr.classList.remove('hidden');
    };

    calculateScore = async function(winningCombinations){
        //removed dom manipulation temorary

        let reels = this.storageModel.get('reelObjects');

        let currentSymbols = {
            'top': [],
            'middle': [],
            'bottom': []
        }

        for(var count =0; count<reels.length; count ++){

            currentSymbols.top.push(reels[count].images[0])
            currentSymbols.middle.push(reels[count].images[1])
            currentSymbols.bottom.push(reels[count].images[2])
        }
        console.dir(currentSymbols);
        var wins = [];

        winningCombinations.forEach( function(value,key){
            var winPosition = value.position;
            if(winPosition.length > 1){

            }else{
                winPosition = winPosition[0]
                console.log(winPosition)
            }
            var count = 0;
            var win = false;
            switch(winPosition){
                case "top":
                    var numPresent = 0;
                    for(count = 0; count < currentSymbols.top.length; count++){
                        console.log(currentSymbols.top[count].imageName+":"+ value.item)
                        if(currentSymbols.top[count].imageName ==  value.item){
                            win = true;
                            numPresent +=1;
                        }else{
                            win = false;
                        }
                    }
                    console.log(win)
                    console.log(numPresent)
                    if(win && (numPresent == value.nOfTimePresent)){
                        wins.push(value);
                        win = false;
                    }
                    break;
                case "center":
                    var numPresent = 0;
                    for(count = 0; count < currentSymbols.middle.length; count++){
                        if(currentSymbols.middle[count].imageName ==  value.item){
                            win = true;
                            numPresent +=1;
                        }else{
                            win = false;
                        }
                    }
                    console.log(win)
                    console.log(numPresent)
                    if(win && (numPresent == value.nOfTimePresent)){
                        wins.push(value);
                        win = false;
                    }
                    break;
                case "bottom":
                    var noPresent = 0;
                    for(count = 0; count < currentSymbols.bottom.length; count++){
                        if(currentSymbols.bottom[count].imageName ==  value.item){
                            win = true;
                            numPresent +=1;
                        }else{
                            win = false;
                        }
                    }
                    console.log(win)
                    console.log(numPresent)
                    if(win && (numPresent == value.nOfTimePresent)){
                        wins.push(value);
                        win = false;
                    }
                    break;
                case "any":
                    break;
                case "other":
                    break;
                default:
                    break;
            }
        });
        console.dir(wins)

        /* for(var counter = 0; counter<winningCombinations.length; counter++){
            console.dir(winningCombinations[counter]);
        } */

        return Promise.resolve(reels);
    };
}


export {SlotGameEngine};
