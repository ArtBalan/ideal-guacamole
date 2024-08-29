let fillColor;
// circle stroke color
let strokeColor;
// target color
let newColor;
let tempColor;
let alphaValue = 20;
let deltaAlpha = -10;
// for the color shift
let steps = 10000;

let amt;
let shiftamt = 1 / steps;
shiftamt = 0.5;


function setup() {
  w = window.innerWidth;
  h = window.innerHeight;  

  createCanvas(w, h-4,WEBGL);

  fillColor = color(255, 204, 0, alphaValue);
  strokeColor = color(25, 157, 255,150);
  newColor = color(random(255), random(255), random(255), alphaValue);
  // idk why i need this
  colorMode(RGB);
  frameRate(24)
  // color shift start at 0
  amt = 0;
}

let cSize = 30;
let t=0;
let fac = 0.1;
let isLite = false;
function draw() {
  console.log(frameRate())
  tempColor = lerpColor(fillColor, newColor, amt);
  amt += shiftamt;
  if (amt >= 1) {
    amt = 0.0;
    fillColor = tempColor;
    newColor = color(random(255), random(255), random(255),200);
  } 
  noStroke()
  if(!isLite && random()>0.3){
    // ambientLight(tempColor);
    pointLight(tempColor, 0, 0, 1000);
    pointLight(tempColor, 0, 0, 1000);
    pointLight(tempColor, 0, 0, 1000);
    pointLight(tempColor, 0, 0, 1000);
    isLite = true;
  } else {
    pointLight(0, 0, 0, 0, 0, 0);  
    isLite = false;
  }

  t+= 1;
  background(0)
  for(let x=-1400;x<=1400;x+=35){
    for(let y=-1800;y<=250;y+=35){
      let z = 200;
      push();
      translate(x,z,y);
      box(cSize);
      pop();
      while(noise((x+1400)*t*fac,(z+300)*t*fac)>0.6){
        z -= 25;
        push();
        translate(x,z,y);
        box(cSize);
        pop();
      }
    }
  }
}