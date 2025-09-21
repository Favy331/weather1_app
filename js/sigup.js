(function () {
      const form = document.getElementById('signupForm');
      const nameEl = document.getElementById('name');
      const emailEl = document.getElementById('email');
      const passwordEl = document.getElementById('password');
    
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = nameEl.value.trim();
        const email = emailEl.value.trim().toLowerCase();
        const password = passwordEl.value;

        if (!name || !email || !password) {
          alert('Please fill in all fields.');
          return;
        }

        
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        
        if (users.some(u => u.email === email)) {
          alert('Email already registered. Please login instead.');
          window.location.href = './pages/login.html';
          return;
        }

        
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        alert('Signup successful! Redirecting to login.');
        window.location.href = './pages/login.html';
      });
    })();
 