// Selecting the elements
const inputNumber = document.querySelector("#inputNumber");
const addButton = document.querySelector(".addNumberPly");
const spin = document.querySelector(".spin");
const reset = document.querySelector(".reset");
const playerPoints = document.querySelector(".playerPoints");
const playerList = document.querySelector(".playerList");
const playerNumberDisplay = document.querySelector(".playerNumber");

let players = [];
let maxPlayers = 0;

// Save the player data to LocalStorage
const saveToLocalStorage = () => {
  localStorage.setItem("players", JSON.stringify(players));
};

// Load data from LocalStorage if it exists
const loadFromLocalStorage = () => {
  const savedPlayers = JSON.parse(localStorage.getItem("players")) || [];
  players = savedPlayers;
  maxPlayers = players.length;

  // Update display
  playerNumberDisplay.textContent = maxPlayers;
  renderPlayers();
};

// Render the list of players
const renderPlayers = () => {
  playerList.innerHTML = players
    .map(
      (player, index) => `
      <li>
        <span class="generatedNumbers">${index + 1}</span>
        <span class="playerName">${player.name || "Unnamed Player (Spin to Get this Place)"}</span>
      </li>
    `
    )
    .join("");
};

// Add button functionality to set the number of players
addButton.addEventListener("click", () => {
  const numberOfPlayers = parseInt(inputNumber.value, 10);

  if (isNaN(numberOfPlayers) || numberOfPlayers <= 0) {
    alert("Please enter a valid number of players!");
    return;
  }

  // Update the number of players
  maxPlayers = numberOfPlayers;
  playerNumberDisplay.textContent = maxPlayers;

  // Reset players array and create a new list
  players = Array.from({ length: maxPlayers }, (_, index) => ({
    id: index + 1,
    name: null,
  }));

  saveToLocalStorage();
  renderPlayers();
});

// Spin functionality
const spinGame = () => {
  if (players.length === 0) {
    alert("Please define players first using the Add button!");
    return;
  }

  // Filter out players who already have names
  const availablePlayers = players.filter((player) => !player.name);

  if (availablePlayers.length === 0) {
    alert("All players have been assigned names!");
    return;
  }

  // Generate a random player from available ones
  const randomIndex = Math.floor(Math.random() * availablePlayers.length);
  const selectedPlayer = availablePlayers[randomIndex];

  // Display the generated number
  playerPoints.textContent = selectedPlayer.id;

  // Prompt the user to enter the player's name
  const playerName = prompt(
    `Generated Number: ${selectedPlayer.id}\nEnter the name for Player ${selectedPlayer.id}:`
  );

  if (playerName) {
    // Update the player's name and save
    players[selectedPlayer.id - 1].name = playerName;
    saveToLocalStorage();
    renderPlayers();
  } else {
    alert("Player name cannot be empty!");
  }
};

// Reset function to clear everything
const resetGame = () => {
  players = [];
  maxPlayers = 0;
  playerPoints.textContent = "-";
  playerList.innerHTML = "";
  inputNumber.value = "";
  playerNumberDisplay.textContent = "0"; 
  localStorage.clear(); 
  alert("Game has been reset!");
};

// Event Listeners
spin.addEventListener("click", spinGame);
reset.addEventListener("click", resetGame);

// Load data on page load
window.addEventListener("DOMContentLoaded", loadFromLocalStorage);
