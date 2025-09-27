// 1. GAME STATE & DOM ELEMENTS
let [hasFlippedCard, lockBoard] = [false, false]
let [firstCard, secondCard] = [null, null]
let [timer, seconds] = [null, 0] // Timer variables
let matchesFound = 0 // Tracks the number of successful matches (needed for win check)

const gameBoard = document.querySelector(".memory-game")
const totalPairs = 12 // 24 cards total

// 2. CARD DATA
const cardData = [
  { name: "messi", imagePath: "images/messi.jpg" },
  { name: "serena", imagePath: "images/serena.jpg" },
  { name: "beyonce", imagePath: "images/beyonce.jpg" },
  { name: "dwayne_johnson", imagePath: "images/dwayne_johnson.jpg" },
  { name: "taylor_swift", imagePath: "images/taylor_swift.jpg" },
  { name: "cristiano_ronaldo", imagePath: "images/cristiano_ronaldo.jpg" },
  { name: "kevin_hart", imagePath: "images/kevin_hart.jpg" },
  { name: "ice_cube", imagePath: "images/ice_cube.jpg" },
  { name: "kfc_owner", imagePath: "images/kfc_owner.jpg" },
  { name: "oprah_winfrey", imagePath: "images/oprah_winfrey.jpg" },
  { name: "keanu_reeves", imagePath: "images/keanu_reeves.jpg" },
  { name: "rihanna", imagePath: "images/rihanna.jpg" },
]
const allCards = cardData.concat(cardData)

// 3. GAME LOGIC FUNCTIONS

// Fisher-Yates shuffle algorithm
function shuffleCards() {
  for (let i = allCards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[allCards[i], allCards[j]] = [allCards[j], allCards[i]]
  }
}

// Timer functions
function startTimer() {
  clearInterval(timer)
  timer = setInterval(() => {
    seconds++
    document.getElementById("timer").textContent = `Time: ${seconds}s`
  }, 1000)
}

function stopTimer() {
  clearInterval(timer)
}

// Function to create, build, and attach all 24 cards
function createCards() {
  gameBoard.innerHTML = ""
  allCards.forEach((card) => {
    const cardElement = document.createElement("div")
    cardElement.classList.add("memory-card")
    cardElement.dataset.name = card.name

    // Using Template Literal for clean HTML injection
    cardElement.innerHTML = `
      <img class="front-face" src="${card.imagePath}" alt="${card.name}">
      <div class="back-face">TRY AGAIN!</div>
    `
    cardElement.addEventListener("click", flipCard)
    gameBoard.appendChild(cardElement)
  })
}

// Handles the card flip event
function flipCard() {
  if (lockBoard || this === firstCard) return
  this.classList.add("flip")

  if (!hasFlippedCard) {
    // First card clicked
    ;[hasFlippedCard, firstCard] = [true, this]
    return
  }
  // Second card clicked
  secondCard = this
  firstCard.dataset.name === secondCard.dataset.name
    ? disableCards()
    : unflipCards()
}

// Handles a successful match
function disableCards() {
  matchesFound++ // Increment matches
  firstCard.removeEventListener("click", flipCard)
  secondCard.removeEventListener("click", flipCard)
  resetBoard()
  checkForWin() // Check for win after every successful match
}

// Handles a mismatch (flips cards back over)
function unflipCards() {
  lockBoard = true
  setTimeout(() => {
    firstCard.classList.remove("flip")
    secondCard.classList.remove("flip")
    resetBoard()
  }, 1000) // 1-second delay to show the cards
}

// Resets state variables for the next turn
function resetBoard() {
  ;[hasFlippedCard, lockBoard, firstCard, secondCard] = [
    false,
    false,
    null,
    null,
  ]
}

// Checks if the player has won the game
function checkForWin() {
  if (matchesFound === totalPairs) {
    stopTimer()
    document.getElementById("play-again-button").style.display = "block"
    alert(`Congratulations! You won in ${seconds} seconds!`)
  }
}

// Function to restart the game
function restartGame() {
  resetBoard()
  matchesFound = 0 // Reset match count
  seconds = 0 // Reset seconds
  document.getElementById("timer").textContent = `Time: 0s`
  shuffleCards()
  createCards()
  startTimer() // Restart the timer
  document.getElementById("play-again-button").style.display = "none"
}

// Toggles Dark Mode (called by the button event listener)
function setupToggles() {
  // Dark Mode Toggle Logic
  document.getElementById("dark-mode-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode")
  })

  // Add event listener for the Play Again button
  document
    .getElementById("play-again-button")
    .addEventListener("click", restartGame)

  // Placeholder for mode toggle (you can implement the swap later)
  document.getElementById("mode-toggle").addEventListener("click", (e) => {
    alert("Mode toggle functionality is ready to be implemented!")
  })
}

// 4. INITIALIZATION (Starts the game)
setupToggles()
shuffleCards()
createCards()
startTimer()
