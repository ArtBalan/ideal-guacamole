let width = 0;
let height = 0;

let points = [];
// Number of circles per draw
let nbrOfPoint = 10;
// if the circle can overflow
let overflow = false;
// distance between point
let distance = 3;

// how much the ring decrease
let decrease = 12;
// stroke weight
let strokeWidth = 0.8;
// how much times we redraw the circles
let steps = 10000;
let keepGoing = true;

// inner color of the circle
let fillColor;
// circle stroke color
let strokeColor;
// target color
let newColor;
let tempColor;
let alphaValue = 20;
let deltaAlpha = -10;
// for the color shift
let amt;
let shiftamt = 1 / steps;
shiftamt = 0.005;

function setup() {
  // max canvas size
  width = windowWidth - 2;
  height = windowHeight - 2;
  createCanvas(width, height);
  background(25);

  fillColor = color(255, 204, 0, alphaValue);
  strokeColor = color(25, 157, 255,150);
  newColor = color(random(255), random(255), random(255), alphaValue);
  // idk why i need this
  colorMode(RGB);

  // color shift start at 0
  amt = 0;
}

function draw() {
  // if there is no point that can shrink and more steps to go
  if ( steps > 0) {
    // regenerate points
    steps -= 1;
    // color shift
    tempColor = lerpColor(fillColor, newColor, amt);
    // fill(lerpColor(fillColor, newColor, amt));
    // MaThS could be also done on the stroke but me lazy 
    stroke(strokeColor);
    // same for it's weight
    strokeWeight(strokeWidth);
    
    amt += shiftamt;
    if (amt >= 1) {
      amt = 0.0;
      startColor = newColor;
      newColor = color(random(255), random(255), random(255),200);
    }
    cicleEveryWhere(points);
  }

}

function generate() {
  let points = [];
  // generate a list of points with random coordinate
  for (let i = 0; i < nbrOfPoint; i++) {
    let point = {
      x: floor(random(width)),
      y: floor(random(height)),
      nearest: Math.max(width, height),
    };
    points.push(point);
  }

  // Calculate the distance to the nearest point
  for (let i = 0; i < nbrOfPoint; i++) {
    for (let j = 0; j < nbrOfPoint; j++) {
      if (i != j) {
        let maxDist = caldist(points[i], points[j]);
        if (maxDist < points[i].nearest) points[i].nearest = maxDist;
      }
    }
    // check if the circles will overflow 
    if(!overflow){
     if(points[i].x+points[i].nearest>width) points[i].nearest=width-points[i].x;
      if(points[i].x-points[i].nearest<0) points[i].nearest = points[i].x;

      if(points[i].y+points[i].nearest>height) points[i].nearest = height - points[i].y; 
      if(points[i].y-points[i].nearest<0) points[i].nearest = points[i].y; 
    }
    points[i].nearest -= distance;
  }

  let centerPoint = {"x":windowWidth/2,"y":windowHeight/2};
  points = points.filter(e => (
     isInCircle(e,centerPoint,200)
     || isInTorus(e,centerPoint,490,400)
     || isInTorus(e,centerPoint,640,550)
     || isInTorus(e,centerPoint,790,700)
    // isInRectangle(e,450,20)
    // isInRectangle(e,20,900)
  ));
  return points;
}

async function cicleEveryWhere() {
  let keepGoing = true;
  let points = generate();
    // if there is still point that can shrink
    while (keepGoing) {
      keepGoing = false;
      // draw each point and decrease it's size
      points.forEach((e) => {
        tempColor.setAlpha(alpha(tempColor)-deltaAlpha);
        fill(tempColor);
        circle(e.x, e.y, e.nearest);
        // if the size of the point don't go negative we keep going 
        if (e.nearest - decrease > 0) {
          e.nearest = e.nearest - decrease;
          keepGoing = true;
        }
      });
  }
}

function caldist(a, b) {
  // pythagore goes brrr
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);;
}

function isInCircle(point,centerPoint,radius){
  return (caldist(centerPoint, point)+point.nearest<radius); 
}

function isInTorus(point,centerPoint,radiusOut,radiusIn){
  let autorised = (isInCircle(point,centerPoint,radiusOut)) && !(isInCircle(point,centerPoint,radiusIn)) && (point.nearest<radiusOut-radiusIn); 
  return autorised;
}

function isInRectangle(point,heightOffset,widthOffset){

  let autorised = ( point.x+point.nearest < windowWidth-widthOffset && point.x+ point.nearest > widthOffset );
  if(autorised) autorised = ( point.y+point.nearest < windowHeight-heightOffset && point.y+point.nearest > heightOffset );

  return autorised;
}

function dotProduct(a,b){
  return a.x * b.x + a.y * b.y
}