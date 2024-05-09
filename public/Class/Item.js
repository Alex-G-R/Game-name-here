
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

        this.pushWeapon();
        this.ammunitionWeaponInit()
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
        this.ammunitionList.push(ammo)
    }

    selectAmmunition(ammunitionName)
    {
        for (const ammo of this.ammunitionList) {
            if(ammo.getAmmunitionName() == ammunitionName)
            {
                this.selectedAmmunition = ammo;   
                this.updateWeaponStats(ammo)
            }
        }
    }

    getSelectedAmmoName()
    {
        if(this.selectedAmmunition === null)
        {
            return "no ammunition";
        }
        else
        {
            return this.selectedAmmunition.getAmmunitionName();
        }
    }

    updateWeaponStats(ammo)
    {
        this.minDamage = ammo.getAmmunitionMinDamage();
        this.maxDamage = ammo.getAmmunitionMaxDamage();

        this.atackRange = ammo.getAmmunitionAtackRange();

        this.CutDamageFraction = ammo.getAmmunitionCutDamageFraction();
        this.PierceDamageFraction = ammo.getAmmunitionPierceDamageFraction();
        this.IncisiveDamageFraction = ammo.getAmmunitionIncisiveDamageFraction();
        this.FireDamageFraction =ammo.getAmmunitionFireDamageFraction();
        this.FrostDamageFraction = ammo.getAmmunitionFrostDamageFraction();
        this.ElectricDamageFraction = ammo.getAmmunitionElectricDamageFraction();
        this.ToxicDamageFraction = ammo.getAmmunitionToxicDamageFraction();
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
                Name: ${this.getWeaponName()} <br>
                Damage range: ${this.getWeaponDamageRange()} <br> 
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