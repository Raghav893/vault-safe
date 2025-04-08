  import { info } from './userinfo.js';

  window.addEventListener('load', () => {
    const savedEntries = localStorage.getItem('passwordEntries');
    if (savedEntries) {
      const parsedEntries = JSON.parse(savedEntries);
      info.length = 0;
      info.push(...parsedEntries);
      updatePasswordList();
    }
  });

  document.getElementById('generate').addEventListener('click', () => {
    const isChecked = document.getElementById('generate').checked;
    if (isChecked) {
      const randomPass = generateRandomPass();
      document.getElementById('password').value = randomPass;
      showStatus('Strong password generated!', 'success');
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

    if (!sitename || !username || !password) {
      showStatus('Please fill in all fields', 'error');
      return;
    }

    let details = { sitename, username, password };
    info.push(details);

    localStorage.setItem('passwordEntries', JSON.stringify(info));

    updatePasswordList();
    showStatus('Password saved successfully!', 'success');

    document.getElementById('site').value = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('generate').checked = false;
  });

  function updatePasswordList() {
    let infoHTML = '';
    info.forEach((item, index) => {
      infoHTML += `
        <div class="password-card" data-index="${index}">
          <div class="info">
            <p><strong>Site:</strong> ${item.sitename}</p>
            <p><strong>User:</strong> ${item.username}</p>
            <p><strong>Password:</strong> ${item.password}</p>
          </div>
          <div class="actions">
            <button class="copy-btn" data-password="${item.password}">📋</button>
            <button class="delete-btn" data-index="${index}">❌</button>
          </div>
        </div>`;
    });

    document.getElementById('passwordList').innerHTML = infoHTML;
  }

  document.getElementById('passwordList').addEventListener('click', (e) => {
    const target = e.target;
    
    if (target.classList.contains('copy-btn')) {
      const password = target.getAttribute('data-password');
      navigator.clipboard.writeText(password).then(() => {
        showStatus('Password copied to clipboard!', 'success');
      }).catch(err => {
        showStatus('Failed to copy password', 'error');
        console.error('Failed to copy text: ', err);
      });
    }
    
    if (target.classList.contains('delete-btn')) {
      const index = parseInt(target.getAttribute('data-index'));
      if (confirm('Are you sure you want to delete this entry?')) {
        info.splice(index, 1);
        localStorage.setItem('passwordEntries', JSON.stringify(info));
        updatePasswordList();
        showStatus('Entry deleted successfully', 'success');
      }
    }
  });

  function showStatus(message, type) {
    const statusElement = document.getElementById('status');
    statusElement.textContent = message;
    statusElement.className = type;
    
    setTimeout(() => {
      statusElement.textContent = '';
      statusElement.className = '';
    }, 3000);
  }

  document.getElementById('clear').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all entries? This action cannot be undone.')) {
      info.length = 0;
      localStorage.removeItem('passwordEntries');
      document.getElementById('passwordList').innerHTML = '';
      showStatus('All entries cleared', 'success');
    }
  });

  document.getElementById('search').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.password-card');
    
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(searchTerm) ? 'flex' : 'none';
    });
  });