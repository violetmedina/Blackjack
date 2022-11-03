const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");
const dealButton = document.getElementById("deal-button");
const hitButton = document.getElementById("hit-button");
const standButton = document.getElementById("stand-button");
const playerHandArr = [];
const dealerHandArr = [];
const deck = [];
const suits = ["hearts", "spades", "clubs", "diamonds"];
const ranks = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
let randomCard;
let playerTotal = 0;

const makeDeck = (rank, suit) => {
  const card = {
    rank: rank,
    suit: suit,
    pointValue: typeof(rank) === "string" ? 10 : rank,
    image: `./images/${rank}_of_${suit}.png`
  };
  deck.push(card);
};

for (let suit of suits) {
  for (const rank of ranks) {
    makeDeck(rank, suit);
  }
}

const shuffledDeck = shuffleDeck(deck)
console.log(shuffledDeck)

function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let swapIdx = Math.trunc(Math.random() * deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp;
  }
  return deck;
}

function DealCard() {
  // let rng = Math.floor(Math.random() * (shuffledDeck.length))
  // let res = shuffledDeck[rng];
  // shuffledDeck.splice(rng,1)
  let res = shuffledDeck.pop()
  return res
}

function GiveDealerCard() {
  let dealerCard = document.createElement('img');
  randomCard = DealCard();
  dealerCard.src = randomCard.image;
  dealerHandArr.push(dealerCard);

  for (card of dealerHandArr) {
    dealerHand.append(card);
  }
}

function GivePlayerCard() {
  let playerCard = document.createElement('img');
  randomCard = DealCard();
  playerCard.src = randomCard.image;
  playerHandArr.push(playerCard);
  for (card of playerHandArr) {
    playerHand.append(card);
  }
  // if (randomCard.pointValue = "ace"){
  //   playerTotal = hasAce(randomCard.pointValue, playerTotal);
  // } else {
  //   playerTotal += randomCard.pointValue;
  // }
  playerTotal += randomCard.pointValue;
  console.log("playerTotal", playerTotal);
}

function hasAce(value, total) {
  //
}


window.addEventListener("DOMContentLoaded", () => {
  // Execute after page load
  let count = 0;
  hitButton.disabled = true;
  standButton.disabled = true;
  dealButton.addEventListener("click", e => {
    standButton.disabled = false
    // randomCard = DealCard()
    while (count < 2) {
      GivePlayerCard(randomCard);
      GiveDealerCard(randomCard);
      count++;
    }
    dealButton.disabled = true;
    hitButton.disabled = false;
    standButton.disabled = false;
  }) // end of deal event listener

  standButton.addEventListener("click", e => {
    standButton.disabled = true;
    hitButton.disabled = true;
  })

  hitButton.addEventListener("click", e => {
    if (standButton.disabled == false) {
      GivePlayerCard(randomCard);
    }
  }) // end of hit event listener
}); // end of window


/*
//* PROCESS
- Create deck of cards
- Shuffle deck of cards
- Stand and hit buttons disabled
- Deal two cards to each player
- Stand and hit buttons to enabled
- Allow player to hit
- Calculate player points
  - if over 21 set up bust/lost notification
  - if under 21 move on to dealer
- Dealer hits based off basic strategy
- If dealer busts set up dealer busts/win notification
- Restart game button
*/
