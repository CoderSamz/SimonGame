
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClikedPattern = [];
var level = 0;
var isStarted = false;

$(document).keydown(function() {
    if (!isStarted) {
        $("#level-title").text("Level " + level)
        nextSequence();
        isStarted = true;
    }
})

$(".btn").click(function(event) {
    if (!isStarted) {
        return
    }
    var userChosenColour = $(this).attr("id");
    userClikedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClikedPattern.length - 1)
})

function nextSequence() {

    userClikedPattern = [];

    level += 1;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
    
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed")
    }, 100)
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClikedPattern[currentLevel]) {
        console.log("success")
        if (userClikedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {

        playSound("wrong")
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200)
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver()
    }
}

function startOver() {
    level = 0
    gamePattern = []
    isStarted = false;
}