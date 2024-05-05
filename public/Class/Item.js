
class Item {
    constructor(name, weight) {
        this.name = name;
        this.weight = weight;
    }
}


class Weapon extends Item {
    constructor(name, damage, weight, damageStats)
    {
        super(name, weight)

        this.minDamage = damage.x;
        this.maxDamage = damage.y;

        this.CutDamageFraction = damageStats.CutDamage;
        this.PierceDamageFraction = damageStats.PierceDamage;
        this.IncisiveDamageFraction = damageStats.IncisiveDamage;
        this.FireDamageFraction = damageStats.FireDamage;
        this.FrostDamageFraction = damageStats.FrostDamage;
        this.ElectricDamageFraction = damageStats.ElectricDamage;
        this.ToxicDamageFraction = damageStats.ToxicDamage;
    }

    getWeaponName()
    {
        return this.name;
    }

    getWeaponDamageRange()
    {
        return `${this.minDamage} - ${this.maxDamage}`
    }
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
    }

    getArmorName()
    {
        return this.name;
    }
}

module.exports = { Weapon, Armor };