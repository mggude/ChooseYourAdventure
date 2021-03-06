document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");
        setLocalStoarge();
});

var characterArray = [
    {
        name: "Giraffe",
        unlocked: true,
        active: false,
        staticImg: "./assets/images/characters/animated/animated_giraffe.png",
        animatedImg: "./assets/images/characters/animated/animated_giraffe.png",
        cagedImg: "./assets/images/characters/caged/caged.png",
        question: "It’s a normal day at the Zoo… that is, until closing time. Head Zoo-Keeper William Montague forgets to lock your cage for the night! With mixed feelings, you’re faced with a tough decision: live a meaningless existence in the zoo, or risk it all and escape?",
    },
    {
        name: "Bear",
        unlocked: false,
        active: false,
        staticImg: "./assets/images/characters/animated/animated_giraffe.png",
        animatedImg: "./assets/images/characters/animated/animated_giraffe.png",
        cagedImg: "./assets/images/characters/caged/caged_bear.png",
        scene: [
        ]
    }
];

var charactersUnlocked = 0;
var currentCharacter;
var currentSceneId;
var imgId = 0;
var modalRendered = false;

function setLocalStoarge() {
    console.log("Set Local Storage Called")
    localStorage.clear();
    localStorage.setItem("charactersUnlocked", 0);
    localStorage.setItem("currentCharacter", 0);
    localStorage.setItem("currentSceneId", 0);
    localStorage.setItem("score", 0);
    renderCharacterImages();
}

function Img(width, height, source) {
    this.image = new Image(width, height);
    this.image.src = source;
    this.image.setAttribute("id", imgId);
    this.image.setAttribute("class", "characterImg")
    this.image.setAttribute("style", "margin-left: 150px; margin-right: 150px; margin-top: 50px;")
    document.getElementById("images").appendChild(this.image);
}

function renderCharacterImages() {
    for (var i=0; i<characterArray.length; i++) {
        imgId = i;
        var imgSource = "";
        if (i <= charactersUnlocked) {
            imgSource = characterArray[i].staticImg
        } else {
            imgSource = characterArray[i].cagedImg
        }
        characterImg = new Img(200, 400, imgSource)
    }
}

document.addEventListener("click", function(value) {
    console.log("img id: ", value.target.id);
    if (!modalRendered) {
        if (value.target.id <= charactersUnlocked) {
            currentCharacter = characterArray[value.target.id];
            localStorage.setItem("currentCharacter", value.target.id);
            modalRendered = true;
            document.getElementById("id01").style.display="block";
            // console.log(currentCharacter.question);
            var characterName = document.createTextNode(currentCharacter.name)
            var question = document.createTextNode(currentCharacter.question);
            // document.getElementById("modalHeader").appendChild(characterName);
            // return document.getElementById("modalBody").appendChild(question);
            return location.replace("../bandersnatch.html")

       } else {
           return alert("This character is locked, please select an unlocked character to play the game.");
       }
    }
})

document.getElementById("continue").addEventListener("click", function() {
    return location.replace("../bandersnatch.html")
})