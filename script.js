//Tic Tac Toe instructions: https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe

const gameBoard = (() => {
    const gameBoard = []
    const gridContainer = document.querySelector(".game-container");
    const createBoard = () => {
        for(let i = 0; i < 9; i++) {
        let gridItem = document.createElement("div");
        gridItem.onclick = function() {play([i])};
        gameBoard.push(gridItem);
        console.log(gameBoard);
        gridContainer.appendChild(gameBoard[i]);
        }
    }    
    return {createBoard}
})();

gameBoard.createBoard();

//This will change!
function play(item) {
    console.log(`You clicked box ${item}`);
} 

const player = (name, marker) => {
    const capitalize = () => name.toUpperCase();
    const sayName = () => console.log(`${capitalize()} is playing as '${marker}'!`);
    return {sayName};
}

const player1 = player("Louis", "X");
player1.sayName();