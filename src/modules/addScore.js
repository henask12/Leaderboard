import constants from './env.js';
import refreshScores from './refreshSocres.js';

const { BASE_URL, GAME_ID } = constants();
// Function to submit the score
const submitScore = async (gameId, nameInput, scoreInput) => {
  const myHeaders = new Headers();

  myHeaders.append('Content-Type', 'application/json');

  const body = JSON.stringify({
    user: nameInput,
    score: parseInt(scoreInput, 10),
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body,
    redirect: 'follow',
  };

  try {
    const response = await fetch(`${BASE_URL}${gameId}/scores/`, requestOptions);
    if (response.ok) {
    // Reset the form and reload the page
      setTimeout(() => {
        refreshScores();
      }, 1000);
    } else {
      throw new Error('Failed to submit the score.');
    }
  } catch (error) {
    throw new Error(error);
  }
};

// Get the form and its input elements
const addScoresForm = document.getElementById('add-scores-form');
const nameInput = document.getElementById('name-input');
const scoreInput = document.getElementById('score-input');

// Add event listener to the form submit event
addScoresForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = nameInput.value;
  const score = parseInt(scoreInput.value, 10);

  // Call the submitScore function with the game ID, player name, and score
  await submitScore(GAME_ID, name, score);

  nameInput.value = '';
  scoreInput.value = '';
});
