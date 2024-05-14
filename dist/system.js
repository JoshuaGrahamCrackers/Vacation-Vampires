/*
 *  This is the system class that stores information about the canvas regarding it's width and height. the canvas is resopnible for drawing the backgrounds on the screen like the starting page, the map, and the game over screen.
 */
class System {
    canvas;
    context;
    constructor() {
        this.initializeCanvas();
        this.initializeIntro();
    }
    initializeCanvas() {
        this.canvas = document.getElementById("screen");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.style.margin = "0";
        document.body.style.padding = "0";
    }
    initializeIntro() {
        const intro = new Intro(this.canvas.width, this.canvas.height, this.canvas, this.context);
    }
}
const system = new System();
//# sourceMappingURL=system.js.map