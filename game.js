const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;

function nextSequence() {
  userClickedPattern = [];
  let randomNumber = Math.round(Math.random() * 3);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  flash(randomChosenColour);
  playSound(randomChosenColour);
  gameStarted = true;

  $("h1").text("Level " + level);

}

$(document).one("keypress", function() {
  nextSequence();
});


$(".btn").on("click", function() {
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

});


function checkAnswer(currentLevel) {
  if (gamePattern.length > 0) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
        level++;
        setTimeout(nextSequence, 1000);
      }
    } else {
      gameOvere();
    }
  }

}

function gameOvere() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  $("h1").text("Game Over, Press Any Key to Restart");
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;

  $(document).one("keypress", function() {
    nextSequence();
  });

}

function playSound(currentColour) {
  let audio = new Audio("sounds/" + currentColour + ".mp3");
  audio.play();
}

function flash(currentColour) {
  $("#" + currentColour).fadeOut(100).fadeIn(100);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
