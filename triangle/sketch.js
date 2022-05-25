let width = 900;
let height = 900;

let cardX = 10;
let cardY = 10;

let sampleRate = ((width/cardX)+(height/cardY))/10

function setup() {
  // max canvas size
  p5Canvas = createCanvas(width, height);
  background(25);
}

function draw() {

}

class point{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  placePoint(a,b){
    this.y = this.x*a + b;
  }
}


function drawPoint(x,y,color){
  stroke(color);
  strokeWeight(sampleRate);
  point(x*(width/cardX),y*(height/cardY));
}

function intersect(a,b,ap,bp){
  return (bp-b)/(ap-a);
}


function caldist(a, b) {
  // pythagore goes brrr
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);;
}