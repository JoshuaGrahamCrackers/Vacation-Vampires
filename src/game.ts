/*
 * this is the game class that store the main methods for the game like spawning vampires increasing the players score, updading the objects and their positions every frame, drawing the objects, and shooting mechanics.
@property context - This property represents the rendering context for a canvas.
@property canvas - we need a property here that stores the HTML canvas element used for rendering such as the canvas height and width.
@property _vampires - we need a property to store the vampires array so that we can store every vampire spawned in an array so that when a vampire gets cured we can remove that vampire from the array erasing the vampire from the world (or in other words getting cured).
@property vampire - we need a property to access the vampires x and y coordinates, and size within the Vampire class.
@property _projectile - we need a property to access the properties within the Projectile class, we need to acces properties such as their x and y coordinates and their radius.
@property _player - we need a property to access properties within the player class such as the player's x and y coordinates, size, and health.
@property _projectiles - we need a property to access the projectile array and to put newly created projectiles into the array and remove the projectiles that have collied with vampires.
 */
class Game {
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _vampires: Vampire[] = [];
  private _score: number = 0;
  private vampire: Vampire;
  private _projectile: Projectile;
  private _player: Player;
  private _velocityX: number = 0;
  private _velocityY: number = 0;
  private _projectiles: Projectile[] = [];
  private _powerups: Powerup[] = [];
  private _doubleShotActive: boolean = false;

  constructor() {
    this._canvas = document.getElementById("screen") as HTMLCanvasElement;
    this._context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;

    this._player = new Player(
      this._canvas.width / 2,
      this._canvas.height / 2,
      100,
      10,
      10,
      this._canvas,
      this._context,
      this,
    );

    const controller = new Controller(
      this._canvas,
      this._player,
      this,
      this.context,
    );

    // Spawn vampires at regular intervals
    setInterval(() => this.randomVampireSpawn(), 2000);
    //setInterval(() => this.randomPowerupSpawn(), 300);
    this.spawnAllPowerups();
    // Start the animation loop
    this.animate();
  }

  public get doubleShotActive(): boolean {
    return this._doubleShotActive;
  }

  public set doubleShotActive(value: boolean) {
    this._doubleShotActive = value;
  }

  public set setProjectiles(value: Projectile[]) {
    this._projectiles = value;
  }

  public get projectiles(): Projectile[] {
    return this._projectiles;
  }

  public get velocityX(): number {
    return this._velocityX;
  }

  public get velocityY(): number {
    return this._velocityY;
  }

  public set setVelocityX(value: number) {
    this._velocityX = value;
  }

  public set setVelocityY(value: number) {
    this._velocityY = value;
  }

  public get player(): Player {
    return this._player;
  }

  public get context(): CanvasRenderingContext2D {
    return this._context;
  }

  public get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  public get getVampires(): Vampire[] {
    return this._vampires;
  }

  public set vampires(value: Vampire[]) {
    this._vampires = value;
  }

  public increaseScore() {
    this._score += 100;
  }

  public get score(): number {
    return this._score;
  }
  public get projectile(): Projectile {
    return this._projectile;
  }

  public getPlayerPosition(): { x: number; y: number } {
    return { x: this.player.x, y: this.player.y };
  }

  public shoot(event: MouseEvent): void {
    //Public because controller calls this
    // Calculate the angle between the player's position and the mouse click
    const mouseX = event.clientX - this.canvas.offsetLeft;
    const mouseY = event.clientY - this.canvas.offsetTop;
    const angle = Math.atan2(
      mouseY - this.canvas.height / 2,
      mouseX - this.canvas.width / 2,
    );

    // Create the projectile at the center of the canvas
    const projectileX = this.player.x;
    const projectileY = this.player.y;

    // Create the projectile at the calculated starting position
    const projectile = new Projectile(
      projectileX,
      projectileY,
      25,
      this.canvas,
      this,
      angle,
      this.context,
    );
    this.projectiles.push(projectile);

    if (this._doubleShotActive === true) {
      const projectile = new Projectile(
        projectileX,
        projectileY,
        25,
        this.canvas,
        this,
        angle + Math.PI,
        this.context,
      );
      this.projectiles.push(projectile);
    }
  }

  // Add this method to handle projectile updates
  private updateProjectiles(): void {
    this.projectiles.forEach((projectile) => {
      projectile.update();
    });
  }

  // Add this method to handle projectile drawing
  private drawProjectiles(): void {
    this.projectiles.forEach((projectile) => {
      projectile.draw();
    });
  }

  private randomVampireSpawn(): void {
    // Generate random coordinates within the canvas
    const vampireSize = 100;
    const randomX = Math.random() * (3480 - vampireSize); //3480 is the map width
    const randomY = Math.random() * (1867 - vampireSize); //1867 is the map height

    // Add a new Vampire  to the list if cap has not been reached
    if (this._vampires.length < 4) {
      let randomNumber = Math.floor(Math.random() * (4 - 1 + 1) + 1);
      switch (randomNumber) {
        case 1:
          const newVladVampire = new Vlad(
            randomX,
            randomY,
            this.canvas,
            this.context,
            this,
          );
          this._vampires.push(newVladVampire);
          break;
        case 2:
          const newSoapVampire = new Soap(
            randomX,
            randomY,
            this.canvas,
            this.context,
            this,
          );
          this._vampires.push(newSoapVampire);
          break;
        case 3:
          const newSalVampire = new Sal(
            randomX,
            randomY,
            this.canvas,
            this.context,
            this,
          );
          this._vampires.push(newSalVampire);
          break;
        case 4:
          const newBobVampire = new Bob(
            randomX,
            randomY,
            this.canvas,
            this.context,
            this,
          );
          this._vampires.push(newBobVampire);
          break;
      }
    }
  }
  private spawnAllPowerups(): void {
    const powerupSize = 100;

    // Define boundaries for powerup spawn within the walls
    const minX = 25;
    const minY = 25;
    const maxX = 3480 - powerupSize - 25;
    const maxY = 1867 - powerupSize - 25;

    // Generate random coordinates within the specified boundaries for each powerup
    const healX = Math.random() * (maxX - minX) + minX;
    const healY = Math.random() * (maxY - minY) + minY;

    const speedX = Math.random() * (maxX - minX) + minX;
    const speedY = Math.random() * (maxY - minY) + minY;

    const doubleShootX = Math.random() * (maxX - minX) + minX;
    const doubleShootY = Math.random() * (maxY - minY) + minY;

    // Add a new Powerup for each type to the list
    this._powerups.push(
      new Powerup(healX, healY, powerupSize, this.canvas, this.context, "heal"),
    );
    this._powerups.push(
      new Powerup(
        speedX,
        speedY,
        powerupSize,
        this.canvas,
        this.context,
        "activateSpeed",
      ),
    );
    this._powerups.push(
      new Powerup(
        doubleShootX,
        doubleShootY,
        powerupSize,
        this.canvas,
        this.context,
        "activateDoubleShot",
      ),
    );
  }

  private updatePowerups(): void {
    this._powerups.forEach((powerup) => {
      powerup.draw(
        this.canvas.width / 2 - this.player.x,
        this.canvas.height / 2 - this.player.y,
      );

      // Check collision with the player
      const playerX = this.player.x;
      const playerY = this.player.y;
      const playerSize = this.player.size;
      const powerupX = powerup.x;
      const powerupY = powerup.y;
      const powerupSize = powerup.size;

      if (
        playerX < powerupX + powerupSize &&
        playerX + playerSize > powerupX &&
        playerY < powerupY + powerupSize &&
        playerY + playerSize > powerupY
      ) {
        this.handlePowerupCollision(powerup);
      }
    });
  }

  private handlePowerupCollision(powerup: Powerup): void {
    switch (powerup.getType()) {
      case "heal":
        this.player.heal();
        break;
      case "activateSpeed":
        this.player.activateSpeed();
        break;
      case "activateDoubleShot":
        this.player.activateDoubleShot();
        break;
    }
    this._powerups = this._powerups.filter((p) => p !== powerup); // Remove the powerup from the list
  }

  private checkBorderCollision(): void {
    const playerX = this.player.x;
    const playerY = this.player.y;
    const playerSize = this.player.size;
    const borderWidth = 25;

    // Check collision with the left border
    if (playerX - playerSize / 4 < borderWidth) {
      this.player.setX = playerSize / 4 + borderWidth;
    }

    // Check collision with the right border
    if (playerX + playerSize / 4 > 3480 - borderWidth) {
      this.player.setX = 3480 - playerSize / 4 - borderWidth;
    }

    // Check collision with the top border
    if (playerY - playerSize / 4 < borderWidth) {
      this.player.setY = playerSize / 4 + borderWidth;
    }

    // Check collision with the bottom border
    if (playerY + playerSize / 4 > 1867 - borderWidth) {
      this.player.setY = 1867 - playerSize / 4 - borderWidth;
    }
  }

  private renderMap(): void {
    //Calculate the offset to center the player
    const changeInY = this.canvas.width / 2 - this.player.x;
    const changeInX = this.canvas.height / 2 - this.player.y;
    const waterImage = document.getElementById("water") as HTMLImageElement;
    this.context.drawImage(
      waterImage,
      -1000 + changeInY,
      -500 + changeInX,
      3480 + 1000 + 1000,
      1867 + 500 + 500,
    );
    const beachImage = document.getElementById("beach") as HTMLImageElement;
    this.context.drawImage(
      beachImage,
      0 + changeInY,
      0 + changeInX,
      3480,
      1867,
    );
    //Draw Walls
    this.context.fillStyle = "rgb(232, 205, 125)";
    this.context.fillRect(0 + changeInY, 0 + changeInX, 3480, 25);
    this.context.fillRect(0 + changeInY, 0 + changeInX, 25, 1867);
    this.context.fillRect(3480 - 25 + changeInY, 0 + changeInX, 25, 1867);
    this.context.fillRect(0 + changeInY, 1867 - 25 + changeInX, 3480, 25);
  }

  private renderGameStats(): void {
    this.context.fillStyle = "green"; // Set the fill style to green --Creation of the health bar
    this.context.fillRect(100, 110, this.player.health * 20, 15); // Draw the rectangle with the updated fill style
    this.context.font = `20px Verdana`;
    this.context.strokeStyle = "black"; // Set the stroke style (outline color)
    this.context.lineWidth = 4; // Set the width of the outline
    this.context.fillText(`Score: ${this.score}`, 100, 100); // Draw the filled text -- Creation of the score counter
    this.context.strokeText(`Score: ${this.score}`, 100, 100); // Draw the outlined text with a slight offset
  }

  private animate(): void {
    const animationLoop = () => {
      // stop the loop when player health reaches zero or less than zero
      if (this.player.health <= 0) {
        const gameOver = new GameOver(
          this.canvas.width,
          this.canvas.height,
          this.canvas,
          this.context,
          this.score,
        );
      } else {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderMap();
        this.checkBorderCollision();
        this.renderGameStats();
        this.updatePowerups();

        this.player.setX = this.player.x + this.velocityX;
        this.player.setY = this.player.y + this.velocityY;
        this.player.draw();
        // Calculate the offset to center the player
        const offsetX = this.canvas.width / 2 - this.player.x;
        const offsetY = this.canvas.height / 2 - this.player.y;

        // Draw and update active vampires
        this._vampires.forEach((vampire) => {
          vampire.updateVampires();

          const vampireX = vampire.x + offsetX; //Adjust the vampire's position based on the player's offset
          const vampireY = vampire.y + offsetY;

          this.projectiles.forEach((projectile) => {
            if (this.projectiles.length > 0) {
              vampire.checkCollision(
                projectile.y,
                projectile.radius,
                vampireY,
                vampire.size,
                vampireX,
                vampire.size,
                projectile.x,
                projectile.radius,
                this.projectiles,
                this._vampires,
              );
              projectile.checkCollision(
                projectile.y,
                projectile.radius,
                vampireY,
                vampire.size,
                vampireX,
                vampire.size,
                projectile.x,
                projectile.radius,
                this.projectiles,
                this._vampires,
              );
            }
          });

          // Calculate the minimum distance for a collision between the vampire and the player
          const vampireCollisionDistance =
            vampire.size / 2 + this.player.size / 2;
          const distanceToPlayer = Math.sqrt(
            // Calculate the distance between the vampire and the center of the game canvas (player position)
            (vampireX - this.canvas.width / 2) ** 2 +
              (vampireY - this.canvas.height / 2) ** 2,
          );

          if (distanceToPlayer < vampireCollisionDistance) {
            this.player.takeDamage();
            this._vampires = this._vampires.filter((v) => v !== vampire); // remove vampire from vampire array if the vampire gets within the minimum distance
          }
        });
        // Draw and update projefctiles
        this.drawProjectiles();
        this.updateProjectiles();

        // recurse the animation loop
        requestAnimationFrame(animationLoop);
      }
    };

    // calls the animation loop recursivly  that Stops when players health is equal to or less than zero
    requestAnimationFrame(animationLoop);
  }
}
