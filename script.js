//Tic Tac Toe instructions: https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe
let player1;
let player2;

const gameBoard = (() => {
    const gameBoardArr = [];
    const gridContainer = document.querySelector(".game-container");

    const createBoard = () => {
        for(let i = 0; i < 9; i++) {
        let gridItem = document.createElement("div");
        gridItem.onclick = function() {play([i], this)};


        gridItem.classList.add(`item-${i}`);
        gameBoardArr.push(gridItem);
        console.log(gameBoardArr);
        gridContainer.appendChild(gameBoardArr[i]);
        }
    }    

    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //vertical
            [0, 4, 8], [2, 4, 6] //Diagon Alley!
        ];

        for(const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                gameBoardArr[a].textContent !== "" &&
                gameBoardArr[a].textContent === "X" &&
                gameBoardArr[a].textContent === gameBoardArr[b].textContent &&
                gameBoardArr[a].textContent === gameBoardArr[c].textContent
            ) {
                gameBoardArr[a].classList.add("winning-combination");
                gameBoardArr[b].classList.add("winning-combination");
                gameBoardArr[c].classList.add("winning-combination");
                return "x-true";
            } else if(
                gameBoardArr[a].textContent !== "" &&
                gameBoardArr[a].textContent === "O" &&
                gameBoardArr[a].textContent === gameBoardArr[b].textContent &&
                gameBoardArr[a].textContent === gameBoardArr[c].textContent
            ) {
                gameBoardArr[a].classList.add("winning-combination");
                gameBoardArr[b].classList.add("winning-combination");
                gameBoardArr[c].classList.add("winning-combination");
                return "o-true";                
            }
            // const resetBackground = () => {
            //     gameBoardArr[a].classList.remove("winning-combination");
            //     gameBoardArr[b].classList.remove("winning-combination");
            //     gameBoardArr[c].classList.remove("winning-combination");
            // }
        }
        return false;
    }

    const timesRun = []; //In order to stop the play() create a new array each time, this needs to be outside the function

    const play = (item, box) => {
        //Conditional ensures player cannot overwrite a node
        if(box.textContent === "") {
            timesRun.push(null);
            let div = document.createElement("div");
            
            if(timesRun.length % 2 == 0) {
                div.appendChild(document.createTextNode(player2.marker));
                box.appendChild(div);
                console.log(`${player2.name} clicked box ${item}`); //Remove later
            } else { 
                div.appendChild(document.createTextNode(player1.marker));
                box.appendChild(div);
                console.log(`${player1.name} clicked box ${item}`); //Remove later
            }
        }
        
        //When player wins, stop player from selecting
        function stopPlay() {
            gameBoard.gameBoardArr.forEach((gridItem) => {
                gridItem.onclick = null;
            });
        }

        //Return when checkWinner() is true
        if (gameBoard.checkWinner() === "x-true") {
            console.log(`${player1.name} wins!`);
            resultAnounceWin(player1.name);
            stopPlay();
        } else if (gameBoard.checkWinner() === "o-true") {
            console.log(`${player2.name} wins!`);
            resultAnounceWin(player2.name);
            stopPlay();
        } else if (timesRun.length === 9) {
            console.log("Tie!");
            resultAnounceTie();
            stopPlay();
        }
    };

    const playAgain = document.querySelector(".playAgain")
    const resultBox = document.querySelector(".result");
    const resultAnounceWin = (winningPlayer) => {
        resultBox.textContent = `${winningPlayer} wins!`;
        resultBox.style.display = "flex";
        playAgain.style.display = "block";
    };

    const resultAnounceTie = () => {
        resultBox.textContent = "It's a tie!";
        resultBox.style.display = "flex";
        playAgain.style.display = "block";
        gameBoard.gameBoardArr.forEach((gridItem) => {
            gridItem.style.background = "black";
        })
    }

    const restart = () => {
        gameBoard.gameBoardArr.forEach((gridItem) => {
            gridItem.innerHTML = "";
            for(let i = 0; i < 9; i++) {
                gridItem.onclick = function() {play([i], this)};
                gridItem.classList.add(`item-${i}`);
            }
            gridItem.style.background = "none";
        });
        gameBoard.timesRun.length = 0;
        resultBox.style.display = "none";
        playAgain.style.display = "none";
    }

    return {gameBoardArr, createBoard, play, timesRun, checkWinner, restart}
})();

function play() {
    const player1Name = document.getElementById("player1Name").value;
    const player2Name = document.getElementById("player2Name").value;

    player1 = createPlayer(player1Name, "X");
    player2 = createPlayer(player2Name, "O");

    document.querySelector(".play-container").style.display = "none";
    gameBoard.createBoard();
}

const createPlayer = (name, marker) => {
    return {name, marker};
};