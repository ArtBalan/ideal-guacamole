/**
 * Vector class to store point information, and calculate its projection on the screen
 * Might add methods for rotation and translation
 */
class Vect {
  /**
   * Do i need to describe what it is
   * @param {int} x
   * @param {int} y
   * @param {int} z
   */
  constructor( x, y, z ) {
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
  projectPoint( d, fov, h, w ) {
    // unit projection onto the plane z=d
    let xf = (d * this.x) / this.z;
    // to pixel convetion
    xf *= h / ((Math.sin(fov) * d) / Math.sin(90 - fov));
    // setting to the propper origin
    xf += h / 2;

    // unit projection onto the plane z=d
    let yf = (d * this.y) / this.z;
    // to pixel convetion
    yf *= w / ((Math.sin(fov) * d) / Math.sin(90 - fov));
    // setting to the propper origin
    yf += w / 2;

    return new Vect(xf, yf, 1);
  }

  /**
   * translate the point with the given vector 
   * @param {int} vect 
   */
  translatePoint( vect ){
    this.x += vect.x;
    this.y += vect.y;
    this.z += vect.z;
  }

  /**
   * scale the point from the given origin, and by the scalling vector
   * @param {Vect} origin
   * @param {Vect} f vector containing the 3 axis scalling factor
   */
  scalePoint( f, origin) {
    this.x = (this.x - origin.x) * f.x + origin.x;
    this.y = (this.y - origin.y) * f.y + origin.y; 
    this.z = (this.z - origin.z) * f.z + origin.z; 
  }
  /**
   * rotate a point around another one based on a plan 
   * @param {int} a first origin axis coordinate ex: origin.x
   * @param {int} b second origin axis coordinate ex: origin.y
   * @param {int} c first point axis coordinate ex: point.x
   * @param {int} d second point axis coordinate ex: point.y
   * @param {int} angle 
   * @returns 
   */
  planarRotate( a, b, c, d, angle ){
    let out = [];
    out.push( (Math.cos(angle)*(c-a)) - (Math.sin(angle)*(d-b)) + a );
    out.push( (Math.sin(angle)*(c-a)) + (Math.cos(angle)*(d-b)) + b );
    return out;
  }

  /**
   * Rotate a point around another one with the given vector
   * @param {Vect} origin point of rotation 
   * @param {Vect} f vector containing the 3 rotations factor
   */
  rotatePoint( f, origin ){
    // planar rotate on x
    let rx = this.planarRotate(origin.y, origin.z, this.y, this.z, f.x);
    this.y = rx[0];
    this.z = rx[1];
    //planar rotate on y
    let ry = this.planarRotate(origin.x, origin.z, this.x, this.z, f.y);
    this.x = ry[0];
    this.z = ry[1];
    // planar rotate on z
    let rz = this.planarRotate(origin.x, origin.y, this.x, this.y, f.z);
    this.x = rz[0];
    this.y = rz[1];
  }
}

class Item{
  /**
   * 
   * @param {Vect} center item center 
   */
  constructor( center, r ){
    this.center = center;
    this.r = r;
    this.vectList = [];
  }

  /**
  * Translate the object
  * @param {Vect} f Translate Vector
  */
  translateItem( f ){
    this.vectList.forEach(e => e.translatePoint(f)); 
    this.center.translatePoint(f);
  }

  /**
  * Scale the object 
  * @param {Vect} f Scalling vector
  * @param {Vect} origin Scalling origin vector
  */
  scaleItem( f, origin ){ 
    this.vectList.forEach(e => e.scalePoint( f , origin));
    this.center.scalePoint( f , origin);
  }

  
  /**
   * Rotate the given object
   * @param {Vect} f Rotation Vector
   * @param {Vect} origin Rotation origin Vector
   */
  rotateItem( f, origin){
    this.vectList.forEach(e => e.rotatePoint( f , origin));
    this.center.rotatePoint( f , origin);
  }

}


/**
 * A simple cube class
 * and methods to drawn it on the screen
 */
class Cube extends Item {
  /**
   *
   * @param {Vect} center Postion of the cube center
   * @param {int} r Radius of the cube, each edge will be equal to 2 times r
   */
  constructor( center, r ) {
    super(center, r);
    this.cubeInit();
  }

  /**
   * Initalise the point of the cube
   */
  cubeInit() {
    this.vectList = [];
    let a = new Vect( this.center.x - this.r, this.center.y - this.r, this.center.z - this.r );
    let b = new Vect( this.center.x - this.r, this.center.y + this.r, this.center.z - this.r );
    let c = new Vect( this.center.x + this.r, this.center.y + this.r, this.center.z - this.r );
    let d = new Vect( this.center.x + this.r, this.center.y - this.r, this.center.z - this.r );
    let e = new Vect( this.center.x - this.r, this.center.y - this.r, this.center.z + this.r );
    let f = new Vect( this.center.x - this.r, this.center.y + this.r, this.center.z + this.r );
    let g = new Vect( this.center.x + this.r, this.center.y + this.r, this.center.z + this.r );
    let h = new Vect( this.center.x + this.r, this.center.y - this.r, this.center.z + this.r );
    this.vectList.push(a, b, c, d, e, f, g, h);
  }

  /**
   * Draw the cube on the screen
   */
  draw() {
    let projectedList = [];
    this.vectList.forEach((e) =>
      projectedList.push(e.projectPoint(d, fov, height, width))
    );

    let junctionList = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      [0, 4],
      [5, 1],
      [6, 2],
      [3, 7],
    ];

    // Diagonals
    junctionList.push([3,1],[1,6],[6,4],[4,3],[3,6],[4,1]);

    // Draw lines
    junctionList.forEach((e) =>
      line( projectedList[e[0]].x, projectedList[e[0]].y, projectedList[e[1]].x, projectedList[e[1]].y )
    );
  }

}

class Sphere extends Item{
  constructor( center, r, segment){
    super(center, r);
    this.segment = segment;
    this.sphereInit();
  }

  sphereInit(){
    let angle = 360 / ( this.segment ) ;
    for(let i=0; i < this.segment; i++){

      let tempPoint = new Vect( (Math.cos(angle*i)*this.r)+this.center.x, (Math.sin(angle*i)*this.r)+this.center.y, this.center.z );

      this.vectList.push(tempPoint);
    }
  }

  draw() {
    let projectedList = [];
    this.vectList.forEach((e) =>
      projectedList.push(e.projectPoint(d, fov, height, width))
    );

    for (let i = 0; i < projectedList.length-1 ; i++) {
      line(projectedList[i].x,projectedList[i].y,projectedList[i+1].x,projectedList[i+1].y);      
    }
    projectedList.forEach(e => point(e.x, e.y))

  }


}


let width = 600;
let height = 600;

let d = 2;
let fov = 10;

// let myCube = new Cube(new Vect(0, 0, 10), 1);
let mySphere = new Sphere(new Vect(0, 0, 10), 1, 8);

let rate = 1.01;

function setup() {
  createCanvas(width, height);
  background(25);
  stroke('purple'); // Change the color
  strokeWeight(4);
}

function draw() {
  // reset the screen
  background(25);
  // change cube proprety

  // recalculate it's point
  // myCube.translateItem(new Vect(0.01,0,0));
  // myCube.scaleItem(new Vect(0.999, 0.999, 0.999),  myCube.center );
  // myCube.rotateItem( new Vect(0.005, 0.005, 0.005), myCube.center );
  
  // mySphere.scaleItem(new Vect(0.999, 0.999, 0.999), mySphere.center );
  // mySphere.rotateItem( new Vect(0.005, 0.005, 0.005), mySphere.center );

  // draw the cube
  // myCube.draw();
  mySphere.draw();
}
