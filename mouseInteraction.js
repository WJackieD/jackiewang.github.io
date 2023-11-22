// var particleAlpha;

// (function(){
//   $(window).scroll(function(){
//       particleAlpha = 1.0 * (1 - $(window).scrollTop()/window.innerHeight); 
//       if(particleAlpha < 0.3){
//         particleAlpha = 0.3
//       }
//   })
// })(jQuery);

var canvas;

var mouse;
var agents = [];
var particleNum = 2000; 

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    console.log("resized");
}

function setup(){
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style("z-index", "0");
  canvas.style("position", "fixed");
  canvas.style("top", "0");
  canvas.style("pointer-events", "none");
  blendMode(ADD);
  clear();

  for(let i=0; i<particleNum; i++)
    agents[i] = new Particle();

  mouse = createVector(0, 0);
}

function draw() {
    clear();
    mouse.set(mouseX, mouseY);

    for(let i=0; i<particleNum; i++)
      agents[i].update();
    // console.log(particleAlpha);
    // canvas.style("opacity", particleAlpha);
    // surface.setTitle(nf(frameRate,0,2));
}

//particle class

class Particle{

  constructor()
  {
    this.pos = createVector(random(width), random(height));
    this.posPre = this.pos.copy();
    this.vel = createVector(0, 0);
    this.col = color(random(88),random(234),255,random(150,230));
    this.exponent = random(-1,1);
    this.factor = random(0.3, 1.5);
  }

  update()
  {
    let dist_acc = p5.Vector.sub(mouse, this.pos);
    
    dist_acc.mult(this.factor*0.001);    
    this.vel.add(dist_acc);
    
    let noise_x = noise(this.pos.x*0.03, this.pos.y*0.03, frameCount*0.01) - 0.5;
    let noise_y = noise(this.pos.x*0.03, this.pos.y*0.03+9999, frameCount*0.01) - 0.5;
    let noise_acc= createVector(noise_x,noise_y);

    noise_acc.mult(2.5);
    this.vel.add(noise_acc);
    this.vel.mult(0.95);
  
    
    this.posPre = this.pos.copy();
    this.posPre.add(p5.Vector.div(this.vel, 3));
    this.pos.add(this.vel);
  
    stroke(this.col);
 
    line(this.pos.x, this.pos.y, this.posPre.x, this.posPre.y);  
  }
}