/*
  * this is the player class it contains proprties to store the x and y coordanate of the player, their size (both width and height), health, and the max health allowed
  @proporty img - we need a property here to store the character model used for the player so that we can apply the image to the object.
*/
class Player {
    _x;
    _y;
    _size;
    _health;
    maxHealth;
    canvas;
    context;
    img;
    game;
    doubleShotActive;
    superSpeedActive;
    healPickedUp;
    _speed;
    constructor(x, y, size, health, maxHealth, canvas, context, game) {
        this._x = x;
        this._y = y;
        this._size = size;
        this._health = health;
        this.maxHealth = maxHealth;
        this.canvas = canvas;
        this.context = context;
        this.game = game;
        this.img = new Image();
        this.img.src = document.getElementById("playerIcon").src;
        this._speed = 6;
    }
    get speed() {
        return this._speed;
    }
    get size() {
        return this._size;
    }
    set setX(value) {
        this._x = value;
    }
    set setY(value) {
        this._y = value;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    shoot(angle) {
        // Use the angle to determine the direction of the projectile
        const projectileX = this.x;
        const projectileY = this.y;
        // Create the projectile at the calculated starting position
        const projectile = new Projectile(projectileX, projectileY, 25, this.canvas, this.game, angle, this.context);
        this.game.projectiles.push(projectile);
        if (this.game.doubleShotActive) {
            // Create another projectile with the opposite angle for double shot
            const oppositeAngle = angle + Math.PI;
            const oppositeProjectile = new Projectile(projectileX, projectileY, 25, this.canvas, this.game, oppositeAngle, this.context);
            this.game.projectiles.push(oppositeProjectile);
        }
    }
    heal() {
        this._health = this.maxHealth;
    }
    activateSpeed() {
        this._speed *= 1.25;
    }
    activateDoubleShot() {
        this.game.doubleShotActive = true;
        this.img.src = document.getElementById("playerEliteIcon").src; //Change player design
    }
    takeDamage() {
        this._health -= 1;
    }
    get health() {
        return this._health;
    }
    draw() {
        this.context.drawImage(this.img, this.canvas.width / 2 - this.size / 2, this.canvas.height / 2 - this.size / 2, this.size, this.size);
    }
}
//# sourceMappingURL=player.js.map