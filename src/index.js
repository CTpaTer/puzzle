let size = 4;
let numberOfTiles = Math.pow(size, 2);
let highlighted = numberOfTiles;
let shuffled = false;
let count = 0;
let soundOn = true;

createNewDiv('topButtons');
createNewDiv('timer');
createNewDiv('tiles');
createNewDiv('frameSize');
createNewDiv('bottomButtons');

let topButtons = ['Shuffle and start', 'Sound', 'Save', 'Results'];
let bottomButtons =['3x3', '4x4', '5x5', '6x6', '7x7', '8x8'];

let buttonContainer = document.getElementById('tiles');
let timerContainer = document.getElementById('timer');
let topButtonContainer = document.getElementById('topButtons');
let bottomButtonContainer = document.getElementById('bottomButtons');

function createTopButtons() {
    for(button of topButtons) {
        let newTopButton = document.createElement('button');
        newTopButton.id = button;
        newTopButton.innerHTML = button;
        newTopButton.classList.add('topBtn');
        topButtonContainer.append(newTopButton);
    }
}

createTopButtons();

newGame();

function newGame() {
    loadTiles(size);
    setTimeout(() => {
        shuffle();
    }, 10);
}

// Create buttons
function loadTiles(n) {
    for (let b = 1; b <= numberOfTiles; b++) {
        let newTile = document.createElement('button');
        newTile.id = `btn${b}`;
        newTile.setAttribute('index', b);
        newTile.innerHTML = b;
        newTile.classList.add('btn');
        newTile.addEventListener('click', function () {
            swap(parseInt(this.getAttribute('index')));
            count += 1;
            if(soundOn) {
                audioClick();
            }
        });
        buttonContainer.append(newTile);
    }
    selectedTileId = 'btn' + highlighted;
    selectedTile = document.getElementById(selectedTileId);
    selectedTile.classList.add("selected");
}

function shuffle() {
    let minShuffles = 100;
    let totalShuffles = 0;
    if(size <=5) {
        totalShuffles = minShuffles + Math.floor(Math.random() * (200 - 100) + 100);
    } else {
        totalShuffles = minShuffles + Math.floor(Math.random() * (200 - 100) + 200);
    }
    for (let i = minShuffles; i <= totalShuffles; i++) {
        setTimeout(function timer() {
            let x = Math.floor(Math.random() * 4);
            let direction = 0;
            if (x == 0) {
                direction = highlighted + 1;
            } else if (x == 1) {
                direction = highlighted - 1;
            } else if (x == 2) {
                direction = highlighted + size;
            } else if (x == 3) {
                direction = highlighted - size;
            }
            swap(direction);
            if (i >= totalShuffles - 1) {
                shuffled = true;
            }
        }, i * 10);
    }
}

// Swap tiles 
function swap(clicked) {
    if (clicked < 1 || clicked > (numberOfTiles)) {
        return;
    }

    // Check if we are trying to swap right
    if (clicked == highlighted + 1) {
        if (clicked % size != 1) {
            setSelected(clicked);
        }
        // Check if we are trying to swap left
    } else if (clicked == highlighted - 1) {
        if (clicked % size != 0) {
            setSelected(clicked);
        }
        // Check if we are trying to swap up
    } else if (clicked == highlighted + size) {
        setSelected(clicked);
        // Check if we are trying to swap down 
    } else if (clicked == highlighted - size) {
        setSelected(clicked);
    }

    if (shuffled) {
        if(count > 1) {
            if (checkHasWon()) {
                alert(`"Hooray! You solved the puzzle in ${timeCount} and ${count} moves!"`);
                restartGame();
            }
        }
    }
}

function checkHasWon() {
    for (let b = 1; b <= numberOfTiles; b++) {
        currentTile = document.getElementById(`btn${b}`);
        currentTileIndex = currentTile.getAttribute('index');
        currentTileValue = currentTile.innerHTML;
        if (parseInt(currentTileIndex) != parseInt(currentTileValue)) {
            return false;
        }
    }
    return true;
}

// Applies stylings to the selected tile
function setSelected(index) {
    currentTile = document.getElementById(`btn${highlighted}`);
    currentTileText = currentTile.innerHTML;
    currentTile.classList.remove('selected');
    newTile = document.getElementById(`btn${index}`);
    currentTile.innerHTML = newTile.innerHTML;
    newTile.innerHTML = currentTileText;
    newTile.classList.add("selected");
    highlighted = index;
}


const frameSizeDiv = document.getElementById('frameSize');
frameSizeDiv.innerHTML = `Frame size: ${size}x${size}`;

function createBottomButtons() {
    for(button of bottomButtons) {
        let newBottomButton = document.createElement('button');
        newBottomButton.id = button;
        newBottomButton.innerHTML = button;
        newBottomButton.classList.add('bottomBtn');
        bottomButtonContainer.append(newBottomButton);
    }
}

createBottomButtons();

function createNewDiv(id) {
    let elem = {};
    elem = document.createElement("div");
    elem.id = id;
    document.body.append(elem);
}

let clickTopButtonStart = document.getElementById("Shuffle and start");
clickTopButtonStart.addEventListener("click", () => {
    shuffle();
    restartTimer();
}, false);

function changeSizeGame (sizeGame) {
    size = sizeGame;
    numberOfTiles = Math.pow(size, 2);
    highlighted = numberOfTiles;
    buttonContainer.innerHTML = '';
    count = 0;
    newGame();
    let setTilesWidth = `${size * 50}px`;
    buttonContainer.style.maxWidth = setTilesWidth;
    let setBtnWidth = `${Math.floor(100 / size)}%`;
    let elBtn = document.querySelectorAll('.btn');
    for(el of elBtn) {
        el.style.width = setBtnWidth;
    }

    frameSizeDiv.innerHTML = `Frame size: ${size}x${size}`;

    restartTimer();
}

let clickBottom3x3 = document.getElementById('3x3');
clickBottom3x3.addEventListener("click", function(){changeSizeGame(3)}, false);
let clickBottom4x4 = document.getElementById('4x4');
clickBottom4x4.addEventListener("click", function(){changeSizeGame(4)}, false);
let clickBottom5x5 = document.getElementById('5x5');
clickBottom5x5.addEventListener("click", function(){changeSizeGame(5)}, false);
let clickBottom6x6 = document.getElementById('6x6');
clickBottom6x6.addEventListener("click", function(){changeSizeGame(6)}, false);
let clickBottom7x7 = document.getElementById('7x7');
clickBottom7x7.addEventListener("click", function(){changeSizeGame(7)}, false);
let clickBottom8x8 = document.getElementById('8x8');
clickBottom8x8.addEventListener("click", function(){changeSizeGame(8)}, false);

// timer //
let timer1;
let timeCount = "";
function startTimer() {
	timer1 = setInterval(() => {
		let seconds = timer1 % 60;
		let minutes = timer1 / 60 % 60;
        if(seconds < 10 && minutes < 10) {
            timeCount = `0${Math.trunc(minutes)}:0${Math.trunc(seconds)}`
        } else if(seconds >= 10 && minutes < 10) {
            timeCount = `0${Math.trunc(minutes)}:${Math.trunc(seconds)}`
        } else {
            timeCount = `${Math.trunc(minutes)}:${Math.trunc(seconds)}`
        }
		timerContainer.innerHTML = `
        <span class='countTimer'>Count: ${count}</span>
        <span class='countTimer'>Time: ${timeCount}</span>`;
		timer1 += 1;
	}, 1000);
}

startTimer();

function restartTimer() {
    timer1 = 0;
    count = 0;
}

function stopTimer() {
    clearInterval(timer1);
}

function restartGame() {
    //buttonContainer.innerHTML = '';
    timer1 = 0;
    shuffle();
    count = -1;
}

let clickTopButtonSound = document.getElementById("Sound");
clickTopButtonSound.addEventListener("click", () => {
    if(soundOn) {
        soundOn = false;
        clickTopButtonSound.style.backgroundColor = '#656565';
    } else if(!soundOn) {
        soundOn = true;
        clickTopButtonSound.style.backgroundColor = '#06877a';
    }
}, false);

function audioClick() {
    const audio = new Audio();
    audio.src = './click.mp3';
    audio.autoplay = true;
}