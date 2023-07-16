const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { execSync } = require('child_process');
const session = require('express-session');
const path = require('path');
const helmet = require('helmet');


const app = express();
const port = 3000;

app.use(helmet.frameguard({ action: "SAMEORIGIN" }));
app.use(express.json());
app.use(express.static(__dirname));
app.use(session({
  secret: 'secret keyword',
  resave: false,
  saveUninitialized: true
}));

// Serve the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Handle the login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === '1234567') {
    // Authentication successful, set session variable
    req.session.authenticated = true;
    res.redirect('/admin');
  } else {
    // Authentication failed
    res.status(401).send('Invalid username or password');
  }
});

// Serve the admin page
app.get('/admin', (req, res) => {
  // Check if the user is logged in
  if (req.session.authenticated) {
    // User is logged in, load the "admin.html" file
    res.sendFile(path.join(__dirname, 'admin.html'));
  } else {
    // User is not logged in, redirect to the login page
    res.redirect('/login');
  }
});

// Create a new session
app.get('/create_session', (req, res) => {
  const sessionId = uuidv4();
  console.log(`Session ID: ${sessionId}`);

  console.log('Running script to create Webtop session ...');
  const createSessionsCmd = `/learn-linux/webtop/create_session.sh ${sessionId}`;
  console.log(`Running command: ${createSessionsCmd}`);
  try {
    const output = execSync(createSessionsCmd).toString();
    const [_, assignedPort] = output.trim().split(' ');
    console.log(`Webtop session started with ID: ${sessionId} on port ${assignedPort}`);
    res.set('X-Frame-Options', 'SAMEORIGIN');
    res.send({ sessionId, assignedPort });
  } catch (error) {
    console.error(`Error starting Webtop session: ${error.message}`);
    res.status(500).send('Error starting Webtop session');
  }
});

// Close all sessions
app.get('/close_all_sessions', (req, res) => {
  console.log('Running script to close all Webtop sessions ...');
  const closeAllSessionsCmd = '/learn-linux/webtop/close_all_sessions.sh';
  console.log(`Running command: ${closeAllSessionsCmd}`);
  try {
    const output = execSync(closeAllSessionsCmd).toString();
    console.log(`Webtop sessions closed`);
    res.send(output);
  } catch (error) {
    console.error(`Error closing Webtop sessions: ${error.message}`);
    res.status(500).send('Error closing Webtop sessions');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
