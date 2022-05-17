
/**
 * Simple vector class with basic functionnality
 */
class Vect {
  /**
   *
   * @param {int} x x component
   * @param {int} y y component
   * @param {int} z z component
   */
  constructor(x, y, z, maxNearestPoint) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.nearestPoints = [];
    if(maxNearestPoint) this.maxNearestPoint = maxNearestPoint
    else this.nearestPoint = 2;
    for(let i=0; i<this.maxNearestPoint; i++) this.nearestPoints.push(0);
  }
  /**
   * Project the point onto the screen
   * Does not draw it but calculate its projected x and y coordinate
   * @param {int} d projection of the point on the plane z=d
   * @param {int} fov field of view the camera
   */
  projectPoint(d, fov) {
    let xf = (d * this.x) / this.z;
    // to pixel convetion
    xf *= HEIGHT / ((Math.sin(fov) * d) / Math.sin(90 - fov));
    // setting to the propper origin
    xf += HEIGHT / 2;
    // unit projection onto the plane z=d
    let yf = (d * this.y) / this.z;
    // to pixel convetion
    yf *= WIDTH / ((Math.sin(fov) * d) / Math.sin(90 - fov));
    // setting to the propper origin
    yf += WIDTH / 2;

    return new Vect(xf, yf, 1);
  }
  /**
   * Translate the point with the given vector
   * @param {Vect} vect
   */
  translatePoint(vect) {
    this.x += vect.x;
    this.y += vect.y;
    this.z += vect.z;
  }
  /**
   * Scale the point with the given vector and origin
   * @param {Vect} f vector containig the 3 axis scalling factor
   * @param {Vect} origin
   */
  scalePoint(f, origin) {
    this.x = (this.x - origin.x) * f.x + origin.x;
    this.y = (this.y - origin.y) * f.y + origin.y;
    this.z = (this.z - origin.z) * f.z + origin.z;
  }
  /**
   * Rotate a point around a given origin and angle
   * @param {int} a first orgin coordinate ex: origin.x
   * @param {int} b second origin coordinate ex:origin.y
   * @param {int} c first point coordinate ex: point.x
   * @param {int} d second point coordinate ex: point.y
   * @param {int} angle of rotation
   */
  planarRotate(a, b, c, d, angle) {
    let out = [];
    out.push(Math.cos(angle) * (c - a) - Math.sin(angle) * (d - b) + a);
    out.push(Math.sin(angle) * (c - a) + Math.cos(angle) * (d - b) + b);
    return out;
  }
  /**
   * Rotate a point around a given origin and angles
   * @param {Vect} f vector containing the 3 angles of rotation
   * @param {Vect} origin origin of rotation
   */
  rotatePoint(f, origin) {
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

/**
 * Simple item class
 */
class Item {
  /**
   *
   * @param {Vect} center of the item
   * @param {int} r radius of the item
   * @param {string} color color of the item
   */
  constructor(center, r, color) {
    this.center = center;
    this.r = r;
    this.vectList = [];
    this.color = color;
  }
  /**
   * Translate the item with the given vector
   * @param {Vect} f
   */
  translateItem(f) {
    this.vectList.forEach((e) => e.translatePoint(f));
    this.center.translatePoint(f);
  }
  /**
   * Scale the item with the given vector and origin
   * @param {Vect} f vector containig the 3 axis calling factor
   * @param {*} origin
   */
  scaleItem(f, origin) {
    this.vectList.forEach((e) => e.scalePoint(f, origin));
    this.center.scalePoint(f, origin);
  }
  /**
   * Rotate the item around a given origin and angles
   * @param {Vect} f vector containing the 3 angles of rotation
   * @param {Vect} origin origin of rotation
   */
  rotateItem(f, origin) {
    this.vectList.forEach((e) => e.rotatePoint(f, origin));
    this.center.rotatePoint(f, origin);
  }
}


class square{
  constructor(center, r, )
}



function caldist(a, b) {
  // pythagore goes brrr
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2 + (b.z - a.z) ** 2);;
}


let WIDTH = 900;
let HEIGHT = 900;

let d = 2;
let fov = 100;

let fillColor;
let newColor;
let shiftamt = 0.01;



let p5Canvas;

function setup() {
  p5Canvas = createCanvas(WIDTH, HEIGHT);
  background(25);
  frameRate(24)
}

let myCube = new Cube(new Vect(0, 0, 5), 1, "orange", 4,false);
function draw() {
  background(25);

  myCube.translateItem(new Vect(0.001,0.001,0.001), myCube.center);

  myCube.rotateItem( new Vect(0.005, 0.005, 0.005), myCube.center );

  myCube.draw();
}