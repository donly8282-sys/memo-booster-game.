// JavaScript: Place this in a <script> tag at the bottom of your HTML or in a separate .js file

const rewards = [
  "🥉 Bronze Token – +20 Memory Points",
  "🥈 Silver Token – +50 Memory Points",
  "🥇 Gold Token – +100 Memory Points",
  "🏆 Platinum Token – +1000 Memory Points",
]

function earnReward() {
  // Pick a random reward
  const randomIndex = Math.floor(Math.random() * rewards.length)
  const reward = rewards[randomIndex]

  // Display it on the page
  const display = document.getElementById("rewardDisplay")
  display.innerHTML = `<div class="reward">${reward}</div>`
}
