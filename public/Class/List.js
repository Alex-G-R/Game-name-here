

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

class SpellList {
    constructor()
    {
        this.spells = []
    }

    addSpell(spell)
    {
        this.spells.push(spell)
    }

    getSpells()
    {
        return this.spells;
    }
}

module.exports = { TeamList, CharacterList, ArmorList, WeaponList, SpellList };