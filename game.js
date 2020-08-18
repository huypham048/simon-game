let gamePattern = [];
let userPattern = [];
let level = 0;
let colors = ["red", "green", "blue", "yellow"];
let started = false;

function nextColor() {
  userPattern = [];
  ++level;
  let randomColor = colors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColor);
  animatePress(randomColor);
  playSound(randomColor);
  $("#level-title").text("Level " + level);

}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(currentColor) {
  let audio = new Audio(`sounds/${currentColor}.mp3`);
  audio.play();
}

function checkAnswer(lastColor) {
  if (gamePattern[lastColor] === userPattern[lastColor]) {
    console.log("success");
    if (gamePattern.length === userPattern.length) {
      setTimeout(function() {
        nextColor();
      }, 1000);
    }

  } else {
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    $("#level-title").text("Game Over. Press any key to try again!");
    resetGame();

  }
}

function resetGame() {
  level = 0;
  gamePattern = [];
  started = false;
}

$(".btn").click(function() {
  let userColor = this.id;
  animatePress(userColor);
  playSound(userColor);
  userPattern.push(userColor);
  checkAnswer(userPattern.length - 1);
})

$(document).keydown(function() {
  if (!started) {
    nextColor();
    started = true;
  }
})
