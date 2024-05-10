

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

        this.pushCharacter()
        this.addCharacterToTeam();
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
                htmlinfo += `<span class="weapon-name clickable" data-weapon-name="${item.getWeaponName()}">|- ${item.getWeaponName()} ${item.getWeaponDamageRange()}</span> <br>`
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
                htmlinfo += `<span class="spell-name clickable" data-spell-name="${spell.getSpellName()}">|- ${spell.getSpellName()}</span> <br>`
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
        `

        return htmlInfo;
    }
}

module.exports = Character;
