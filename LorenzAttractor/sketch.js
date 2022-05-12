

function setup() {
  let screenSize = (windowWidth<windowHeight)? windowWidth : windowHeight;
  createCanvas(screenSize,screenSize);
  background(80);
}

let coord = [1,0,1];

function draw() {
  let screenSize = (windowWidth<windowHeight)? windowWidth : windowHeight;
  let factor = screenSize / 50;
  let shift = screenSize / 2;


  square(coord[0]*factor+shift,coord[2]*factor+5,1);
  coord = lorenzAttractor(coord);


}

function lorenzAttractor(coord){
  let dt = 0.002;
  let x = coord[0];
  let y = coord[1];
  let z = coord[2];

  let prandtl = 10;
  let rayleigh = 28;
  let dim = (8/3)


  let xDot = prandtl * ( y - x );
  let yDot = x * ( rayleigh - z ) - y;
  let zDot = x * y - dim * z;

  coord[0] += xDot * dt;
  coord[1] += yDot * dt;
  coord[2] += zDot * dt;

  //coord[0] = Math.floor(coord[0]);


  return coord;
}
