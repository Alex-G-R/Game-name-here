

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const Vector2D = require('./src/Class/Vector2D');
const DamageVector7 = require('./src/Class/DamageVector7');
const Character = require('./src/Class/Character');
const Team = require('./src/Class/Team');
const { Weapon, Armor } = require('./src/Class/Item');


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


const TeamBlue = new Team("Team Blue");

const playerOnePosition = new Vector2D(0, 0);

const Tony = new Character(playerOnePosition, "Tony", TeamBlue)

TeamBlue.addCharacter(Tony);


const SteelBladeStats = new DamageVector7(0.45, 0.45, 0.1, 0, 0, 0, 0)

const StellSwordDamage = new Vector2D(16, 20)
const SteelSword = new Weapon("Steel Sword", StellSwordDamage, 8, SteelBladeStats);

const StellShortBladeDamage = new Vector2D(4, 9)
const SteelShortBlade = new Weapon("Steel short blade", StellShortBladeDamage, 2, SteelBladeStats);

const PlateProtectionStats = new DamageVector7(0.75, 0.5, 0.5, 0.5, 0.5, 0, 0.9)

const PlateArmor = new Armor("Steel Plate Chest-Plate", 40, PlateProtectionStats);
const PlateGloves = new Armor("Steel Plate Gloves", 16, PlateProtectionStats);
const PlateBoots = new Armor("Steel Plate Boots", 16, PlateProtectionStats);
const PlateLeggins = new Armor("Steel Plate Leggins", 18, PlateProtectionStats);
const BodyChainmail = new Armor("Steel Body Chainmail", 10, PlateProtectionStats);

Tony.equip(SteelSword)
Tony.equip(SteelShortBlade)

Tony.equip(PlateArmor);
Tony.equip(PlateGloves);
Tony.equip(PlateBoots);
Tony.equip(PlateLeggins);
Tony.equip(BodyChainmail);

TeamBlue.logCharacters();

