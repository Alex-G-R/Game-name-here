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
                // Set fill color based on tile type
                if (this.mapData[y][x] === 0) {
                    ctx.fillStyle = 'lightgreen';
                } else if (this.mapData[y][x] === 1) {
                    ctx.fillStyle = 'lightblue';
                } else if (this.mapData[y][x] === 101) {
                    ctx.fillStyle = 'red';
                }  else if (this.mapData[y][x] === 111) {
                    ctx.fillStyle = 'black';
                }
                // Draw filled rectangle
                ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                
                // Draw black border around the filled rectangle
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1; // Set border thickness to 1 pixel
                ctx.strokeRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
            }
        }
    }
}

module.exports = TileMap;
