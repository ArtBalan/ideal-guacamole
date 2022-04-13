let width = 0;
let height = 0;

let minusX = -5;
let posX = 5;
let minusY = -5;
let posY = 5;

function setup() {
  // max canvas size
  width = 900;
  height = 900;
  createCanvas(width, height);
  background(25);

  fillColor = color(255, 204, 0);
  strokeColor = color(25, 157, 255,150);
  stroke(fillColor);
  strokeWeight(5);

}

function draw() {
  let startingPoint = new Point(-2,-2);
  let endingPoint = new Point(2,2);
  startingPoint.draw();
  endingPoint.draw();

  let myLine = new Line(-2,-2,2,2);
  myLine.draw();
}

class Point{
  constructor(x,y){
    this.x = x;
    this.y = y;
    let realX;
    let realY;
    this.calculateRealCord();
  }
  calculateRealCord(){
    let deltaX = posX - minusX;
    let deltaY = posY - minusY;
    this.realX = (( width / deltaX )*this.x + width/2);
    this.realY = (( height / deltaY )*this.y + height/2);
  }
  draw(){
    stroke("blue");
    strokeWeight(4);
    point(this.realX, this.realY);
  }
}

class Line{
  constructor(xs,ys,xe,ye){
    this.startingPoint = new Point(xs,ys);
    this.endingPoint = new Point(xe,ye);
  }
  draw(){
    this.startingPoint.calculateRealCord();
    this.endingPoint.calculateRealCord();
    stroke("red");
    strokeWeight("1");
    line(this.startingPoint.realX,this.startingPoint.realY,this.endingPoint.realX,this.endingPoint.realY);
    this.extention();
  }

  extention(){

    let tempX = cos(Math.PI/2)*this.endingPoint.x - sin(Math.PI/2)*this.endingPoint.y +this.startingPoint.x;
    let tempY = sin(Math.PI/2)*this.endingPoint.x + cos(Math.PI/2)*this.endingPoint.y + this.startingPoint.y;
    let norm = Math.sqrt((this.startingPoint.x - tempX)**2 + (this.startingPoint.y -tempY)**2);
    tempX /= norm;
    tempY /= norm;
    let tempPoint = new Point(tempX,tempY);
    line(tempPoint.realX,tempPoint.realY,this.startingPoint.realX,this.startingPoint.realY);
  }
}



function caldist(a, b) {
  // pythagore goes brrr
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);;
}