
export function stopLoad (){
    var loadingScr = document.querySelector(".loadingbar");
    loadingScr.classList.add('hidden');
    //show display area for first time
    loadingScr = document.querySelector("#display");
    loadingScr.classList.remove('hidden');
}

export function setupGameArea(){
    const game_mode_btn = document.querySelector("#game_mode_btn");
    const close_debug_area= document.querySelector("#close_debug_area");
    const switchGameModeRandom= document.querySelector("#switchGameModeRandom");
    const switchGameModeFixed= document.querySelector("#switchGameModeFixed");

    game_mode_btn.addEventListener(
        "click",
        function(){
            document.querySelector("#debug_area").classList.add('visible');

            if(game.mode == 'random'){
                //switchGameModeRandom.click();
            }else{
                //switchGameModeFixed.click();
            }
        }
    )

    close_debug_area.addEventListener(
        "click",
        function(){
            // call spin reel function on each reel
            document.querySelector("#debug_area").classList.remove('visible');
        }
    )

    switchGameModeFixed.addEventListener(
        "click",
        function(){
            document.querySelector("#gameSetToFixedMode").classList.add('visible');
            document.querySelector("#gameSetToRandomMode").classList.remove('visible');
        }
    )
    switchGameModeRandom.addEventListener(
        "click",
        function(){
            document.querySelector("#gameSetToRandomMode").classList.add('visible');
            document.querySelector("#gameSetToFixedMode").classList.remove('visible');
        }
    )

}
