

class Team {
    constructor(name)
    {
        this.name = name;
        this.characters = []
    }

    getTeamName()
    {
        return this.name
    }

    addCharacter(char)
    {
        this.characters.push(char)
    }

    getCharacters()
    {
        return this.characters;
    }

    logCharacters()
    {
        for(const char of this.characters)
        {
            console.log(char)
        }
    }
}

module.exports = Team;