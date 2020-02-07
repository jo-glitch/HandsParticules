import { leap } from "./leap.js";
import { getCoords } from "./coord.js";

import ventwav from '../sound/fire.mp3';
import ambiancemp3 from '../sound/ambiance.mp3';
import metalaigue from '../sound/metalLight.mp3';

let c = document.getElementById('c');
let ctx = c.getContext('2d');
let rayon = 75;
let position;
let red = 'rgb(200,100,50)';
let white = 'rgb(255,255,255)';
let vent = new Pizzicato.Sound(ventwav);
let ambiance = new Pizzicato.Sound(ambiancemp3);
let metalLight = new Pizzicato.Sound(metalaigue);
let soundOn = false;
let windowLoad = true;
/**
 * Loop
 */


let w = window.innerWidth;
let h = window.innerHeight;
//largeur et hauteur du canvas

c.width = w;
c.height = h;
//largeur hauteur du canvas

let mouse = {
    x: w / 1.2,
    y: h / 1.2
};
//position souris

let particles = [];
for (let x = 0; x < c.width / 20; x++) {
    for (let y = 0; y < c.height /20; y++) {
        particles.push(new particle(x * 20, y * 20));
    }
}
console.log(mouse)
//fonction particules
function particle(x, y) {
    this.x = x + 10;
    this.y = y + 10;

    this.xo = x + 10;
    this.yo = y + 10;


    this.r = 10;
    // couleur mits dans des variables et dans un tableau
        // let one = 'rgba(10, 255, 255, 0.7)';
        // let two = 'rgba(255, 255, 255, 0.7)';
        // let three = 'rgba(10, 255, 255, 0.9)';
        // let four = 'rgba(255, 255, 255, 0.9)';
        // let five = 'rgba(10, 255, 255, 0.5)';
        // let six = 'rgba(255, 255, 255, 0.5)';
        // let colors = [one, two, three, four, five, six];
        this.color = white;
        
    //couleurs random des variables
}

const draw = () => {
    ctx.fillStyle = 'rgba(52, 52, 53, 0.75)';
    ctx.fillRect(0, 0, c.width, c.height);

    for (let i = 0; i < particles.length; i++) {
        position = particles[i];

        ctx.beginPath();
        ctx.fillStyle = position.color;
        ctx.arc(position.x, position.y, position.r, Math.PI * 0.4, Math.PI * 0.5, false);
        ctx.fill();
        //context de particules
        let distorsionRayon,
            distorsionX = mouse.x - position.x,
            distorsionY = mouse.y - position.y;

        distorsionRayon = Math.sqrt(distorsionX * distorsionX + distorsionY * distorsionY);

        if (distorsionRayon <= rayon) {
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
        if(distorsionRayon <= rayon){
            position.color = red;
        }else{
            position.color = white;
        }
        // remet les particules a leur place d'origine

        if (disto != 0) {
            position.r = (disto / 4) + 15;
        }
        // collision canvas
        if(mouse.x + rayon > c.width){
            mouse.x = c.width - rayon;
            soundOn = true;
        }
        if(mouse.x - rayon < 0){
            mouse.x = rayon;
        }
        if(mouse.y + rayon > c.height){
            mouse.y = c.height - rayon;
        } else if(mouse.y - rayon< 0){
            mouse.y = rayon;
        }
    }
}
// Interaction avec la souris
let mouseDown = false;
// mouvement de la souris
document.addEventListener('mousemove', function(e){ 
    mouse.x = e.clientX || e.pageX; 
    mouse.y = e.clientY || e.pageY;
  
});
// si la souris reste presser

document.addEventListener('mousedown', function(){
    mouseDown = true;
});
document.addEventListener('mouseup', function(){
    mouseDown = false; 
 });

const loop = () => {
    window.requestAnimationFrame(loop);
    draw();
    if(mouseDown === true){
        rayon += 3;
        vent.play();
        if(rayon >= 425){
            rayon = 425;
        }
    }
    if(mouseDown === false){
        rayon = 75;
        vent.stop();
    }
    if (leap && leap.hands && leap.hands.length > 0) {
        // Si j'ai une main ...
        let { x, y } = getCoords(leap.hands[0].palmPosition, leap, c);
        mouse.x = x;
        mouse.y = y;

        if(leap.hands[0].pinchStrength >= 0.90){
            // let indexFinger = getCoords(hand.indexFinger.tipPosition, frame, canvas);
            // console.log(mouse);
            mouseDown = true;
            if(mouseDown === true){
                rayon += 3;
                if(rayon >= 525){
                    rayon = 525;
                }
            }
        }else{
            mouseDown = false;
            if(mouseDown === false){
                rayon = 75;
            }
        }
    }
}
loop();
