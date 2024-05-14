/*
 * this is the power up class that holds the properties of the power ups that spawn in the game like their x and y coordinates that the spawn at, and size.
 @property type - we need a property that stores the type of power up that is being picked up by the player the program needs to know what kind of power up is being picked up.
 @property img - we need a property that stores the image being used to display the power up each power up has it's own design.
 */
class Powerup {
  private _x: number;
  private _y: number;
  private _size: number;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private type: string; // 'heal', 'activateSpeed', 'activateDoubleShot'
  private img: HTMLImageElement;

  constructor(
    x: number,
    y: number,
    size: number,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    type: string,
  ) {
    this._x = x;
    this._y = y;
    this._size = size;
    this.canvas = canvas;
    this.context = context;
    this.type = type;
    this.img = new Image();
    this.img.src = this.powerupIcon();
  }

  private powerupIcon() {
    switch (this.type) {
      case "heal":
        return (document.getElementById("healIcon") as HTMLImageElement).src;
      case "activateSpeed":
        return (document.getElementById("speedIcon") as HTMLImageElement).src;
      case "activateDoubleShot":
        return (document.getElementById("doubleShotIcon") as HTMLImageElement)
          .src;
      default:
        break;
    }
  }

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  public get size(): number {
    return this._size;
  }

  public getType(): string {
    return this.type;
  }

  public draw(offsetX: number, offsetY: number): void {
    const adjustedX = this._x + offsetX;
    const adjustedY = this._y + offsetY;

    this.context.fillStyle = "blue"; // Draw the powerup as a blue circle (marked for deletion)
    this.context.beginPath();
    this.context.fillStyle = "blue";
    this.context.drawImage(
      this.img,
      adjustedX - this._size / 2,
      adjustedY - this._size / 2,
      this._size,
      this._size,
    );
  }
}
