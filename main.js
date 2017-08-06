// pick a size of the deck --> dropdown with options --> generate table
// buttons in the header: start new game, pause.
// header needs "health" meter = number of tries <-- changes with difficulty
// TODO:
// healthBar images
// decksize dropdown => grid layouts @media ??
// difficulty dropdown => healthMeter, time held after noMatch
// high scores - before game - play game button
// For test/build. come back later and have multiple deckSizes

let deckSize = 24;
let healthMeter = 24;
let healthMeterStart = healthMeter;

let headerItems = document.getElementById('header-items');
// parent container
let listItem1 = document.createElement("li");
let listItem2 = document.createElement("li");
let listItem3 = document.createElement("li");

headerItems.appendChild(listItem1);
headerItems.appendChild(listItem2);
headerItems.appendChild(listItem3);

listItem1.setAttribute("id", "list1");
listItem2.setAttribute("id", "list2");
listItem3.setAttribute("id", "list3");

let healthM = document.createElement("div");
let title = document.createElement("h1");
let startButton = document.createElement("button");
let timer = document.createElement("div");
let difficultyMenu = document.createElement("select");
let gameSize = document.createElement("select");

// let highScores = document.createElement("div");
listItem1.appendChild(healthM);
listItem2.appendChild(title);
listItem2.appendChild(startButton);
listItem3.appendChild(timer);
listItem3.appendChild(difficultyMenu);
listItem3.appendChild(gameSize);


// healthM.innerHTML = "Health meter " + healthMeter;
title.innerHTML = "Memory Game";
startButton.innerHTML = "Start";
timer.setAttribute("id", "timer");
let optionDiff = document.createElement('option')
// selectField.appendChild(new Option(option.label, option.value))
let optionSize = document.createElement('option')
// selectField.appendChild(new Option(option.label, option.value))

// loop-----
// let htmlTag = div, button, select,
let className = "header-bar";
// let idName = timer, healthM, startButton, difficultyMenu, styleMenu, gameSize, highScores
// let headerItemLiteral = `
// <${htmlTag} class="${className}" id="${idName}">
//   <input type="text" name="" value="">`;

let optionName = "";
let optionLiteral = `
<option name="sc" value="sc">${optionName}</option>`;

// startButton.addEventListener("click", runGame, false);
//
// function createSizeArray() {
//   let arrayToReturn = [];
//
// }


// ------start after here-------
// function runGame() //{wrap the rest of code?} -- no
// setInterval(wait) get out with start button click
// <div id ="start_timer" onclick="clearInterval(timerVar)">Start game</div>

var timerVar = setInterval(countTimer, 1000);
var totalSeconds = 0;
function countTimer() {
   ++totalSeconds;
   var hour = Math.floor(totalSeconds /3600);
   var minute = Math.floor((totalSeconds - hour*3600)/60);
   if (minute < 10) {minute = "0" + minute};
   var seconds = totalSeconds - (hour*3600 + minute*60);
   if (seconds < 10) {seconds = "0" + seconds};
   document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
}

let pairs = deckSize/2;
let matched = 0;
// console.log(matched + ' ' + pairs);

function buildDeck(deckSize){
    let deck = [];
    for (var i = 0; i < deckSize/2; i++) {
      deck.push(i + 1);
      deck.push(i + 1);
      // pairs += 1;
    }
    // console.log(deck);
    return deck;
}
// console.log(matched + ' ' + pairs);

function shuffle (deckParam) {
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
let cardDeck = shuffle(buildDeck(deckSize));

// celtic knots folder(15) = ./CelticKnots/
// let imageFolder = document.getElementsByTagName
// holds a string = file path ex: ""./images/""
let imgArray = [];
function buildImgArray(imageFolder, imageFile, cardPairs, imgType) {
  let randomNumber = 0;
  let randomNumberArray = [];
  for (var i = 0; i < cardPairs; i++) {
    randomNumber = Math.floor(Math.random() * 27);
    if ((randomNumberArray.includes(randomNumber)===false)&&randomNumber!=0) {
      randomNumberArray.push(randomNumber);
    }
    else {
      i -=1;
    }
  }
  for (var i = 0; i < cardPairs; i++) {
    imgArray.push("./"+imageFolder+"/"+imageFile+"-"+randomNumberArray[i]+"."+imgType+"");
  }
}
buildImgArray("CelticKnots", "Celtic-knot", pairs, "jpg");
console.log(imgArray);

// TODO: replace inject with DOM target.
heartImgArray = [
  "./Hearts/Empty-heart.png", "./Hearts/Half-heart.png", "./Hearts/Full-heart.png"
]
let totalHearts = healthMeterStart/2;
// keeps adding hearts - need to seperate build and update?
let heart = [];
function createHearts() {
  for (var i = 0; i < totalHearts; i++) {
    heart[i] = document.createElement("img");
    healthM.appendChild(heart[i]);
    heart[i].setAttribute("src", heartImgArray[2]);
  }
}
createHearts();

function updateHearts() {
  let restAreEmpty = false;
  let h = 0;
  for (var i = 0; i < totalHearts; i++) {
    if (restAreEmpty) {
      heart[i].setAttribute("src", heartImgArray[0]);
    }
    else {
      h +=1;
      if (healthMeter > h*(heartImgArray.length-1)) {
        heart[i].setAttribute("src", heartImgArray[2]);
      }
      else {
        if (healthMeter === h*(heartImgArray.length-1)) {
          heart[i].setAttribute("src", heartImgArray[2]);
        }
        if (healthMeter === (h*(heartImgArray.length-1))-1) {
        heart[i].setAttribute("src", heartImgArray[1]);
        }
        restAreEmpty = true;
      }
    }
  }
}
updateHearts();

let cardTable = document.querySelector( "main > ul" );
for (var i = 0; i < cardDeck.length; i++) {
  let card = document.createElement("li");
  let cardImage = document.createElement("img");
  cardTable.appendChild(card);
  card.appendChild(cardImage);
  cardImage.setAttribute("src", "./CelticKnots/Celtic-knot-black.jpg");
  cardImage.setAttribute("class", "back-side");
  cardImage.setAttribute("ID", cardDeck[i]);
  // let cardImage = document.createTextNode(cardDeck[i]);
  // card.appendChild(cardImage);
  // card.setAttribute("ID", cardDeck[i]);
  // card.setAttribute("class", "back-side");
  // document.getElementsByTagName('li')[i].setAttribute("background-image", "src='./CelticKnots/Celtic-knot-black.jpg'");
  // document.locate("li img").setCSS("background-image", "./CelticKnots/"+[i]+".jpg")
}

// wrap in a loop or map--------
let cardClassName = "back-side";
let cardIdName = "cardDeck[i]";
let backSideImg = "back-side-img";
let cardImg = "cardImage[i]"

let cardLiteral = `
<li class="${cardClassName}" id="${cardIdName}">
  <img src="${cardImg}" alt="">
</li>`
// -------
//
// let stringTargetFile = `
// "./${imgFolder}/${pictureName}+e.target.id+${imgType}"
// `
// imgFolder = CelticKnots,

let flippedCards = [];
let flippedCardsId = [];
let pickedCard = document.querySelector("#list-table");
pickedCard.addEventListener("click", flipCardFxn, false);
function flipCardFxn(e) {
    if ((e.target.classList.value === "back-side") && (flippedCards.length <= 1)) {
      e.target.classList.remove("back-side");
      e.target.classList.add("visible");
      flippedCards.push(e.target);
      flippedCardsId.push(e.target.id);
      console.log(e.target);
      spinFlipped(e.target);
      compareCards();
    }
}

function compareCards() {
  if (flippedCardsId.length >= 2) {
    if (flippedCardsId[0] === flippedCardsId[1]) {
      let secondCardShows = setTimeout(function() {
      let match = document.getElementsByClassName("visible");
      while (match.length > 0) {
        match[0].classList.add("matched");
        match[0].classList.remove("visible");
      }
      flippedCardsId = [];
      flippedCards = [];
      }, 1000);
      matched += 1;
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
      }, 3000);
      healthMeter -= 1;
      updateHearts();
    }
    checkWinLose(matched, cardPairs);
  }
  console.log(matched + ' ' + cardPairs);
}

function changeImages(theCard) {
  console.log(theCard);
  if (theCard.classList.value === "visible") {
    theCard.setAttribute("src", imgArray[theCard.id-1]);
  }
  if (theCard.classList.value === "back-side") {
  theCard.setAttribute("src", "./CelticKnots/Celtic-knot-black.jpg");
  }
}

// Ha ha ha ha ha! this is badass!!
function spinFlipped(theCard) {
    console.log("flipping"+theCard);
    let degrees = 180;
    let flip = setInterval(frame,10);
    function frame() {
      if(degrees === 90){
        if (theCard.classList.value === "visible") {
        theCard.setAttribute("src", imgArray[theCard.id-1]);
        }
        if (theCard.classList.value === "back-side") {
        theCard.setAttribute("src", "./CelticKnots/Celtic-knot-black.jpg");
        }
      }
      if(degrees <= 0){
        clearInterval(flip);
      }
      else{
        degrees--;
        console.log(theCard);
        theCard.style.transform = "rotateY("+degrees+"deg)"
      }
    }
}

function checkWinLose(m, p) {
  console.log("Matched = " + m + "  " + "cardPairs = " + p);
  if (m === p) {
    // want to record time to complete -- tries left -- high scores -- points -- name?
    alert("You WIN!! \n With "+healthMeter+" moves left!");
    // stop timer
    // enter your name
  }
  if (healthMeter === 0) {
    alert("You Lose!!\n You made " + pairs + "pairs.");
  }
}
