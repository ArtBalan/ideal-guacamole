/**
 * Vector class to store point information, and calculate its projection on the screen
 * Might add methods for rotation and translation
 */
class Vect{
  /**
   * Do i need to describe what it is
   * @param {int} x 
   * @param {int} y 
   * @param {int} z 
   */
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * 
   * @param {int} d projection plane z = d  
   * @param {int} fov field of view of the camera 
   * @param {int} h screen height in pixel 
   * @param {int} w screen widht in pixel 
   * @returns 
   */
  project(d,fov,h,w) {
    // unit projection onto the plane z=d
    let xf = (d*this.x) / this.z; 
    // to pixel convetion
    xf *=  h / ( ( Math.sin(fov) * d ) / (Math.sin(90 - fov ) ) );
    // setting to the propper origin
    xf += h / 2;
    
    // unit projection onto the plane z=d
    let yf = (d*this.y) / this.z; 
    // to pixel convetion
    yf *=  w / ( ( Math.sin(fov) * d ) / (Math.sin(90 - fov ) ) );
    // setting to the propper origin
    yf +=  w / 2;
    
    return new Vect(xf,yf,1);
  }
}

/**
 * A simple cube class
 * and methods to drawn it on the screen
 */
class Cube{
  /**
   * 
   * @param {Vect} center Postion of the cube center
   * @param {int} r Radius of the cube, each edge will be equal to 2 times r
   */
  constructor(center,r){
    this.center = center;
    this.r = r;
    this.vectList = [];
  }

  /**
  * Initalise the point of the cube 
  */
  cubeInit(){
    this.vectList = [];
    let a = new Vect(this.center.x - this.r, this.center.y - this.r, this.center.z - this.r);
    let b = new Vect(this.center.x - this.r, this.center.y + this.r, this.center.z - this.r);
    let c = new Vect(this.center.x + this.r, this.center.y + this.r, this.center.z - this.r);
    let d = new Vect(this.center.x + this.r, this.center.y - this.r, this.center.z - this.r);
    let e = new Vect(this.center.x - this.r, this.center.y - this.r, this.center.z + this.r);
    let f = new Vect(this.center.x - this.r, this.center.y + this.r, this.center.z + this.r);
    let g = new Vect(this.center.x + this.r, this.center.y + this.r, this.center.z + this.r);
    let h = new Vect(this.center.x + this.r, this.center.y - this.r, this.center.z + this.r);
    this.vectList.push(a,b,c,d,e,f,g,h)
  }

  /**
   * Draw the cube on the screen
   */
  draw(){
    let projectedList = [];
    this.vectList.forEach(e => projectedList.push(e.project(d,fov,height,width)));

    let junctionList = [
      [0,1],
      [1,2],
      [2,3],
      [3,0],
      [4,5],
      [5,6],
      [6,7],
      [7,4],
      [0,4],
      [5,1],
      [6,2],
      [3,7]
    ];

    // Diagonals
    // junctionList.push([3,1],[1,6],[6,4],[4,3],[3,6],[4,1]);

    strokeWeight(2)
    junctionList.forEach(e =>{
       line(projectedList[e[0]].x,projectedList[e[0]].y,projectedList[e[1]].x,projectedList[e[1]].y)
      
    });
  }
}

let width = 600;
let height = 600;

let d = 2;
let fov = 10;

let myCube = new Cube(new Vect(0,0,10),1);
myCube.cubeInit();

let rate = 0.004;


function setup() {
  createCanvas(width, height);
  background(25);
}

function draw() {
  // reset the screen
  background(25);
  // change cube proprety
  myCube.r += rate;
  if (myCube.r > 1.5 || myCube.r < 0.5 ) rate *= -1;
  // recalculate it's point
  myCube.cubeInit();
  // draw the cube
  myCube.draw();
  stroke('purple'); // Change the color
}
