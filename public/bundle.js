(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){


const Entity = require('./Entity');
const { Weapon, Armor } = require('./Item');

class Character extends Entity {
    constructor(position, name, team) {

        super(position.x, position.y);

        this.name = name;
        this.team = team;

        this.fistDamage = 6;

        this.health = 100;
        this.carriedWeight = 0;

        this.speed = this.calculateSpeed();

        this.inventory = [
            this.equippedWeapon = [],
            this.equippedArmor = []
        ];
        this.alive = true;
    }
    

    updateStats() {
        // Reset stats

        this.carriedWeight = 0;
        // Iterate through inventory to update stats
        for (const item of this.equippedWeapon) {
            this.carriedWeight += item.weight || 0;
        }
        for (const item of this.equippedArmor) {
            this.carriedWeight += item.weight || 0;
        }

        this.calculateSpeed();
    }

    calculateSpeed()
    {
        if(this.carriedWeight == 0)
        {
            this.speed = 10;
        }
        else
        {
            this.speed = 10 - (this.carriedWeight * 0.05);
        }
    }

    getName()
    {
        return this.name;
    }

    getHealth()
    {
        return this.health;
    }

    getCarriedWeight()
    {
        return this.carriedWeight;
    }

    getSpeed()
    {
        return this.speed;
    }

    getX()
    {
        return this.x;
    }

    getY()
    {
        return this.y;
    }

    equip(item) {
        if (item instanceof Weapon) {
            this.equippedWeapon.push(item);
            this.updateStats();
        }
        else if (item instanceof Armor) 
        {
            this.equippedArmor.push(item);
            this.updateStats();
        }
    }

    attack(target) {
        const inflictedDamage = Math.max(0, this.damage);
        target.health -= inflictedDamage;
        console.log(`${this.name} attacks ${target.name} for ${inflictedDamage} damage.`);
        target.updateStats()
        if (target.health <= 0) {
            target.handleDeath()
        }
    }

    handleDeath() {
        this.alive = false;
        console.log(`${this.name} has been defeated!`);
        // Perform any cleanup tasks here
        // remove the character from the game, etc.
    }

    showWeapons()
    {
        let htmlinfo = 
        `
              _____________ <br>
             / Weapon list: <br>
        `

        for (const item of this.equippedWeapon) {
            htmlinfo += `|- ${item.getWeaponName()} ${item.getWeaponDamageRange()} <br>`
        }


        return htmlinfo;
    }

    showArmor()
    {
        let htmlinfo = 
        `
              _____________ <br>
             / Armor list: <br>
        `

        for (const item of this.equippedArmor) {
            htmlinfo += `|- ${item.getArmorName()}  <br>`
        }


        return htmlinfo;
    }

    logCharacterInfo()
    {
        const htmlInfo = 
        `
            Name: ${this.getName()} <br>
            Health: ${this.getHealth()} <br>
            Speed: ${this.getSpeed()} <br>
            Carried Weight: ${this.getCarriedWeight()} <br>
            ${this.showWeapons()}
            ${this.showArmor()}
            <br>
            Position X: ${this.getX()} <br>
            Position Y: ${this.getY()} <br>
        `

        return htmlInfo;
    }
}

module.exports = Character;


// Main weapon: ${this.getMainWeapon().getWeaponName()} ${this.getMainWeapon().getWeaponDamageRange()}<br>
// 2nd weapon: ${this.getSecondaryWeapon().getWeaponName()} ${this.getSecondaryWeapon().getWeaponDamageRange()}<br>

/*

getMainWeapon()
    {
        if(this.equippedWeapon[0].minDamage > this.equippedWeapon[1].minDamage)
        {
            return this.equippedWeapon[0];
        }
        else
        {
            return this.equippedWeapon[1];
        }
    }

    getSecondaryWeapon()
    {
        if(this.equippedWeapon[0].minDamage > this.equippedWeapon[1].minDamage)
        {
            return this.equippedWeapon[1];
        }
        else
        {
            return this.equippedWeapon[0];
        }
    }

    */
},{"./Entity":3,"./Item":4}],2:[function(require,module,exports){

class DamageVector7 {
    constructor(CutDamage, PierceDamage, IncisiveDamage, FireDamage, FrostDamage, ElectricDamage, ToxicDamage) {
        this.CutDamage = CutDamage;
        this.PierceDamage = PierceDamage;
        this.IncisiveDamage = IncisiveDamage;
        this.FireDamage = FireDamage;
        this.FrostDamage = FrostDamage;
        this.ElectricDamage = ElectricDamage;
        this.ToxicDamage = ToxicDamage;
    }
}

module.exports = DamageVector7;

},{}],3:[function(require,module,exports){

class Entity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move(dx, dy) {
        this.x = dx;
        this.y = dy;
    }
}

module.exports = Entity;
},{}],4:[function(require,module,exports){

class Item {
    constructor(name, weight) {
        this.name = name;
        this.weight = weight;
    }
}


class Weapon extends Item {
    constructor(name, damage, weight, damageStats)
    {
        super(name, weight)

        this.minDamage = damage.x;
        this.maxDamage = damage.y;

        this.CutDamageFraction = damageStats.CutDamage;
        this.PierceDamageFraction = damageStats.PierceDamage;
        this.IncisiveDamageFraction = damageStats.IncisiveDamage;
        this.FireDamageFraction = damageStats.FireDamage;
        this.FrostDamageFraction = damageStats.FrostDamage;
        this.ElectricDamageFraction = damageStats.ElectricDamage;
        this.ToxicDamageFraction = damageStats.ToxicDamage;
    }

    getWeaponName()
    {
        return this.name;
    }

    getWeaponDamageRange()
    {
        return `${this.minDamage} - ${this.maxDamage}`
    }
}

class Armor extends Item {
    constructor(name, weight, protectionStats)
    {
        super(name, weight)

        this.CutDamageProtection = protectionStats.CutDamage;
        this.PierceDamageProtection = protectionStats.PierceDamage;
        this.IncisiveDamageProtection = protectionStats.IncisiveDamage;
        this.FireDamageProtection = protectionStats.FireDamage;
        this.FrostDamageProtection = protectionStats.FrostDamage;
        this.ElectricDamageProtection = protectionStats.ElectricDamage;
        this.ToxicDamageProtection = protectionStats.ToxicDamage;
    }

    getArmorName()
    {
        return this.name;
    }
}

module.exports = { Weapon, Armor };
},{}],5:[function(require,module,exports){


class Team {
    constructor(name)
    {
        this.name = name;
        this.characters = []
    }

    getTeamName()
    {
        return this.name
    }

    addCharacter(char)
    {
        this.characters.push(char)
    }

    getCharacters()
    {
        return this.characters;
    }

    logCharacters()
    {
        for(const char of this.characters)
        {
            console.log(char)
        }
    }
}

module.exports = Team;
},{}],6:[function(require,module,exports){
class TileMap {
    constructor(tileSize, mapData) {
        this.tileSize = tileSize;
        this.mapData = mapData;
        this.height = mapData.length;
        this.width = mapData[0].length;
    }

    draw(ctx) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                // Set fill color based on tile type
                if (this.mapData[y][x] === 0) {
                    ctx.fillStyle = 'lightgreen';
                } else if (this.mapData[y][x] === 1) {
                    ctx.fillStyle = 'lightblue';
                } else if (this.mapData[y][x] === 101) {
                    ctx.fillStyle = 'red';
                }
                
                // Draw filled rectangle
                ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                
                // Draw black border around the filled rectangle
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1; // Set border thickness to 1 pixel
                ctx.strokeRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
            }
        }
    }
    
}

module.exports = TileMap;

},{}],7:[function(require,module,exports){

class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

module.exports = Vector2D;

},{}],8:[function(require,module,exports){

const TileMap = require("./Class/TileMap")
const Character = require("./Class/Character")
const Vector2D = require('./Class/Vector2D');
const DamageVector7 = require('./Class/DamageVector7');
const Team = require('./Class/Team');
const { Weapon, Armor } = require('./Class/Item');

// Game setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define map data, 1 is water, 0 is grass
const mapData = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const tileSize = 40;

const tileMap = new TileMap(tileSize, mapData);

let clickIteration = 0;
// Add event listener for mouse movement
canvas.addEventListener('click', function (event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    // Calculate character block position
    const blockX = Math.floor(mouseX / tileSize);
    const blockY = Math.floor(mouseY / tileSize);
    // Iterate over all characters
    for (const character of TeamBlue.getCharacters()) {
        // Check if mouse is over the character's block
        if (blockX === character.getX() && blockY === character.getY()) {
            if (clickIteration % 2 === 0) {
                // Display box with character info
                displayCharacterInfo(character);
            }
            else {
                clearCharacterInfo();
            }
            clickIteration++;
        }
    }
});


// Function to display character info
function displayCharacterInfo(character) {
    // Get canvas position
    const canvasRect = canvas.getBoundingClientRect();

    // Create a div for info box
    const infoBox = document.createElement('div');
    infoBox.style.position = 'absolute';
    infoBox.style.top = `${canvasRect.top}px`;
    infoBox.style.left = `${canvasRect.right + 10}px`;
    infoBox.style.backgroundColor = 'white';
    infoBox.style.border = '1px solid black';
    infoBox.style.padding = '10px';

    // Set character info
    infoBox.innerHTML = `${character.logCharacterInfo()}`;

    // Append info box to document body
    document.body.appendChild(infoBox);
}

// Function to clear character info
function clearCharacterInfo() {
    // Remove all info boxes
    const infoBoxes = document.querySelectorAll('div');
    infoBoxes.forEach(box => box.parentNode.removeChild(box));
}



function gameLoop() {
    updateMapData();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tileMap.draw(ctx);
    requestAnimationFrame(gameLoop);
}

function updateMapData() {
    for (const character of TeamBlue.getCharacters()) {
        mapData[character.getY()][character.getX()] = 101;
    }
}



const TeamBlue = new Team("Team Blue");

const playerOnePosition = new Vector2D(1, 4);
const playerTwoPosition = new Vector2D(7, 7);
const playerThreePosition = new Vector2D(16, 4);

const Tony = new Character(playerOnePosition, "Tony", TeamBlue)
const Melarkey = new Character(playerTwoPosition, "Melarkey", TeamBlue)
const Silver = new Character(playerThreePosition, "Sliver", TeamBlue)

TeamBlue.addCharacter(Tony);
TeamBlue.addCharacter(Melarkey);
TeamBlue.addCharacter(Silver);


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

Melarkey.equip(PlateGloves);

Silver.equip(SteelSword)
Silver.equip(SteelShortBlade)

Silver.equip(PlateArmor);
Silver.equip(PlateGloves);
Silver.equip(PlateBoots);
Silver.equip(PlateLeggins);
Silver.equip(BodyChainmail);


gameLoop(); // Start the game loop





},{"./Class/Character":1,"./Class/DamageVector7":2,"./Class/Item":4,"./Class/Team":5,"./Class/TileMap":6,"./Class/Vector2D":7}]},{},[8]);
