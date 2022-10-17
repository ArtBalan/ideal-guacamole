
function drawCube(x,y,r,c,strokeBool){
  if(strokeBool>1) stroke(c[0],c[1],c[2])
  else if(random(3)>2) stroke('black')
  else stroke('white')

  strokeWeight(1)
  // FRONT FACE
  fill(c[0],c[1],c[2],c[3])
  square(x,y,r)
  // TOP FACE
  beginShape()
  fill(c[0]-45,c[1]-45,c[2]-45,c[3])
  vertex(x,y)
  vertex(x-r/2,y-r/2)
  vertex(x+r/2,y-r/2)
  vertex(x+r,y)
  endShape(CLOSE)

  // LEFT FACE
  beginShape()
  fill(c[0]-65,c[1]-65,c[2]-65,c[3])
  vertex(x,y)
  vertex(x-r/2,y-r/2)
  vertex(x-r/2,y+r/2)
  vertex(x,y+r)
  endShape(CLOSE)
}

// inner color of the circle
let fillColor;
// circle stroke color

// target color
let newColor;
let tempColor;
let alphaValue = 180;
let deltaAlpha = -10;
// for the color shift
let amt;
let steps = 10;
let shiftamt = 1 / steps;
// shiftamt = 0.002;

let width = 0;
let height = 0;

let x = 0;
let y = 0;

let xNum  = 39;
let yNum = 24;
let sSize = 40;
let spacing = 50;

function setup() {
  frameRate(10000)

  width = displayWidth;
  // x = width/2 - (sSize+spacing)*xNum/2
  x = 0;
  height = displayHeight;
  // y = width/2 - (sSize+spacing)*yNum/2
  y = 0;
  // max canvas size
  createCanvas(width, height-4);
  background(255);

  // fillColor = color(255, 204, 0, alphaValue);
  fillColor = color(random(255), random(255), random(255), alphaValue);
  newColor = color(random(255), random(255), random(255), alphaValue);
  // idk why i need this
  colorMode(RGB);

  // color shift start at 0
  amt = 0;
}

let i=xNum;
let j=yNum;

function draw() {
  if(i>0 && j>=0){
    if(i == 0 ) i = xNum;
    else if( j==0 ){ j = yNum; i-- }
    else {
      let xRand = random(spacing/5) * ((random(2)>1)? 1 : -1);
      let yRand = random(spacing/5) * ((random(2)>1)? 1 : -1);
      if(random(4)<=3) drawCube(x+i*spacing+xRand-spacing, y+j*spacing+yRand-spacing,sSize,[red(fillColor),green(fillColor),blue(fillColor),alphaValue],random(3));
    }
    j--;
  }

  tempColor = lerpColor(fillColor, newColor, amt);
  fill(tempColor);
  amt += shiftamt;
  fillColor = tempColor;
    if (amt >= 1) {
      amt = 0.0;
      fillColor = tempColor;
      newColor = color(random(255), random(255), random(255),200);
    }
}
