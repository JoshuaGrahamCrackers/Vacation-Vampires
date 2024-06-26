/*
* this is the vampire parent class that stores the vampires x and y coordinates, size (width and height), and speed. All vampires can take damage and get cured but have a different amount of hitpoints, speed, and designs.
@property projectile - we need a property that will allow access to the projectiles radius, x and y coordinates so that we can check the collision between the vampires and the projectiles.
@property game - we need a property that allows access to the increaseScore mehtod when the vampire gets cured and will allow access to the getPlayerPosition to aujust the projectiles position.
@property img - we need a property that stores each vampires design so that we can apply the design unto the drawing.
*/
class Vampire {
    health;
    design;
    _x;
    _y;
    _size; // Added size property to the Vampire class
    projectile;
    game;
    canvas;
    context;
    img;
    _speed;
    constructor(x, y, health, speed, design, canvas, context, game) {
        this.health = health;
        this.design = design;
        this._x = x;
        this._y = y;
        this._speed = speed;
        this._size = 100; // Default size value, change it as needed
        this.canvas = canvas;
        this.context = context;
        this.game = game;
        this.img = new Image();
        this.img.src = this.vampireImage(); //create to a method with a return
    }
    get size() {
        return this._size;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get speed() {
        return this._speed;
    }
    vampireImage() {
        switch (this.design) {
            case "Bob":
                return document.getElementById("BobVampire").src;
            case "Sal":
                return document.getElementById("SalVampire").src;
            case "Soap":
                return document.getElementById("SoapVampire").src;
            case "Vlad":
                return document.getElementById("VladVampire").src;
            default:
                break;
        }
    }
    draw(x, y) {
        this.context.drawImage(this.img, x, y, this._size, this._size); //This._size used twice to draw square
    }
    takeDamage() {
        this.health -= 1;
    }
    cure(vampireArray) {
        if (this.health <= 0) {
            this.game.vampires = vampireArray.filter((v) => v !== this);
            this.game.increaseScore();
        }
    }
    updateVampires() {
        //Put this in vampire class
        if (this.game.getVampires.length > 0) {
            // Update vampire position based on velocity
            const deltaX = this.game.player.x - this.x;
            const deltaY = this.game.player.y - this.y;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const speed = 0.5; // Adjust the base speed as needed
            const maxSpeed = this.speed; // Set a maximum speed to prevent overly fast vampires
            // Increase the speed if the vampire is far from the player
            const adjustedSpeed = Math.min(speed + 0.1 * distance, maxSpeed);
            const velocityX = (deltaX / distance) * adjustedSpeed;
            const velocityY = (deltaY / distance) * adjustedSpeed;
            this._x += velocityX;
            this._y += velocityY;
            // Adjust the vampire's position based on the player's offset
            const vampireX = this.x + this.canvas.width / 2 - this.game.player.x;
            const vampireY = this.y + this.canvas.height / 2 - this.game.player.y;
            //Draw the vampire at the adjusted position
            this.draw(vampireX, vampireY);
        }
    }
    // check collision between the vampire and the projectile
    checkCollision(projectileY, projectileHeight, vampireY, vampireHeight, vampireX, vampireWidth, projectileX, projectileWidth, projectileArray, vampireArray) {
        // Adjust projectile position based on the player's offset
        const adjustedProjectileX = projectileX -
            this.game.getPlayerPosition().x +
            this.game.canvas.width / 2;
        const adjustedProjectileY = projectileY -
            this.game.getPlayerPosition().y +
            this.game.canvas.height / 2;
        // Check if the projectile and vampire collide by comparing their coordinates:
        // Projectile's vertical range overlaps with vampire's vertical range
        // AND projectile's horizontal range overlaps with vampire's horizontal range
        if (adjustedProjectileY - projectileHeight < vampireY + vampireHeight &&
            adjustedProjectileY + projectileHeight > vampireY &&
            adjustedProjectileX - projectileWidth < vampireX + vampireWidth &&
            adjustedProjectileX + projectileWidth > vampireX) {
            this.takeDamage();
            this.cure(vampireArray);
        }
    }
}
/*
 * this is the Vlad class that extends and is a subclass of Vampire. Vlad is balanced in terms of health and speed.
 */
class Vlad extends Vampire {
    static stats = {
        health: 4,
        speed: 4,
        design: "Vlad",
    };
    constructor(x, y, canvas, context, game) {
        super(x, y, Vlad.stats.health, Vlad.stats.speed, Vlad.stats.design, canvas, context, game);
    }
}
/*
 * this is the Soap class it extends and is a subclass of Vampire. Soap is faster than all the other vampires but is very fragile.
 */
class Soap extends Vampire {
    static stats = {
        health: 3,
        speed: 6,
        design: "Soap",
    };
    constructor(x, y, canvas, context, game) {
        super(x, y, Soap.stats.health, Soap.stats.speed, Soap.stats.design, canvas, context, game);
    }
}
/*
 * this is the Sal class it extends and is a subclass of Vampire. Sal is simular to Vlad but has more health so he is harder to cure.
 */
class Sal extends Vampire {
    static stats = {
        health: 5,
        speed: 4,
        design: "Sal",
    };
    constructor(x, y, canvas, context, game) {
        super(x, y, Sal.stats.health, Sal.stats.speed, Sal.stats.design, canvas, context, game);
    }
}
/*
 * this is the Bob class it extends and is a subclass of Vampire. Bob is the slowest of all the vampires but he makes up for his lack of speed with his ablility to tank a lot of medicine.
 */
class Bob extends Vampire {
    static stats = {
        health: 6,
        speed: 3,
        design: "Bob",
    };
    constructor(x, y, canvas, context, game) {
        super(x, y, Bob.stats.health, Bob.stats.speed, Bob.stats.design, canvas, context, game);
    }
}
//# sourceMappingURL=vampire.js.map