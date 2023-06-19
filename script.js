//Tic Tac Toe instructions: https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe

const gameBoard = (() => {
    const gameBoard = [];
    const gridContainer = document.querySelector(".game-container");
    const createBoard = () => {
        for(let i = 0; i < 9; i++) {
        let gridItem = document.createElement("div");
        gridItem.onclick = function() {play([i], this)};
        gameBoard.push(gridItem);
        console.log(gameBoard);
        gridContainer.appendChild(gameBoard[i]);
        }
    }    
    return {createBoard}
})();

gameBoard.createBoard();

//This will change!
function play(item, box) {
    box.innerHTML = `<div>${player1.marker}</div>`
    console.log(`You clicked box ${item}`);
} 

const player = (name, marker) => {
    const capitalize = () => name.toUpperCase();
    const sayName = () => console.log(`${capitalize()} is playing as '${marker}'!`);
    return {sayName, marker};
}

const player1 = player("Louis", "X");
player1.sayName();