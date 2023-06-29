import constants from "./env.js";

const { BASE_URL, GAME_ID } = constants();

const pageSize = 5; // Number of scores to display per page
let currentPage = 1; // Current page number

let scoresData = []; // Array to store all scores data

const refreshScores = () => {
    try {
        // Get the scores data for the current page
        const scoresPerPage = scoresData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

        // Get the table body element
        const tableBody = document.querySelector("tbody");

        // Clear the table body
        tableBody.innerHTML = "";

        // Iterate over the scores data and create table rows
        scoresPerPage.forEach((score, index) => {
            // Create a new table row
            const row = document.createElement("tr");

            // Create table cells for the index, name, and score
            const indexCell = document.createElement("td");
            const nameCell = document.createElement("td");
            const scoreCell = document.createElement("td");

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
        const paginationInfo = document.getElementById("pagination-info");
        const startScore = (currentPage - 1) * pageSize + 1;
        const endScore = Math.min(currentPage * pageSize, scoresData.length);
        const totalScores = scoresData.length;
        const totalPages = Math.ceil(scoresData.length / pageSize);

        paginationInfo.textContent = `Showing ${startScore} - ${endScore} of ${totalScores} (Page ${currentPage} out of ${totalPages})`;
    } catch (error) {
        throw new Error("An error occurred while refreshing scores:", error);
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
            throw new Error("Failed to retrieve scores for the game.");
        }
    } catch (error) {
        throw new Error("An error occurred while fetching scores:", error);
    }
};

const refreshButton = document.getElementById("refresh");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

// Add event listener to the Refresh button click event
refreshButton.addEventListener("click", () => {
    refreshScores();
});

// Add event listener to the Prev button click event
prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        refreshScores();
    }
});

// Add event listener to the Next button click event
nextButton.addEventListener("click", () => {
    const totalPages = Math.ceil(scoresData.length / pageSize);
    if (currentPage < totalPages) {
        currentPage++;
        refreshScores();
    }
});

// Add event listener to the Refresh On Document load
document.addEventListener("DOMContentLoaded", () => {
    fetchScoresData();
});

export default refreshScores;
