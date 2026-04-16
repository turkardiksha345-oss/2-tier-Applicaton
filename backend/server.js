const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const choices = ['rock', 'paper', 'scissors'];

function getRandomChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return 'tie';
  }
  if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'player';
  }
  return 'computer';
}

app.post('/play', (req, res) => {
  const { choice } = req.body;
  if (!choices.includes(choice)) {
    return res.status(400).json({ error: 'Invalid choice' });
  }
  const computerChoice = getRandomChoice();
  const result = determineWinner(choice, computerChoice);
  res.json({
    playerChoice: choice,
    computerChoice,
    result
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});