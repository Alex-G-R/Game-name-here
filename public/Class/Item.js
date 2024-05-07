
const { CharacterList, WeaponList, ArmorList} = require("../Class/List");

class Item {
    constructor(name, weight) {
        this.name = name;
        this.weight = weight;
    }
}


class Weapon extends Item {
    constructor(name, damage, weight, damageStats, weaponList)
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

        this.pushWeapon(weaponList);
    }

    pushWeapon(weaponList) {
        weaponList.addWeapon(this);
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

class Armor extends Item {
    constructor(name, weight, protectionStats, armorPiecesList)
    {
        super(name, weight)

        this.CutDamageProtection = protectionStats.CutDamage;
        this.PierceDamageProtection = protectionStats.PierceDamage;
        this.IncisiveDamageProtection = protectionStats.IncisiveDamage;
        this.FireDamageProtection = protectionStats.FireDamage;
        this.FrostDamageProtection = protectionStats.FrostDamage;
        this.ElectricDamageProtection = protectionStats.ElectricDamage;
        this.ToxicDamageProtection = protectionStats.ToxicDamage;

        this.pushArmor(armorPiecesList)
    }

    pushArmor(armorPiecesList) {
        armorPiecesList.addArmorPiece(this);
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

module.exports = { Weapon, Armor };