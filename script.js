//Tic Tac Toe instructions: https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe


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
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for(const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                gameBoardArr[a].textContent !== "" &&
                gameBoardArr[a].textContent === "X" &&
                gameBoardArr[a].textContent === gameBoardArr[b].textContent &&
                gameBoardArr[a].textContent === gameBoardArr[c].textContent
            ) {
                return "x-true";
            } else if(
                gameBoardArr[a].textContent !== "" &&
                gameBoardArr[a].textContent === "O" &&
                gameBoardArr[a].textContent === gameBoardArr[b].textContent &&
                gameBoardArr[a].textContent === gameBoardArr[c].textContent
            ) {
                return "o-true";                
            }
        }

        return false;
    }

    const timesRun = []; //In order to stop the play() create a new array each time, this needs to be outside the function

    const play = ((item, box) => {
        //Conditional ensures player cannot overwrite a node
        if(box.textContent === "") {
            timesRun.push(null);
            let div = document.createElement("div");
            console.log(`You clicked box ${item}`); //Remove later
            if(timesRun.length % 2 == 0) {
                div.appendChild(document.createTextNode(player2.marker));
                box.appendChild(div);
            } else { 
                div.appendChild(document.createTextNode(player1.marker));
                box.appendChild(div);
            }
            //console.log(timesRun.length);
        } else { //Remove later
            console.log("Nope!");
        }   

        if (gameBoard.checkWinner() === "x-true") {
            console.log("X wins!");
        } else if (gameBoard.checkWinner() === "o-true") {
            console.log("O wins!")
        }
    })

    return {gameBoardArr, createBoard, play, timesRun, checkWinner}
})();

function play() {
    document.querySelector(".play-btn").style.display = "none";
    gameBoard.createBoard();
}

const player = (name, marker) => {
    const capitalize = () => name.toUpperCase();
    const sayName = () => console.log(`${capitalize()} is playing as '${marker}'!`);
    return {sayName, marker};
}

const player1 = player("Louis", "X");
player1.sayName();

const player2 = player("Rhianna", "O");
player2.sayName();