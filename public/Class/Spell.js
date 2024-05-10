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

        this.pushSpell();
    }

    pushSpell() {
        Game.addSpellToList(this);
    }

    getSpellName()
    {
        return this.name;
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
            Name: ${this.getSpellName()} <br>
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
