/*
* this is the GameOver class which stores the properties for the game over screen when the player turns into a vampire. such as the x and y coordinates, width, height, and the number of vampires saved.
@property img - we need a property that stores the image being used for the game over screen to apply it to the background being drawn when the player turns into a vampire.
*/
class GameOver {
  private width: number;
  private height: number;
  private vampiresSaved: number;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private img: HTMLImageElement;

  constructor(
    width: number,
    height: number,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    vampireSaved: number,
  ) {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.context = context;
    this.vampiresSaved = vampireSaved / 100;
    this.img = new Image();
    this.img.onload = () => {
      this.endGame(); // Call setup only after the image is loaded
    };
    this.img.src = (
      document.getElementById("endingScreen") as HTMLImageElement
    ).src;
  }

  public draw(): void {
    // Draw the image at the center
    const centerX = (this.canvas.width - this.width) / 2;
    const centerY = (this.canvas.height - this.height) / 2;
    const topRightWidth = window.innerWidth / 2 + window.innerWidth / 4 + 15;
    const topRightHeight = window.innerHeight / 4 + 50;

    this.context.drawImage(this.img, centerX, centerY, this.width, this.height);
    this.context.font = `20px Verdana`;
    this.context.fillStyle = "red";
    this.context.strokeStyle = "red";
    this.context.fillText(
      `You have saved ${this.vampiresSaved} Vampires`,
      topRightWidth,
      topRightHeight,
    );
  }

  private endGame(): void {
    this.draw();
  }
}

