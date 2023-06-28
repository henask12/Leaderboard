import constants from "./env.js";

const { BASE_URL, GAME_ID } = constants();

const refreshScores = async () => {
    try {
        const response = await fetch(`${BASE_URL}${GAME_ID}/scores`);
        if (response.ok) {
            const data = await response.json();
            console.log("Scores:", data);
            // Process the scores data as needed
        } else {
            console.error("Failed to retrieve scores for the game.");
        }
    } catch (error) {
        console.error("An error occurred while refreshing scores:", error);
    }
};

const refreshButton = document.getElementById("refresh");

// Add event listener to the Refresh button click event
refreshButton.addEventListener("click", () => {
    refreshScores();
});

export default refreshScores;
