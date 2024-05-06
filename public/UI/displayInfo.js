
const { canvas } = require("../MapUtils/map");
const { tileSize } = require("../Constants/GameData");
const { weaponsList, armorPiecesList, TeamBlue } = require("../Constants/GameData");

const TileMap = require("../Class/TileMap")
const Character = require("../Class/Character")
const Team = require('../Class/Team');
const { Weapon, Armor } = require('../Class/Item');
const WeaponList = require("../Class/WeaponList");
const ArmorList = require("../Class/ArmorList");

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