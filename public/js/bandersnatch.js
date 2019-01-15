var intervalId;
var questionTimer = 10;
var score = parseInt(window.localStorage.getItem("score"));
var currentScene;
var currentCharacterValue;
var userInput;
var userChoiceText;

function determineScene () {
    currentScene = window.localStorage.getItem("currentSceneId");
    currentCharacterValue = localStorage.getItem("currentCharacter");
    console.log("currentSceneId: " + currentScene + " | currentCharacter: "+ currentCharacterValue );
    Character();
    selectScene();

}

function selectScene() {
    for (var i = 0; i < currentCharacter.scene.length; i++) {
        if (currentCharacter.scene[i].answered === false) {
            currentScene = currentCharacter.scene[i];
            return console.log("current scene: ", currentScene);
        }
    }
    console.log("current scene: ", currentScene);
}

function Character() {
    for (var i = 0; i < characterArray.length; i++) {
        if (characterArray[i].active === true) {
            currentCharacter = characterArray[i];
            console.log("current character: ", currentCharacter.name);
        }
    }
}

function gameTimer () {
    questionTimer = 10;
    startProgressBar ()
    intervalId = setInterval (decrement, 1000);
    document.getElementById("timerCountdownText").innerHTML = questionTimer;
    // decrement ();
}

function decrement () {
    questionTimer--;
    document.getElementById("timerCountdownText").innerHTML = questionTimer;
    startProgressBar ()
    if (questionTimer ===0) {
        clearInterval(intervalId);
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

function populatePage() {
    var imageOneVar = new Image(600, 600);
    var imageTwoVar = new Image(600, 600);
    var imageOneText = characterArray[currentCharacterValue].scene[currentScene].choiceOne;
    var imageTwoText = characterArray[currentCharacterValue].scene[currentScene].choiceTwo;
    imageOneVar.src = characterArray[currentCharacterValue].scene[currentScene].choiceOneImg;
    imageTwoVar.src = characterArray[currentCharacterValue].scene[currentScene].choiceTwoImg;
    document.getElementById("optionOneText").innerText = imageOneText;
    document.getElementById("optionTwoText").innerText = imageTwoText;
    document.getElementById("optionOneImg").appendChild(imageOneVar);
    document.getElementById("optionTwoImg").appendChild(imageTwoVar);
}

function points () {
    // console.log("points beginning: " + score);
    var newPoints = parseInt(100 * questionTimer);
    // console.log("newPoints: " + newPoints);
    // console.log("score: " + score)
    score = parseInt(newPoints + score);
    console.log("updated points: " + newPoints);
    localStorage.setItem("score", score);
}

function checkAnswer () {
    var correctAnswerText;
    var wrongAnswerText;

    if (userInput === characterArray[currentCharacterValue].scene[currentScene].correctAnswer) {
        console.log("Correct answer!");
        console.log("You chose: " + userChoiceText);
        correctAnswerText = characterArray[currentCharacterValue].scene[currentScene].answerTrue
        clearInterval(intervalId);
        points();
        if (window.localStorage.getItem("currentSceneId") >= 3) {
            document.getElementById("leaderboard").style.visibility = "visible";
            document.getElementById("continue").style.visibility = "hidden";
            renderModal (userChoiceText, wrongAnswerText);
        } else if (window.localStorage.getItem("currentSceneId")< 3) {
            document.getElementById("continue").style.visibility = "visible";
            document.getElementById("leaderboard").style.visibility = "hidden";
            renderModal (userChoiceText, correctAnswerText);
        }

    } else if (userInput !== characterArray[currentCharacterValue].scene[currentScene].correctAnswer) {
        console.log("WRONG answer!");
        console.log("You chose: " + userChoiceText);
        wrongAnswerText = characterArray[currentCharacterValue].scene[currentScene].answerFalse
        clearInterval(intervalId);
        document.getElementById("leaderboard").style.visibility = "visible";
        document.getElementById("continue").style.visibility = "hidden";
        renderModal (userChoiceText, wrongAnswerText);
    }
}

function renderModal (decision, modalText) {
    document.getElementById("id01").style.display="block";
        var displayModalDecision = document.createTextNode(decision);
        var displayModalText = document.createTextNode(modalText);
        document.getElementById("modalHeader").appendChild(displayModalDecision);
        return document.getElementById("modalBody").appendChild(displayModalText);
}

var characterArray = [
    {
        name: "Giraffe",
        alive: true,
        active: true,
        staticImg: "./assets/images/characters/animated/animated_giraffe.png",
        animatedImg: "./assets/images/characters/animated/animated_giraffe.png",
        cagedImg: "./assets/images/characters/caged/caged.png",
        scene: [
            {
                used: false,
                backgroundImg: "./assets/images/BG_images/zooBG.png",
                question: "It’s a normal day at the Zoo… that is, until closing time. Head Zoo-Keeper William Montague forgets to lock your cage for the night! With mixed feelings, you’re faced with a tough decision: live a meaningless existence in the zoo, or risk it all and escape?" ,
                answerTrue: "You kick open your cage with enthusiasm and gallop past all the other animals. As the breeze hits you in the face, you get your first taste of freedom!",
                answerFalse: "You decide to stay loyal to Zoo-Keeper William Montague. As the zookeeper makes his morning rounds, he realizes your cage is open. You receive a grateful head scratch and extra breakfast. The first zoo-guest you see is a child with a Giraffe T-Shirt on. He tosses you an extra large wad of bubblegum which you catch in your mouth and happily chew. As the minty flavor explodes on your taste buds, time slows down and you realize you're choking. In your last moments of consciousness, all you remember is that damn kid and the minty flavors of death. You finally die and later become the trending meme on reddit.",
                choiceOne: "RUN FOR IT!",
                choiceTwo: "Stay loyal",
                choiceOneImg: "./assets/images/snatch_images/escape_snatch.png",
                choiceTwoImg: "./assets/images/snatch_images/stay_snatch.png",
                incorrectResult: 0,
                correctAnswer: "choiceOne",
                correct: true,
            },
            {
                used: false,
                backgroundImg: "./assets/images/BG_images/cityBG.png",
                question: "You’ve made it out! Feeling exhilarated, you decide to get as far away from the zoo as possible. You notice a sign for the Subway. You’ve heard tales of taking the subway to a place called “Mexico” where the beaches are warm, animals roam free and the margaritas flow like wine. Before you reach the subway, you notice a forest beyond the city. Do you go to Viva Mexico or run to the nearby forest to continue your new freedom?",
                answerTrue: "As great as a margarita sounds, you’re a Giraffe and you can’t hold your liquor. You quickly gallop to the nearby forest. As you enter, you smell the sweet lush leaves by the billions. YAY FREEDOM! ",
                answerFalse: "You gallop towards the subway. Strangely, there is no one in sight! The train pulls up like clockwork. You have a hard time boarding thanks to your massive Giraffe body. You manage to enter, but before you pull your head inside, the doors shut and lock your 8ft neck and head outside! A chime plays and the train rapidly starts to move. Without another moment’s memory, your head smashes into the confined tunnel. Your become rubber-necked and your head separates from your body, releasing exuberant amounts of ‘glitter’ all over and your body drops lifelessly to the ground. You’re dead!",
                choiceOne: "Margaritas and Nachos",
                choiceTwo: "Continue Running!",
                choiceOneImg: "./assets/images/snatch_images/subway_snatch.png",
                choiceTwoImg: "./assets/images/snatch_images/forest_snatch.png",
                incorrectResult: 0,
                correctAnswer: "choiceTwo",
                correct: true,

            },
            {
                used: false,
                backgroundImg: "./assets/images/BG_images/forestBG.png",
                question: "Being in the forest brings a tear of happiness to your eye, memories of eating antidepressant-infused hay flood your memories. You fantasize about finding another Giraffe who has spots-in-all-the-right-places, and dream of making a wobbly-legged baby Giraffe and living happily ever after together... until you approach a split in the road.One path has a cold breeze, grey trees without leaves and the stereotypical hooting owl with beady eyes. The other path continues with lush vegetation and is paved with a yellow brick road… Which path do you take?",
                answerTrue: "You decide to take the road that Zoo-Keepers are less likely to go down if they come searching. As you skittishly walk through the scary forest entrance, you look around and start to recognize the smell of faint smoke. With the moonlight highlighting the dead trees, you realize that this part of the forest is actually just charred from the wildfires. You continue on for another mile and the forest returns to a lush forest with endless amounts of trees and leafs. Surely you’ve made the right decision. You become exhausted as your adrenaline wears off and you lay down off the trail to catch some quick sleep until dawn. ",
                answerFalse: "You flip off the hooting owl with your hoof and follow the safer path with yellow bricks. Eventually, you clear the forest and see a royal emerald kingdom in the distance. You stop dead in your tracks, realizing someone might report seeing a 20ft Giraffe to the zoo. You try to turn around but you are blocked by a gaggle of Munchkins. They resemble a certain political figure, with orange-faces and disproportionate bodies… you try to run but they pull out a knife and sing, in unison “The Wizard will love a coat made of your beautiful spotted fur!” They stab you repeatedly until Giraffe-glitter covers the yellow bricks. You die and become a wardrobe piece.",
                choiceOne: "Go into Creepy Forest",
                choiceTwo: "Follow the Yellow Brick Road",
                choiceOneImg: "./assets/images/snatch_images/scary_snatch.png",
                choiceTwoImg: "./assets/images/snatch_images/YBR_snatch.png",
                incorrectResult: 0,
                correctAnswer: "choiceOne",
                correct: true,

            },
            {
                used: false,
                backgroundImg: "./assets/images/BG_images/scaryBG.png",
                question: "As dawn arrives, the sun slowly rises with beautiful golden rays shining through the trees. The birds sing with the happiness that only freedom can give. You stand up and continue your journey. You arrive to an untouched sanctuary with a calm lake in the middle of the opening. As your dry tongue pulls you to the lake for a drink of water, you hear a moaning in the distance. Confused, you walk towards the moaning and see a bear stuck in a trap. You’re faced with the decision to either quench your thirst or help the bear get free, what do you do?",
                answerTrue: "As thirsty as you are, you cannot even think about drinking water. You approach the bear and kick down on the trap. The bear tumbles to the ground in relief. He stands up and hugs you for your bravery and help. Suddenly, his claws accidentally scrape you and a few drops of Giraffe-glitter trickle down your neck. Bear’s eyes pop open with the sweet smell of glitter and he cannot contain his instincts to eat. He attacks and eats you with a tear in his eye. Giraffe is dead. BEAR IS NOW UNLOCKED TO PLAY!",
                answerFalse: "Upon sipping water from the forest stream, you feel a slight tingle upon your bum. You turn and see a red-feathered blow dart hanging from your rear end. You look around in confusion and catch a glimpse of Zoo-Keeper William Montague in the distance. Your vision begins to blur and you awake the next morning to the sound of children outside of your old cage at the zoo. It was quite an adventure but it looks like you are here to stay… for now… ",
                choiceOne: "Help Bear",
                choiceTwo: "Take a Sip of Water",
                choiceOneImg: "./assets/images/snatch_images/freebear_snatch.png",
                choiceTwoImg: "./assets/images/snatch_images/water_snatch.png",
                incorrectResult: 0,
                correctAnswer: "choiceOne",
                correct: true,

            },
        ]
    }
];
// use left/right keys to select choice (onDownKey?) --> build validation

document.getElementById("optionOneImg").addEventListener("click",function() {
    userInput = "choiceOne";
    userChoiceText = characterArray[currentCharacterValue].scene[currentScene].choiceOne;
    // window.location.href = "./game.html";
    checkAnswer ();
})

document.getElementById("optionTwoImg").addEventListener("click",function() {
    userInput = "choiceTwo";
    userChoiceText = characterArray[currentCharacterValue].scene[currentScene].choiceTwo;
    // window.location.href = "./game.html";
    checkAnswer ();
})

document.getElementById("continue").addEventListener("click",function() {
    return window.location.href = "./game.html";
});

document.getElementById("leaderboard").addEventListener("click", function() {
    var opts = {
        method: "GET",
        headers: {}
    };
    fetch("/gameOver", opts).then(function (response) {
        console.log(response);
        window.location = "/gameOver";
    })
    .catch(function (err){
        console.log(err);
    });
 });

gameTimer();
determineScene();
populatePage();

// local storage  - currentCharacter, currentSceneId (0-3)