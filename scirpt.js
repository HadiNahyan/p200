//
const targetDiv = document.getElementById("fp");
var massage = document.getElementById("msg");

// Difficulties elements
const easy = document.getElementById("easy");
const easy2 = document.getElementById("easy2");
const normal = document.getElementById("normal");
const normal2 = document.getElementById("normal2");
const hard = document.getElementById("hard");
const hard2 = document.getElementById("hard2");
const wordleft = document.getElementById("wLeft");

var words = document.querySelector(".words");
var result = document.getElementById("res");
var scoreShower = document.querySelector(".playerScore");

var temp = document.querySelector(".timer");
var timerDiv = document.querySelector(".time");
const gameOver = document.getElementById("Lp");

// Audios variables start
var carStartSound = document.getElementById("crStrt");
var carRidingSound = document.getElementById("garir");
var backgrounMusic = document.getElementById("bgMusic");
var wrongMusic = document.getElementById("wrong");
var correctMusic = document.getElementById("right");
var speedIncreasingSound = document.getElementById("speed");
var brakeSound = document.getElementById("brake");
var wonSound = document.getElementById("won");
var lostSound = document.getElementById("lost");
var keyPessingSound = document.getElementById("kPres");
var finishingTimer = document.getElementById("L10s");

var seconds = 0;
var scoreKeeper = 0;
var wordLengthKeeper = 0;
var wordsLeft;
var spans;
var typed;
var counter = 0;
var passedCar = 0;
var currentWord = "";
var checkingIndex = 0;
var difficultyChek = 0;
var carPaddings = ["2%","5%","11%","13%","16%","18%","21%","23%","26%","29%","31%","33%","36%","38%","41%","43%","46%","49%","51%","53%","56%","58%","61%","63%","66%","67%","69%","71%","73%","74%","75%",];
var wheelPadding = [
  "8%",
  "11%",
  "17%",
  "19%",
  "22%",
  "24%",
  "27%",
  "29%",
  "32%",
  "34%",
  "37%",
  "39%",
  "42%",
  "44%",
  "47%",
  "49%",
  "52%",
  "54%",
  "57%",
  "59%",
  "62%",
  "64%",
  "67%",
  "69%",
  "71%",
  "72%",
  "75%",
  "77%",
  "79%",
  "80%",
  "81%",
];

easy.onclick = function () {
  if (targetDiv.style.display !== "none") {
    targetDiv.style.display = "none";
  }
  difficultyChek = 1;
  seconds = 120;
  playGame();
};

normal.onclick = function () {
  if (targetDiv.style.display !== "none") {
    targetDiv.style.display = "none";
  }
  difficultyChek = 2;
  seconds = 90;
  playGame();
};

hard.onclick = function () {
  if (targetDiv.style.display !== "none") {
    targetDiv.style.display = "none";
  }
  difficultyChek = 3;
  seconds = 60;
  playGame();
};

function playGame() {
  backgrounMusic.currentTime = 0;
  carStartSound.play(); //music playing
  carRidingSound.play();
  backgrounMusic.play();

  showWord(); //Showing Words for typing

  var timer = setInterval(function () {
    seconds--; //Timer count
    if (seconds == 10) {
      finishingTimer.play(); // Last 10 seconds alert Timer
    }

    temp.innerHTML = "Time Left : " + seconds; //timer box showing

    if (seconds === 0 || passedCar === 30) {
      //game ending condition
      finishingTimer.pause();
      finishingTimer.currentTime = 0;
      backgrounMusic.pause();
      backgrounMusic.currentTime = 0;
      brakeSound.play();
      carRidingSound.pause();
      carRidingSound.currentTime = 0;
      massage.innerHTML =
        "Your Score is: " + scoreKeeper + ", Word Typed: " + counter; //Score and typed word count showing
      if (counter >= 30) {                          //Win or lost massage
        result.style.color = "lime";
        result.innerHTML = "You Won!!!";
        wonSound.play();
      } 
      else {
        lostSound.play();
        result.style.color = "red";
        result.innerHTML = "You Lost!!!";
      }
      counter = 0;
      scoreKeeper = 0; //setting all variables to their default values after game ends
      wordLengthKeeper = 0;
      wordleft.innerHTML = "Word Left- 30";
      checkingIndex = 0;
      scoreShower.innerHTML = "Score : " + scoreKeeper;
      genText();
      clearInterval(timer);
      timerDiv.innerHTML = "sec";
      passedCar = 0;
      gameOver.style.display = "block"; //Showing Game ending page
    }
  }, 1000);
}

easy2.onclick = function () {
  // difficulty selection to play again after the game ends
  if (gameOver.style.display != "none") {
    gameOver.style.display = "none";
  }
  wonSound.pause();
  wonSound.currentTime = 0;
  lostSound.pause();
  lostSound.currentTime = 0;
  difficultyChek = 1;
  seconds = 120;
  playGame(); //restart the game
};

normal2.onclick = function () {
  if (gameOver.style.display != "none") {
    gameOver.style.display = "none";
  }
  wonSound.pause();
  wonSound.currentTime = 0;
  lostSound.pause();
  lostSound.currentTime = 0;
  difficultyChek = 2;
  seconds = 90;
  playGame();
};

hard2.onclick = function () {
  if (gameOver.style.display != "none") {
    gameOver.style.display = "none";
  }
  wonSound.pause();
  wonSound.currentTime = 0;
  lostSound.pause();
  lostSound.currentTime = 0;
  difficultyChek = 3;
  seconds = 60;
  playGame();
};

function typing(e) {
  // matching typed wort with displayed word
  typed = String.fromCharCode(e.which);
  if (typed >= "A" && typed <= "Z") {
    if (spans[checkingIndex].innerHTML === typed) {
      spans[checkingIndex].classList.add("bg"); //green marking correct typed letter
      checkingIndex++;
      keyPessingSound.play();
    }
    else {
      if (passedCar > 0) {
        scoreKeeper -= 1;
        wrongMusic.play();
        brakeSound.play();
        passedCar -= 1;
        wordsLeft = 30 - passedCar;
        wordleft.innerHTML = "Word Left- " + wordsLeft;
        scoreShower.innerHTML = "Score : " + scoreKeeper;
        if (seconds > 10 && difficultyChek == 2) {
          seconds -= 2;
        }
        if (seconds > 10 && difficultyChek == 3) {
          seconds -= 3;
        }
      }
      if (passedCar <= 0) {
        passedCar = 0;
      }
      moveCar(passedCar); //move the car according typing
    }
    if (checkingIndex === spans.length) {
      //acivity after type all letter correct
      document.removeEventListener("keydown", typing, false);
      passedCar += 1;
      counter += 1;
      scoreKeeper += wordLengthKeeper;
      wordsLeft = 30 - passedCar;
      wordleft.innerHTML = "Word Left- " + wordsLeft;
      scoreShower.innerHTML = "Score : " + scoreKeeper;
      correctMusic.play();
      speedIncreasingSound.play();

      if (passedCar == carPaddings.length) {
        passedCar -= 1;
      }
      checkingIndex = 0;
      moveCar(passedCar);
      setTimeout(function () {
        words.className = "words"; // restart the classes
        showWord(); // give another word
        document.addEventListener("keydown", typing, false);
      }, 400);
    } 
    
  }
}
function moveCar(passedCar) {
  //Mopving car to frontward or backward
  var myCar = document.getElementsByClassName("car");
  setInterval(cAnim, 40);
  var myWheel = document.getElementsByClassName("wheel");
  setInterval(wAnim, 40);
}

function cAnim() {
  document.getElementById("myCar").style.left = carPaddings[passedCar];
  document.getElementById("myCar").style.transition = "all 2s"; //transition for smooth move
}

function wAnim() {
  document.getElementById("caka").style.left = wheelPadding[passedCar];
  document.getElementById("caka").style.transition = "all 2s";
}

document.addEventListener("keydown", typing, false);

function showWord() {
  words.innerHTML = "";
  var wordArray = genText().split(""); //score+=wordArray.length;
  for (var i = 0; i < wordArray.length; i++) {
    var span = document.createElement("span"); //building the words with spans around the letters
    span.classList.add("span");
    span.innerHTML = wordArray[i];
    words.appendChild(span);
  }
  spans = document.querySelectorAll(".span");
}

function genText() {
  //function for generate a word
  var x = Math.floor(Math.random() * word.length);
  var sWord = word[x];
  wordLengthKeeper = sWord.length;
  return sWord;
}

function playAudio() {
  backgrounMusic.play();
}
function pauseAudio() {
  backgrounMusic.pause();
}
