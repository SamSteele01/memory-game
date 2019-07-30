// Header ----------------------------------

let header = document.getElementById('header');
let title = document.createElement("h1");
title.innerHTML = "Memory Game";

let leftColumn = document.createElement("li");
let centerColumn = document.createElement("li");
let rightColumn = document.createElement("li");

header.appendChild(leftColumn);
header.appendChild(centerColumn);
header.appendChild(rightColumn);

leftColumn.setAttribute("class", "header-col");
centerColumn.setAttribute("class", "header-col");
rightColumn.setAttribute("class", "header-col");

let diffLabel = document.createElement("h3");
let difficultyMenu = document.createElement("select");
let themeLabel = document.createElement("h3");
let theme = document.createElement("select");
let startButton = document.createElement("button");
let sizeLabel = document.createElement("h3");
let gameSize = document.createElement("select");

diffLabel.innerHTML = "Select Difficulty";
leftColumn.appendChild(diffLabel);
leftColumn.appendChild(difficultyMenu);

themeLabel.innerHTML = "Select Theme";
centerColumn.appendChild(themeLabel);
centerColumn.appendChild(theme);
centerColumn.appendChild(startButton);

sizeLabel.innerHTML = "Select Game Size";
rightColumn.appendChild(sizeLabel);
rightColumn.appendChild(gameSize);

difficultyMenu.appendChild(new Option("Easy", 3));
difficultyMenu.appendChild(new Option("Medium", 2));
difficultyMenu.appendChild(new Option("Hard", 1));

theme.appendChild(new Option("Celtic Knots", "knots"));
theme.appendChild(new Option("Flames", "flames"));
startButton.innerHTML = "Start";

gameSize.appendChild(new Option("6 pairs", 6));
gameSize.appendChild(new Option("9 pairs", 9));
gameSize.appendChild(new Option("12 pairs", 12));


// main --------------------------------------

let main = document.getElementsByTagName("main");
// let highScores = require("./highScores"); // doesn't work
// console.log("highScores", highScores);

// let highScoresTable = document.createElement("table");
// main.appendChild(highScoresTable);
// let tableHeader = document.createElement("th");
// tableHeader.innerHTML = "High Scores";
// highScoresTable.appendChild(tableHeader);
// 
// highScores.map((row) => {
//   let tableRow = document.createElement("tr");
//   let rank = document.createElement("td");
//   rank.innerHTML = row.rank;
//   tableRow.appendChild(rank);
//   let score = document.createElement("td");
//   score.innerHTML = row.score;
//   tableRow.appendChild(score);
//   let name = document.createElement("td");
//   name.innerHTML = row.name;
//   tableRow.appendChild(name);
//   highScoresTable.appendChild(tableRow);
// })

startButton.addEventListener("click", runGame, false);

var matched = 0;
let pairs = 0;
var totalSeconds = 0;
var flippedCards = [];
var flippedCardsId = [];
let numberOfMoves = 0;
let totalHearts = 0;
let hearts = [];
var heartImgArray = [
  "./Hearts/Empty-heart.png", "./Hearts/Half-heart.png", "./Hearts/Full-heart.png"
];
let imageArray = [];
let backSideImg = "";

// await start -----------------------------

function runGame() {
  // get values
  numberOfMoves = difficultyMenu.value * gameSize.value;
  let themeFolder = theme.value;
  pairs = gameSize.value;
  
  // clear header and table
  leftColumn.removeChild(diffLabel);
  leftColumn.removeChild(difficultyMenu);
  centerColumn.removeChild(themeLabel);
  centerColumn.removeChild(theme);
  centerColumn.removeChild(startButton);
  rightColumn.removeChild(sizeLabel);
  rightColumn.removeChild(gameSize);
  // main.removeChild(highScoresTable);
  
  // change Header
  
  var healthMeter = document.createElement("div");
  healthMeter.setAttribute("id", "health-meter");
  leftColumn.appendChild(healthMeter);
  var timer = document.createElement("div");
  timer.setAttribute("id", "timer");
  rightColumn.appendChild(timer);
   
  createHearts(numberOfMoves);

  let cardDeck = shuffle(buildDeck(pairs));
  imageArray = buildImgArray(themeFolder, pairs);
  
  let cardTable = document.querySelector( "main > ul" );
  cardTable.setAttribute("class", "card-table");
  for (var i = 0; i < cardDeck.length; i++) {
    let card = document.createElement("li");
    let cardImage = document.createElement("img");
    cardTable.appendChild(card);
    card.appendChild(cardImage);
    cardImage.setAttribute("src", backSideImg);
    cardImage.setAttribute("class", "back-side");
    cardImage.setAttribute("ID", cardDeck[i]);
  };
  
  var timerVar = setInterval(countTimer, 1000);

};

function countTimer() {
  ++totalSeconds;
  var hour = Math.floor(totalSeconds / 3600);
  var minute = Math.floor((totalSeconds - hour * 3600) / 60);
  if (minute < 10) {minute = "0" + minute};
  var seconds = totalSeconds - (hour * 3600 + minute * 60);
  if (seconds < 10) {seconds = "0" + seconds};
  document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
};

function buildDeck(pairs){
  let deck = [];
  for (let i = 0; i < pairs; i++) {
    deck.push(i + 1);
    deck.push(i + 1);
  }
  // console.log(deck);
  return deck;
}  

function shuffle(deckParam) {
  let i = 0;
  let j = 0;
  let temp = null;
  for (i = deckParam.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = deckParam[i];
    deckParam[i] = deckParam[j];
    deckParam[j] = temp;
  }
  // console.log(deckParam);
  return deckParam;
}

function buildImgArray(themeFolder, cardPairs) {
  let imageFolder = "";
  let imageFile = "";
  let numberOfOptions = 0;
  
  if (themeFolder === "knots") {
    imageFolder = "CelticKnots";
    imageFile = "Celtic-knot";
    numberOfOptions = 27;
    backSideImg = "./CelticKnots/celtic-knot-back.png"
  }
  if (themeFolder === "flames") {
    imageFolder = "Flames";
    imageFile = "flame";
    numberOfOptions = 10;
    backSideImg = "./Flames/flame-back.svg"
  }
  
  let imgArray = [];
  let randomNumber = 0;
  let randomNumberArray = [];
  
  for (var i = 0; i < cardPairs; i++) {
    randomNumber = Math.floor(Math.random() * numberOfOptions);
    if ((randomNumberArray.includes(randomNumber) === false) && randomNumber != 0) {
      randomNumberArray.push(randomNumber);
    }
    else {
      i -=1;
    }
  }
  for (var i = 0; i < cardPairs; i++) {
    imgArray.push("./"+imageFolder+"/"+imageFile+"-"+randomNumberArray[i]+".jpg");
  }
  return imgArray;
}

function createHearts(numberOfMoves) {
  totalHearts = Math.floor(numberOfMoves / 2);
  let halfHeart = numberOfMoves % 2;
  
  for (var i = 0; i < totalHearts; i++) {
    hearts[i] = document.createElement("img");
    hearts[i].setAttribute("src", heartImgArray[2]);
    document.getElementById("health-meter").appendChild(hearts[i]);
  }

  if (halfHeart) {
    hearts[totalHearts] = document.createElement("img");
    hearts[totalHearts].setAttribute("src", heartImgArray[1]);
    document.getElementById("health-meter").appendChild(hearts[totalHearts]);
  }
  
};

function updateHearts() {
  let restAreEmpty = false;
  let h = 0;
  // console.log('HEARTS.LENGTH', hearts.length);
  for (var i = 0; i < hearts.length; i++) {
    if (restAreEmpty) {
      // fill with white hearts
      hearts[i].setAttribute("src", heartImgArray[0]);
    }
    else {
      h +=1;
      if (numberOfMoves > h*(heartImgArray.length-1)) {
        hearts[i].setAttribute("src", heartImgArray[2]);
      }
      else {
        // last heart
        if (numberOfMoves === h*(heartImgArray.length-1)) {
          // full heart
          hearts[i].setAttribute("src", heartImgArray[2]);
        }
        if (numberOfMoves === (h*(heartImgArray.length-1))-1) {
          // half heart
        hearts[i].setAttribute("src", heartImgArray[1]);
        }
        restAreEmpty = true;
      }
    }
  }
}
// updateHearts(); // may not need

// let cardClassName = "back-side";
// let cardIdName = "cardDeck[i]";
// let backSideImg = "back-side-img";
// let cardImg = "cardImage[i]"
// 
// let cardLiteral = `
// <li class="${cardClassName}" id="${cardIdName}">
//   <img src="${cardImg}" alt="">
// </li>`

let pickedCard = document.querySelector("#list-table");
pickedCard.addEventListener("click", flipCardFxn, false);
function flipCardFxn(e) {
    if ((e.target.classList.value === "back-side") && (flippedCards.length <= 1)) {
      e.target.classList.remove("back-side");
      e.target.classList.add("visible");
      flippedCards.push(e.target);
      flippedCardsId.push(e.target.id);
      // console.log(e.target);
      spinFlipped(e.target);
      compareCards();
    }
};

function compareCards() {
  if (flippedCardsId.length >= 2) {
    if (flippedCardsId[0] === flippedCardsId[1]) {
      let secondCardShows = setTimeout(function() {
        let match = document.getElementsByClassName("visible");
        while (match.length > 0) {
          match[0].classList.add("matched");
          match[0].classList.remove("visible");
        };
        flippedCardsId = [];
        flippedCards = [];
        matched += 1;
        checkWinLose(matched, pairs);
      }, 1000);
    }
    else {
      let noMatch = setTimeout(function() {
        let purge = document.getElementsByClassName("visible");
        while (purge.length > 0) {
          purge[0].classList.add("back-side");
          purge[0].classList.remove("visible");
          spinFlipped(flippedCards[0]);
          flippedCards.shift()
        }
        flippedCardsId = [];
        flippedCards = [];
        numberOfMoves -= 1;
        updateHearts();
      }, 3000);
    }
    checkWinLose(matched, pairs);
  }
};

// function changeImages(theCard) {
//   console.log(theCard);
//   if (theCard.classList.value === "visible") {
//     theCard.setAttribute("src", imageArray[theCard.id-1]);
//   }
//   if (theCard.classList.value === "back-side") {
//   theCard.setAttribute("src", "./CelticKnots/celtic-knot-back.png");
//   }
// };

// Ha ha ha ha ha! this is badass!!
function spinFlipped(theCard) {
    // console.log("flipping"+theCard);
    let degrees = 180;
    let flip = setInterval(frame, 7);
    function frame() {
      if(degrees === 90){
        if (theCard.classList.value === "visible") {
        theCard.setAttribute("src", imageArray[theCard.id-1]);
        }
        if (theCard.classList.value === "back-side") {
        theCard.setAttribute("src", backSideImg);
        }
      }
      if(degrees <= 0){
        clearInterval(flip);
      }
      else{
        degrees--;
        // console.log(theCard);
        theCard.style.transform = "rotateY("+degrees+"deg)"
      }
    }
}

function checkWinLose(m, p) {
  console.log("Matched = " + m + "  cardPairs = " + p);
  if (m === p) {
    // want to record time to complete -- tries left -- high scores -- points -- name?
    alert("You WIN!! \n With "+ numberOfMoves +" moves left!");
    // stop timer
    // enter your name
  }
  if (numberOfMoves === 0) {
    alert("You Lose!!\n You made " + m + "pairs.");
  }
}
