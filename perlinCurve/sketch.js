
let width = 900;
let height = 900;


let alphaValue = 255;
let shiftamt = 0.2;

let radius = 1;

let p5Canvas;

class Point{
  constructor(x,y){
    this.x = x;
    this.y = y
  }
}

function setup() {
  // max canvas size
  p5Canvas = createCanvas(width+700, height);
  background(0);

  // idk why i need this
  colorMode(RGB);

  // color shift start at 0
  amt = 0;
  stroke("red")
  strokeWeight(radius)

  strokeColor = color(25, 157, 255,150);
  newColor = color(random(255), random(255), random(255), alphaValue);
  // idk why i need this
  colorMode(RGB);

}


function draw() {
  stroke(color(25, 157, 255,150,));

  let step = 4;
  let noiseFactor = 3;

  let start = new Point(0,height/2);
  let sign = random();
  sign = (sign>0.5)? 1 : -1; 

  while(random()<0.99){
    let middle = new Point(start.x + step,noise(start.y,start.x)*sign*noiseFactor)

    sign = random();
    sign = (sign>0.5)? 1 : -1;

    let end = new Point(middle.x+step, noise(middle.y,middle.x)*sign*noiseFactor); 

    beginShape();
    curveVertex(start.x,start.y);
    curveVertex(middle.x,middle.y);
    curveVertex(end.x,end.y);
    endShape();


  }

}