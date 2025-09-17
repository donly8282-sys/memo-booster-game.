const rewards = [
  "🥉 Bronze Token – +20 Memory Points",
  "🥈 Silver Token – +50 Memory Points",
  "🥇 Gold Token – +100 Memory Points",
  "🏆 Platinum Token – +1000 Memory Points",
]

 earnReward() {
  const randomIndex = Math.floor(Math.random() * rewards.length)
  const reward = rewards[randomIndex]

  const display = document.getElementById("rewardDisplay")
  display.innerHTML = `<div class="reward">${reward}</div>`
}
