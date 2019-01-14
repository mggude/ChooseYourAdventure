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
        document.getElementById("continue").style.visibility = "visible";
        document.getElementById("leaderboard").style.visibility = "hidden";
        renderModal (userChoiceText, correctAnswerText);

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
                question: "The zoo's head zoo keeper, William MonteHue, is locking up for the night and accidentally forgets to lock your cage. With mixed feelings, you’re is faced with a tough decision: stay in your cage and hope for extra food in the morning, or do you risk it all and make a run for your freedom?",
                answerTrue: "You kick open your cage with enthusiasm and make a gallop past all the other zoo animals. As the breeze hits you in the face, you get your first taste of freedom!",
                answerFalse: "You decide to stay loyal to Zoo-Keeper MonteHue. As the sun rises, William walks to your cage when he realizes he mistakenly left your cage open. Upon relizing your loyalty, Zoo-Keeper MonteHue gives you a head scratch and overfills your food bucket with extra food. 'Thank you' He says. As guests arrive to the park, you see a young child with a Giraffe T-Shirt on. He points and throws a extra large wad of double-bubble bubblegum to you and claps. Feeling happy about how the day is going, you pick pick up the bubblegum and start to chew. As the minty flavor explodes on your taste buds, time slows down and you realize you're choking. In the last moments of conciousness, all you remember is that damn kid and the minty flavors of death. You die a terrible death in the spotlight of hundreds of visitors and later become the trending meme on reddit.",
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
                question: "You’ve made it out! For the first time in your life you see just how large the world is. Feeling Exhilarated, it is time to get as far away from the park and Zoo-Keeper MonteHue as you can. As you hide amongst the trees, you notice a sign that says “Subway - To City Limits”. You remember hearing some of the park guests talking about wanting to take the subway to city limits so they can get to a place called “Mexico” where the beaches are warm, animals are plentiful and the margaritas are free flowing. Just as you about to go forward, you get a glimpse of a forest out of the corner of your eye. Do you go to Viva Mexico or run to the nearby forest to continue your new freedom?",
                answerTrue: "As great as fountain of margarita’s sounds, you’re a Giraffe and you’ve likely dodged sugar-induced Diabetes. Yay! You look around for any humans and quickly gallop to the nearby forest. As you enter, you smell the sweet, sweet smell of lush leafs by the billions. As far as your eyes can see!",
                answerFalse: "You decide to make a gallop to the subway. Strangely, there is not a person in sight! The subway pulls up like clockwork and you begin to board. As you enter the train, you have a hard time fitting thanks to your massive Giraffe body. You manage to fit your body in, but as you move your head inside the train, the doors shut, locking your 8ft. Neck and head outside! A chime plays and the train rapidly starts to move. Without another moment’s memory, your head smashes into the confined tunnel, you become rubber-necked and your head separates from your body, releasing exuberant amounts of ‘glitter’ all over and your body drops lifelessly to the ground.This means you’re dead....",
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
                question: "You enter the forest with a tear of happiness in your eye, memories of eating buckets of antidepressant-infused hay and cardboard pellets rush to your memories. You fantasize about to finding another recently-escaped Giraffe who has spots-in-all-the-right-spots, and your future of making a wobbly-legged baby Giraffe while living in the forest for the rest of your lives. That is until you approach a split in the road. The first path has a cold draft, grey trees without leaves and a stereotypical cooing owl with beady eyes. The other path seems to continue with lush vegetation and is paved with a road made of yellow bricks. Which path do you take?",
                answerTrue: "You decide to take the road that Zoo-Keepers are less likely to go down if they come searching. As you skittishly walk through the scary forest entrance, you look around and start to recognize the smell of faint smoke. With the moonlight highlighting the dead trees, you realize that this part of the forest is actually just charred from the wildfires. You continue on for another mile and the forest returns to a lush forest with endless amounts of trees and leafs. Surely you’ve made the right decision. You become exhausted as your adrenaline wears off and you lay down off the trail to catch some quick sleep until dawn. ",
                answerFalse: "You flip off the cooing owl with your hoof and follow the smarter, path with yellow bricks. After walking for an hour or two, you clear the forest and see an royal emerald kingdom in the distance. You stop in your spot and realize that there are likely people that would recognize that you were a 20ft Giraffe and would call that stupid, William MonteHue Zoo-Keeper. As you turn around, you are blocked by a gaggle of Munchkins. They resemble a political figure with their orange-faces and disproportionate bodies… Oh no… they are Munchkins! Just as you try to get away, they pull out a knife while saying ‘The Wizard would certainly love a jacket made of this beautiful spotted fur!’. They begin to stab you until all of your Giraffe-glitter covers the yellow bricks. You go unconscious and become a wardrobe piece.",
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
                question: "As dawn arrives, the sun slowly rises with beautiful golden rays shining through the trees. The birds sing with the happiness that only freedom can give. You stand up and continue your journey. You arrive to an untouched sanctuary with a calm lake in the middle of the opening. As your dry tongue pulls you to the lake for a drink of water, you hear a moaning in the distance. Confused, you walk towards the moaning and see a bear with his leg stuck in a bear trap. You’re faced with the decision to either quench your thirst or help the bear get free, what do you do?",
                answerTrue: "As thirsty as you are, you cannot even begin to think about drinking water. You go over to the bear and kick down on the trap until the metal snaps. The bear tumbles to the ground in relief. After a moment, he stands up and gives you a hug for your bravery and help. As he hugs you, his claws accidentally scrape into your neck, releasing a few drips of your Giraffe-glitter. The bears eyes pop open with the sweet smell of glitter and he can not contain his instincts to eat. He attacks you and begins his feast with a tear in his eye. Giraffe is no longer. BEAR IS NOW UNLOCKED TO PLAY",
                answerFalse: "Upon sipping on the taste of water from a natural water spring, you feel a slight tingle in your bum. Upon turning around, you recognized a red-feathered blow dart hanging from your rear end. You look around in confusion when you catch a glimpse of Zoo-Keeper William MonteHue in the distance. Your vision begins to blur and you awake the next morning to the sound of children outside of your old cage at the zoo. It was an adventure but it looks like you are here to stay.",
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