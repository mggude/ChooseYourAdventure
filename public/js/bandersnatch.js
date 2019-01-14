var currentCharacter;
var intervalId;
var questionTimer = 10;
var score = 0;

function gameTimer () {
    questionTimer = 10;
    startProgressBar ()
    intervalId = setInterval (decrement, 1000);
    document.getElementById("timerCountdownText").innerHTML = questionTimer;
    function decrement () {
        questionTimer--;
        document.getElementById("timerCountdownText").innerHTML = questionTimer;
        startProgressBar ()
        if (questionTimer ===0) {
            clearInterval(intervalId);
        }
    }
}

function startProgressBar () {
    progress(questionTimer, $("#timerCountdownBarRight"));
    progress(questionTimer, $("#timerCountdownBarLeft"));
}

function progress(percent, element) {
    var progressBarWidth = percent * element.width() / 10;
    element.find('div').animate({ width: progressBarWidth }, 1000);
}

function optionsSelection () {
    
}

function score () {
    console.log("points beginning: " + score);
    score = parseInt(score + (100 * questionTimer));
    document.getElementById("scoreDisplay").textContent = score;
    console.log("updated points: " + score);
    // how to update score to app.js global variable?
}

function Character() {
    for (var i = 0; i < characterArray.length; i++) {
        if (characterArray[i].active === true) {
            currentCharacter = characterArray[i];
            console.log("current character: ", currentCharacter);
        }
    }
}        

function selectScene() {
    for (var i = 0; i < currentCharacter.scene.length; i++) {
        if (currentCharacter.scene[i].answered === false) {
            currentScene = currentCharacter.scene[i];
            // createScene();
            return console.log("current scene: ", currentScene);
        }
    }
}

// Decide on current question
// pull text and images from app.js
// use left/right keys to select choice (onDownKey?) --> build validation
// load next canvas
gameTimer();