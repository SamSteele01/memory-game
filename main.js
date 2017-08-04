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
// need to create a health meter - want a bar like on Outthere
let deckSize = 24;
let healthMeter = 10;
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

let className = "";
let headerItemLiteral = `
<li class="${className}" id="cardDeck[i]">
  <input type="text" name="" value="">`

let optionName = "";
let optionLiteral = `
<option name="sc" value="sc">${optionName}</option>`;

// startButton.addEventListener("click", runGame, false);
//
// function createSizeArray() {
//   let arrayToReturn = [];
//
// }

// function healthMeterEnergyImagesArray() {
  // link health values to images
// }

// <div id="timer"></div>
// <div id ="stop_timer" onclick="clearInterval(timerVar)">Stop time</div>

// ------start after here-------
// function runGame() //{wrap the rest of code?}

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
console.log(matched + ' ' + pairs);

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
console.log(matched + ' ' + pairs);

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
function buildImgArray(pairs) {
  for (var i = 0; i < pairs; i++) {

  }
}

// need to assign images to cards by number. Return array of objects.

let cardTable = document.querySelector( "main > ul" );
for (var i = 0; i < cardDeck.length; i++) {
  let card = document.createElement("li");
  let cardImage = document.createElement("img");
  // let cardImage = document.createTextNode(cardDeck[i]);
  cardTable.appendChild(card);
  // card.appendChild(cardImage);
  card.appendChild(cardImage);
  // card.setAttribute("ID", cardDeck[i]);
  // card.setAttribute("class", "back-side");
  // document.getElementsByTagName('li')[i].setAttribute("background-image", "src='../CelticKnots/Celtic-knot-black.jpg'");
  cardImage.setAttribute("src", "../CelticKnots/Celtic-knot-black.jpg");
  cardImage.setAttribute("class", "back-side");
  cardImage.setAttribute("ID", cardDeck[i]);
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

let flippedCards = [];

let pickedCard = document.querySelector("#list-table");
// pickedCard.addEventListener("click", flipCardFxn, true);
pickedCard.addEventListener("click", flipCardFxn, false);
function flipCardFxn(e) {
    if ((e.target.classList.value === "back-side") && (flippedCards.length <= 1)) {
      e.target.classList.remove("back-side");
      e.target.classList.add("visible");
      flippedCards.push(e.target.id);
      e.target.setAttribute("src", "../CelticKnots/Celtic-knot-"+e.target.id+".jpg");
      // lockout click listener - set to false
      // console.log("e.target.id is "+e.target.id);
      // changeImages(e.target);
      compareCards();
    }
}

function compareCards() {
  if (flippedCards.length >= 2) {
    console.log("compare");
    if (flippedCards[0] === flippedCards[1]) {
      console.log("match");
      let match = document.getElementsByClassName("visible");
      while (match.length > 0) {
        match[0].classList.add("matched");
        match[0].classList.remove("visible");
      }
      flippedCards = [];
      matched += 1;
    }
    else {
      let noMatch = setTimeout(function() {
        console.log("no match");
      let purge = document.getElementsByClassName("visible");
      while (purge.length > 0) {
      purge[0].setAttribute("src", "../CelticKnots/Celtic-knot-black.jpg");
      purge[0].classList.add("back-side");
      purge[0].classList.remove("visible");
      }
      // need to target
      flippedCards = [];
      }, 3000);
      healthMeter -= 1;
      healthM.innerHTML = "Health meter " + healthMeter;
      // console.log(healthMeter + "tries left");
    }
    checkWinLose(matched, pairs);
  }
  console.log(matched + ' ' + pairs);
}

function changeImages(id) {
  if (x.cardImage.classList.value === "visible") {
    e.target.setAttribute("src", "../CelticKnots/Celtic-knot-"+e.target.id+".jpg");
  }
}

// TODO: link to cards and images. Switch image.
// let button = document.getElementById('box');
// button.addEventListener("click",spinBulba);
// console.log(button);
 function spinFlipped() {
    console.log(this);
    let bulba = this;
    let degrees = 180;
    let id = setInterval(frame,10);
    function frame() {
      if(degrees === 90);
        // set cardImage = "img/" + imageArray[thisindex]. + ".jpg"
        let toFlip = document.getElementsByClassName("visible");
      else if(degrees <= 0){
        clearInterval(id);
      }
      else{
        degrees--;
        console.log(bulba);
        baby.style.transform = "rotateY("+degrees+"deg)"
    }
  }
}

function checkWinLose(m, p) {
  console.log("Matched = " + m + "  " + "Pairs = " + p);
  if (m === p) {
    // want to record time to complete -- tries left -- high scores -- points -- name?
    alert("You WIN!! \n With "+healthMeter+" moves left!");
    // enter your name
  }
  if (healthMeter === 0) {
    alert("You Lose!!\n You made " + pairs + "pairs.");
  }
}
