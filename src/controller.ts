/*
* this is the controller class this is where the controls for the game are made. event listeners will be added for certin keyborad events in order for the player to control the game.
@property activeKeys -  we need a property to check which key is active and if a specific key is being pressed than do a certain action (ex: if w is active than move up).
*/
class Controller {
  private velocityX: number;
  private velocityY: number;
  private activeKeys: Set<string> = new Set();
  private canvas: HTMLCanvasElement;
  private player: Player;
  private game: Game;
  private context: CanvasRenderingContext2D;

  constructor(
    canvas: HTMLCanvasElement,
    player: Player,
    game: Game,
    context: CanvasRenderingContext2D,
  ) {
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

  private handleKeyDown(event: KeyboardEvent): void {
    // Add the pressed key to the activeKeys set
    this.activeKeys.add(event.key);

    // Update velocity based on all active keys
    this.updateVelocity();
  }

  private handleKeyUp(event: KeyboardEvent): void {
    // Remove the released key from the activeKeys set
    this.activeKeys.delete(event.key);

    // Update velocity based on all active keys
    this.updateVelocity();
  }

  private updateVelocity(): void {
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
    const length = Math.sqrt(
      this.game.velocityX ** 2 + this.game.velocityY ** 2,
    );

    if (length > 0) {
      this.game.setVelocityX = (this.game.velocityX / length) * speed;
      this.game.setVelocityY = (this.game.velocityY / length) * speed;
    }
  }

  private handleClick(event: MouseEvent): void {
    this.game.shoot(event);
  }
}
