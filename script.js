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

    const timesRun = []; //In order to stop the play() create a new array each time, this needs to be outside the function

    const play = ((item, box) => {
        //Conditional ensures player cannot overwrite a node
        if(box.textContent === "") {
            timesRun.push(null);
            let div = document.createElement("div");
            //console.log(`You clicked box ${item}`);
            if(timesRun.length % 2 == 0) {
                div.appendChild(document.createTextNode(player2.marker));
                box.appendChild(div);
            } else {
                div.appendChild(document.createTextNode(player1.marker));
                box.appendChild(div);
            }
            //console.log(timesRun.length);
        } else {
            //console.log("Nope!");
        }   
    })
    return {createBoard, play}
})();

gameBoard.createBoard();

//This will change!
/* function play(item, box) {
    //Conditional ensures player cannot overwrite a node
    if(box.textContent === "") {
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(player1.marker));
        box.appendChild(div);
        console.log(`You clicked box ${item}`);
        timesRun.push(null);
    } else {
        console.log("Nope!");
    }    
}  */

const player = (name, marker) => {
    const capitalize = () => name.toUpperCase();
    const sayName = () => console.log(`${capitalize()} is playing as '${marker}'!`);
    return {sayName, marker};
}

const player1 = player("Louis", "X");
player1.sayName();

const player2 = player("Rhianna", "O");
player2.sayName();