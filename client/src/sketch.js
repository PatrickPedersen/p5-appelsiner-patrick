//Appelsin specifikke variabler
let rad = 15;
let x = rad;
let y = 550;

//Generalle variabler
let grav = 0.1;
let score = 0;
let life = 3;
let button;
let debug = true;

//Object variabler
let turban1;
let orange1;
let orange2 = true;
let orange3 = true;
let orange4 = true;

//Image variabler
let turbanImg;
let orangeImg;

//Load vores billeder
function preload() {
    turbanImg = loadImage('./img/turban.png');
    orangeImg = loadImage('./img/breakfast.png');
}

function setup() {
    let myCanvas = createCanvas(750, 600);
    myCanvas.parent("div-game");

    // parametrene til konstruktøren er (x, y, bredde, dybde, speed)
    turban1 = new Turban(600,400,70,50);

    // parametrene til konstruktøren er (x, y, rad, xspeed, yspeed, tid)
    orange1 = new Appelsin(x,y,rad,random(1,4),random(-6,-10), 100);
    if (orange2 === true) {
        orange2 = new Appelsin(x,y,rad,random(1,4),random(-6,-10), 150);
    }
    if (orange3 === true) {
        orange3 = new Appelsin(x,y,rad,random(1,4),random(-6,-10), 200);
    }
    if (orange4 === true) {
        orange4 = new Appelsin(x,y,rad,random(1,4),random(-6,-10), 250);
    }

    button = createButton('Genstart');
    button.parent("button-wrapper");
    button.position(canvas.width/2 - 30, canvas.height/2 + 20);
    button.hide();

}

function draw() {
    background(0);

    if (life > 0) {
        orange1.move();
        orange1.display();
        if (orange2) {
            orange2.move();
            orange2.display();
        }
        if (orange3) {
            orange3.move();
            orange3.display();
        }
        if (orange4) {
            orange4.move();
            orange4.display();
        }

        turban1.display();
        checkScore();
        textSize(12);
        textAlign(LEFT);
        display();
        turban1.moveX(mouseX);
        turban1.moveY(mouseY);
    } else {
        fill(255);
        textSize(40);
        textAlign(CENTER,CENTER);
        text(`Game Over\nScore: ${score}`, canvas.width/2, canvas.height/2-40);
        button.show();
        button.mousePressed(restart);
    }
}

function display() {
    fill(255);
    //WALL O TEXT START
    if (debug) {
        text("Orange 1", 10, 20);
        text("Y Speed: "+Math.round(orange1.yspeed * 100) / 100, 10, 40);
        text("X Speed: "+Math.round(orange1.xspeed * 100) / 100, 10, 60);
        text("Y: "+Math.round(orange1.y * 100) / 100, 10, 80);
        text("X: "+Math.round(orange1.x * 100) / 100, 10, 100);
        text("Tid: "+orange1.tid, 10, 120);

        if (orange2) {
            text("Orange 2", 110, 20);
            text("Y Speed: "+Math.round(orange2.yspeed * 100) / 100, 110, 40);
            text("X Speed: "+Math.round(orange2.xspeed * 100) / 100, 110, 60);
            text("Y: "+Math.round(orange2.y * 100) / 100, 110, 80);
            text("X: "+Math.round(orange2.x * 100) / 100, 110, 100);
            text("Tid: "+orange2.tid, 110, 120);
        }

        if (orange3) {
            text("Orange 3", 210, 20);
            text("Y Speed: "+Math.round(orange3.yspeed * 100) / 100, 210, 40);
            text("X Speed: "+Math.round(orange3.xspeed * 100) / 100, 210, 60);
            text("Y: "+Math.round(orange3.y * 100) / 100, 210, 80);
            text("X: "+Math.round(orange3.x * 100) / 100, 210, 100);
            text("Tid: "+orange3.tid, 210, 120);
        }

        if (orange4) {
            text("Orange 4", 310, 20);
            text("Y Speed: "+Math.round(orange4.yspeed * 100) / 100, 310, 40);
            text("X Speed: "+Math.round(orange4.xspeed * 100) / 100, 310, 60);
            text("Y: "+Math.round(orange4.y * 100) / 100, 310, 80);
            text("X: "+Math.round(orange4.x * 100) / 100, 310, 100);
            text("Tid: "+orange4.tid, 310, 120);
        }

        text("Turban:", width-80, 80);
        text("Y: "+Math.round(turban1.y * 100) / 100, width-80, 100);
        text("X: "+Math.round(turban1.x * 100) / 100, width-80, 120);
    }
    //WALL O TEXT END

    text("Score: "+score, width-80, 20);
    text("Life: "+life, width-80, 40);
}

function checkScore() {
    // Her checkes om turbanen har fanget appelsinen. Hvis ja, skydes en ny appelsin afsted
    if (orange1.yspeed > 0) {
        if (turban1.grebet(orange1.x, orange1.y, orange1.rad)) {
            score += 1;
            orange1.shootNew();
        }
    }
    if (orange2) {
        if (orange2.yspeed > 0) {
            if (turban1.grebet(orange2.x, orange2.y, orange2.rad)) {
                score += 1;
                orange2.shootNew();
            }
        }
    }
    if (orange3) {
        if (orange3.yspeed > 0) {
            if (turban1.grebet(orange3.x, orange3.y, orange3.rad)) {
                score += 1;
                orange3.shootNew();
            }
        }
    }
    if (orange4) {
        if (orange4.yspeed > 0) {
            if (turban1.grebet(orange4.x, orange4.y, orange4.rad)) {
                score += 1;
                orange4.shootNew();
            }
        }
    }
}

function restart() {
    score = 0;
    life = 3;
    button.hide();
    orange1.shootNew(50);
    if (orange2) {
        orange2.shootNew(100);
    }
    if (orange3) {
        orange3.shootNew(150);
    }
    if (orange4) {
        orange4.shootNew(200);
    }
}

/*
OPGAVER
 Opgave 1 - undersøg hvad variablerne  grav  og  tid  bruges til, og hvor.
            Skriv det i kommentarer, prøv at se hvad der sker, når
            I laver dem om.

            - grav = Gravity
            - Tid = Bruges som nedtælling til boldens affyrelse. Når bolden går under 100 så vises appelsinen og når den rammer 0 affyres den ved at move bliver aktiv.

 Opgave 2 - lav programmet om så det er tilfældigt hvor højt oppe
            på venstre kan appelsinerne starter. Overvej om man kan
            sikre, at appelsinen ikke ryger ud af skærmens top men
            stadig har en "pæn" bane.

            - Vent med.

 Opgave 3 - ret programmet til, så det også angives hvor mange
            appelsiner man IKKE greb med turbanen

            - Done.

 Opgave 4 - Undersøg hvad scriptet  kurv.js  er og gør, og forklar
            lidt mere detaljeret end det er gjort nu hvad sammenhængen
            mellem dette script og turbanen i  sketch.js  er.
            Skriv det som kommentarer i toppen af  kurv.js
            Prøv jer frem med forskellige løsninger for hvor hurtigt
            turbanen skal rykke.

            - Done.

 Opgave 5 - Find et billede af en turban og sæt det ind i stedet
            for firkanten. Find eventuelt også en lyd, der kan afspilles,
            når appelsinen gribes. Se gerne i "p5 Reference" hvordan,
            hvis ikke I kan huske det:   https://p5js.org/reference/

            - Gider ikke lyde. Det er altid et helvede at finde en lyd der giver mening.
            - Resten er gjordt.

 Opgave 6 - Lav en Appelsin-klasse, lige som der er en Kurv-klasse.
            Flyt koden til appelsinen ud i et selvstændigt script.
            Overvej hvad det skal hedde, og hvilke variabler og funktioner,
            der skal lægges over i det nye script, herunder hvordan det
            kommer til at berøre turbanen. Skriv jeres overvejelser i
            kommentarerne

            - Done

 Opgave 7 - Ret programmet til, så der kan være flere appelsiner i
            luften på en gang, dvs. at der kan skydes en ny appelsin
            afsted før den foregående er forsvundet. Overvej hvordan
            og hvor hurtigt de skal skydes af, for at det kan gøre spillet
            sjovere og mere udfordrende, og forklar jeres tanker
            i kommentarerne

            - Done. Pt er det en prototype. Har ikke bestemt nogen tid eller mængde.

 Opgave 8 - Ret programmet til, så det kan vindes og/eller tabes ved
            at man griber eller misser et antal appelsiner. Sørg for
            at der vises en "Game Over"-skærm, som fortæller om man
            vandt eller tabte, og som giver mulighed for at starte et
            nyt spil. Se evt. om I kan lave en løsning så turbanens
            bevægelseshastighed, skydetempoet med appelsinerne og andre
            ting kan justeres mens man spiller. Lav evt. programmet om,
            så man kan flytte turbanen med musen


*/