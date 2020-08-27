class Turban {
    //Her skaffer vi alle værdierne til at kunne danne og placere vores Turban.
    constructor(tx, ty, bredde, dybde) {
        this.x = tx;
        this.y = ty;
        this.bred = bredde;
        this.dyb = dybde;
        this.col = [250,230,150]
    }
    //Her sørger vi for turbanen vises for spilleren så de kan finde den.
    display() {
        image(turbanImg, this.x, this.y, this.bred, this.dyb);
    }
    //Her sørger vi for at turbanen kan flytte sig. Men ikke uden for den angivede bane.
    moveX(flyt) {
        this.x = flyt-this.bred/2;
        if (this.x < 0) {this.x = 0;}
        if (this.x > width-this.bred) {this.x = width - this.bred;}
    };

    moveY(flyt) {
        this.y = flyt-this.dyb/2;
        if (this.y < 0) {this.y = 0;}
        if (this.y > height-this.dyb) {this.y = height - this.dyb;}
    };
    //Her tjekker vi om vores turban har grebet nogle af appelsinerne,
    //ved at tjekke om en given appelsin er inde for selve turbanen område.
    grebet(ax, ay) {
        if ((ay > this.y && ay < this.y+35) && ax > this.x-2 && ax < this.x+this.bred+2) {
            return true;
        }
    }
}