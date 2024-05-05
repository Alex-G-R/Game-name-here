

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const Vector2D = require('./public/Class/Vector2D');
const DamageVector7 = require('./public/Class/DamageVector7');
const Character = require('./public/Class/Character');
const Team = require('./public/Class/Team');
const { Weapon, Armor } = require('./public/Class/Item');


/* Set-up the app */

// Set up express
const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory for views
app.set('views', path.join(__dirname, 'views'));

// Set up session management
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Spin-up the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});

// Route to serve the /game
app.get('/game',(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'game.html'));
});



