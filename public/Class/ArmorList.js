

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

module.exports = ArmorList;