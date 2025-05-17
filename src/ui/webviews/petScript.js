// src/ui/webviews/petScript.js
const vscode = acquireVsCodeApi();
const pet = document.getElementById('pet');
const canvas = document.getElementById('petCanvas');

let mood = 'idle';

window.addEventListener('message', (event) => {
  const message = event.data;
  if (message.command === 'setMood') {
    mood = message.value;
    pet.className = mood;
  }
});

pet.addEventListener('click', () => {
  vscode.postMessage({ command: 'petClicked' });
});

// Set pet image once loaded
window.onload = () => {
  pet.src = document.getElementById('pet').getAttribute('src') || '';
};
