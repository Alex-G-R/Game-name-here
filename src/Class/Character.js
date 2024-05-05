

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

        this.speed = this.getSpeed();

        this.inventory = [
            this.equippedWeapon = [],
            this.equippedArmor = []
        ];
        this.alive = true;
    }
    

    updateStats() {
        // Reset stats
        this.getSpeed();

        this.carriedWeight = 0;
        // Iterate through inventory to update stats
        for (const item of this.equippedWeapon) {
            this.carriedWeight += item.weight || 0;
        }
        for (const item of this.equippedArmor) {
            this.carriedWeight += item.weight || 0;
        }
    }

    getSpeed()
    {
        this.speed = 10 - (this.carriedWeight * 0.05);
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
}

module.exports = Character;