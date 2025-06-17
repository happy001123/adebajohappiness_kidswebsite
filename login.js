document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      if (email && password) {
        console.log('Login successful'); 
        window.location.href = 'main.html'; 
      } else {
        alert('Please enter both email and password.');
      }
    });
  }
});