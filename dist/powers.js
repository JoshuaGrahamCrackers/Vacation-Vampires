/*
 * this is the power up class that holds the properties of the power ups that spawn in the game like their x and y coordinates that the spawn at, and size.
 @property type - we need a property that stores the type of power up that is being picked up by the player the program needs to know what kind of power up is being picked up.
 @property img - we need a property that stores the image being used to display the power up each power up has it's own design.
 */
class Powerup {
    _x;
    _y;
    _size;
    canvas;
    context;
    type; // 'heal', 'activateSpeed', 'activateDoubleShot'
    img;
    constructor(x, y, size, canvas, context, type) {
        this._x = x;
        this._y = y;
        this._size = size;
        this.canvas = canvas;
        this.context = context;
        this.type = type;
        this.img = new Image();
        this.img.src = this.powerupIcon();
    }
    powerupIcon() {
        switch (this.type) {
            case "heal":
                return document.getElementById("healIcon").src;
            case "activateSpeed":
                return document.getElementById("speedIcon").src;
            case "activateDoubleShot":
                return document.getElementById("doubleShotIcon")
                    .src;
            default:
                break;
        }
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get size() {
        return this._size;
    }
    getType() {
        return this.type;
    }
    draw(offsetX, offsetY) {
        const adjustedX = this._x + offsetX;
        const adjustedY = this._y + offsetY;
        this.context.fillStyle = "blue"; // Draw the powerup as a blue circle (marked for deletion)
        this.context.beginPath();
        this.context.fillStyle = "blue";
        this.context.drawImage(this.img, adjustedX - this._size / 2, adjustedY - this._size / 2, this._size, this._size);
    }
}
//# sourceMappingURL=powers.js.map