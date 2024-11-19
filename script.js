const cardsArray = [
  'images/adem.jpg', 'images/dhia.jpg', 'images/halim.jpg', 'images/jmal.jpg',
  'images/sfar.jpg', 'images/boussabat.jpg', 'images/kabil.jpg', 'images/ilyes.jpg',
  'images/adem.jpg', 'images/dhia.jpg', 'images/halim.jpg', 'images/jmal.jpg',
  'images/sfar.jpg', 'images/boussabat.jpg', 'images/kabil.jpg', 'images/ilyes.jpg',
];

const gameBoard = document.querySelector('.memory-game');
const scoreDisplay = document.getElementById('score');
const movesDisplay = document.getElementById('moves');
const winMessage = document.getElementById('win-message');
const restartBtn = document.getElementById('restart-btn');

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let moves = 0;

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}


function createCards() {
  const shuffledCards = shuffle(cardsArray);
  shuffledCards.forEach(image => {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.innerHTML = `
      <div class="card-face front-face" style="background-image: url(${image})"></div>
      <div class="card-face back-face">?</div>
    `;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });

  
  revealAllCards();
}


function revealAllCards() {
  const allCards = document.querySelectorAll('.memory-card');
  allCards.forEach(card => card.classList.add('flip'));

  setTimeout(() => {
    allCards.forEach(card => card.classList.remove('flip'));
  }, 3000); 
}


function flipCard() {
  if (lockBoard || this === firstCard || this.classList.contains('flip')) return;

  this.classList.add('flip');
  if (!firstCard) {
    firstCard = this;
    return;
  }
  secondCard = this;
  checkMatch();
  moves++;
  movesDisplay.textContent = moves;
}


function checkMatch() {
  const isMatch =
    firstCard.querySelector('.front-face').style.backgroundImage ===
    secondCard.querySelector('.front-face').style.backgroundImage;

  if (isMatch) {
    disableCards();
    matchedPairs++;
    scoreDisplay.textContent = matchedPairs * 10;
    if (matchedPairs === cardsArray.length / 2) showWinMessage();
  } else {
    unflipCards();
  }
}


function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetTurn();
}


function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetTurn();
  }, 1000);
}


function resetTurn() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}


function showWinMessage() {
  setTimeout(() => {
    winMessage.classList.add('active');
  }, 500);
}


function restartGame() {
  gameBoard.innerHTML = '';
  matchedPairs = 0;
  moves = 0;
  scoreDisplay.textContent = '0';
  movesDisplay.textContent = '0';
  winMessage.classList.remove('active');
  createCards();
}


createCards();
restartBtn.addEventListener('click', restartGame);
