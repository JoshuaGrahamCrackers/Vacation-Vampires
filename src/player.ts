/*
  * this is the player class it contains proprties to store the x and y coordanate of the player, their size (both width and height), health, and the max health allowed
  @proporty img - we need a property here to store the character model used for the player so that we can apply the image to the object.
*/
class Player {
  private _x: number;
  private _y: number;
  private _size: number;
  private _health: number;
  private maxHealth: number;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private img: HTMLImageElement;
  private game: Game;
  private doubleShotActive: boolean;
  private superSpeedActive: boolean;
  private healPickedUp: boolean;
  private _speed: number;

  constructor(
    x: number,
    y: number,
    size: number,
    health: number,
    maxHealth: number,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    game: Game,
  ) {
    this._x = x;
    this._y = y;
    this._size = size;
    this._health = health;
    this.maxHealth = maxHealth;
    this.canvas = canvas;
    this.context = context;
    this.game = game;
    this.img = new Image();
    this.img.src = (
      document.getElementById("playerIcon") as HTMLImageElement
    ).src;
    this._speed = 6;
  }

  public get speed(): number {
    return this._speed;
  }

  public get size(): number {
    return this._size;
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

  public shoot(angle: number): void {
      // Use the angle to determine the direction of the projectile
      const projectileX = this.x;
      const projectileY = this.y;

      // Create the projectile at the calculated starting position
      const projectile = new Projectile(
          projectileX,
          projectileY,
          25,
          this.canvas,
          this.game,
          angle,
          this.context
      );

      this.game.projectiles.push(projectile);

      if (this.game.doubleShotActive) {
          // Create another projectile with the opposite angle for double shot
          const oppositeAngle = angle + Math.PI;
          const oppositeProjectile = new Projectile(
              projectileX,
              projectileY,
              25,
              this.canvas,
              this.game,
              oppositeAngle,
              this.context
          );

          this.game.projectiles.push(oppositeProjectile);
      }
  }

  public heal(): void {
    this._health = this.maxHealth;
  }

  public activateSpeed(): void {
    this._speed *= 1.25;
  }

  public activateDoubleShot(): void {
    this.game.doubleShotActive = true;
    this.img.src = (
      document.getElementById("playerEliteIcon") as HTMLImageElement
    ).src; //Change player design
  }

  public takeDamage(): void {
    this._health -= 1;
  }
  public get health(): number {
    return this._health;
  }

  public draw(): void {
    this.context.drawImage(
      this.img,
      this.canvas.width / 2 - this.size / 2,
      this.canvas.height / 2 - this.size / 2,
      this.size,
      this.size,
    );
  }
}
