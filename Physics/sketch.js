class vect2{
  x = 0;
  y = 0;
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  update(x,y){
    this.x = x;
    this.y = y;
  }
}

class Ball{
  x = 0;
  y = 0;
  constructor(x,y){
    this.pos = new vect2(x,y);
    this.vel = new vect2(0,0);
  }

  step(){
  }

  stepVelocity(){
  }


  stepPosition(){
  }
  draw(){
    circle(this.pos.x,h-this.pos.y,10);
  }
}

var balls = [];

function setup() {
  w = window.innerWidth;
  h = window.innerHeight;  
  p5Canvas = createCanvas(w,h);
  
  let tempBall = new Ball(w/2,h/2);
  balls.push(tempBall);
}

function draw() {
  background(51);

  balls.forEach(ball => {

    ball.step();
    ball.draw(w,h);
  })
}