


var buttonColours = ["red", "blue" , "green" , "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;


function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    level++;

    $("#level-title").text("Level "+level);
    
}   


$(".btn").on("click", function () {
    var userChosenColour =  $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
});

function playSound(name) {
    var audio = new Audio("sounds/" +name+ ".mp3");
    audio.play();
};

function animatePress (currentColour) {
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    }, 100)
}

$(document).on("keypress", function() {
    if(!started) {
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
        
    }
});


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else if (gamePattern[currentLevel] !== userClickedPattern[currentLevel]){
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("h1").text("Game over, press any key to restart");
        startOver();
    }
     else {
        console.log("Wrong");
    }
};

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}



