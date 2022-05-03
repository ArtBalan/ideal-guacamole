let width = 0;
let height = 0;

let minusX = -25;
let posX = 25;
let minusY = -25;
let posY = 25;


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

let shift = 0;
let secondShif = -1;
let myLine;

let rotateSpeed = 0.02;
let roateDelta = 1.9;


let ascende = true;
let rotate = true;

function draw() {
  background(25);
  let lineList = [];
  for(let i=-20; i<=20; i+=0.5){
    if(i!= 0) lineList.push(new Line(secondShif,i*3,-i*1.5,i*1.5));
    if(i!= 0) lineList.push(new Line(-secondShif,i*3,-i*1.5,i*1.5));
  }

  lineList.forEach(e => {
    e.draw("yellow",2);
    // e.drawPoint(shift,"yellow",20);
  });

  if(ascende && shift<=1){
    shift += 0.003;
  } else {
    ascende = false;
  }
  if( !ascende && shift >= 0){
    shift -= 0.003;
  } else {
    ascende = true;
  }

  if( rotate && secondShif <= roateDelta){
    secondShif += rotateSpeed;
  } else {
    rotate = false;
  }
  if( !rotate && secondShif >= -roateDelta){
    secondShif -= rotateSpeed;
  } else {
    rotate = true;
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
    this.realX = (( width  / deltaX ) * this.x + width  / 2 );
    this.realY = (( height / deltaY ) * this.y + height / 2 );
  }
  draw(){
    if(this.x == 0 && this.y == 0){
      stroke("green");
      strokeWeight(10);
    } else {
      stroke("blue");
      strokeWeight(4);  
    }
    point(this.realX, this.realY);
  }
}

class Line{
  constructor(a,b,x1,x2,ext) {
    this.a = a;
    this.b = b;
    this.x1 = x1;
    this.x2 = x2;
    this.ext = (ext == undefined)? true : false;
  }

  draw(color,width){
    this.startingPoint = new Point(this.x1, (this.a * this.x1 + this.b));
    this.endingPoint   = new Point(this.x2, (this.a * this.x2 + this.b));
    this.startingPoint.calculateRealCord();
    this.endingPoint.calculateRealCord();
    stroke(color);
    strokeWeight(width);
    line(this.startingPoint.realX,this.startingPoint.realY,this.endingPoint.realX,this.endingPoint.realY);
    if(this.ext){
      // this.extention();
    }
  }

  extention(){
    let a1 = -1/this.a;
    let b1 = this.startingPoint.y + (1/this.a)*this.x1;
    let startingExtention = new Line(a1,b1,this.x1-0.2,this.x1+0.2,false);
    startingExtention.draw("blue",3);

    let b2 = this.endingPoint.y + (1/this.a)*this.x2;
    let endingExtention = new Line(a1,b2,this.x2-0.2,this.x2+0.2,false);
    endingExtention.draw("blue",3);
  }

  drawPoint(factor,color,weihgt){

    if(factor <= 1 && factor >= 0){
    
      let len = caldist(this.startingPoint,this.endingPoint);
      let deltaX = (this.endingPoint.x - this.startingPoint.x);
      
      strokeWeight(weihgt);
      stroke(color);
      
      let tempPoint = new Point(this.startingPoint.x + (deltaX*factor), this.a*(this.startingPoint.x + (deltaX*factor))+this.b);
      
      tempPoint.calculateRealCord();
      point(tempPoint.realX,tempPoint.realY);
    
    }

  }

}

function caldist(a, b) {
  // pythagore goes brrr
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);;
}