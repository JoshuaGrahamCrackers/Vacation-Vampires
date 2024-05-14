/*
  * this is the projectile class that contains the projectiles x and y coordanates, speed, radius, and the angle that the projectile is fired at so that we can create a projectile that the player can fire.
  @property game - we need a property to access the canvas property within the Game class.
  @property vampire - we need a property to access the properties within the Vampire class like their x and y coordinates, and size.
  @property img - we need a property to store the icon used for the projectile so that we can apply it in the game.
*/
class Projectile {
  private _x: number;
  private _y: number;
  private oppX: number;
  private oppY: number;
  private _radius: number;
  private _speed: number;
  private _angle: number;
  private canvas: HTMLCanvasElement;
  private game: Game;
  private vampire: Vampire;
  private context: CanvasRenderingContext2D;
  private img: HTMLImageElement;
  private _hasCollided: boolean;
  private projectileGenerationTime: number;

  constructor(
    x: number,
    y: number,
    radius: number,
    canvas: HTMLCanvasElement,
    game: Game,
    angle: number,
    context: CanvasRenderingContext2D,
  ) {
    this._x = x;
    this._y = y;
    this._radius = radius;
    this._speed = 10;
    this._angle = angle;
    this.canvas = canvas;
    this.game = game;
    this.context = context;
    this.img = new Image();
    this.img.src = (
      document.getElementById("cureIcon") as HTMLImageElement
    ).src;
    this._hasCollided = false;
    this.projectileGenerationTime = Date.now();
  }

  public get angle(): number {
    return this._angle;
  }

  public get speed(): number {
    return this._speed;
  }

  public get radius(): number {
    return this._radius;
  }

  public set setX(value: number) {
    this._x = value;
  }

  public set setY(value: number) {
    this._y = value;
  }

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  public get hasCollided(): boolean {
    return this._hasCollided;
  }

  public set setCollided(value: boolean) {
    this._hasCollided = value;
  }

  public get image(): HTMLImageElement {
    return this.img;
  }

  public update(): void {
    // Update the projectile position based on its speed and angle
    this.setX = this.speed * Math.cos(this.angle) + this.x;
    this.setY = this.speed * Math.sin(this.angle) + this.y;
//Delete the projectiles from the game after 5 seconds, preserving proccesing power and limiting it from being overloaded ensures game longevity, meaning that the game can theoretically be played eternally without crashing or buffering.
    if (Date.now() - this.projectileGenerationTime > 5000) {
      this.game.setProjectiles = this.game.projectiles.filter((p) =>  p !== this);
    }
  }

  public draw(): void {
    // Draw the image centered on the projectile, adjusting for camera offset
    const imageWidth = this.radius * 2;
    const imageHeight = this.radius * 2;

    // Adjust the X and Y position to center the image and account for camera offset
    const drawX =
      this.x -
      this.radius -
      this.game.getPlayerPosition().x +
      this.game.canvas.width / 2;
    const drawY =
      this.y -
      this.radius -
      this.game.getPlayerPosition().y +
      this.game.canvas.height / 2;

    this.context.drawImage(this.img, drawX, drawY, imageWidth, imageHeight);
  }

  public vanish(projectileArray: Projectile[]): void {
    this.game.setProjectiles = projectileArray.filter((v) => v !== this);
  }

  public checkCollision(
    projectileY: number,
    projectileHeight: number,
    vampireY: number,
    vampireHeight: number,
    vampireX: number,
    vampireWidth: number,
    projectileX: number,
    projectileWidth: number,
    projectileArray: Projectile[],
    vampireArray: Vampire[],
  ): void {
    // Adjust projectile position based on the player's offset
    const adjustedProjectileX =
      projectileX -
      this.game.getPlayerPosition().x +
      this.game.canvas.width / 2;
    const adjustedProjectileY =
      projectileY -
      this.game.getPlayerPosition().y +
      this.game.canvas.height / 2;

    // Check if the projectile and vampire collide by comparing their coordinates:
    // Projectile's vertical range overlaps with vampire's vertical range
    // AND projectile's horizontal range overlaps with vampire's horizontal range
    if (
      adjustedProjectileY - projectileHeight < vampireY + vampireHeight &&
      adjustedProjectileY + projectileHeight > vampireY &&
      adjustedProjectileX - projectileWidth < vampireX + vampireWidth &&
      adjustedProjectileX + projectileWidth > vampireX
    ) {
      this.vanish(projectileArray); // if the projectile is close to the vampire make the projectile disappear
    }
  }
}
