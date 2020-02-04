import { leap } from "./leap.js"
// let partNum = 750;
//particle number - change it!

window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

// function between(min, max) {
//   return Math.random() * (max - min) + min;
// }

// let istruehover = true;

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

document.addEventListener('mousemove', function(e){ 
    mouse.x = e.clientX || e.pageX; 
    mouse.y = e.clientY || e.pageY;
  
    istruehover = false;
}, false);

document.addEventListener('mouseover', function(){ 
    istruehover = false;
}, false);
//trouver la position de la souris

let particles = [];
for(let x = 0; x < c.width / 20; x++) {
  for(let y = 0; y < c.height / 20; y++) {
    particles.push(new particle(x*20, y*20));
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
    let colors = 'rgb(255, 255, 255)'
   this.color = colors;
  //couleurs random des varaibles
}

function draw() {
  requestAnimFrame(draw);
  
  ctx.fillStyle = 'rgba(52, 52, 53, 0.75)';
  ctx.fillRect(0, 0, c.width, c.height);
  
  /*
  ctx.beginPath();
  ctx.fillStyle = 'orange';
  ctx.arc(mouse.x, mouse.y, 40, Math.PI * 2, false);
  ctx.fill();
  */
  
  for(let t = 0; t < particles.length; t++) {
    let p = particles[t];
    
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.r, Math.PI * 1.9, false);
    ctx.fill();
    //the context of the particle(s)
    
   let distorsionRayon,
        dx = mouse.x - p.x,
        dy = mouse.y - p.y;
    
        distorsionRayon = Math.sqrt(dx*dx + dy*dy);
  
    if(distorsionRayon <= 200) {
        let ax = dx,
            ay = dy;

      p.x -= ax/25;
          p.y -= ay/25;
  }
    
 
  let disto,
        dxo = p.x - p.xo,
        dyo = p.y - p.yo;
    
    disto = Math.sqrt(dxo*dxo + dyo*dyo);

    p.x -= dxo/50;
    p.y -= dyo/50;
    // remet les particules a leur place d'origine
    
    if(disto != 0) {
       p.r = (disto / 4) + 15; 
      // simple algebra XD
    }

}
}
const loop = () => {
    window.requestAnimationFrame(loop)


    if (leap && leap.hands && leap.hands.length > 0) {
        // Si j'ai une main ...
        
        camera.position.z = leap.hands[0].palmPosition[2] * 0.1 - 10;
        // if(leap.hands[0].pinchStrength >= 0.96){
        //     // let indexFinger = getCoords(hand.indexFinger.tipPosition, frame, canvas);
        //     globe.rotation.y += 0.01;
        //     clouds.rotation.y += 0.01;
        // }
    }
}
loop()

draw();

setInterval(mousemove, 100);
