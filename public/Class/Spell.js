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
