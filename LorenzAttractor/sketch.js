class Point{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
  }

  lorenzAttractor(dt){
    let returnPoint = new Point(0,0,0)
  
    let xDot = prandtl * ( this.y - this.x );
    let yDot = this.x * ( rayleigh - this.z ) - this.y;
    let zDot = this.x * this.y - dim * this.z;
  
    returnPoint.x = this.x + xDot * dt;
    returnPoint.y = this.y + yDot * dt;
    returnPoint.z = this.z + zDot * dt;
  
    return returnPoint;
  }

}

class Line{
  constructor(startingPoint, endingPoint, color){
    this.startingPoint = startingPoint;
    this.endingPoint = endingPoint;
    this.color = color;
  }

  draw(weight){
    stroke(this.color);
    strokeWeight(weight);
    line(
      this.startingPoint.x * factor + shift ,
      this.startingPoint.z * factor + 5,
      this.endingPoint.x * factor + shift ,
      this.endingPoint.z * factor + 5
    )
  }
}

let screenSize;
let factor;
let shift;


let prandtl = 10;
let rayleigh = 28;
let dim = (8/3)


function setup() {
  screenSize = (windowWidth<windowHeight)? windowWidth : windowHeight;
  factor = screenSize / 50;
  shift = screenSize / 2;
  createCanvas(screenSize,screenSize);

  background(0);
  
  fillColor = color(255, 204, 0);
  newColor = color(random(255), random(255), random(255));
  colorMode(RGB);
  frameRate(120)
}

// Color stuff
let amt = 0;
let fillColor;
let newColor;
let shiftamt = 0.005;

let point = new Point(1,0,1);
let list = [];
let snake = false;


function draw() {
  // color shifting code
  tempColor = lerpColor(fillColor, newColor, amt);
  amt += shiftamt;
  if (amt >= 1) {
    amt = 0.0;
    fillColor = newColor;
    newColor = color(random(255), random(255), random(255));
  }

  // la partie intéressante
  let tempPoint = point.lorenzAttractor(0.002);

  let line = new Line(point, tempPoint, tempColor);
  line.draw(7);

  if(snake){
    background(0)
    if(list.length > 5) list.shift();
    list.push(line);

    list.forEach(e => e.draw(7) )
  }
  // line.draw(tempColor, 7);
  point = tempPoint;
}

function caldist(a, b) {
  // pythagore goes brrr
  return Math.sqrt( (b.x - a.x) ** 2 + (b.y - a.y) ** 2 + (b.z - a.z) ** 2 );
}