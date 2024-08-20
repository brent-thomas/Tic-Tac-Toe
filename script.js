const gameBoard = document.getElementById('gameboard')
const infoDisplay = document.getElementById('info')
const startCells = [
    "","","",
    "","","",
    "","",""
]

const handleTurns = (currentPlayer) => {
    const o_turn = document.getElementById('o_turn')
    const x_turn = document.getElementById('x_turn')
    if (currentPlayer === 'circle'){
        o_turn.classList.add('active')
        x_turn.classList.remove('active')
    } else if(currentPlayer === 'cross'){
        x_turn.classList.add('active')
        o_turn.classList.remove('active')
    }
}

const resetBoard = () => {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach(square => {
        square.innerHTML = ""; 
        square.addEventListener('click', addGo); 
    });

    // Reset the game state
    go = "circle";
    handleTurns(go);
    infoDisplay.textContent = "Circle goes first";
};

const endGame = (result) => {
    const endScreen = document.getElementById('endScreen')
    //clearing any previous end screen state
    endScreen.innerHTML = ""; 
    const resultText = document.createElement("h1")
    const startOverButton = document.createElement("button")
    startOverButton.setAttribute("type", "button")
    startOverButton.innerText = "Play again"
    startOverButton.id = "endButton"
    startOverButton.addEventListener("click", ()=>{
        resetBoard()
        startScreen.style.setProperty("display", 'flex')
        endScreen.style.setProperty('display', 'none' )
    })
    resultText.innerText = result
    endScreen.append(resultText)
    endScreen.append(startOverButton)
    endScreen.style.setProperty('display','flex')
}


let go = "circle"
handleTurns(go)
infoDisplay.textContent = "Circle goes first"

const createBoard = () => {
    startCells.forEach((cell,index)=>{
        const cellDiv = document.createElement("div")
        cellDiv.classList.add("square")
        cellDiv.id = index
        cellDiv.addEventListener('click', addGo)
        gameBoard.append(cellDiv)
    })
}

const addGo = (e) => {
    const goDisplay = document.createElement("div")
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === "circle" ? "cross" : "circle"
    infoDisplay.textContent = "It is now " + go + "'s go!"
    e.target.removeEventListener("click", addGo)
    checkScore()
}

const checkScore = () => {
    handleTurns(go)
    const allSquares = document.querySelectorAll(".square")
    const winningCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    let circleWins = false;
    let crossWins = false;
    //check for circle wins
    winningCombos.forEach(array => {
        circleWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains("circle"))
        if(circleWins){
            allSquares.forEach(square => {
                square.replaceWith(square.cloneNode(true))
            })
            endGame('Circle Wins!')
        }
    })

    //check for cross wins
    winningCombos.forEach(array => {
        crossWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains("cross"))
        if(crossWins){
            allSquares.forEach(square => {
                square.replaceWith(square.cloneNode(true))
            })
         endGame('Cross Wins!')
        }
    })

    //check for tie
    if (!circleWins && !crossWins) {
        const allFilled = Array.from(allSquares).every(square => square.firstChild);
        if (allFilled) {
            endGame("It's a tie!")
            allSquares.forEach(square => {
                square.replaceWith(square.cloneNode(true));
            });
        }
    }

   
}

createBoard()



const startButton = document.getElementById('startButton')
const startScreen = document.getElementById('startScreen')
startButton.addEventListener('click', ()=>{
    startScreen.style.setProperty("display", "none")
})


