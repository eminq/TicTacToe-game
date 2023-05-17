let gameEnded = false;
let currPlayer = "X";
let lastPlayer = "X";

let msg = document.getElementById('msg');
let playerX = document.getElementById('playerX');
let playerO = document.getElementById('playerO');
let tie = document.getElementById('tie');

let resetBtn = document.getElementById('reset-btn');


let plyXScore = 0;
let plyOScore = 0;
let tieScore = 0;

const winPositions = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [3,5,7],
    [1,5,9]
]

function reset() {
    if(lastPlayer === "X"){
        currPlayer = "O";
        lastPlayer = "O";
    }else {
        currPlayer = "X";
        lastPlayer = "X";
    }
    for (let i = 1; i <= 9; i++) {
        document.getElementById(i.toString()).innerHTML = "";
        document.getElementById(i.toString()).classList.remove("X");
        document.getElementById(i.toString()).classList.remove("O");
        gameEnded = false;
        msg.innerHTML = '';
    }
}

function checkScore() {
    for(let j=0; j<winPositions.length; j++){
        if( document.getElementById(winPositions[j][0]).innerHTML === currPlayer &&
            document.getElementById(winPositions[j][1]).innerHTML === currPlayer &&
            document.getElementById(winPositions[j][2]).innerHTML === currPlayer
        ) {
            msg.innerHTML = `Player ${currPlayer} is the Winner!`;
            if(currPlayer === "X"){
                plyXScore += 1;
                playerX.innerHTML = plyXScore.toString();
            }else{
                plyOScore += 1;
                playerO.innerHTML = plyOScore.toString();
            }
            gameEnded = true;
            setTimeout(() => {
                reset()
            }, 3000);
            return true;
        }
    }
    return false;
}


function checkEnd() {
    let end = true;
    for(let i=1; i<=9; i++){
        if(document.getElementById(i.toString()).innerHTML === ""){
            end = false;
            break;
        }
    }
    if(end === true) {
        msg.innerHTML = `Tie! Nobody won this round!`;
        tieScore += 1;
        tie.innerHTML = tieScore.toString();
        gameEnded = true;
        setTimeout(() => {
            reset()
        }, 3000);
    } 
    
}


function startGame() {
    playerX.innerHTML = plyXScore;
    playerO.innerHTML = plyOScore;
    tie.innerHTML = tieScore;
    resetBtn.addEventListener('click', function() {
        reset();
        plyXScore = 0;
        plyOScore = 0;
        tieScore = 0;

        lastPlayer = "X";
        currPlayer = "X";

        playerX.innerHTML = "0";
        playerO.innerHTML = "0";
        tie.innerHTML = "0";
    })
    for (let i=1; i<=9; i++){
        document.getElementById(i.toString()).addEventListener('click', function() {
            if(this.innerHTML === "" && gameEnded === false){
                this.innerHTML = currPlayer;
                this.classList.add(currPlayer);
                if(!checkScore()){
                    checkEnd();
                }
                if(currPlayer === "X") {
                    currPlayer = "O"
                } else {
                    currPlayer = "X";
                }
                
            }
        })
    }
    
} 

startGame();