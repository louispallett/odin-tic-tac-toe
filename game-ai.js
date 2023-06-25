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
        }
    }

    return {createBoard, gameBoardArr}
})();

const play = (() => {

    const startPlay = () => {
        const player1Name = document.getElementById("player1Name").value;
        const player2Name = document.getElementById("player2Name").value;
        player1 = createPlayer(player1Name, "X");
        player2 = createPlayer(player2Name, "O");
        document.querySelector(".play-container").style.display = "none";
        gameBoard.createBoard();
    };

    const timesRun = [];

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
    }
    return{startPlay, play}
})();

const winner = (() => {
    
    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //vertical
            [0, 4, 8], [2, 4, 6] //Diagon Alley!
        ];

        for(const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                gameBoard.gameBoardArr[a].textContent !== "" &&
                gameBoard.gameBoardArr[a].textContent === "X" &&
                gameBoard.gameBoardArr[a].textContent === gameBoard.gameBoardArr[b].textContent &&
                gameBoard.gameBoardArr[a].textContent === gameBoard.gameBoardArr[c].textContent
            ) {
                gameBoard.gameBoardArr[a].classList.add("winning-combination");
                gameBoard.gameBoardArr[b].classList.add("winning-combination");
                gameBoard.gameBoardArr[c].classList.add("winning-combination");
                return "x-true";
            } else if(
                gameBoard.gameBoardArr[a].textContent !== "" &&
                gameBoard.gameBoardArr[a].textContent === "O" &&
                gameBoard.gameBoardArr[a].textContent === gameBoard.gameBoardArr[b].textContent &&
                gameBoard.gameBoardArr[a].textContent === gameBoard.gameBoardArr[c].textContent
            ) {
                gameBoard.gameBoardArr[a].classList.add("winning-combination");
                gameBoard.gameBoardArr[b].classList.add("winning-combination");
                gameBoard.gameBoardArr[c].classList.add("winning-combination");
                return "o-true";                
            }
        }
        return false;
    }

    const result = () => {
        //Return when checkWinner() is true
        if (checkWinner() === "x-true") {
            console.log(`${player1.name} wins!`);
            // resultAnounceWin(player1.name);
            // stopPlay();
        } else if (checkWinner() === "o-true") {
            console.log(`${player2.name} wins!`);
            // resultAnounceWin(player2.name);
            // stopPlay();
        } else if (timesRun.length === 9) {
            console.log("Tie!");
            // resultAnounceTie();
            // stopPlay();
        }
    }

    return{checkWinner, result}
})();

const createPlayer = (name, marker) => {
    return {name, marker};
};