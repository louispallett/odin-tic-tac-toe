const gameBoard = (() => {
    const gameBoardArr = [];
    const gridContainer = document.querySelector(".game-container");

    const createBoard = () => {
        for(let i = 0; i < 9; i++) {
            let gridItem = document.createElement("div");
            gridItem.onclick = function() {play.play([i], this)};
            gridItem.classList.add(`item-${i}`);
            gameBoardArr.push(gridItem);
            gridContainer.appendChild(gameBoardArr[i]);
            gridContainer.style.display = "inline-grid";
        }
    };

    const stopPlay = () => {
        gameBoardArr.forEach((gridItem) => {
            gridItem.onclick = null;
        })
    }

    return {createBoard, gameBoardArr, stopPlay}
})();

const play = (() => {

    const twoPlayerPlay = () => {
        const player1Name = document.getElementById("player1Name").value;
        const player2Name = document.getElementById("player2Name").value;
        player1 = createPlayer(player1Name, "X");
        player2 = createPlayer(player2Name, "O");
        document.querySelector(".play-container").style.display = "none";
        gameBoard.createBoard();
    };

    const onePlayerPlay = () => {
        const playerName = document.getElementById("playerName").value;
        player1 = createPlayer("The Computer", "X");
        player2 = createPlayer(playerName, "O");
        document.querySelector(".play-container").style.display = "none";
        gameBoard.createBoard();
    }

    const timesRun = [];

    const play = (item, box) => {
        //Conditional ensures player cannot overwrite a node
        if(box.textContent === "") {
            timesRun.push(null);
            let div = document.createElement("div");
            
            if(timesRun.length % 2 == 0) {
                div.appendChild(document.createTextNode(player2.marker));
                box.appendChild(div);
            } else { 
                div.appendChild(document.createTextNode(player1.marker));
                box.appendChild(div);
            }
            winner.checkWinner();
        }
    }
    return{onePlayerPlay, twoPlayerPlay, play, timesRun}
})();

const winner = (() => {
    
    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //vertical
            [0, 4, 8], [2, 4, 6] //Diagon Alley!
        ];

        const colourWin = (indices) => {
            indices.forEach(index => {gameBoard.gameBoardArr[index].setAttribute("id", "winning-combination");});
        };

        for(const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                gameBoard.gameBoardArr[a].textContent !== "" &&
                gameBoard.gameBoardArr[a].textContent === "X" &&
                gameBoard.gameBoardArr[a].textContent === gameBoard.gameBoardArr[b].textContent &&
                gameBoard.gameBoardArr[a].textContent === gameBoard.gameBoardArr[c].textContent
            ) {
                const indices = [a, b, c];
                colourWin(indices);
                return result.returnResult("x-true"); 
            } else if(
                gameBoard.gameBoardArr[a].textContent !== "" &&
                gameBoard.gameBoardArr[a].textContent === "O" &&
                gameBoard.gameBoardArr[a].textContent === gameBoard.gameBoardArr[b].textContent &&
                gameBoard.gameBoardArr[a].textContent === gameBoard.gameBoardArr[c].textContent
            ) {
                const indices = [a, b, c];
                colourWin(indices);
                return result.returnResult("o-true");                
            } else if (play.timesRun.length == 9) {
                return result.returnResult("tie");
            }
        }
        return false;
    }

    return{checkWinner}
})();

const result = (() => {
    
    const returnResult = (winStatus) => {
        if(winStatus === "x-true") {
            win(player1.name);
            gameBoard.stopPlay();
        } else if (winStatus === "o-true") {
            win(player2.name);
            gameBoard.stopPlay();
        } 
        if (winStatus === "tie") {
            tie();
            gameBoard.stopPlay();
        }
    }

    const playAgainBtn = document.querySelector(".playAgain")
    const resultBox = document.querySelector(".result");

    const win = (player) => {
        resultBox.textContent = `${player} wins!`;
        resultBox.style.display = "flex";
        playAgainBtn.style.display = "block";
    }

    const tie = () => {
        resultBox.textContent = "It's a tie!";
        resultBox.style.display = "flex";
        playAgainBtn.style.display = "block";
    }

    const playAgain = () => {
        gameBoard.gameBoardArr.forEach((gridItem) => {
            gridItem.innerHTML = "";
            for(let i = 0; i < 9; i++) {
                gridItem.onclick = function() {play.play([i], this)};
                gridItem.classList.add(`item-${i}`);
            }
            gridItem.removeAttribute("id", "winning-combination");
        });
        play.timesRun.length = 0;
        resultBox.style.display = "none";
        playAgainBtn.style.display = "none";
    }

    return{returnResult, playAgain}
})();

const createPlayer = (name, marker) => {
    return {name, marker};
};