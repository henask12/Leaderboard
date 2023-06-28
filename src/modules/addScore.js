import constants from "./env.js";
import refreshScores from "./refreshSocres.js";

const { BASE_URL, GAME_ID } = constants();

// Function to submit the score
const submitScore = async (gameId, nameInput, scoreInput) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
        user: nameInput,
        score: parseInt(scoreInput, 10)
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
        redirect: "follow"
    };

    try {
        const response = await fetch(`${BASE_URL}${gameId}/scores/`, requestOptions);
        if (response.ok) {
            console.log("Score submitted successfully");
            // Reset the form and reload the page
            setTimeout(() => {
                refreshScores();
            }, 1000);
        } else {
            console.log("Error:", response.status);
            throw new Error("Failed to submit the score.");
        }
    } catch (error) {
        console.error(error);
    }
};

// Get the form and its input elements
const addScoresForm = document.getElementById("add-scores-form");
const playerNameInput = document.getElementById("name-input");
const scoreInput = document.getElementById("score-input");

// Add event listener to the form submit event
addScoresForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form submission
    debugger;
    // Get the player name and score from the input elements
    const playerName = playerNameInput.value;
    const score = parseInt(scoreInput.value);

    // Call the submitScore function with the game ID, player name, and score
    await submitScore(GAME_ID, playerName, score);

    // Clear the input fields after submission
    playerNameInput.value = "";
    scoreInput.value = "";
});
