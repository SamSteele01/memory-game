// Need to: create a title
// pick a size of the deck --> dropdown with options --> generate table
// have cards numbered --> randomly placed
// link numbers to pictures/images, also random
// buttons in the header: start new game, pause.
// header needs "health" meter = number of tries <-- changes with difficulty

// For test/build. come back later and have multiple deckSizes
let deckSize = 24;
// need to create a health meter - want a bar like on Outthere
let healthMeter = 10;
let headerItems = document.getElementById('header-items');
// healthMeter is not updating
headerItems.innerHTML = "Health meter " + healthMeter;

// variables to determine a win
let pairs = 0;
let matched = 0;

function buildDeck(deckSize){
    let deck = [];
    for (var i = 0; i < deckSize/2; i++) {
      deck.push(i + 1);
      deck.push(i + 1);
      pairs += 1;
    }
    console.log(deck);
    return deck;
}

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
  console.log(deckParam);
  return deckParam;
}

let cardDeck = shuffle(buildDeck(deckSize));

// need to assign images to cards by number. Return array of objects.

let cardTable = document.querySelector( "main > ul" );
for (var i = 0; i < cardDeck.length; i++) {
  // create nodes
  let card = document.createElement("li");
  // let cardFace = document.createElement("p");
  let cardImage = document.createTextNode(cardDeck[i]);
  // link nodes
  cardTable.appendChild(card);
  // card.appendChild(cardFace);
  card.appendChild(cardImage);
  // need to setAttribute for listitems, to give each card a unique ID.
  card.setAttribute("ID", cardDeck[i]);
  card.setAttribute("class", "back-side");
}

let flippedCards = [];

function flipCardFxn(e) {
  console.log(e.target.classList.value);
    if (e.target.classList.value === "back-side") {
      console.log(true);
      e.target.classList.remove("back-side");
      e.target.classList.add("visible");
      flippedCards.push(e.target.id);
      // testing
      console.log(flippedCards);
      if(e.target && e.target.nodeName == "LI") {
        console.log(e.target.id + " was clicked");
        // console.log(e.target.nodeName);
      }
    // setTimeout(compareCards(), 2000);
    compareCards();
  }
}

let pickedCard = document.querySelector("#list-table");
pickedCard.addEventListener("click", flipCardFxn, false);

// need to lockout clicking cards that are already clicked or flipped
function compareCards() {
  // setTimeout(function(), 2000);
  if (flippedCards.length >= 2) {
    console.log("compare");
    if (flippedCards[0] === flippedCards[1]) {
      console.log("match");
      let match = document.getElementsByClassName("visible");
      while (match.length > 0) {
        match[0].classList.add("matched");
        match[0].classList.remove("visible")
        flippedCards = [];
        matched += 1;
      }

    }
    else {
      setTimeout(function() {
        console.log("no match");
      let purge = document.getElementsByClassName("visible");
      while (purge.length > 0) {
        purge[0].classList.add("back-side");
      purge[0].classList.remove("visible");
      }
      }, 3000);
      flippedCards = [];
      healthMeter -= 1;
      headerItems.innerHTML = "Health meter " + healthMeter;
      console.log(healthMeter + "tries left");
    }
  }
  checkWinLose();
}

function checkWinLose(matched, pairs) {
  if (matched === pair) {
    // win!! - window pops up
  }
  if (healthMeter === 0) {
    // lose!! - window pops up
  }
}
