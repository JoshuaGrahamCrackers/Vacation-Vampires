/*
* this is the Intro class that will store properties for the starting page. It will use methods like draw inorder to draw the starting page, draw the image at the center of the screen, and implement a starting button to start the game.
@property img - we need a property that stores the image being used for the startting page so that we can apply it to our starting page.
*/
class Intro {
  private width: number;
  private height: number;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private img: HTMLImageElement;

  constructor(
    width: number,
    height: number,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
  ) {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.context = context;
    this.img = new Image();

    this.img.onload = () => {
      this.setup(); // Call setup only after the image is loaded
    };

    this.img.src = (
      document.getElementById("startingScreen") as HTMLImageElement
    ).src;
  }

  public draw() {
    //Background will be drawn behind image as fail safe if image does not cover the entire screen
    this.context.fillStyle = "blue";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw the image at the center
    const centerX = (this.canvas.width - this.width) / 2;
    const centerY = (this.canvas.height - this.height) / 2;
    this.context.drawImage(this.img, centerX, centerY, this.width, this.height);
  }

  public setup(): void {
    this.draw();

    window.addEventListener("keydown", this.handleKeyPress.bind(this));
  }

  //Event listener will be active entire game that way player can restart whenever they wish and a new listener will not have to be created when game ends
  private handleKeyPress(event: KeyboardEvent): void {
    if (event.key === "r" || event.key === "R") {
      this.startNewGame();
    }
  }

  private startNewGame(): void {
    const game = new Game();
  }
}