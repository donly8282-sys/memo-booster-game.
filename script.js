// Define the reward tokens with their text, class, and point value
const rewards = [
  { text: "Bronze Token – +20 Memory Points", class: "bronze", points: 20 },
  { text: "Silver Token – +50 Memory Points", class: "silver", points: 50 },
  { text: "Gold Token – +100 Memory Points", class: "gold", points: 100 },
  {
    text: "Platinum Token – +1000 Memory Points",
    class: "platinum",
    points: 1000,
  },
]

// Initialize score from localStorage or start at 0
let totalScore = parseInt(localStorage.getItem("memoScore")) || 0

// Function to update score display
function updateScoreDisplay() {
  const scoreDisplay = document.getElementById("scoreDisplay")
  scoreDisplay.textContent = `Total Memory Points: ${totalScore}`
}

// Function to earn a reward and update score
function earnReward() {
  const randomIndex = Math.floor(Math.random() * rewards.length)
  const reward = rewards[randomIndex]

  // Update score
  totalScore += reward.points
  localStorage.setItem("memoScore", totalScore)

  // Display reward
  const display = document.getElementById("rewardDisplay")
  display.innerHTML = `<div class="reward ${reward.class}">${reward.text}</div>`

  // Update score display
  updateScoreDisplay()
}

// Show initial score on page load
window.addEventListener("load", () => {
  updateScoreDisplay()
  earnReward() // Optional: show a reward immediately
})

// Button to earn another reward
document.getElementById("newRewardBtn").addEventListener("click", earnReward)
