class Appelsin {
    //Her skaffer vi alle værdierne til at kunne danne og placere vores appelsiner.
    constructor(ax, ay, ar, aXspeed, aYspeed, tid) {
        this.x = ax;
        this.y = ay;
        this.rad = ar;
        this.xspeed = aXspeed;
        this.yspeed = aYspeed;
        this.col = [220, 110, 0];
        this.tid = tid;
    }
    //Her sørger vi for at appelsinen kan flytte sig. Men først når et hvis tids krav er blevet opnået.
    move() {
        if (this.tid <= 0) {
            this.x += this.xspeed;
            this.y += this.yspeed;
            this.yspeed += grav;

            //Her tjekker vi om vores appelsin er røget uden for banen
            if (this.x > width || this.x < 0) {
                this.shootNew();
                life -= 1;
            }
            if (this.y > height || this.y+this.rad*2 < 0) {
                this.shootNew();
                life -= 1;
            }

        }
    }
    //Her skyder vi en ny appelsin afsted. Vi definerer dens start punkt på X og Y akse og vi danner en tilfældig fart mellem de respektive tal.
    //Det er også her at en appelsin får dannet en ny tid.
    shootNew(tid) {
        this.x = this.rad;
        this.y = y;
        this.xspeed = random(2,4);
        this.yspeed = random(-6,-10);
        if (tid) {
            this.tid = tid;
        } else {
            this.tid = (int) (random(50, 100))
        }
    }
    //Her sørger vi for appelsinen viser sig for spilleren så de kan finde den. Men først lige inden den bliver sendt afsted.
    display() {
        if (this.tid > 0) {
            this.tid -= 1;
        }
        if (this.tid < 50) {
            image(orangeImg, this.x+4, this.y+5, this.rad*2, this.rad*2)
        }
    }
}