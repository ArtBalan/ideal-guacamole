
let width = 900;
let height = 900;


let alphaValue = 255;
let shiftamt = 0.2;

let radius = 1;

let p5Canvas;

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

  // color shift start at 0
  amt = 0;
  // drawLightning(0.95,9,550);
  // drawLightning(0.5,2,550);
  // drawLightning(0.05,9,550);
  for(let i=0; i<100; i++) drawLightning(random(),random()*7,random()*1000)
  // drawLightning(0.5,30,550);

}


function draw() {
  

}

function drawLightning(signFactor,noiseFactor,lenght){

  // fill(color(255, 204, 0, 1));
  stroke(color(25, 157, 255,150,));
  let signFactorTemp = signFactor;
  let i = 0
  while(i < 20){
    let signFactorTemp = signFactor;

    let y = height/2;
    let x = 0;
    let tempY;
    let tempX;
    let stop = false;
    while(random()<0.99 && !stop){
      if (x > width + lenght || y < 10 || y > height - 10 ){
        stop = true;
      } else{
        tempX = x + 4;
      } 
      
      if(x > width/2 && x < width ){ signFactorTemp = 1 - signFactor;}
      if(x > width*1.5   ){ signFactorTemp = signFactor;}

      let sign = random();
      sign = (sign>signFactorTemp)? 1 : -1; 
      tempY = y + noise(y,x)*sign*noiseFactor;
  
      line(x,y,tempX,tempY)
      x = tempX;
      y = tempY;
    }
    i += 1;
  }
}