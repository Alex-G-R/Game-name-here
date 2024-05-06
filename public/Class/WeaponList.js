

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

module.exports = WeaponList;