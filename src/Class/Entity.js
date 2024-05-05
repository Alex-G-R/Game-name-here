
class Entity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move(dx, dy) {
        this.x = dx;
        this.y = dy;
    }
}

module.exports = Entity;