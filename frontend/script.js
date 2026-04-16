let wins = 0;
let losses = 0;
let ties = 0;

const API_URL = getAPIUrl();

function getAPIUrl() {
  // For EC2: Check if running on EC2 by looking at query parameter or localStorage
  const params = new URLSearchParams(window.location.search);
  const customIP = params.get('api') || localStorage.getItem('api_url');
  
  if (customIP) {
    localStorage.setItem('api_url', customIP);
    return customIP;
  }
  
  // Default to localhost for local development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3000';
  }
  
  // For production, use the same host but port 3000
  return `http://${window.location.hostname}:3000`;
}

function updateServerStatus() {
  document.getElementById('server-status').textContent = `Server: ${API_URL}`;
}

document.getElementById('rock').addEventListener('click', () => play('rock'));
document.getElementById('paper').addEventListener('click', () => play('paper'));
document.getElementById('scissors').addEventListener('click', () => play('scissors'));
document.getElementById('reset').addEventListener('click', resetStats);

loadStats();
updateServerStatus();

async function play(choice) {
  try {
    const response = await fetch(`${API_URL}/play`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ choice })
    });
    const data = await response.json();
    displayResult(data);
  } catch (error) {
    document.getElementById('result-text').textContent = '❌ Error connecting to server';
    console.error('Connection error:', error);
  }
}

function displayResult(data) {
  const { playerChoice, computerChoice, result } = data;
  let message;
  let emoji = '';
  
  const emojiMap = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️'
  };
  
  if (result === 'tie') {
    message = `🤝 It's a tie!`;
    ties++;
  } else if (result === 'player') {
    message = `🎉 You win!`;
    wins++;
  } else {
    message = `😔 You lose!`;
    losses++;
  }
  
  document.getElementById('result-text').textContent = message;
  document.getElementById('player-choice').textContent = `${emojiMap[playerChoice]} ${playerChoice}`;
  document.getElementById('computer-choice').textContent = `${emojiMap[computerChoice]} ${computerChoice}`;
  
  updateStats();
}

function updateStats() {
  document.getElementById('wins').textContent = wins;
  document.getElementById('losses').textContent = losses;
  document.getElementById('ties').textContent = ties;
  saveStats();
}

function saveStats() {
  localStorage.setItem('rps_wins', wins);
  localStorage.setItem('rps_losses', losses);
  localStorage.setItem('rps_ties', ties);
}

function loadStats() {
  wins = parseInt(localStorage.getItem('rps_wins')) || 0;
  losses = parseInt(localStorage.getItem('rps_losses')) || 0;
  ties = parseInt(localStorage.getItem('rps_ties')) || 0;
  updateStats();
}

function resetStats() {
  wins = 0;
  losses = 0;
  ties = 0;
  document.getElementById('result-text').textContent = 'Stats reset! Choose your move!';
  document.getElementById('player-choice').textContent = '-';
  document.getElementById('computer-choice').textContent = '-';
  updateStats();
}