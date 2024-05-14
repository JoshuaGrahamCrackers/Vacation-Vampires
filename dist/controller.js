/*
* this is the controller class this is where the controls for the game are made. event listeners will be added for certin keyborad events in order for the player to control the game.
@property activeKeys -  we need a property to check which key is active and if a specific key is being pressed than do a certain action (ex: if w is active than move up).
*/
class Controller {
    velocityX;
    velocityY;
    activeKeys = new Set();
    canvas;
    player;
    game;
    context;
    constructor(canvas, player, game, context) {
        this.canvas = canvas;
        this.player = player;
        this.game = game;
        this.velocityX = this.game.velocityX;
        this.velocityY = this.game.velocityY;
        this.context = context;
        window.addEventListener("mousedown", this.handleClick.bind(this));
        window.addEventListener("keydown", this.handleKeyDown.bind(this));
        window.addEventListener("keyup", this.handleKeyUp.bind(this));
    }
    handleKeyDown(event) {
        // Add the pressed key to the activeKeys set
        this.activeKeys.add(event.key);
        // Update velocity based on all active keys
        this.updateVelocity();
    }
    handleKeyUp(event) {
        // Remove the released key from the activeKeys set
        this.activeKeys.delete(event.key);
        // Update velocity based on all active keys
        this.updateVelocity();
    }
    updateVelocity() {
        let speed = this.game.player.speed;
        // Reset velocity
        this.game.setVelocityX = 0;
        this.game.setVelocityY = 0;
        // Update velocity based on active keys
        if (this.activeKeys.has("d")) {
            this.game.setVelocityX = this.game.velocityX + speed;
        }
        if (this.activeKeys.has("a")) {
            this.game.setVelocityX = this.game.velocityX - speed;
        }
        if (this.activeKeys.has("s")) {
            this.game.setVelocityY = this.game.velocityY + speed;
        }
        if (this.activeKeys.has("w")) {
            this.game.setVelocityY = this.game.velocityY - speed;
        }
        // Normalize the velocity if necessary
        const length = Math.sqrt(this.game.velocityX ** 2 + this.game.velocityY ** 2);
        if (length > 0) {
            this.game.setVelocityX = (this.game.velocityX / length) * speed;
            this.game.setVelocityY = (this.game.velocityY / length) * speed;
        }
    }
    handleClick(event) {
        this.game.shoot(event);
    }
}
//# sourceMappingURL=controller.js.map