document.getElementById('rock').addEventListener('click', () => play('rock'));
document.getElementById('paper').addEventListener('click', () => play('paper'));
document.getElementById('scissors').addEventListener('click', () => play('scissors'));

async function play(choice) {
  try {
    const response = await fetch('http://localhost:3000/play', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ choice })
    });
    const data = await response.json();
    displayResult(data);
  } catch (error) {
    document.getElementById('result-text').textContent = 'Error connecting to server';
  }
}

function displayResult(data) {
  const { playerChoice, computerChoice, result } = data;
  let message;
  if (result === 'tie') {
    message = `It's a tie! You both chose ${playerChoice}`;
  } else if (result === 'player') {
    message = `You win! ${playerChoice} beats ${computerChoice}`;
  } else {
    message = `You lose! ${computerChoice} beats ${playerChoice}`;
  }
  document.getElementById('result-text').textContent = message;
}