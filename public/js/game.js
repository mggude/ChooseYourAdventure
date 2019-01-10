document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");
    startGame();
});


var myGamePiece;
var optionOne;
var optionTwo;
var myBackground;

function startGame() {
    myGamePiece = new component(240, 240, "images/bearStatic.png", 10, 400, "image");
    optionOne  = new component(1, 500, "images/giraffe.png", 1400, 0, "image");    
    myBackground = new component(1400, 600, "images/zooLong.jpg", 0, 0, "background");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1400;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
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
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        if (type == "background") {
            ctx.drawImage(this.image, 
                this.x + this.width, 
                this.y,
                this.width, this.height);
        }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.type == "background") {
            if (this.x == -(this.width)) {
                this.x = 0;
            }
        }
    }    
}

function updateGameArea() {
    if (myGamePiece.crashWith(optionOne)) {
        myGameArea.stop();
        return renderSnatch();
    } else {
        myGameArea.clear();
        if (myGameArea.key) {
            myBackground.speedX = -4;
            myGamePiece.image.src = "images/giraffe.png";
        } else {
            myBackground.speedX = 0;
            myGamePiece.image.src = "images/bearStatic.png";
        }
        myBackground.newPos();    
        myBackground.update();
        myGamePiece.speedX = 0;
        myGamePiece.speedY = 0;    
        if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -5; }
        if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 5; }
        if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -5; }
        if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 5; }
        myGamePiece.newPos();    
        myGamePiece.update();
    }
}

function renderSnatch() {
    // return alert ("render snatch calleld");
    myGamePiece = new component(240, 240, "images/bearStatic.png", 10, 400, "image");

    myBackground = new component(1400, 600, "black", 0, 0, "color");
    myGameArea.start();
}