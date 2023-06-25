const gameBoard = (() => {
    const gameBoardArr = [];
    const gridContainer = document.querySelector(".game-container");

    const createBoard = () => {
        for(let i = 0; i < 9; i++) {
            let gridItem = document.createElement("div");
            gridItem.onclick = function() {play.play([i]), this};
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
        // if(box.textContent === "") {
        //     timesRun.push(null);
        //     let div = document.createElement("div");
            
        //     if(timesRun.length % 2 == 0) {
        //         div.appendChild(document.createTextNode(player2.marker));
        //         box.appendChild(div);
        //         console.log(`${player2.name} clicked box ${item}`); //Remove later
        //     } else { 
        //         div.appendChild(document.createTextNode(player1.marker));
        //         box.appendChild(div);
        //         console.log(`${player1.name} clicked box ${item}`); //Remove later
        //     }
        // }
        console.log(this);
    }

    return{startPlay, play}
})();



const createPlayer = (name, marker) => {
    return {name, marker};
};