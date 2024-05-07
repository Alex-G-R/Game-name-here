
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




