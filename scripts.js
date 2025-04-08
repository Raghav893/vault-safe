import { info } from './userinfo.js';

document.getElementById('generate').addEventListener('click', () => {
  const isChecked = document.getElementById('generate').checked;
  if (isChecked) {
    const randomPass = generateRandomPass();
    document.getElementById('password').value = randomPass;
  }
});


function generateRandomPass(length = 12) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:',.<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
}

document.getElementById('addBtn').addEventListener('click', () => {
  let sitename = document.getElementById('site').value;
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  let details = { sitename, username, password };
  info.push(details);

  let infoHTML = '';
  info.forEach(item => {
    infoHTML += `
      <div class="password-card">
        <div class="info">
          <p><strong>Site:</strong> ${item.sitename}</p>
          <p><strong>User:</strong> ${item.username}</p>
          <p><strong>Password:</strong> ${item.password}</p>
        </div>
        <div class="actions">
          
          <button>📋</button>
          <button>❌</button>
        </div>
      </div>`;
  });

  document.getElementById('passwordList').innerHTML = infoHTML;

  document.getElementById('site').value = '';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
});

document.getElementById('clear').addEventListener('click', () => {
  document.getElementById('passwordList').innerHTML = '';
});
