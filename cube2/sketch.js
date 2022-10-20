function drawCube(x,y,r,c,strokeBool){
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

let width = 0;
let height = 0;

let x = 0;
let y = 0;

let xNum  = 39;
let yNum = 26;
let sSize = 50;
let spacing = 65;

// inner color of the circle
let fillColor;
// circle stroke color

// target color
let newColor;
let tempColor;
let alphaValue = 100;
let deltaAlpha = -10;
// for the color shift
let amt;
let steps = xNum;
let shiftamt = 1 / steps;
// shiftamt = 0.002;

function setup() {
  frameRate(10000)

  width = displayWidth;
  width = 2130
  // x = width/2 - (sSize+spacing)*xNum/2
  x = 0;
  height = displayHeight;
  height = 1200;
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
  strokeWeight(1)
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
      
      if(random(2)<1) sSize += random(10)/10;
      else sSize -= random(10)/10;
      if(sSize<0) sSize *= -1;

      if(random(3)>1) stroke(red(fillColor),green(fillColor),blue(fillColor),alphaValue)
      else if(random(3)>2) stroke(0,0,0,alphaValue)
      else stroke(255,255,255,alphaValue)

      // if(random(2)<1) spacing += random(10)/20
      // else spacing -= random(10)/20
      // if(spacing<0) spacing *= -1;
    
      if(random(5)<=4) drawCube(x+i*spacing+xRand+spacing, y+j*spacing+yRand+spacing,sSize,[red(fillColor),green(fillColor),blue(fillColor),alphaValue],random(3));
      else {
        fill(red(fillColor),green(fillColor),blue(fillColor),alphaValue)
        circle(x+i*spacing+xRand+spacing, y+j*spacing+yRand+spacing,sSize)
      }
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
