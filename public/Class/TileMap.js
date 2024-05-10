

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
                       ctx.fillStyle = 'rgb(60, 160, 60)';
                   } else if (this.mapData[y][x] === 1) {
                       ctx.fillStyle = 'rgb(40, 80, 160)';
                   } else if (this.mapData[y][x] === 101) {
                       ctx.fillStyle = 'rgb(48, 47, 46)';
                   }  else if (this.mapData[y][x] === 111) {
                       ctx.fillStyle = 'gray';
                   } else if (this.mapData[y][x] === 999) {
                       ctx.fillStyle = 'lightgreen';
                   } else if (this.mapData[y][x] === 666) {
                       ctx.fillStyle = 'rgb(191, 148, 228)';
                   } else if (this.mapData[y][x] === 888) {
                       ctx.fillStyle = '#F96C51';
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

    getTileMapHeight()
    {
        return this.height;
    }

    getTileMapWidth()
    {
        return this.width;
    }
       
}


module.exports = TileMap;
