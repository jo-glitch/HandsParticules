import { leap } from "./leap.js"
import { getCoords } from "./coord.js"

let c = document.getElementById('c');
let ctx = c.getContext('2d');
//context et id du canvas

/**
 * Loop
 */


let w = window.innerWidth;
let h = window.innerHeight;
//largeur et hauteur du canvas

c.width = w;
c.height = h;
//setting the width and height for canvas

let mouse = {
    x: w / 1.2,
    y: h / 1.2
};
//position souris

let particles = [];
for (let x = 0; x < c.width / 20; x++) {
    for (let y = 0; y < c.height / 20; y++) {
        particles.push(new particle(x * 20, y * 20));
    }
}

//fonction particules
function particle(x, y) {
    this.x = x + 10;
    this.y = y + 10;

    this.xo = x + 10;
    this.yo = y + 10;

    //   this.vx = 0;
    //   this.vy = 0;

    this.r = 10;
    // couleur  mits dans des variables et dans un tableau
    //    let one = 'rgba(10, 255, 255, 0.7)';
    //    let two = 'rgba(255, 255, 255, 0.7)';
    //    let three = 'rgba(10, 255, 255, 0.9)';
    //    let four = 'rgba(255, 255, 255, 0.9)';
    //    let five = 'rgba(10, 255, 255, 0.5)';
    //    let six = 'rgba(255, 255, 255, 0.5)';
    //    let color = [one, two, three, four, five, six];
    //    this.color = color[Math.round(Math.random()*2)]
    let colors = 'rgb(255, 255, 255)';
    this.color = colors;
    //couleurs random des varaibles
}

function draw() {
    ctx.fillStyle = 'rgba(52, 52, 53, 0.75)';
    ctx.fillRect(0, 0, c.width, c.height);

    for (let i = 0; i < particles.length; i++) {
        let position = particles[i];

        ctx.beginPath();
        ctx.fillStyle = position.color;
        ctx.arc(position.x, position.y, position.r, Math.PI * 1.9, false);
        ctx.fill();
        //context de particules

        let distorsionRayon,
            distorsionX = mouse.x - position.x,
            distorsionY = mouse.y - position.y;

        distorsionRayon = Math.sqrt(distorsionX * distorsionX + distorsionY * distorsionY);

        if (distorsionRayon <= 150) {
            let Speedx = distorsionX,
                Speedy = distorsionY;

            position.x -= Speedx / 10;
            position.y -= Speedy / 10;
        }


        let disto,
            distoXo = position.x - position.xo,
            distoYo = position.y - position.yo;

        disto = Math.sqrt(distoXo * distoXo + distoYo * distoYo);

        position.x -= distoXo / 10;
        position.y -= distoYo / 10;
        // remet les particules a leur place d'origine

        if (disto != 0) {
            position.r = (disto / 4) + 15;

        }
    }
}

const loop = () => {
    window.requestAnimationFrame(loop);

    draw();

    if (leap && leap.hands && leap.hands.length > 0) {
        // Si j'ai une main ...
        let { x, y } = getCoords(leap.hands[0].palmPosition, leap, c);
        mouse.x = x;
        mouse.y = y;
    }
}
loop();
