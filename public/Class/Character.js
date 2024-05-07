

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
