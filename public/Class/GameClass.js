
const {CharacterList, WeaponList, ArmorList, TeamList} = require("./List");
const Team = require('./Team');


class GameClass {
    constructor() {
        
        this.charactersList = new CharacterList();
        this.weaponsList = new WeaponList();
        this.armorPiecesList = new ArmorList();
        this.teamsList = new TeamList();

        this.initializeTeams()

    }

    // Get methods
    getCharacters()
    {
        return this.charactersList.getCharacters();
    }

    getWeapons()
    {
        return this.weaponsList.getWeapons();
    }

    getArmorPieces()
    {
        return this.armorPiecesList.getArmorPieces();
    }

    getTeams()
    {
        return this.teamsList.getTeams();
    }

    getTeamOne()
    {
        return this.TeamOne;
    }

    getTeamTwo()
    {
        return this.TeamTwo;
    }


    // Add methods
    addCharToList(char)
    {
        this.charactersList.addCharacter(char)
    }

    addWeaponToList(weapon)
    {
        this.weaponsList.addWeapon(weapon)
    }

    addArmorToList(armor)
    {
        this.armorPiecesList.addArmorPiece(armor)
    }

    addCharToTeam(char, team)
    {
        team.addCharacter(char);
    }


    initializeTeams(teamOneName, teamTwoName)
    {
        // Create teams
        this.TeamOne = new Team(teamOneName);
        this.TeamTwo = new Team(teamTwoName);

        // Add teams
        this.teamsList.addTeam(this.TeamOne);
        this.teamsList.addTeam(this.TeamTwo);
    }

}

module.exports = GameClass;
