'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1'); //for class
const score0El = document.querySelector('#score--0'); //for id
const score1El = document.getElementById('score--1'); 
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl1 = document.querySelector('.dice1');
const diceEl2 = document.querySelector('.dice2');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;


// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl1.classList.add('hidden');
  diceEl2.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice1 = Math.trunc(Math.random() * 6) + 1;
    const dice2 = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl1.classList.remove('hidden');
    diceEl2.classList.remove('hidden');
    diceEl1.src = `dice-${dice1}.png`;
    diceEl2.src = `dice-${dice2}.png`;

    // 3. Check for rolled 1
    if (dice1 !== 1 && dice2 !== 1) {
      // Add dice to current score
      currentScore += dice1 + dice2;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});


btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 200
    if (scores[activePlayer] >= 200) {
      // Finish the game
      playing = false;
      diceEl1.classList.add('hidden');
      diceEl2.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
