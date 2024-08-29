class Ele{
  constructor(x,y,vx,vy,size,calc,len,color){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = size;
    this.realX = 0;
    this.realY = 0;
    this.calculateRealCord();
    this.calc = calc;
    this.len = len;
    this.color = color;
  }
  calculateRealCord(){
    let deltaX = posX - minusX;
    let deltaY = posY - minusY;
    this.realX = (( width  / deltaX ) * this.x + width  / 2 );
    this.realY = (( height / deltaY ) * this.y + height / 2 );
  }
  draw(){
    this.calculateRealCord();
    strokeWeight(this.size);
    stroke(this.color);
    point(this.realX, this.realY);
  }
  applyVect(){
    this.x -= this.vx;
    this.y -= this.vy;
  }
}


let width = 0;
let height = 0;

let minusX = -1000;
let posX = 1000;
let minusY = -1000;
let posY = 1000;

let raduis = 35;
let nbrOfPoint = 20;

let pointList = []

// Color stuff
let amt = 0;
let fillColor;
let newColor;
let shiftamt = 0.005;

function setup() {
  // max canvas size
  width = 900;
  height = 900;
  createCanvas(width, height);
  background(0);
  frameRate(80)
  fillColor = color(255, 204, 0);
  newColor = color(random(255), random(255), random(255));
  // idk why i need this
  colorMode(RGB);

  let vecX = 0;
  let vecY = 1;

  // vecX = Math.random();
  // vecY = Math.random();

  // vecX = vecX / (Math.sqrt(vecX*vecX + vecY*vecY));
  // vecY = vecY / (Math.sqrt(vecX*vecX + vecY*vecY));

  fillColor = color(255, 204, 0);
  newColor = color(random(255), random(255), random(255));

  pointList.push(new Ele(0,0,vecX,vecY,3,0,0,fillColor));
  pointList.push(new Ele(0,0,-vecX,-vecY,3,0,0,fillColor));
  
  colorMode(RGB);
  frameRate(120)
}


function draw() {
  // color shifting code
  tempColor = lerpColor(fillColor, newColor, amt);
  amt += shiftamt;
  if (amt >= 1) {
    amt = 0.0;
    fillColor = newColor;
    newColor = color(random(255), random(255), random(255));
  }
  let pointLimit = 10000;
  pointList.forEach(point => {
    point.len += point.calc*2;
    if(point.len < pointLimit){
      point.applyVect();
      point.draw();
      if(Math.random()>0.995 && pointList.length < 1000){
        point.calc += 1;
        if(point.calc < 10){
          let vecX = Math.random()/2;
          let vecY = Math.random();

          vecX = point.vx*cos(3.14/4)-point.vy*sin(3.14/4),
          vecY = point.vx*sin(3.14/4)+point.vy*cos(3.14/4),

          vecX = vecX / (Math.sqrt(vecX*vecX + vecY*vecY));
          vecY = vecY / (Math.sqrt(vecX*vecX + vecY*vecY));

          vecX *= 2;
          vecY *= 2;

          pointList.push(new Ele(
            0,
            0,
            vecX,
            vecY,
            3,
            point.calc+1,
            point.len,
            tempColor
          ));
          
          pointList.push(new Ele(
            0,
            0,
            -vecX,
            -vecY,
            3,
            point.calc+1,
            point.len,
            tempColor
          ));
        }
        point.vx = point.vx*cos(-3.14/4)-point.vy*sin(-3.14/4);
        point.vy = point.vx*sin(-3.14/4)+point.vy*cos(-3.14/4);
      }
    }
  });
}