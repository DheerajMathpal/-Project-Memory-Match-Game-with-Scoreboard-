const emojis = ["🍎","🍌","🍇","🍒","🍍","🥝","🍊","🍉"];
let cards = [...emojis, ...emojis]; // duplicate for pairs
let gameBoard = document.getElementById("gameBoard");
let scoreDisplay = document.getElementById("score");
let restartBtn = document.getElementById("restartBtn");

let score = 0;
let flippedCards = [];
let matchedPairs = 0;

// Shuffle cards
cards.sort(() => 0.5 - Math.random());

// Render cards
function createBoard() {
  gameBoard.innerHTML = "";
  cards.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.innerHTML = "?"; // hidden state
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  let selected = this;
  if (flippedCards.length < 2 && !selected.classList.contains("flipped")) {
    selected.classList.add("flipped");
    selected.innerHTML = selected.dataset.emoji;
    flippedCards.push(selected);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.emoji === card2.dataset.emoji) {
    score += 10;
    matchedPairs++;
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    card1.innerHTML = "?";
    card2.innerHTML = "?";
  }
  flippedCards = [];
  scoreDisplay.textContent = score;

  if (matchedPairs === emojis.length) {
    setTimeout(() => alert("🎉 You Won! Final Score: " + score), 500);
  }
}

restartBtn.addEventListener("click", () => {
  score = 0;
  matchedPairs = 0;
  scoreDisplay.textContent = score;
  cards.sort(() => 0.5 - Math.random());
  createBoard();
});

createBoard();
