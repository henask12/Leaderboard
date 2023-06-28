import constants from './env.js';

const { BASE_URL, GAME_ID } = constants();

const refreshScores = async () => {
  try {
    const response = await fetch(`${BASE_URL}${GAME_ID}/scores`);
    if (response.ok) {
      const data = await response.json();

      // Get the table body element
      const tableBody = document.querySelector('tbody');

      // Clear the table body
      tableBody.innerHTML = '';

      // Iterate over the scores data and create table rows
      data.result.forEach((score) => {
      // Create a new table row
        const row = document.createElement('tr');

        // Create table cells for the name and score
        const nameCell = document.createElement('td');
        const scoreCell = document.createElement('td');

        // Set the text content of the cells
        nameCell.textContent = score.user;
        scoreCell.textContent = score.score;

        // Append the cells to the row
        row.appendChild(nameCell);
        row.appendChild(scoreCell);

        // Append the row to the table body
        tableBody.appendChild(row);
      });
    } else {
      throw new Error('Failed to retrieve scores for the game.');
    }
  } catch (error) {
    throw new Error('An error occurred while refreshing scores:', error);
  }
};

const refreshButton = document.getElementById('refresh');

// Add event listener to the Refresh button click event
refreshButton.addEventListener('click', () => {
  refreshScores();
});

export default refreshScores;
