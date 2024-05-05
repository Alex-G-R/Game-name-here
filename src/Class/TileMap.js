class TileMap {
    constructor(tileSize, mapData) {
        this.tileSize = tileSize;
        this.mapData = mapData;
        this.height = mapData.length;
        this.width = mapData[0].length;
    }

    draw(ctx) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.mapData[y][x] === 1) {
                    ctx.fillStyle = 'lightblue';
                } else {
                    ctx.fillStyle = 'lightgreen';
                }
                ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
            }
        }
    }
}

module.exports = TileMap;
