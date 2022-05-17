class Point{
  constructor(x,y,color,size){
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    let realX;
    let realY;
    this.calculateRealCord();
  }
  calculateRealCord(){
    let deltaX = posX - minusX;
    let deltaY = posY - minusY;
    this.realX = (( width  / deltaX ) * this.x + width  / 2 );
    this.realY = (( height / deltaY ) * this.y + height / 2 );
  }
  draw(){
    this.calculateRealCord();
    stroke(this.color);
    strokeWeight(this.size);
    point(this.realX, this.realY);
  }
}


let width = 0;
let height = 0;

let minusX = -50;
let posX = 50;
let minusY = -50;
let posY = 50;

let raduis = 35.35;
let nbrOfPoint = 10;

let pointList = []

function setup() {
  // max canvas size
  width = 900;
  height = 900;
  createCanvas(width, height);
  background(255);
  frameRate(80)
  fillColor = color(255, 204, 0);
  newColor = color(random(255), random(255), random(255));
  // idk why i need this
  colorMode(RGB);

  

}

let amt = 0;
let shiftamt = 0.9;




function draw() {

  tempColor = lerpColor(fillColor, newColor, amt);
  amt += shiftamt;
  if (amt >= 1) {
    amt = 0.0;
    fillColor = newColor;
    newColor = color(random(255), random(255), random(255));
  }

  let rate = 360/nbrOfPoint;
  pointList = [];
  for(let i=0; i<nbrOfPoint ; i++){
    let xPos = Math.cos( i * rate * (Math.PI/180) );
    let yPos = Math.sin( i * rate * (Math.PI/180));
    let tempPoint = new Point(xPos*raduis, yPos*raduis, tempColor,Math.random()*50);
    pointList.push(tempPoint);
  }

  pointList.forEach(e => drawLine(e))
  // drawLine(new Point(25,25,tempColor,Math.random()*50));
  // drawLine(new Point(-25,25,tempColor,Math.random()*50));
  // drawLine(new Point(25,-25,tempColor,Math.random()*50));
  // drawLine(new Point(-25,-25,tempColor,Math.random()*50));
  // drawLine(new Point(0,-35.35,tempColor,Math.random()*50));
  // drawLine(new Point(0,35.35,tempColor,Math.random()*50));
  // drawLine(new Point(35.35,0,tempColor,Math.random()*50));
  // drawLine(new Point(-35.35,0,tempColor,Math.random()*50));
}


function drawLine(myPoint){
  let tX = Math.random() * ((Math.random()>0.5)?1 : -1);
  tX /= 10;
  let tY = Math.random() * ((Math.random()>0.5)?1 : -1);
  tY /= 10;
  while(caldist(myPoint, new Point(0,0))<36){
    myPoint.x += tX;
    myPoint.y += tY;
    myPoint.size = myPoint.size * 0.98;
    myPoint.draw();
  }
}


function pointify(){
  for(let i = minusX; i<posX; i++){
    for(let j = minusY; j<posY; j++){
      let tempPoint = new Point(i,j);
      tempPoint.draw();
    }
  }
}



function caldist(a, b) {
  // pythagore goes brrr
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);;
}