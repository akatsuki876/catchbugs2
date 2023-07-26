let currbugTile;
let currmalTile;
let score = 0;
let start = false;
let bugInterval;
let malInterval;
let bugClicked = false;
let shieldDelay = 600; //in miliseconds

window.onload = function() {
    setGame();
    const startButton = document.getElementById("startButton");
    const stopButton = document.getElementById("stopButton");

    startButton.addEventListener("click", startGame);
    stopButton.addEventListener("click", stopGame);
}

function setGame() {
    //set up the grid in html
    for (let i = 0; i < 9; i++) { //i goes from 0 to 8, stops at 9
        //<div id="0-8"></div>
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    //setInterval(setMole, 1000); // 1000 miliseconds = 1 second, every 1 second call setMole
    //setInterval(setPlant, 2000); // 2000 miliseconds = 2 seconds, every 2 second call setPlant
}

function startGame() {
    if (!start) {
        score = 0;
        start = true;
        document.getElementById("score").innerText = "Score: " + score.toString();
        bugInterval = setInterval(setbug, 800);
        malInterval = setInterval(setdanger, 1600);
    }
}

function stopGame() {
    start = false;
    clearInterval(bugInterval);
    clearInterval(malInterval);
    currbugTile?.removeChild(currbugTile.firstChild);
    currmalTile?.removeChild(currmalTile.firstChild);
    document.getElementById("score").innerText = "GAME OVER: " + score.toString();
}

function getRandomTile() {
    //math.random --> 0-1 --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setbug() {
    if (!start) {
        return;
    }

    if (currbugTile) {
        currbugTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "bug.png";

    let num = getRandomTile();

    if (currmalTile && currmalTile.id == num) {
        return;
    }
    currbugTile = document.getElementById(num);
    currbugTile.appendChild(mole);

    bugClicked = false;
    mole.addEventListener("click", shieldBug);
}

function setdanger() {
    if (!start) {
        return;
    }

    if (currmalTile) {
        currmalTile.innerHTML = "";
    }

    let plant = document.createElement("img");
    plant.src = "dangerbug.png";

    let num = getRandomTile();
    if (currbugTile && currbugTile.id == num) {
        return;
    }

    currmalTile = document.getElementById(num);
    currmalTile.appendChild(plant);
}

function shieldBug(event) {
    if (!start) {
        return;
    }

    if (event.target === this) {
        // Show shield icon temporarily
        this.src = "shield.png";

        score += 10;
        document.getElementById("score").innerText = "Score: " + score.toString();

        // After a short delay, restore the bug image
        setTimeout(() => {
            this.src = "bug.png";
        }, shieldDelay);
    }
}


function selectTile() {
    if (!start) {
        return;
    }
    
    else if (this == currmalTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString(); //update score html
        stopGame();
    }
}