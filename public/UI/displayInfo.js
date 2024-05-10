
const { canvas, tileMap, ctx, mapData} = require("../MapUtils/map");
const { tileSize} = require("../Constants/GameData");
const { Game } = require("../Constants/GameData");



function clearID(id)
{
    for (let y = 0; y < tileMap.getTileMapHeight(); y++) {
        for (let x = 0; x < tileMap.getTileMapWidth(); x++) {
            if (mapData[y][x] === id) {
                mapData[y][x] = 0;
            }
        }
    }
}


// Add event listener for mouse clicks on the canvas
function addCharacterEventListener() {
    let selectedCharacter = null;

    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const blockX = Math.floor(mouseX / tileSize);
        const blockY = Math.floor(mouseY / tileSize);

        // If a character is selected try to move it
        if (selectedCharacter) {
            const walkableTiles = selectedCharacter.getWalkableTiles();
            if (walkableTiles.some(tile => tile[0] === blockX && tile[1] === blockY)) {
                if (mapData[blockY][blockX] === 999) { // Check if the tile is walkable
                    selectedCharacter.changeCharacterPosition(blockX, blockY);
                    clearCharacterInfo();
                    selectedCharacter.unSelectCharacter();
                    selectedCharacter = null;
                    return; 
                }
            }
        }

        // Iterate over all characters to find if one is clicked
        for (const character of Game.getCharacters()) {
            if (blockX === character.getX() && blockY === character.getY()) {
                clearID(999);
                clearID(666);
                if (selectedCharacter !== character) {
                    // Clear previous selections
                    if (selectedCharacter) {
                        selectedCharacter.unSelectCharacter();
                    }
                    clearCharacterInfo();
                    displayCharacterInfo(character);
                    character.selectCharacter();
                    selectedCharacter = character;
                } else {
                    // Deselect if the same character is clicked again
                    clearCharacterInfo();
                    character.unSelectCharacter();
                    selectedCharacter = null;
                }
                return; 
            }
        }

        // If no character is clicked and there is a selected character deselect it
        if (selectedCharacter) {
            selectedCharacter.unSelectCharacter();
            clearCharacterInfo();
            selectedCharacter = null;
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
    createSpellEventListener();
    createMoveButtonEventListener();
}

// Function to clear character info
function clearCharacterInfo() {
    // Remove all info boxes
    const infoBoxes = document.querySelectorAll('.info-box');
    infoBoxes.forEach(box => box.parentNode.removeChild(box));

    weaponInfoClickCounter = 0;
    armorInfoClickCounter = 0;
    spellInfoClickCounter = 0;
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
    for (const weapon of Game.getWeapons()) {
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



let spellInfoClickCounter = 0;
function createSpellEventListener() {

    const spellNameClass = document.querySelectorAll(".spell-name");

    spellNameClass.forEach(spell => {
        spell.addEventListener("click", () => {

            const spellName = spell.getAttribute('data-spell-name');

            if(spellInfoClickCounter % 2 == 0)
            {
                showSpellInfo(spellName);
            }
            else
            {
                clearSpellInfo();
            }
        });
    });
}

function showSpellInfo(spellName) {
    clearID(999);
    for (const spell of Game.getSpells()) {
        if (spell.getSpellName() == spellName) {
            // Get canvas position
            const canvasRect = canvas.getBoundingClientRect();

            // Create a div for info box
            const infoBox = document.createElement('div');
            infoBox.setAttribute("class", "info-box spell-info-box");
            infoBox.style.position = 'absolute';
            infoBox.style.top = `${canvasRect.top + 390}px`;
            infoBox.style.left = `${canvasRect.right + 200}px`;
            infoBox.style.backgroundColor = 'white';
            infoBox.style.border = '1px solid black'; 
            infoBox.style.padding = '10px';

            infoBox.innerHTML = `${spell.displaySpellInfo()}`;

            // Append info box to document body
            document.body.appendChild(infoBox);
            spellInfoClickCounter++;

            for (const character of Game.getCharacters()) {
                
                if (character.characterSelected()) {
                    const tilesInRange = getReachableTiles(mapData, character.getX(), character.getY(), spell.getSpellAttackRange())

                    spell.updateRangeTiles(tilesInRange);

                    console.log(tilesInRange)

                    // Update mapData for each tile within range
                    for (const tile of tilesInRange) {
                        const [x, y] = tile;
                        mapData[y][x] = 666;
                    }                      
                    console.log(mapData)
                }
            }
        }
    }
}

// Function to clear character info
function clearSpellInfo() {
    // Remove all info boxes
    const infoBoxes = document.querySelectorAll('.spell-info-box');
    infoBoxes.forEach(box => box.parentNode.removeChild(box));
    spellInfoClickCounter++;
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
    for (const armor of Game.getArmorPieces()) {
        if (armor.getArmorName() == armorName) {
            // Get canvas position
            const canvasRect = canvas.getBoundingClientRect();

            // Create a div for info box
            const infoBox = document.createElement('div');
            infoBox.setAttribute("class", "info-box armor-info-box");
            infoBox.style.position = 'absolute';
            infoBox.style.top = `${canvasRect.top + 390}px`;
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



// move btn
function createMoveButtonEventListener()
{
    const moveButton = document.getElementById("moveButton");

    moveButton.addEventListener("click", () => {

        clearID(666);
        clearSpellInfo();
        spellInfoClickCounter = 0;

        const characterName = moveButton.getAttribute("data-character-name");

        for (const character of Game.getCharacters()) {
            // Check if mouse is over the character's block
            if (characterName == character.getName()) {
                const tilesInRange = getReachableTiles(mapData, character.getX(), character.getY(), character.getSpeed())
                
                character.updateWalkableTiles(tilesInRange);
                // Update mapData for each tile within range
                for (const tile of tilesInRange) {
                    const [x, y] = tile;
                    mapData[y][x] = 999;
                }
            }
        }
    });
}

function getReachableTiles(mapData, startX, startY, range) {
    const queue = [];
    const visited = new Set();
    const reachableTiles = [];

    queue.push({ tile: [startX, startY], distance: 0 });
    visited.add(`${startX},${startY}`);

    while (queue.length > 0) {
        const { tile, distance } = queue.shift();
        reachableTiles.push(tile);

        const adjacentTiles = getAdjacentTiles(mapData, tile[0], tile[1]);
        for (const [neighborX, neighborY, movementCost] of adjacentTiles) {
            const newDistance = distance + movementCost;
            const key = `${neighborX},${neighborY}`;

            if (newDistance <= range && !visited.has(key)) {
                queue.push({ tile: [neighborX, neighborY], distance: newDistance });
                visited.add(key);
            }
        }
    }

    return reachableTiles;
}


function getAdjacentTiles(mapData, x, y) {
    const directions = [
        [1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1], // Orthogonal movement
        [1, 1, 1.4], [-1, 1, 1.4], [1, -1, 1.4], [-1, -1, 1.4] // Diagonal movement
    ];

    const adjacentTiles = [];
    for (const [dx, dy, cost] of directions) {
        const newX = x + dx;
        const newY = y + dy;
        if (isValidTile(mapData, newX, newY)) {
            adjacentTiles.push([newX, newY, cost]);
        }
    }

    return adjacentTiles;
}

function isValidTile(mapData, x, y) {
    return x >= 0 && x < mapData.length && y >= 0 && y < mapData[0].length && mapData[x][y] !== 1;
}

// mapData

module.exports = {createArmorEventListener, createWeaponEventListener, addCharacterEventListener, createSpellEventListener}