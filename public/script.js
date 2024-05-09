
const Character = require("./Class/Character")
const Vector2D = require('./Class/Vector2D');
const DamageVector7 = require('./Class/DamageVector7');
const { Weapon, Armor } = require('./Class/Item');
const { Game } = require("./Constants/GameData")

const {tileMap, ctx, canvas } = require("./MapUtils/map");
const { mapData } = require("./Constants/GameData");
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
    for (const character of Game.getCharacters()) {
        if(character.characterSelected())
        {
            mapData[character.getY()][character.getX()] = 111;
        }
        else
        {
            mapData[character.getY()][character.getX()] = 101;
        }
    }
}

// test adding -> This will be UI in the future (hopefully)

Game.initializeTeams("Blue Ball Dick", "Legendary John")

const playerOnePosition = new Vector2D(1, 4);
const playerTwoPosition = new Vector2D(7, 7);
const playerThreePosition = new Vector2D(16, 4);

const Tony = new Character(playerOnePosition, "Tony", Game.getTeamOne())
const Melarkey = new Character(playerTwoPosition, "Melarkey", Game.getTeamOne())
const Silver = new Character(playerThreePosition, "Sliver", Game.getTeamTwo())



const SteelBladeStats = new DamageVector7(0.45, 0.45, 0.1, 0, 0, 0, 0)

const SteelSwordDamage = new Vector2D(16, 20)
const SteelSword = new Weapon("Steel Sword", SteelSwordDamage, 8, SteelBladeStats);

const SteelShortBladeDamage = new Vector2D(4, 9)
const SteelShortBlade = new Weapon("Steel short blade", SteelShortBladeDamage, 2, SteelBladeStats);

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




