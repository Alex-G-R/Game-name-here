(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){


const { CharacterList } = require("../Class/List");
const { charactersList } = require('../Constants/GameData');
const Entity = require('./Entity');
const { Weapon, Armor } = require('./Item');

class Character extends Entity {
    constructor(position, name, team, charactersList) {

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

        this.pushCharacter(charactersList)
    }

    pushCharacter(charactersList) {
        charactersList.addCharacter(this);
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
            htmlinfo += `<span class="weapon-name clickable" data-weapon-name="${item.getWeaponName()}">|- ${item.getWeaponName()} ${item.getWeaponDamageRange()}</span> <br>`
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
            htmlinfo += `<span class="armor-name clickable" data-armor-name="${item.getArmorName()}">|- ${item.getArmorName()}</span> <br>`
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

},{"../Class/List":5,"../Constants/GameData":9,"./Entity":3,"./Item":4}],2:[function(require,module,exports){

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

const { CharacterList, WeaponList, ArmorList} = require("../Class/List");

class Item {
    constructor(name, weight) {
        this.name = name;
        this.weight = weight;
    }
}


class Weapon extends Item {
    constructor(name, damage, weight, damageStats, weaponList)
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

        this.pushWeapon(weaponList);
    }

    pushWeapon(weaponList) {
        weaponList.addWeapon(this);
    }

    getWeaponName()
    {
        return this.name;
    }

    getWeaponDamageRange()
    {
        return `${this.minDamage} - ${this.maxDamage}`
    }

    getWeaponCutDamageFraction() { return this.CutDamageFraction; }
    getWeaponPierceDamageFraction(){ return this.PierceDamageFraction; }
    getWeaponIncisiveDamageFraction() { return this.IncisiveDamageFraction; }
    getWeaponFireDamageFraction() { return this.FireDamageFraction; }
    getWeaponFrostDamageFraction() { return this.FrostDamageFraction; }
    getWeaponElectricDamageFraction() { return this.ElectricDamageFraction; }
    getWeaponToxicDamageFraction() { return this.ToxicDamageFraction; }

    displayWeaponInfo()
    {
        const htmlinfo = 
        `
            Name: ${this.getWeaponName()} <br>
            Damage range: ${this.getWeaponDamageRange()} <br>
             _____________ <br>
            / Damage type: <br>
            | -> Cut DMG: ${(this.getWeaponCutDamageFraction())*100}% <br>
            | -> Pierce DMG: ${(this.getWeaponPierceDamageFraction())*100}% <br>
            | -> Incisive DMG: ${(this.getWeaponIncisiveDamageFraction())*100}% <br>
            | -> Fire DMG: ${(this.getWeaponFireDamageFraction())*100}% <br>
            | -> Frost DMG: ${(this.getWeaponFrostDamageFraction())*100}% <br>
            | -> Electric DMG: ${(this.getWeaponElectricDamageFraction())*100}% <br>
            | -> Toxic DMG: ${(this.getWeaponToxicDamageFraction())*100}% <br>
        ` 

        return htmlinfo;
    }
}

class Armor extends Item {
    constructor(name, weight, protectionStats, armorPiecesList)
    {
        super(name, weight)

        this.CutDamageProtection = protectionStats.CutDamage;
        this.PierceDamageProtection = protectionStats.PierceDamage;
        this.IncisiveDamageProtection = protectionStats.IncisiveDamage;
        this.FireDamageProtection = protectionStats.FireDamage;
        this.FrostDamageProtection = protectionStats.FrostDamage;
        this.ElectricDamageProtection = protectionStats.ElectricDamage;
        this.ToxicDamageProtection = protectionStats.ToxicDamage;

        this.pushArmor(armorPiecesList)
    }

    pushArmor(armorPiecesList) {
        armorPiecesList.addArmorPiece(this);
    }

    getArmorName()
    {
        return this.name;
    }

    getArmorCutDamageProtection() { return this.CutDamageProtection; }
    getArmorPierceDamageProtection(){ return this.PierceDamageProtection; }
    getArmorIncisiveDamageProtection() { return this.IncisiveDamageProtection; }
    getArmorFireDamageProtection() { return this.FireDamageProtection; }
    getArmorFrostDamageProtection() { return this.FrostDamageProtection; }
    getArmorElectricDamageProtection() { return this.ElectricDamageProtection; }
    getArmorToxicDamageProtection() { return this.ToxicDamageProtection; }

    displayArmorInfo()
    {
        const htmlinfo = 
        `
            Name: ${this.getArmorName()} <br>
             _____________ <br>
            / Damage Protection: <br>
            | -> Cut DMG Prot. : ${(this.getArmorCutDamageProtection())*100}% <br>
            | -> Pierce DMG Prot. : ${(this.getArmorPierceDamageProtection())*100}% <br>
            | -> Incisive DMG Prot. : ${(this.getArmorIncisiveDamageProtection())*100}% <br>
            | -> Fire DMG Prot. : ${(this.getArmorFireDamageProtection())*100}% <br>
            | -> Frost DMG Prot. : ${(this.getArmorFrostDamageProtection())*100}% <br>
            | -> Electric DMG Prot. : ${(this.getArmorElectricDamageProtection())*100}% <br>
            | -> Toxic DMG Prot. : ${(this.getArmorToxicDamageProtection())*100}% <br>
        ` 

        return htmlinfo;
    }
}

module.exports = { Weapon, Armor };
},{"../Class/List":5}],5:[function(require,module,exports){



class CharacterList {
    constructor()
    {
        this.characters = []
    }

    addCharacter(char)
    {
        this.characters.push(char)
    }

    getCharacters()
    {
        return this.characters;
    }
}

class ArmorList {
    constructor()
    {
        this.armorPieces = []
    }

    addArmorPiece(armorPiece)
    {
        this.armorPieces.push(armorPiece)
    }

    getArmorPieces()
    {
        return this.armorPieces;
    }
}

class WeaponList {
    constructor()
    {
        this.weapons = []
    }

    addWeapon(weapon)
    {
        this.weapons.push(weapon)
    }

    getWeapons()
    {
        return this.weapons;
    }
}

module.exports = { CharacterList, ArmorList, WeaponList };
},{}],6:[function(require,module,exports){


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
},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){

class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

module.exports = Vector2D;

},{}],9:[function(require,module,exports){
const { CharacterList, WeaponList, ArmorList} = require("../Class/List");
const Team = require('../Class/Team');

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
// 32 x 24
const tileSize = 40;
const widthTiles = 32;
const heightTiles = 24;

const mapWidth = tileSize * widthTiles;
const mapHeight = tileSize * heightTiles;

// init lists 
const charactersList = new CharacterList();
const weaponsList = new WeaponList();
const armorPiecesList = new ArmorList();

// init teams
const TeamBlue = new Team("Team Blue");
const TeamRed = new Team("Team Red");

module.exports = {mapData, mapWidth, mapHeight, tileSize, charactersList, weaponsList, armorPiecesList, TeamBlue, TeamRed}
},{"../Class/List":5,"../Class/Team":6}],10:[function(require,module,exports){

const TileMap = require("../Class/TileMap")
const {mapData, mapHeight, mapWidth, tileSize} = require("../Constants/GameData");

// Game setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = mapWidth;
canvas.height = mapHeight;

const tileMap = new TileMap(tileSize, mapData);

module.exports = {canvas, ctx, tileMap}


},{"../Class/TileMap":7,"../Constants/GameData":9}],11:[function(require,module,exports){

const { canvas } = require("../MapUtils/map");
const { tileSize } = require("../Constants/GameData");
const { charactersList, weaponsList, armorPiecesList, TeamBlue, TeamRed } = require("../Constants/GameData");

const TileMap = require("../Class/TileMap")
const Character = require("../Class/Character")
const Team = require('../Class/Team');
const { Weapon, Armor } = require('../Class/Item');
const { CharacterList, WeaponList, ArmorList} = require("../Class/List");

let clickIteration = 0;
// Add event listener for mouse movement

function addCharacterEventListener() {
    canvas.addEventListener('click', function (event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        // Calculate character block position
        const blockX = Math.floor(mouseX / tileSize);
        const blockY = Math.floor(mouseY / tileSize);
        // Iterate over all characters
        for (const character of charactersList.getCharacters()) {
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
    
}

// Function to display character info
function displayCharacterInfo(character) {
    // Get canvas position
    const canvasRect = canvas.getBoundingClientRect();

    // Create a div for info box
    const infoBox = document.createElement('div');
    infoBox.setAttribute("class", "info-box character-info-box");
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

    createWeaponEventListener();
    createArmorEventListener();
}

// Function to clear character info
function clearCharacterInfo() {
    // Remove all info boxes
    const infoBoxes = document.querySelectorAll('.info-box');
    infoBoxes.forEach(box => box.parentNode.removeChild(box));
    weaponInfoClickCounter = 0;
    armorInfoClickCounter = 0;
}


let weaponInfoClickCounter = 0;
function createWeaponEventListener() {
    const weaponNameClass = document.querySelectorAll(".weapon-name");

    weaponNameClass.forEach(weapon => {
        weapon.addEventListener("click", () => {
            const weaponName = weapon.getAttribute('data-weapon-name');

            if(weaponInfoClickCounter % 2 == 0)
            {
                showWeaponInfo(weaponName);
            }
            else
            {
                clearWeaponInfo();
            }
        });
    });
}

function showWeaponInfo(weaponName) {
    for (const weapon of weaponsList.getWeapons()) {
        if (weapon.getWeaponName() == weaponName) {
            // Get canvas position
            const canvasRect = canvas.getBoundingClientRect();

            // Create a div for info box
            const infoBox = document.createElement('div');
            infoBox.setAttribute("class", "info-box weapon-info-box");
            infoBox.style.position = 'absolute';
            infoBox.style.top = `${canvasRect.top}px`;
            infoBox.style.left = `${canvasRect.right + 200}px`;
            infoBox.style.backgroundColor = 'white';
            infoBox.style.border = '1px solid black';
            infoBox.style.padding = '10px';

            infoBox.innerHTML = `${weapon.displayWeaponInfo()}`;

            // Append info box to document body
            document.body.appendChild(infoBox);
            weaponInfoClickCounter++;
        }
    }
}

// Function to clear character info
function clearWeaponInfo() {
    // Remove all info boxes
    const infoBoxes = document.querySelectorAll('.weapon-info-box');
    infoBoxes.forEach(box => box.parentNode.removeChild(box));
    weaponInfoClickCounter++;
}

// armor info box

let armorInfoClickCounter = 0;
function createArmorEventListener() {
    const armorNameClass = document.querySelectorAll(".armor-name");

    armorNameClass.forEach(armor => {
        armor.addEventListener("click", () => {
            const armorName = armor.getAttribute('data-armor-name');

            if(armorInfoClickCounter % 2 == 0)
            {
                showArmorInfo(armorName);
            }
            else
            {
                clearArmorInfo();
            }
        });
    });
}

function showArmorInfo(armorName) {
    for (const armor of armorPiecesList.getArmorPieces()) {
        if (armor.getArmorName() == armorName) {
            // Get canvas position
            const canvasRect = canvas.getBoundingClientRect();

            // Create a div for info box
            const infoBox = document.createElement('div');
            infoBox.setAttribute("class", "info-box armor-info-box");
            infoBox.style.position = 'absolute';
            infoBox.style.top = `${canvasRect.top + 370}px`;
            infoBox.style.left = `${canvasRect.right + 10}px`;
            infoBox.style.backgroundColor = 'white';
            infoBox.style.border = '1px solid black';
            infoBox.style.padding = '10px';

            infoBox.innerHTML = `${armor.displayArmorInfo()}`;

            // Append info box to document body
            document.body.appendChild(infoBox);
            armorInfoClickCounter++;
        }
    }
}

// Function to clear character info
function clearArmorInfo() {
    // Remove all info boxes
    const infoBoxes = document.querySelectorAll('.armor-info-box');
    infoBoxes.forEach(box => box.parentNode.removeChild(box));
    armorInfoClickCounter++;
}


module.exports = {createArmorEventListener, createWeaponEventListener, addCharacterEventListener}
},{"../Class/Character":1,"../Class/Item":4,"../Class/List":5,"../Class/Team":6,"../Class/TileMap":7,"../Constants/GameData":9,"../MapUtils/map":10}],12:[function(require,module,exports){

const TileMap = require("./Class/TileMap")
const Character = require("./Class/Character")
const Vector2D = require('./Class/Vector2D');
const DamageVector7 = require('./Class/DamageVector7');
const Team = require('./Class/Team');
const { Weapon, Armor } = require('./Class/Item');
const {CharacterList, WeaponList, ArmorList} = require("./Class/List");

const {tileMap, ctx, canvas } = require("./MapUtils/map");
const { mapData, charactersList, weaponsList, armorPiecesList, TeamBlue, TeamRed } = require("./Constants/GameData");
const { createArmorEventListener, createWeaponEventListener, addCharacterEventListener } = require("./UI/displayInfo");

addCharacterEventListener();
createWeaponEventListener();
createArmorEventListener();


function gameLoop() {
    updateMapData();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tileMap.draw(ctx);
    requestAnimationFrame(gameLoop);
}

function updateMapData() {
    for (const character of charactersList.getCharacters()) {
        mapData[character.getY()][character.getX()] = 101;
    }
}

// test adding

const playerOnePosition = new Vector2D(1, 4);
const playerTwoPosition = new Vector2D(7, 7);
const playerThreePosition = new Vector2D(16, 4);

const Tony = new Character(playerOnePosition, "Tony", TeamBlue, charactersList)
const Melarkey = new Character(playerTwoPosition, "Melarkey", TeamBlue, charactersList)
const Silver = new Character(playerThreePosition, "Sliver", TeamBlue, charactersList)

TeamBlue.addCharacter(Tony);
TeamBlue.addCharacter(Melarkey);
TeamBlue.addCharacter(Silver);


const SteelBladeStats = new DamageVector7(0.45, 0.45, 0.1, 0, 0, 0, 0)

const StellSwordDamage = new Vector2D(16, 20)
const SteelSword = new Weapon("Steel Sword", StellSwordDamage, 8, SteelBladeStats, weaponsList);

const StellShortBladeDamage = new Vector2D(4, 9)
const SteelShortBlade = new Weapon("Steel short blade", StellShortBladeDamage, 2, SteelBladeStats, weaponsList);

const PlateProtectionStats = new DamageVector7(0.75, 0.5, 0.5, 0.5, 0.5, 0, 0.9)

const PlateArmor = new Armor("Steel Plate Chest-Plate", 40, PlateProtectionStats, armorPiecesList);
const PlateGloves = new Armor("Steel Plate Gloves", 16, PlateProtectionStats, armorPiecesList);
const PlateBoots = new Armor("Steel Plate Boots", 16, PlateProtectionStats, armorPiecesList);
const PlateLeggins = new Armor("Steel Plate Leggins", 18, PlateProtectionStats, armorPiecesList);
const BodyChainmail = new Armor("Steel Body Chainmail", 10, PlateProtectionStats, armorPiecesList);

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





},{"./Class/Character":1,"./Class/DamageVector7":2,"./Class/Item":4,"./Class/List":5,"./Class/Team":6,"./Class/TileMap":7,"./Class/Vector2D":8,"./Constants/GameData":9,"./MapUtils/map":10,"./UI/displayInfo":11}]},{},[12]);
