const socket = io();

let username = ''; // Initialize username variable

const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const contactsList = document.querySelector('.chat-contacts');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    username = usernameInput.value.trim();
    console.log('Captured Username:', username); 
  });


// Handle receiving a new message
socket.on('receive-message', (username, message) => {
  const messages = document.getElementById('messages');
  const messageItem = document.createElement('li');
  messageItem.classList.add('message');
  messageItem.textContent = `${username}: ${message}`;
  messages.appendChild(messageItem);
  messages.scrollTop = messages.scrollHeight;
});

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('input');
    const message = input.value;
    console.log('Sending Message:', username, message); // Debug output
    // Rest of the code...
  });

// Send a message when the form is submitted
document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('input');
    const message = input.value;
    if (message.trim() !== '') {
      socket.emit('send-message', username, message); // Send username along with the message
      input.value = '';
    }
  });
  
