

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

module.exports = { TeamList, CharacterList, ArmorList, WeaponList };