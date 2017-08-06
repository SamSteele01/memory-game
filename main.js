// pick a size of the deck --> dropdown with options --> generate table
// link numbers to pictures/images, also random
// buttons in the header: start new game, pause.
// header needs "health" meter = number of tries <-- changes with difficulty
// TODO: icons => array -random-> array of decksize/2.length. Match to cards
// There are 292 images in the icons folder
// healthBar images
// decksize dropdown => grid layouts @media ??
// image for back-side of cards
// difficulty dropdown => healthMeter, time held after noMatch
// high scores - before game - play game button

// For test/build. come back later and have multiple deckSizes
// need to create a health meter - want a bar like on Outthere-image file
let deckSize = 24;
let healthMeter = 24;
let healthMeterStart = healthMeter;
let headerItems = document.getElementById('header-items');
let timer = document.createElement("div");
let healthM = document.createElement("div");
let startButton = document.createElement("button");
let difficultyMenu = document.createElement("select");
let gameSize = document.createElement("select");
// let style = select images folder.
let highScores = document.createElement("div");
headerItems.appendChild(healthM);
headerItems.appendChild(timer);
headerItems.appendChild(startButton);
headerItems.appendChild(difficultyMenu);
headerItems.appendChild(gameSize);
headerItems.appendChild(highScores);
timer.setAttribute("id", "timer");
healthM.innerHTML = "Health meter " + healthMeter;
startButton.innerHTML = "Start";

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

// function healthMeterEnergyImagesArray(number) {
//   // make array of totalMismatches.length with different classNames to each target a different CSS style
//   let arrayToReturn;
//   for (var i = 0; i < number; i++) {
//     []
//   }
// }

// <div id="timer"></div>

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

function buildDeck(deckSize, pairs){
    let deck = [];
    for (var i = 0; i < deckSize/2; i++) {
      deck.push(i + 1);
      deck.push(i + 1);
      pairs += 1;
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

// celtic knots folder(15) = ../CelticKnots/
// let imageFolder = document.getElementsByTagName
// holds a string = file path ex: ""../images/""
// function buildImgArray(imageFolder, pairs) {
//
//   for (var i = 0; i < pairs; i++) {
//     // images/ => random => (array.length = pairs) | array[i] = fileName
//   }
// }

// need to assign images to cards by number. Return array of objects.

let cardTable = document.querySelector( "main > ul" );
for (var i = 0; i < cardDeck.length; i++) {
  let card = document.createElement("li");
  let cardImage = document.createElement("img");
  cardTable.appendChild(card);
  card.appendChild(cardImage);
  cardImage.setAttribute("src", "../CelticKnots/Celtic-knot-black.jpg");
  cardImage.setAttribute("class", "back-side");
  cardImage.setAttribute("ID", cardDeck[i]);
  // let cardImage = document.createTextNode(cardDeck[i]);
  // card.appendChild(cardImage);
  // card.setAttribute("ID", cardDeck[i]);
  // card.setAttribute("class", "back-side");
  // document.getElementsByTagName('li')[i].setAttribute("background-image", "src='../CelticKnots/Celtic-knot-black.jpg'");
  // document.locate("li img").setCSS("background-image", "../CelticKnots/"+[i]+".jpg")
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
// "../${imgFolder}/${pictureName}+e.target.id+${imgType}"
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
      // e.target.setAttribute("src", "../CelticKnots/Celtic-knot-"+e.target.id+".jpg");
      // lockout click listener - set to false
      console.log(e.target);
      // spinFlipped(e.target);
      spinFlipped(e.target);
      compareCards();
    }
}

function compareCards() {
  // console.log(flippedCards); [img#12.visible]
  // console.log(flippedCardsId); ["12"]
  if (flippedCardsId.length >= 2) {
    // console.log(e.target);
    if (flippedCardsId[0] === flippedCardsId[1]) {
      console.log("match");
      let match = document.getElementsByClassName("visible");
      while (match.length > 0) {
        match[0].classList.add("matched");
        match[0].classList.remove("visible");
      }
      flippedCardsId = [];
      flippedCards = [];
      matched += 1;

    }
    else {
      let noMatch = setTimeout(function() {
      let purge = document.getElementsByClassName("visible");
      while (purge.length > 0) {
        console.log(flippedCards[0]);
        purge[0].classList.add("back-side");
        purge[0].classList.remove("visible");
        spinFlipped(flippedCards[0]);
        flippedCards.shift()
        // purge[0].setAttribute("src", "../CelticKnots/Celtic-knot-black.jpg");
        // spinFlipped(purge[0]); only spins one back
        // spinFlipped(flippedCards[0]);
      }
      flippedCardsId = [];
      flippedCards = [];
      }, 3000);
      healthMeter -= 1;
      // document.getElementsByTagName('div').setAttribute("width", (100/healthMeterStart*healthMeter)+"%");
      healthM.innerHTML = "Health meter " + healthMeter;
      // console.log(healthMeter + "tries left");
    }
    checkWinLose(matched, pairs);
  }
  // console.log(matched + ' ' + pairs);
}

function changeImages(theCard) {
  // console.log(e.target); --- uncaught ReferenceError: e is not defined
  console.log(theCard); /*id#*/
  if (theCard.classList.value === "visible") {
    theCard.setAttribute("src", "../CelticKnots/Celtic-knot-"+theCard.id+".jpg");
  }
  // console.log(document.getElementById(theCard));
  // console.log(document.getElementsByTagName("img"));
  if (theCard.classList.value === "back-side") {
  theCard.setAttribute("src", "../CelticKnots/Celtic-knot-black.jpg");
  }
}

// Ha ha ha ha ha! this is badass!!
function spinFlipped(theCard) {
    console.log("flipping"+theCard);
    // let bulba = this;
    let degrees = 180;
    let flip = setInterval(frame,10);
    function frame() {
      if(degrees === 90){
        if (theCard.classList.value === "visible") {
        theCard.setAttribute("src", "../CelticKnots/Celtic-knot-"+theCard.id+".jpg");
        }
        if (theCard.classList.value === "back-side") {
        theCard.setAttribute("src", "../CelticKnots/Celtic-knot-black.jpg");
        }
      }
        // let toFlip = document.getElementsByClassName("visible");
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
  console.log("Matched = " + m + "  " + "Pairs = " + p);
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
