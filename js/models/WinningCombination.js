import {stringIsEqual} from "../controllers/Util.js";

export let WinningCombinationList = [
    {
        "symbol":["CHERRY"],
        "nOfTimePresent":"3",
        "position":"top",
        "score": 2000
    },
    {
        "symbol":["CHERRY"],
        "nOfTimePresent":"3",
        "position":"center",
        "score": 1000
    },
    {
        "symbol":["CHERRY"],
        "nOfTimePresent":"3",
        "position":"bottom",
        "score": 4000
    },
    {
        "symbol":["7"],
        "nOfTimePresent":"3",
        "position":"any",
        "score": 150
    },
    {
        "symbol":["cherry","7"],
        "nOfTimePresent":"any",
        "position":"any",
        "score": 75
    },
    {
        "symbol":["3xBAR"],
        "nOfTimePresent":"3",
        "position":"any",
        "score": 50
    },
    {
        "symbol":["2xBAR"],
        "nOfTimePresent":"3",
        "position":"any",
        "score": 20
    },
    {
        "symbol":["3xBAR","BAR","2xBAR"],
        "nOfTimePresent":"any",
        "position":"any",
        "score": 5
    }
];
export function checkCombination(firstSymbol, secondSymbol, thirdSymbol){
    let isWinningCombination = false;

    for (const [index,combination] of WinningCombinationList.entries()) {
        if(combination.nOfTimePresent === "3"){
            let matchingElements = 0;
             if (stringIsEqual(combination.symbol[0], firstSymbol)) matchingElements ++;
             if (stringIsEqual(combination.symbol[0], secondSymbol)) matchingElements ++;
             if (stringIsEqual(combination.symbol[0], thirdSymbol)) matchingElements ++;

            isWinningCombination = matchingElements >= 3;
        }else{
            let matchingElements = 0;
            combination.symbol.forEach(function (symbolName) {
                if (stringIsEqual(symbolName, firstSymbol) ||
                    stringIsEqual(symbolName, secondSymbol) ||
                    stringIsEqual(symbolName, thirdSymbol)
                ) matchingElements++;
            });
            isWinningCombination = matchingElements >= 3;
        }

        if(isWinningCombination){
            return {
                isWinningCombination: isWinningCombination,
                index:index,
                ...combination
            };
        }
    }

    return {
        isWinningCombination:isWinningCombination,
        score:0
    }
}
