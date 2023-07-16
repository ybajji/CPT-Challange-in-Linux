document.addEventListener('DOMContentLoaded', function() {
  // Get the login form, login button, and login error message elements
  const loginForm = document.getElementById('login-form');
  const loginButton = document.getElementById('submitID');
  

  // Add event listener to the login form submission
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get the username and password fields
    const usernameField = document.getElementById('usernameId');
    const passwordField = document.getElementById('passwordId');

    // Get the values from the username and password fields
    const username = usernameField.value;
    const password = passwordField.value;

    // Send a POST request to the '/login' endpoint
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      // If the response status is 200 or 302, redirect to the '/admin' page
      if (xhr.status === 200 || xhr.status === 302) {
        window.location.href = '/admin';
      } else {
        // If the response status is not successful, display the login error message
        alert("password is not correct")
      }
    };
    xhr.send(JSON.stringify({ username, password }));
  });
});

  