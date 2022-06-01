
let width = 900;
let height = 900;


let alphaValue = 255;
let shiftamt = 0.2;

let radius = 1;

let p5Canvas;

function setup() {
  // max canvas size
  p5Canvas = createCanvas(width, height);
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

  // color shift start at 0
  amt = 0;
  drawLightning(0.85,5);
  drawLightning(0.5,3);
  drawLightning(0.15,5);
}


function draw() {
  

}

function drawLightning(signFactor,noiseFactor){
  let y = height/2;
  let x = 0;
  let tempY;
  let tempX;
  fill(color(255, 204, 0, 1));
  stroke(color(25, 157, 255,150,));
  let i = 0
  while(i < 10000){
    let stop = random();
    if(stop>0.96) x = width

    if (x > width || y < 0 || y > height){
      x = 0;
      tempX = x;
      y = height/2;
      tempY = y;
    } else{
      tempX = x + 4;
    } 

    let sign = random();
    sign = (sign>signFactor)? 1 : -1; 
    tempY = y + noise(y,x)*sign*noiseFactor;

    line(x,y,tempX,tempY)

    x = tempX;
    y = tempY;
    i += 1;
  }
}