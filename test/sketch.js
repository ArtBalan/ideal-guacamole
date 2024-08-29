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
  console.log(newColor)

  // color shift start at 0
  amt = 0;


}

let t = 0;
let fac = 0.005;
let xMax = 63;
let yMax = 35;
let cSize = 20;
let zMax = 3;

let xMax2 = xMax/2;
let yMax2 = yMax/2;
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

  background(0)
  if(!isLite && random()>0.3){
    pointLight(tempColor, 0, 0, -40);
    pointLight(tempColor, 0, 0, -40);
    pointLight(tempColor, 0, 0, -40);
    pointLight(tempColor, 0, 0, -40);
    isLite = true;
  } else {
    pointLight(0, 0, 0, 0, 0, 0);  
    isLite = false;
  }

  t += 1;
  for(let i=-xMax2;i<xMax2;i+=1){
    for(let j=-yMax2;j<yMax2;j+=1){
      let a = (i**2 + j**2);
      for(let k=0;k<zMax;k+=1){
        if(a>noise(t)*10+50 && noise((i+xMax2)*t*fac,(j+yMax2)*t*fac,k*t*fac)>0.5){
          push();
          translate(i*cSize,j*cSize,-k*cSize);
          box(cSize-0);
          pop();
        }
      }
    }
  }


}