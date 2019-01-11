document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");
    selectCharacter();
});

var characterArray = [
    {
        name: "Giraffe",
        staticImg: "images/bearStatic.png",
        animatedImg: "images/giraffe.png",
        active: true,
        alive: true,
        scene: [
            {
                name: "sceneOne",
                answered: false,
                backgroundImg: "images/zooLong.jpg",
                question: "Do cats fly?",
                choiceOne: "Yes",
                choiceTwo: "No",
                choiceOneImg: "images/subwayStation.jpg",
                choiceTwoImg: "images/forestBackground.jpg",
                choiceOneResult: "",
                choiceTwoResult: "",
                correct: true,
                incorrectResult: 0,
                userChoice: ""
            },
            {
                name: "sceneTwo",
                answered: false,
                backgroundImg: "images/forkForest.jpg",
                question: "Do dogs run?",
                choiceOne: "Maybe",
                choiceTwo: "IDK",
                choiceOneImg: "images/forkForest.jpg",
                choiceTwoImg: "images/subwayStation.jpg",
                choiceOneResult: "",
                choiceTwoResult: "",
                correct: false,
                incorrectResult: 0,
                userChoice: ""
            },
            {
                name: "sceneThree",
                answered: false,
                backgroundImg: "",
                question: "Do horses fly?",
                choiceOne: "Some Times",
                choiceTwo: "Only Today",
                choiceOneImg: "images/road.png",
                choiceTwoImg: "images/walkingGiraffe.jpg",
                choiceOneResult: "",
                choiceTwoResult: "",
                correct: "Only Today",
                incorrectResult: 1,
                userChoice: ""
            }
        ]
    }
];
var currentCharacter;
var currentScene;
var characterComponent;
var optionOne;
var optionTwo;
var crashPoint;
var background;
var userInput = false;
var snatchRendered = false;
var arrowKeyPressed = false;
var gameText;


//Selecting the chosen character from the array by looping through array until character.active == true
function selectCharacter() {
    for (var i = 0; i < characterArray.length; i++) {
        if (characterArray[i].active === true) {
            currentCharacter = characterArray[i];
            console.log("current character: ", currentCharacter);
            return selectScene();
        }
    }
}

function selectScene() {
    for (var i = 0; i < currentCharacter.scene.length; i++) {
        if (currentCharacter.scene[i].answered === false) {
            currentScene = currentCharacter.scene[i];
            createScene();
            return console.log("current scene: ", currentScene);
        }
    }
}

//This function creates the selected scene... character, background, any components, ect.
function createScene() {
    snatchRendered = false;
    characterComponent = new Component(240, 240, currentCharacter.staticImg, 10, 400, "image");
    optionOne = new Component(1, 500, currentCharacter.staticImg, 1400, 0, "image");
    optionTwo = new Component(1, 1, currentScene.choiceOneImg, 130, 50, "image");
    gameText = new Component("150px", currentScene.question, "black", 280, 40, "text");
    background = new Component(1400, 600, currentScene.backgroundImg, 0, 0, "background");
    gameCanvas.start();
}

//This function creates the bandersnatch screen
function renderSnatch() {
    characterComponent = new Component(0, 0, "images/bearStatic.png", 10, 400, "image");
    background = new Component(1400, 600, "black", 0, 0, "color");
    optionOne = new Component(600, 600, currentScene.choiceOneImg, 100, 50, "image");
    optionTwo = new Component(600, 600, currentScene.choiceTwoImg, 700, 50, "image");
    gameCanvas.start();
}

function userInputValidation() {
    if (userInput == currentScene.correct) {
        currentScene.answered = true;
        console.log("you chose correctly")
        selectScene();
    } else {
        currentScene.answered = false;
        console.log("Wrong Answer!");
        currentScene = currentCharacter.scene[currentScene.incorrectResult];
        createScene();
    }
}

//event key listener
window.addEventListener('keydown', function (e) {
    gameCanvas.key = e.keyCode;
    if (gameCanvas.key == 37 || 38 || 39 || 40) {
        return arrowKeyPressed = true;
    }
})
window.addEventListener('keyup', function (e) {
    gameCanvas.key = false;
    return arrowKeyPressed = false;
})



//This function is called every 20 miliseconds to reflect any component position changes
function upDateCanvas() {
    if (characterComponent.touching(optionOne)) {
        gameCanvas.stop();
        snatchRendered = true;
        return renderSnatch();
    } else {
        gameCanvas.clear();
        if (arrowKeyPressed && gameCanvas.key) {
            background.speedX = -4;
            characterComponent.image.src = currentCharacter.animatedImg;
        } else {
            background.speedX = 0;
            characterComponent.image.src = currentCharacter.staticImg;
        }
        background.newPos();
        background.update();
        characterComponent.speedX = 0;
        characterComponent.speedY = 0;
        if (gameCanvas.key && gameCanvas.key == 37) {characterComponent.speedX = -5}
        if (gameCanvas.key && gameCanvas.key == 39) { characterComponent.speedX = 5; }
        if (gameCanvas.key && gameCanvas.key == 38) { characterComponent.speedY = -5; }
        if (gameCanvas.key && gameCanvas.key == 40) { characterComponent.speedY = 5; }
        if (gameCanvas.key && gameCanvas.key == 16) {
            if (!snatchRendered) {
                console.log("shift key disabled");
                return false;
            } else {
                userInput = false;
                userInputValidation();
            }
        }
        if (gameCanvas.key && gameCanvas.key == 13) {
            if (!snatchRendered) {
                console.log("enter key disabled");
                return false;
            } else {
                userInput = true;
                console.log("userinput: ", userInput);
                console.log("current scene . correct: ", currentScene.correct)
                console.log("enter key selected")
                return userInputValidation();
            }
        };
        characterComponent.newPos();
        characterComponent.update();
        optionOne.newPos();
        optionOne.update();
        optionTwo.newPos();
        optionTwo.update();
        gameText.update();
    }
}

//Making Canvas Here
var gameCanvas = {
    // The HTML <canvas> element is used to draw graphics on a web page.
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 1400;
        this.canvas.height = 600;
        // The getContext() method returns an object that provides methods and properties for drawing on the canvas.
        // This reference will cover the properties and methods of the getContext("2d") object, which can be used to draw text, lines, boxes, circles, and more - on the canvas.
        this.context = this.canvas.getContext("2d");
        // The insertBefore() method inserts a node as a child, right before an existing child, which you specify.
        document.getElementById("canvas").insertBefore(this.canvas, document.getElementById("canvas").childNodes[0]);
        //Interval to refresh canvas
        this.interval = setInterval(upDateCanvas, 20);
    },
    clear: function () {
        // The clearRect() method clears the specified pixels within a given rectangle.
        // context.clearRect(x,y,width,height);

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
};

//Component Constructor Here
function Component(width, height, color, x, y, type) {
    //Creates initial characters, backgrounds, components

    this.type = type;
    if (type == "image" || type == "background") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;

    //Updates the component to reflect any X or Y position changes
    this.update = function () {
        //Draws component images to the blank canvas
        ctx = gameCanvas.context;
        if (type == "image" || type == "background") {
            ctx.drawImage(
                this.image,
                this.x,
                this.y,
                this.width,
                this.height
            );
            if (type == "background") {
                ctx.drawImage(this.image,
                    this.x + this.width,
                    this.y,
                    this.width, this.height);
            }
        } else if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.height, this.x, this.y);
          } else {
            //Creates solid color background
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    //This detects if any components are touching, if they are the reaction is declared in the "upDateGame" function
    this.touching = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var areTouching = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            areTouching = false;
        }
        return areTouching;
    }
    //this assigns new X/Y cordinates to the component reflecting any changes made by arrow key
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        //creates loop for background
        if (this.type == "background") {
            if (this.x == -(this.width)) {
                this.x = 0;
            }
        }
    }
}

