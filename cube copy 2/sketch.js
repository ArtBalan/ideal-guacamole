
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
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  /**
   * Project the point onto the screen
   * Does not draw it but calculate its projected x and y coordinate
   * @param {int} d projection of the point on the plane z=d
   * @param {int} fov field of view the camera
   */
  projectPoint(d, fov) {
    // unit projection onto the plane z=d
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

/**
 * Simple cube class
 */
class Cube extends Item {
  /**
   *
   * @param {Vect} center of the cube
   * @param {int} r radius of the cube
   * @param {color} color of the cube
   * @param {bool} diag if the diagonal lines are displayed
   */
  constructor(center, r, color, strokeW, diag) {
    super(center, r, color);
    this.cubeInit();
    this.diag = diag;
    this.strokeW = strokeW;
  }
  /**
   * Initialise the point of the cube
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
   * Draw the cube
   */
  draw() {
    strokeWeight(this.strokeW);
    stroke(this.color);
    let projectedList = [];
    this.vectList.forEach((e) => projectedList.push(e.projectPoint(d, fov)));
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
    if (this.diag)
      junctionList.push([3, 1], [1, 6], [6, 4], [4, 3], [3, 6], [4, 1]);
      junctionList.forEach((e) => { line( projectedList[e[0]].x, projectedList[e[0]].y, projectedList[e[1]].x, projectedList[e[1]].y );});
      // Index printing
    // for (let i = 0; i < projectedList.length; i++) { text(i,projectedList[i].x,projectedList[i].y); }
  }
}

/**
 * Simple sphere class
 */
class Sphere extends Item {
  /**
   *
   * @param {Vect} center of the sphere
   * @param {int} r radius of the sphere
   * @param {int} segment number of rings
   * @param {string} color of the sphere
   */
  constructor(center, r, segment, color, strokeW) {
    super(center, r, color);
    this.segment = segment;
    this.sphereInit();
    this.strokeW = strokeW;
  }
  /**
   * Create a circle of radius this.r
   */
  circleInit() {
    let angle = (Math.PI * 2) / this.segment;
    for (let i = 0; i < this.segment; i++) {
      let tempPoint = new Vect(
        Math.cos(angle * i) * this.r + this.center.x,
        this.center.y,
        Math.sin(angle * i) * this.r + this.center.z
      );
      this.vectList.push(tempPoint);
    }
  }
  /**
   * Initialise the point of the sphere
   */
  sphereInit() {
    let angle = (Math.PI * 2) / this.segment;
    for (let i = 0; i < this.segment / 2; i++) {
      this.rotateItem(new Vect(angle, 0, 0), this.center);
      this.circleInit();
    }
  }
  /**
   * Draw the sphere
   */
  draw() {
    stroke(this.color);
    strokeWeight(this.strokeW)
    let projectedList = [];
    this.vectList.forEach((e) => projectedList.push(e.projectPoint(d, fov)));
    for (let i = 0; i < projectedList.length - 1; i++) {
      if (i < this.segment && i != 0) {
        line( projectedList[i].x, projectedList[i].y, projectedList[projectedList.length - i].x, projectedList[projectedList.length - i].y );
      }
      if (i < projectedList.length - this.segment) {
        line( projectedList[i].x, projectedList[i].y, projectedList[i + this.segment].x, projectedList[i + this.segment].y );
      }
      line( projectedList[i].x, projectedList[i].y, projectedList[i + 1].x, projectedList[i + 1].y );
      // Index printing
      // text(i,projectedList[i].x,projectedList[i].y);
    }
  }
}

/**
 * Simple cylinder class
 */
class Cylinder extends Item {
  /**
   *
   * @param {Vect} center of the cylinder
   * @param {int} r radius of the cylinder
   * @param {int} segment number of segments in the rings
   * @param {int} height of the cylinder
   * @param {*} hSegment number of rings
   * @param {*} color of the cylinder
   */
  constructor(center, r, segment, height, hSegment, color, strokeW) {
    super(center, r, color);
    this.height = height;
    this.segment = segment;
    this.hSegment = hSegment;
    this.strokeW = strokeW;
    this.cylinderInit();
  }
  /**
   * Create a circle of radius this.r and offset it on the idk axis
   * @param {int} offset of the circle compared to the cylinder center
   */
  circleInit(offset) {
    let angle = (Math.PI * 2) / this.segment;
    for (let i = 0; i < this.segment; i++) {
      let tempPoint = new Vect(
        Math.cos(angle * i) * this.r + this.center.x,
        this.center.y + offset,
        Math.sin(angle * i) * this.r + this.center.z
      );
      this.vectList.push(tempPoint);
    }
  }
  /**
   * Initialise the point of the cylinder
   */
  cylinderInit() {
    for (
      let i = -this.height;
      i <= this.height;
      i += (this.height / this.hSegment) * 2
    ) {
      this.circleInit(i);
    }
  }
  /**
   * Draw the cylinder
   */
  draw() {
    strokeWeight(this.strokeW);
    stroke(this.color);
    let projectedList = [];
    this.vectList.forEach((e) => projectedList.push(e.projectPoint(d, fov)));
    for (let i = 0; i < projectedList.length - 1; i++) {
      if (i == 0) {
        line( projectedList[i].x, projectedList[i].y, projectedList[i + this.segment - 1].x, projectedList[i + this.segment - 1].y );
      }
      if ((i + 1) % this.segment == 0) {
        line( projectedList[i + 1].x, projectedList[i + 1].y, projectedList[i + this.segment].x, projectedList[i + this.segment].y );
      } else {
        line( projectedList[i].x, projectedList[i].y, projectedList[i + 1].x, projectedList[i + 1].y );
      }
      if (i < projectedList.length - this.segment) {
        line( projectedList[i].x, projectedList[i].y, projectedList[i + this.segment].x, projectedList[i + this.segment].y );
      }
      // Index printing
      // text(i,projectedList[i].x,projectedList[i].y);
    }
  }
}

/**
 * Simple cone class
 */
class Cone extends Item {
  /**
   *
   * @param {Vect} center of the cone
   * @param {int} r radius of the base of the cone
   * @param {int} segment number of segments in the rings
   * @param {int} height of the cone
   * @param {int} hSegment number of rings
   * @param {*} color of the cone
   */
  constructor(center, r, segment, height, hSegment, color, strokeW) {
    super(center, r, color);
    this.height = height;
    this.segment = segment;
    this.hSegment = hSegment;
    this.strokeW = strokeW;
    this.coneInit();
  }
  /**
   * Create a circle of radius tempR and offset it on the idk axis
   * @param {int} offset of the circle compared to the cone center
   * @param {int} tempR radius of the circle to generate
   */
  circleInit(tempR, offset) {
    let angle = (Math.PI * 2) / this.segment;
    for (let i = 0; i < this.segment; i++) {
      let tempPoint = new Vect(
        Math.cos(angle * i) * tempR + this.center.x,
        this.center.y + offset,
        Math.sin(angle * i) * tempR + this.center.z
      );
      this.vectList.push(tempPoint);
    }
  }
  /**
   * Initialise the point of the cone
   */
  coneInit() {
    let tempR = 0;
    let reduceFactor = this.r / this.hSegment;
    for (
      let i = -this.height;
      i <= this.height;
      i += (this.height / this.hSegment) * 2
    ) {
      this.circleInit(tempR, i);
      tempR += reduceFactor;
    }
  }
   /**
   * Draw the cone
   */
  draw() {
    strokeWeight(this.strokeW);
    stroke(this.color);
    let projectedList = [];
    this.vectList.forEach((e) => projectedList.push(e.projectPoint(d, fov)));
    for (let i = 0; i < projectedList.length - 1; i++) {
      if (i == 0) {
        line( projectedList[i].x, projectedList[i].y, projectedList[i + this.segment - 1].x, projectedList[i + this.segment - 1].y );
      }
      if ((i + 1) % this.segment == 0) {
        line( projectedList[i + 1].x, projectedList[i + 1].y, projectedList[i + this.segment].x, projectedList[i + this.segment].y );
      } else {
        line( projectedList[i].x, projectedList[i].y, projectedList[i + 1].x, projectedList[i + 1].y );
      }
      if (i < projectedList.length - this.segment) {
        line( projectedList[i].x, projectedList[i].y, projectedList[i + this.segment].x, projectedList[i + this.segment].y );
      }
      // Index printing
      // text(i,projectedList[i].x,projectedList[i].y);
    }
  }
}

let WIDTH = 3600;
let HEIGHT = 3600;

let d = 2;
let fov = 100;
// let fov = 100;

let fillColor;
let newColor;
let shiftamt = 0.01;



// let mySphere = new Sphere(new Vect(0, 0, 1), 0.9998, 50, "red",2.5);
// let mySphere = new Sphere(new Vect(0, 2, 10), 2, 20, "red",2.5);
// let myCylinder = new Cylinder(new Vect(0,0,10), 7, 20, 7, 20, "red",3);
// let myCone = new Cone(new Vect(0,0,11), 7, 40, 7, 20,"green",3);

let p5Canvas;

let record = false;
let nbrOfFrames = 240;
let elapsedFrames = 0;

function setup() {
  p5Canvas = createCanvas(WIDTH, HEIGHT);
  background(25);
  fill("red");
  stroke("purple"); // Change the color
  strokeWeight(2);

  fillColor = color(255, 204, 0);
  newColor = color(random(255), random(255), random(255));
  // idk why i need this
  colorMode(RGB);

  // color shift start at 0
  amt = 0;
  frameRate(24)
}

tempDuration = moment();


let counter = 5;

let startCube = {x:0,y:0,z:15,r:4,c:"red"}

let cubeList = [startCube]
let finalList = []

let center = new Vect(0,0,15);

function draw() {
  background(25)

  const startDate = moment();

  let tempList = [];
  

  if(counter >= 1){

    cubeList.forEach(e=> {
      let rP = 2*e.r / 3;
      if(e.c == "red"){
        tempList.push({x:e.x+rP,y:e.y+rP,z:e.z,r:rP/2,c:"red"});
        tempList.push({x:e.x-rP,y:e.y+rP,z:e.z,r:rP/2,c:"red"});
        tempList.push({x:e.x,y:e.y+rP,z:e.z,r:rP/2,c:"red"});
        tempList.push({x:e.x+rP,y:e.y,z:e.z,r:rP/2,c:"red"});
        tempList.push({x:e.x+rP,y:e.y-rP,z:e.z,r:rP/2,c:"red"});
        tempList.push({x:e.x,y:e.y-rP,z:e.z,r:rP/2,c:"red"});
        tempList.push({x:e.x-rP,y:e.y-rP,z:e.z,r:rP/2,c:"red"});
        tempList.push({x:e.x-rP,y:e.y,z:e.z,r:rP/2,c:"red"});

        tempList.push({x:e.x,y:e.y,z:e.z,r:rP/2,c:"blue"});

      } else {
        tempList.push({x:e.x,y:e.y,z:e.z,r:e.r,c:"blue"});
      }
    });
    counter --;
    cubeList = tempList;
  }

  if(counter == 0){
    cubeList.forEach(e => {
      let temp = new Cube(new Vect(e.x,e.y,e.z),e.r,e.c,2,false);
      if(e.c=="blue" && e.r > 1) temp.scaleItem(new Vect(1,1,1/3*e.r),new Vect(e.x,e.y,e.z))
      finalList.push(temp);
      temp.draw();

    });
    counter --;
  }
  if(counter < 0){

    finalList.forEach(e => {
      // e.rotateItem( new Vect(0.001, 0.001, 0.001), center);
      e.draw();
    });
  }

  // Reset the screen

  // myCube.draw();
  // myCylinder.draw();
  // mySphere.draw();
  // myCone.draw();

  // myCube.translateItem(new Vect(0.001,0.001,0.001), myCube.center);
  // mySphere.translateItem(new Vect(0.001,0.001,0.001), mySphere.center);
  // myCylinder.translateItem(new Vect(0.001,0.001,0.001), myCylinder.center);
  // myCone.translateItem(new Vect(0.001,0.001,0.001), myCone.center);

  
  // myCube.scaleItem(new Vect(0.999,0.999,0.999), myCube.center);
  // mySphere.scaleItem(new Vect(0.9995,0.9995,0.9995), mySphere.center);
  // myCylinder.scaleItem(new Vect(0.999,0.999,0.999), myCylinder.center);
  // myCone.scaleItem(new Vect(0.999,0.999,0.999), myCone.center);


  // myCube.rotateItem( new Vect(0.005, 0.005, 0.005), myCube.center );
  // mySphere.rotateItem( new Vect(0.006, 0.006, 0.00), mySphere.center );
  // myCylinder.rotateItem( new Vect(-0.005, -0.005, -0.005), myCylinder.center );
  // myCone.rotateItem( new Vect(0.005, 0.005, 0.005), myCone.center );

  
  tempColor = lerpColor(fillColor, newColor, amt);
  amt += shiftamt;
  if (amt >= 1) {
    amt = 0.0;
    fillColor = newColor;
    newColor = color(random(255), random(255), random(255));
  }
  // mySphere.color = tempColor;

  elapsedDuration = moment.duration(moment().diff(startDate));
  // console.log(elapsedDuration.asMilliseconds());

  if( record && elapsedFrames <= nbrOfFrames ){
    let name = 'test' + elapsedFrames.toString;
    saveCanvas(p5Canvas, 'test' + elapsedFrames);
    elapsedFrames += 1;
  }

}