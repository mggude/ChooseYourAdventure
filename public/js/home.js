var characters = ["./assets/images/characters/static/static_giraffe.png", "./assets/images/characters/static/static_bear.png"]

function generateCharacters() {
    // loop through characters
    characters.forEach(function (imageUrl) {
        var character = $("<img>");
        // set src equal to link
        character.attr("src", imageUrl);
        // add class
        character.addClass("character");
        // put the character image on the page
        $("#images").append(character);
    });
};

generateCharacters();