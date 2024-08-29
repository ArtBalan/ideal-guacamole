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

let t=0;
let cSize = 20;
let isLite = false;

function draw() {
  tempColor = lerpColor(fillColor, newColor, amt);
  amt += shiftamt;
  if (amt >= 1) {
    amt = 0.0;
    fillColor = tempColor;
    newColor = color(random(255), random(255), random(255),200);
  } 
  noStroke()
  if(!isLite && random()>0.3){
    pointLight(tempColor, 0, 0, 10);
    pointLight(tempColor, 0, 0, 10);
    pointLight(tempColor, 0, 0, 10);
    pointLight(tempColor, 0, 0, 10);
    // ambientLight(tempColor)
    isLite = true;
  } else {
    pointLight(0, 0, 0, 0, 0, 0);  
    isLite = false;
  }


  background(0)
  t += 0.035;
  for(let j=-300;j<400;j+=50){
    for(let i=-70;i<20;i+=1){
      let temp = i + 70;
      temp = map(temp,0,100,0.5,0)
      let z = (noise(i*0.01+t)-0.5)*5;
      
      let xp = i*cSize;
      let zp = z*200*temp+j;


      let a = xp**2 + zp**2;
      if(a>20000){
        push();
        translate(xp,zp,0);
        rotateX(frameCount * 0.01);
        rotateY(frameCount * 0.01);
        rotateZ(frameCount * 0.01);
        box(cSize-2);
        pop();
      }
    }
  }
}