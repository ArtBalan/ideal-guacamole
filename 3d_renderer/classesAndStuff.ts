class Vect {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /********************/
  /* POINT PROJECTION */
  /********************/
  
  /**
   * Project the point onto the screen
   * Does not draw it but calculate its projected x and y coordinate
   */
  projectPoint(screenObject: any) {
    let xProjected = (screenObject.d * this.x) / this.z;
    // to pixel convetion
    xProjected *=
      screenObject.height /
      ((Math.sin(screenObject.fov) * screenObject.d) /
        Math.sin(90 - screenObject.fov));
    // setting to the propper origin
    xProjected += screenObject.height / 2;
    // unit projection onto the plane z=d
    let yProjected = (screenObject.d * this.y) / this.z;
    // to pixel convetion
    yProjected *=
      screenObject.width /
      ((Math.sin(screenObject.fov) * screenObject.d) /
        Math.sin(90 - screenObject.fov));
    // setting to the propper origin
    yProjected += screenObject.width / 2;

    return new Vect(xProjected, yProjected, 1);
  }

  /************************/
  /* POINT TRANSFORMATION */
  /************************/

  /**
   * Translate the point with the given vector
   * @param {Vect} vect
   */
  translatePoint(vect: Vect) {
    this.x += vect.x;
    this.y += vect.y;
    this.z += vect.z;
  }

    /**
   * Scale the point with the given vector and origin
   * @param {Vect} factor vector containig the 3 axis scalling factor
   * @param {Vect} origin
   */
     scalePoint(factor :Vect, origin: Vect) {
      this.x = (this.x - origin.x) * factor.x + origin.x;
      this.y = (this.y - origin.y) * factor.y + origin.y;
      this.z = (this.z - origin.z) * factor.z + origin.z;
    }

      /**
   * Rotate a point around a given origin and angle
   * @param {int} a first orgin coordinate ex: origin.x
   * @param {int} b second origin coordinate ex:origin.y
   * @param {int} c first point coordinate ex: point.x
   * @param {int} d second point coordinate ex: point.y
   * @param {int} angle of rotation
   */
  planarRotate(a:number, b:number, c:number, d:number, angle:number) {
    let out = [];
    out.push(Math.cos(angle) * (c - a) - Math.sin(angle) * (d - b) + a);
    out.push(Math.sin(angle) * (c - a) + Math.cos(angle) * (d - b) + b);
    return out;
  }

    /**
   * Rotate a point around a given origin and angles
   * @param {Vect} factor vector containing the 3 angles of rotation
   * @param {Vect} origin origin of rotation
   */
     rotatePoint(factor:Vect, origin:Vect) {
      // planar rotate on x
      let rx = this.planarRotate(origin.y, origin.z, this.y, this.z, factor.x);
      this.y = rx[0];
      this.z = rx[1];
      //planar rotate on y
      let ry = this.planarRotate(origin.x, origin.z, this.x, this.z, factor.y);
      this.x = ry[0];
      this.z = ry[1];
      // planar rotate on z
      let rz = this.planarRotate(origin.x, origin.y, this.x, this.y, factor.z);
      this.x = rz[0];
      this.y = rz[1];
    }
}

class Item{
  center: Vect;
  vectList: Vect[][];
  linkList: number[][][];
  radius : number;

  constructor( center: Vect, radius: number){
    this.center = center;
    this.vectList = [];
    this.linkList = [];
    this.radius = radius;
  }

  /***********************/
  /* ITEM TRANSFORMATION */
  /***********************/

  /**
   * Translate the item with the given vector
   * @param factor vector containing the 3 axis of translation
   * @param {Boolean} tcenter if we translate the center too
   */
  translateItem(factor: Vect, tcenter: boolean){
    this.vectList.forEach((vectList) => {
      vectList.forEach((vect) => {
        vect.translatePoint(factor);
      });
    });
    if(!tcenter) this.center.translatePoint(factor);
  }

  /**
   * Scale the item with the given vector and origin
   * @param {Vect} factor vector containig the 3 axis of scalling
   * @param {*} origin
   * @param {Boolean} scenter if we scale the center too
   * 
   */
   scaleItem(factor :Vect, origin: Vect, scenter: boolean | void) {
    this.vectList.forEach((vectList) => {
      vectList.forEach((vect) => {
        vect.scalePoint(factor,origin);
      });
    });
    if(!scenter) this.center.scalePoint(factor, origin);
  }

  /**
   * Rotate the item around a given origin and angles
   * @param {Vect} factor vector containing the 3 angles of rotation
   * @param {Vect} origin origin of rotation
   * @param {Boolean} rcenter if we rotate the center too
   */
   rotateItem(factor :Vect, origin :Vect, rcenter: boolean) {
    this.vectList.forEach((vectList) => {
      vectList.forEach((vect) => {
        vect.rotatePoint(factor,origin);
      });
    });
    if(!rcenter) this.center.rotatePoint(factor, origin);
  }

  centerised(){
    let sumX = 0;
    let sumY = 0;
    let sumZ = 0;
    let sumVect = 0;
    this.vectList.forEach(e=> {
      e.forEach(vect => {
        sumX += vect.x ;
        sumY += vect.y ;
        sumZ += vect.z ;
        sumVect ++;
      });
    });

    this.center.x = sumX / sumVect;
    this.center.y = sumY / sumVect;
    this.center.z = sumZ / sumVect;
  }
}

class Square extends Item{

  constructor( center: Vect, radius: number, item :Item){
    // need it to be a Item object to have acces to transforms operations
    super(center,radius);

    // Points initialisation
    let tempVectList: Vect[] = []; 
    
    tempVectList.push( new Vect(
      center.x + radius/2,
      center.y + radius/2,
      center.z));

      tempVectList.push( new Vect(
        center.x - radius/2,
        center.y + radius/2,
        center.z));

      tempVectList.push( new Vect(
          center.x - radius/2,
          center.y - radius/2,
          center.z));
    tempVectList.push( new Vect(
      center.x + radius/2,
      center.y - radius/2,
      center.z));

    
    item.vectList.push(tempVectList);
    
    let tempLinkList: number[][]= [[0,1],[1,2],[2,3],[3,0]];
    item.linkList.push(tempLinkList);
  }
}


class Circle extends Item{
  constructor( center: Vect, radius: number, segment: number, item :Item){
    // need it to be a Item object to have acces to transforms operations
    super(center,radius);

    let tempVectList: Vect[] = []


    let angle = (Math.PI * 2) / segment;
    let tempR = radius;
    for (let i = 0; i < segment; i++) {
      let tempPoint = new Vect(
        Math.cos(angle * i) * tempR + this.center.x,
        Math.sin(angle * i) * tempR + this.center.y,
        this.center.z,
      );
      tempVectList.push(tempPoint);
    }

    item.vectList.push(tempVectList);

    let tempLinkList: number[][] = [];

    for(let i=0; i<segment; i++){
      let tempList: number[] = [];
      if(i != segment-1){
        tempLinkList.push([i,i+1]);
      }
      else{
        tempLinkList.push([i,0]);
      }
    }
    item.linkList.push(tempLinkList);
  }
}

class Cube extends Item{
  constructor( center: Vect, radius: number, item :Item){
  
    // need it to be a Item object to have acces to transforms operations
    super(center,radius);
  
    let firstSquare = new Circle(center, radius,40, item);
    firstSquare.translateItem(new Vect(0,0,radius*1.5),false);
  
    let endSquare = new Circle(center, radius,40, item);
    endSquare.translateItem(new Vect(0,0,-radius*1.5),false);

    item.centerised();
  }
}