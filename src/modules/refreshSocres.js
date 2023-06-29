import constants from './env.js;

const { BASE_URL, GAME_ID } = constants();

const pageSize = 5; // Number of scores to display per page
let currentPage = 1; // Current page number
let sortByName = ''; // Sorting order for name (empty for default)
let sortByScore = ''; // Sorting order for score (empty for default)

let scoresData = []; // Array to store all scores data

const refreshScores = () => {
    try {
        // Apply sorting to scores data
        let sortedScores = scoresData.slice();

        if (sortByName === 'asc') {
            sortedScores.sort((a, b) => a.user.localeCompare(b.user));
        } else if (sortByName === 'desc') {
            sortedScores.sort((a, b) => b.user.localeCompare(a.user));
        }

        if (sortByScore === 'asc') {
            sortedScores.sort((a, b) => a.score - b.score);
        } else if (sortByScore === 'desc') {
            sortedScores.sort((a, b) => b.score - a.score);
        }

        // Get the scores data for the current page
        const scoresPerPage = sortedScores.slice((currentPage - 1) * pageSize, currentPage * pageSize);

        // Get the table body element
        const tableBody = document.querySelector('tbody');

        // Clear the table body
        tableBody.innerHTML = '';

        // Iterate over the scores data and create table rows
        scoresPerPage.forEach((score, index) => {
            // Create a new table row
            const row = document.createElement('tr');

            // Create table cells for the index, name, and score
            const indexCell = document.createElement('td');
            const nameCell = document.createElement('td');
            const scoreCell = document.createElement('td');

            // Set the text content of the cells
            indexCell.textContent = (currentPage - 1) * pageSize + index + 1;
            nameCell.textContent = score.user;
            scoreCell.textContent = score.score;

            // Append the cells to the row
            row.appendChild(indexCell);
            row.appendChild(nameCell);
            row.appendChild(scoreCell);

            // Append the row to the table body
            tableBody.appendChild(row);
        });

        // Update the pagination information
        const paginationInfo = document.getElementById('pagination-info');
        const startScore = (currentPage - 1) * pageSize + 1;
        const endScore = Math.min(currentPage * pageSize, sortedScores.length);
        const totalScores = sortedScores.length;
        const totalPages = Math.ceil(sortedScores.length / pageSize);

        paginationInfo.textContent = `Showing ${startScore} - ${endScore} of ${totalScores} (Page ${currentPage}/${totalPages})`;
    } catch (error) {
        throw new Error('An error occurred while refreshing scores:', error);
    }
};

const fetchScoresData = async () => {
    try {
        const response = await fetch(`${BASE_URL}${GAME_ID}/scores`);
        if (response.ok) {
            const data = await response.json();
            scoresData = data.result;
            refreshScores();
        } else {
            throw new Error('Failed to retrieve scores for the game.');
        }
    } catch (error) {
        throw new Error('An error occurred while fetching scores:', error);
    }
};

const refreshButton = document.getElementById('refresh');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const nameSortButton = document.getElementById('sort-name');
const scoreSortButton = document.getElementById('sort-score');

// Add event listener to the Refresh button click event
refreshButton.addEventListener('click', () => {
    currentPage = 1; // Reset current page to 1
    location.reload();
});

// Add event listener to the Prev button click event
prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        refreshScores();
    }
});

// Add event listener to the Next button click event
nextButton.addEventListener('click', () => {
    const totalPages = Math.ceil(scoresData.length / pageSize);
    if (currentPage < totalPages) {
        currentPage++;
        refreshScores();
    }
});

// Add event listener to the Name Sort button click event
nameSortButton.addEventListener('click', () => {
    if (sortByName === '') {
        sortByName = 'asc';
    } else if (sortByName === 'asc') {
        sortByName = 'desc';
    } else if (sortByName === 'desc') {
        sortByName = '';
    }
    refreshScores();
});

// Add event listener to the Score Sort button click event
scoreSortButton.addEventListener('click', () => {
    if (sortByScore === '') {
        sortByScore = 'asc';
    } else if (sortByScore === 'asc') {
        sortByScore = 'desc';
    } else if (sortByScore === 'desc') {
        sortByScore = '';
    }
    refreshScores();
});

// Fetch scores data on document load
document.addEventListener('DOMContentLoaded', fetchScoresData);

export default refreshScores;
s