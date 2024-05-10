(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){


const Entity = require('./Entity');
const { Weapon, Armor } = require('./Item');
const { Spell } = require('./Spell');
const { Game } = require("../Constants/GameData")

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
            this.equippedArmor = [],
            this.knownSpells = []
        ];
        this.alive = true;

        this.selected = false;

        this.walkableTiles = []

        this.pushCharacter()
        this.addCharacterToTeam();
    }

    decreaseHealth(inflictedDamage)
    {
        this.health = this.health - inflictedDamage;
    }

    updateWalkableTiles(tiles)
    {
        this.walkableTiles = tiles;
    }

    getWalkableTiles()
    {
        return this.walkableTiles;
    }

    changeCharacterPosition(newX, newY)
    {
        this.x = newX;
        this.y = newY;
    }


    pushCharacter() {
        Game.addCharToList(this);
    }

    addCharacterToTeam()
    {
        Game.addCharToTeam(this, this.team)
    }


    selectCharacter()
    {
        this.selected = true;
    }

    unSelectCharacter()
    {
        this.selected = false;
    }

    characterSelected()
    {
        return this.selected;
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

    getTeamName()
    {
        return this.team.getTeamName();
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
        else if (item instanceof Spell) 
        {
            this.knownSpells.push(item);
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
        if(this.equippedWeapon.length === 0)
        {
            return " ";
        }
        else
        {
            let htmlinfo = 
            `
                  _____________ <br>
                 / Weapon list: <br>
            `

            for (const item of this.equippedWeapon) {
                htmlinfo += `<span class="weapon-name clickable" data-weapon-name="${item.getWeaponName()}" data-spell-owner="${this.getName()}">|- ${item.getWeaponName()} ${item.getWeaponDamageRange()}</span> <br>`
            }


            return htmlinfo;
        }
    }

    showArmor()
    {
        if(this.equippedArmor.length === 0)
        {
            return " ";
        }
        else
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
    }

    showSpells()
    {
        if(this.knownSpells.length === 0)
        {
            return " ";
        }
        else
        {
            let htmlinfo = 
            `
                  _____________ <br>
                 / Spell list: <br>
            `

            for (const spell of this.knownSpells) {
                htmlinfo += `<span class="spell-name clickable" data-spell-name="${spell.getSpellName()}" data-spell-owner="${this.getName()}">|- ${spell.getSpellName()}</span> <br>`
            }


            return htmlinfo;
        }
    }

    getMoveButton()
    {
        const moveButton = 
        `
            <button class="move-button clickable" id="moveButton" data-character-name="${this.getName()}">Move</button><br>
        `   

        return moveButton;
    }

    logCharacterInfo()
    {
        const htmlInfo = 
        `
            Team: ${this.getTeamName()} <br> <br>
            Name: ${this.getName()} <br>
            Health: ${this.getHealth()} <br>
            Carried Weight: ${this.getCarriedWeight()} <br>
            Speed: ${this.getSpeed()} <br>
            ${this.getMoveButton()}
            ${this.showWeapons()}
            ${this.showSpells()}
            ${this.showArmor()}
            <br>
            Pos X: ${this.getX()}<br>
            Pos Y: ${this.getY()}
        `

        return htmlInfo;
    }
}

module.exports = Character;

},{"../Constants/GameData":11,"./Entity":3,"./Item":5,"./Spell":7}],2:[function(require,module,exports){

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

const {CharacterList, WeaponList, ArmorList, TeamList, SpellList} = require("./List");
const Team = require('./Team');


class GameClass {
    constructor() {
        
        this.charactersList = new CharacterList();
        this.weaponsList = new WeaponList();
        this.armorPiecesList = new ArmorList();
        this.teamsList = new TeamList();
        this.spellsList = new SpellList();

        this.initializeTeams()

    }

    // Get methods
    getCharacters()
    {
        return this.charactersList.getCharacters();
    }

    getWeapons()
    {
        return this.weaponsList.getWeapons();
    }

    getSpells()
    {
        return this.spellsList.getSpells();
    }

    getArmorPieces()
    {
        return this.armorPiecesList.getArmorPieces();
    }

    getTeams()
    {
        return this.teamsList.getTeams();
    }

    getTeamOne()
    {
        return this.TeamOne;
    }

    getTeamTwo()
    {
        return this.TeamTwo;
    }


    // Add methods
    addCharToList(char)
    {
        this.charactersList.addCharacter(char)
    }

    addWeaponToList(weapon)
    {
        this.weaponsList.addWeapon(weapon)
    }

    addSpellToList(spell)
    {
        this.spellsList.addSpell(spell)
    }

    addArmorToList(armor)
    {
        this.armorPiecesList.addArmorPiece(armor)
    }

    addCharToTeam(char, team)
    {
        team.addCharacter(char);
    }


    initializeTeams(teamOneName, teamTwoName)
    {
        // Create teams
        this.TeamOne = new Team(teamOneName);
        this.TeamTwo = new Team(teamTwoName);

        // Add teams
        this.teamsList.addTeam(this.TeamOne);
        this.teamsList.addTeam(this.TeamTwo);
    }

}

module.exports = GameClass;

},{"./List":6,"./Team":8}],5:[function(require,module,exports){

const { Game } = require("../Constants/GameData")

class Item {
    constructor(name, weight) {
        this.name = name;
        this.weight = weight;
    }
}


class Weapon extends Item {
    constructor(name, damage, atackRange, weight, damageStats, ammunitionWeaponStatus)
    {
        super(name, weight)

        this.minDamage = damage.x;
        this.maxDamage = damage.y;

        this.attackRange = atackRange;

        this.ammunitionWeapon = ammunitionWeaponStatus;
        this.selectedAmmunition = null;

        this.CutDamageFraction = damageStats.CutDamage;
        this.PierceDamageFraction = damageStats.PierceDamage;
        this.IncisiveDamageFraction = damageStats.IncisiveDamage;
        this.FireDamageFraction = damageStats.FireDamage;
        this.FrostDamageFraction = damageStats.FrostDamage;
        this.ElectricDamageFraction = damageStats.ElectricDamage;
        this.ToxicDamageFraction = damageStats.ToxicDamage;

        this.rangeTiles = [];

        this.pushWeapon();
        this.ammunitionWeaponInit()
    }

    getMaxDmg()
    {
        return this.maxDamage;
    }

    getMinDmg()
    {
        return this.minDamage;
    }

    updateRangeTiles(tiles)
    {
        this.rangeTiles = tiles;
    }

    getRangeTiles()
    {
        return this.rangeTiles;
    }

    getAttackRange()
    {
        return this.attackRange;
    }

    ammunitionWeaponInit()
    {
        if(this.ammunitionWeapon)
        {
            this.ammunitionList = [];
        }
    }

    addAmmo(ammo)
    {
        if(this.ammunitionWeapon)
        {
            this.ammunitionList.push(ammo)
        }
    }

    selectAmmunition(ammunitionName)
    {
        if(this.ammunitionWeapon)
        {
            for (const ammo of this.ammunitionList) {
                if(ammo.getAmmunitionName() == ammunitionName)
                {
                    this.selectedAmmunition = ammo;   
                    this.updateWeaponStats(ammo)
                }
            }
        }
    }

    getSelectedAmmoName()
    {
        if(this.selectedAmmunition === null)
        {
            return "No ammunition";
        }
        else
        {
            return this.selectedAmmunition.getAmmunitionName();
        }
    }

    updateWeaponStats(ammo)
    {
        if(this.ammunitionWeapon)
        {
            this.minDamage = ammo.getAmmunitionMinDamage();
            this.maxDamage = ammo.getAmmunitionMaxDamage();

            this.attackRange = ammo.getAmmunitionAtackRange();

            this.CutDamageFraction = ammo.getAmmunitionCutDamageFraction();
            this.PierceDamageFraction = ammo.getAmmunitionPierceDamageFraction();
            this.IncisiveDamageFraction = ammo.getAmmunitionIncisiveDamageFraction();
            this.FireDamageFraction =ammo.getAmmunitionFireDamageFraction();
            this.FrostDamageFraction = ammo.getAmmunitionFrostDamageFraction();
            this.ElectricDamageFraction = ammo.getAmmunitionElectricDamageFraction();
            this.ToxicDamageFraction = ammo.getAmmunitionToxicDamageFraction();
        }
    }

    pushWeapon() {
        Game.addWeaponToList(this);
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
        if(this.ammunitionWeapon)
        {
            const htmlinfo = 
            `
                Name:<p class="weapon-info-display">${this.getWeaponName()}</p> <br>
                Damage range: ${this.getWeaponDamageRange()} <br> 
                Atack range: ${this.getAttackRange()} <br>
                Current Ammo: ${this.getSelectedAmmoName()}<br>
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
        else
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
}

class Ammunition extends Item {
    constructor(name, damage, ammunitionRange, weight, damageStats)
    {
        super(name, weight)

        this.minDamage = damage.x;
        this.maxDamage = damage.y;

        this.ammunitionRange = ammunitionRange;

        this.CutDamageFraction = damageStats.CutDamage;
        this.PierceDamageFraction = damageStats.PierceDamage;
        this.IncisiveDamageFraction = damageStats.IncisiveDamage;
        this.FireDamageFraction = damageStats.FireDamage;
        this.FrostDamageFraction = damageStats.FrostDamage;
        this.ElectricDamageFraction = damageStats.ElectricDamage;
        this.ToxicDamageFraction = damageStats.ToxicDamage;

    }

    getAmmunitionName()
    {
        return this.name;
    }

    getAmmunitionDamageRange()
    {
        return `${this.minDamage} - ${this.maxDamage}`
    }

    getAmmunitionMinDamage()
    {
        return this.minDamage;
    }

    getAmmunitionMaxDamage()
    {
        return this.maxDamage;
    }

    getAmmunitionAtackRange()
    {
        return this.ammunitionRange;
    }

    getAmmunitionCutDamageFraction() { return this.CutDamageFraction; }
    getAmmunitionPierceDamageFraction(){ return this.PierceDamageFraction; }
    getAmmunitionIncisiveDamageFraction() { return this.IncisiveDamageFraction; }
    getAmmunitionFireDamageFraction() { return this.FireDamageFraction; }
    getAmmunitionFrostDamageFraction() { return this.FrostDamageFraction; }
    getAmmunitionElectricDamageFraction() { return this.ElectricDamageFraction; }
    getAmmunitionToxicDamageFraction() { return this.ToxicDamageFraction; }

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

        this.pushArmor()
    }

    pushArmor() {
        Game.addArmorToList(this);
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

module.exports = { Weapon, Armor, Ammunition };
},{"../Constants/GameData":11}],6:[function(require,module,exports){


class TeamList {
    constructor()
    {
        this.teams = []
    }

    addTeam(team)
    {
        this.teams.push(team)
    }

    getTeams()
    {
        return this.teams;
    }
}

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

class SpellList {
    constructor()
    {
        this.spells = []
    }

    addSpell(spell)
    {
        this.spells.push(spell)
    }

    getSpells()
    {
        return this.spells;
    }
}

module.exports = { TeamList, CharacterList, ArmorList, WeaponList, SpellList };
},{}],7:[function(require,module,exports){
const { Game } = require("../Constants/GameData")

class Spell  {
    constructor(name, damage, atackRange, damageStats)
    {
        this.name = name;

        this.minDamage = damage.x;
        this.maxDamage = damage.y;

        this.attackRange = atackRange;

        this.CutDamageFraction = damageStats.CutDamage;
        this.PierceDamageFraction = damageStats.PierceDamage;
        this.IncisiveDamageFraction = damageStats.IncisiveDamage;
        this.FireDamageFraction = damageStats.FireDamage;
        this.FrostDamageFraction = damageStats.FrostDamage;
        this.ElectricDamageFraction = damageStats.ElectricDamage;
        this.ToxicDamageFraction = damageStats.ToxicDamage;

        this.rangeTiles = [];

        this.pushSpell();
    }


    updateRangeTiles(tiles)
    {
        this.rangeTiles = tiles;
    }

    getRangeTiles()
    {
        return this.rangeTiles;
    }


    pushSpell() {
        Game.addSpellToList(this);
    }

    getSpellName()
    {
        return this.name;
    }

    getSpellMaxDmg()
    {
        return this.maxDamage;
    }

    getSpellMinDmg()
    {
        return this.minDamage;
    }

    getSpellDamageRange()
    {
        return `${this.minDamage} - ${this.maxDamage}`
    }

    getSpellAttackRange()
    {
        return `${this.attackRange}`
    }

    getSpellCutDamageFraction() { return this.CutDamageFraction; }
    getSpellPierceDamageFraction(){ return this.PierceDamageFraction; }
    getSpellIncisiveDamageFraction() { return this.IncisiveDamageFraction; }
    getSpellFireDamageFraction() { return this.FireDamageFraction; }
    getSpellFrostDamageFraction() { return this.FrostDamageFraction; }
    getSpellElectricDamageFraction() { return this.ElectricDamageFraction; }
    getSpellToxicDamageFraction() { return this.ToxicDamageFraction; }

    displaySpellInfo()
    {
        const htmlinfo = 
        `
            Name:<p class="spell-info-display">${this.getSpellName()}</p> <br>
            Damage range: ${this.getSpellDamageRange()} <br>
            Atack range: ${this.getSpellAttackRange()} <br>
             _____________ <br>
            / Damage type: <br>
            | -> Cut DMG: ${(this.getSpellCutDamageFraction())*100}% <br>
            | -> Pierce DMG: ${(this.getSpellPierceDamageFraction())*100}% <br>
            | -> Incisive DMG: ${(this.getSpellIncisiveDamageFraction())*100}% <br>
            | -> Fire DMG: ${(this.getSpellFireDamageFraction())*100}% <br>
            | -> Frost DMG: ${(this.getSpellFrostDamageFraction())*100}% <br>
            | -> Electric DMG: ${(this.getSpellElectricDamageFraction())*100}% <br>
            | -> Toxic DMG: ${(this.getSpellToxicDamageFraction())*100}% <br>
        ` 

        return htmlinfo;
    }
}

module.exports = { Spell };

},{"../Constants/GameData":11}],8:[function(require,module,exports){


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
},{}],9:[function(require,module,exports){


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
                       ctx.fillStyle = 'rgb(60, 160, 60)';
                   } else if (this.mapData[y][x] === 1) {
                       ctx.fillStyle = 'rgb(40, 80, 160)';
                   } else if (this.mapData[y][x] === 101) {
                       ctx.fillStyle = 'rgb(48, 47, 46)';
                   }  else if (this.mapData[y][x] === 111) {
                       ctx.fillStyle = 'gray';
                   } else if (this.mapData[y][x] === 999) {
                       ctx.fillStyle = 'lightgreen';
                   } else if (this.mapData[y][x] === 666) {
                       ctx.fillStyle = 'rgb(191, 148, 228)';
                   } else if (this.mapData[y][x] === 888) {
                       ctx.fillStyle = '#F96C51';
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

    getTileMapHeight()
    {
        return this.height;
    }

    getTileMapWidth()
    {
        return this.width;
    }
       
}


module.exports = TileMap;

},{}],10:[function(require,module,exports){

class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

module.exports = Vector2D;

},{}],11:[function(require,module,exports){

const GameClass =  require("../Class/GameClass");

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
const heightTiles = 32;

const mapWidth = tileSize * widthTiles;
const mapHeight = tileSize * heightTiles;


function createGameClass()
{
    const Game = new GameClass();
    return Game;
}

const Game = createGameClass();


// init lists 
// const charactersList = new CharacterList();
// const weaponsList = new WeaponList();
// const armorPiecesList = new ArmorList();

// init teams
// const TeamBlue = new Team("Team Blue");
// const TeamRed = new Team("Team Red");

module.exports = {mapData, mapWidth, mapHeight, tileSize, Game}
},{"../Class/GameClass":4}],12:[function(require,module,exports){

const TileMap = require("../Class/TileMap")
const {mapData, mapHeight, mapWidth, tileSize} = require("../Constants/GameData");

// Game setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = mapWidth;
canvas.height = mapHeight;

const tileMap = new TileMap(tileSize, mapData);

module.exports = {canvas, ctx, tileMap, mapData}


},{"../Class/TileMap":9,"../Constants/GameData":11}],13:[function(require,module,exports){

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

function clearTiles()
{
    clearID(666);
    clearID(888);
    clearID(999);
    clearID(111);
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

        // Attack logic
        if (selectedCharacter) {

            /* Spell attack */
            const spellElement = document.querySelector('p.spell-info-display');
            const spellName = spellElement ? spellElement.textContent.trim() : null;

            if (spellName) {
                const spells = Game.getSpells().filter(spell => spell.getSpellName() === spellName);
                for (const spell of spells) {
                    const damageToInflict = Math.floor(Math.random() * (spell.getSpellMaxDmg() - spell.getSpellMinDmg() + 1)) + spell.getSpellMinDmg();
                    if (spell.getRangeTiles(selectedCharacter).some(tile => tile[0] === blockX && tile[1] === blockY)) {
                        if (mapData[blockY][blockX] === 101) { 
                            Game.getCharacters().forEach(char => {
                                if (char.getX() === blockX && char.getY() === blockY) {
                                    char.decreaseHealth(damageToInflict);
                                    return;
                                }
                            });
                        }
                    }
                }
            }


            /* Weapon attack */
            const weaponElement = document.querySelector('p.weapon-info-display');
            const weaponName = weaponElement ? weaponElement.textContent.trim() : null;

            if (weaponName) {

                console.log(weaponName)
                
                const weapons = Game.getWeapons().filter(spell => spell.getWeaponName() === weaponName);
                for (const weapon of weapons) {
                    const damageToInflict = Math.floor(Math.random() * (weapon.getMaxDmg() - weapon.getMinDmg() + 1)) + weapon.getMinDmg();

                    console.log(damageToInflict)

                    if (weapon.getRangeTiles(selectedCharacter).some(tile => tile[0] === blockX && tile[1] === blockY)) {
                        if (mapData[blockY][blockX] === 101) { 
                            Game.getCharacters().forEach(char => {
                                if (char.getX() === blockX && char.getY() === blockY) {
                                    char.decreaseHealth(damageToInflict);
                                    return;
                                }
                            });
                        }
                    }
                }
            }
        }

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
                clearTiles()
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
    clearTiles()
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

            for (const character of Game.getCharacters()) {
                
                if (character.characterSelected()) {
                    const tilesInRange = getReachableTiles(mapData, character.getX(), character.getY(), weapon.getAttackRange())

                    weapon.updateRangeTiles(tilesInRange);

                    console.log(tilesInRange)

                    // Update mapData for each tile within range
                    for (const tile of tilesInRange) {
                        const [x, y] = tile;
                        mapData[y][x] = 888;
                    }                      
                    console.log(mapData)
                }
            }
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
    clearTiles()
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

        clearTiles()
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
},{"../Constants/GameData":11,"../MapUtils/map":12}],14:[function(require,module,exports){

const Character = require("./Class/Character")
const Vector2D = require('./Class/Vector2D');
const DamageVector7 = require('./Class/DamageVector7');
const { Weapon, Armor, Ammunition } = require('./Class/Item');
const { Spell } = require('./Class/Spell');
const { Game } = require("./Constants/GameData")

const {tileMap, ctx, canvas } = require("./MapUtils/map");
const { mapData } = require("./Constants/GameData");
const { createArmorEventListener, createWeaponEventListener, addCharacterEventListener, createSpellEventListener } = require("./UI/displayInfo");

addCharacterEventListener();
createWeaponEventListener();
createArmorEventListener();   
createSpellEventListener();


function gameLoop() {
    updateMapData();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tileMap.draw(ctx);
    requestAnimationFrame(gameLoop);
}

function updateMapData() {
    let anyCharSelected = false;
    for (const character of Game.getCharacters()) {
        if(character.characterSelected())
        {
            mapData[character.getY()][character.getX()] = 111;
            anyCharSelected = true;
        }
        else
        {
            mapData[character.getY()][character.getX()] = 101;
        }
    }
    if(!anyCharSelected)
    {
        for (let y = 0; y < tileMap.getTileMapHeight(); y++) {
            for (let x = 0; x < tileMap.getTileMapWidth(); x++) {
                if (mapData[y][x] === 999) {
                    mapData[y][x] = 0;
                }
            }
        }
        for (let y = 0; y < tileMap.getTileMapHeight(); y++) {
            for (let x = 0; x < tileMap.getTileMapWidth(); x++) {
                if (mapData[y][x] === 111) {
                    mapData[y][x] = 0;
                }
            }
        }
        for (let y = 0; y < tileMap.getTileMapHeight(); y++) {
            for (let x = 0; x < tileMap.getTileMapWidth(); x++) {
                if (mapData[y][x] === 666) {
                    mapData[y][x] = 0;
                }
            }
        }
        for (let y = 0; y < tileMap.getTileMapHeight(); y++) {
            for (let x = 0; x < tileMap.getTileMapWidth(); x++) {
                if (mapData[y][x] === 888) {
                    mapData[y][x] = 0;
                }
            }
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


/* Spell test */
const FireBallDamage = new Vector2D(10, 20)
const FireBallStats = new DamageVector7(0, 0, 0, 1, 0, 0, 0)
const FireBall = new Spell("Fire Ball", FireBallDamage, 6, FireBallStats)

Melarkey.equip(FireBall)

/* wooden bow test */

// create bow
const WoodenBowDamage = new Vector2D(0, 2)
const WoodenBowStats = new DamageVector7(0, 0, 1, 0, 0, 0, 0)
const WoodenBow = new Weapon("Wooden bow", WoodenBowDamage, 1.5, 5, WoodenBowStats, true)
// create arrow
const StoneArrowDamage = new Vector2D(11, 17)
const StoneArrowStats = new DamageVector7(0, 1, 0, 0, 0, 0, 0)
const StoneArrow = new Ammunition("Stone arrow", StoneArrowDamage, 8, 1, StoneArrowStats)

WoodenBow.addAmmo(StoneArrow);
WoodenBow.addAmmo(StoneArrow);
WoodenBow.addAmmo(StoneArrow);
WoodenBow.addAmmo(StoneArrow);
// WoodenBow.selectAmmunition("Stone arrow");

const SteelBladeStats = new DamageVector7(0.45, 0.45, 0.1, 0, 0, 0, 0)

const SteelSwordDamage = new Vector2D(16, 20)
const SteelSword = new Weapon("Steel Sword", SteelSwordDamage, 1.5, 8, SteelBladeStats, true);

const SteelShortBladeDamage = new Vector2D(4, 9)
const SteelShortBlade = new Weapon("Steel short blade", SteelShortBladeDamage, 1.5, 2, SteelBladeStats, true);

const PlateProtectionStats = new DamageVector7(0.75, 0.5, 0.5, 0.5, 0.5, 0, 0.9)

const PlateArmor = new Armor("Steel Plate Chest-Plate", 40, PlateProtectionStats);
const PlateGloves = new Armor("Steel Plate Gloves", 16, PlateProtectionStats);
const PlateBoots = new Armor("Steel Plate Boots", 16, PlateProtectionStats);
const PlateLeggins = new Armor("Steel Plate Leggins", 18, PlateProtectionStats);
const BodyChainmail = new Armor("Steel Body Chainmail", 10, PlateProtectionStats);

// BOW MELARKEY
Melarkey.equip(WoodenBow)

// MELE FIGHTERS
Tony.equip(SteelSword)
Tony.equip(SteelShortBlade)

Tony.equip(PlateArmor);
Tony.equip(PlateGloves);
Tony.equip(PlateBoots);
Tony.equip(PlateLeggins);
Tony.equip(BodyChainmail);

Silver.equip(SteelSword)
Silver.equip(SteelShortBlade)

Silver.equip(PlateArmor);
// Silver.equip(PlateGloves);
Silver.equip(PlateBoots);
Silver.equip(PlateLeggins);
Silver.equip(BodyChainmail);


gameLoop(); // Start the game loop





},{"./Class/Character":1,"./Class/DamageVector7":2,"./Class/Item":5,"./Class/Spell":7,"./Class/Vector2D":10,"./Constants/GameData":11,"./MapUtils/map":12,"./UI/displayInfo":13}]},{},[14]);
