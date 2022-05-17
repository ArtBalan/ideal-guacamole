
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
  constructor( x, y, z ){}
  /**
   * Project the point onto the screen
   * Does not draw it but calculate its projected x and y coordinate
   * @param {int} d projection of the point on the plane z=d
   * @param {int} fov field of view the camera
   */
  projectPoint( d, fov){}
  /**
   * Translate the point with the given vector
   * @param {Vect} vect 
   */
  translatePoint( vect ){}
  /**
   * Scale the point with the given vector and origin
   * @param {Vect} f vector containig the 3 axis scalling factor 
   * @param {Vect} origin 
   */
  scalePoint( f, origin){}
  /**
   * Rotate a point around a given origin and angle
   * @param {int} a first orgin coordinate ex: origin.x
   * @param {int} b second origin coordinate ex:origin.y
   * @param {int} c first point coordinate ex: point.x
   * @param {int} d second point coordinate ex: point.y
   * @param {int} angle of rotation
   */
  planarRotate( a, b, c, d, angle ){}
  /**
   * Rotate a point around a given origin and angles
   * @param {Vect} f vector containing the 3 angles of rotation
   * @param {Vect} origin origin of rotation
   */
  rotatePoint( f, origin ){}
}

/**
 * Simple item class
 */
class Item{
  /**
   * 
   * @param {Vect} center of the item
   * @param {int} r radius of the item
   * @param {string} color color of the item
   */
  constructor( center, r, color ){}
  /**
   * Translate the item with the given vector
   * @param {Vect} f 
   */
  translateItem( f ){}
  /**
   * Scale the item with the given vector and origin
   * @param {Vect} f vector containig the 3 axis calling factor 
   * @param {*} origin 
   */
  scaleItem( f, origin ){}
  /**
   * Rotate the item around a given origin and angles
   * @param {Vect} f vector containing the 3 angles of rotation
   * @param {Vect} origin origin of rotation
   */
  rotateItem( f, origin){}
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
  constructor( center, r, color, diag ){}
  /**
   * Initialise the point of the cube
   */
  cubeInit(){}
  /**
   * Draw the cube
   */
  draw(){}
}

/**
 * Simple sphere class 
 */
class Sphere extends Item{
  /**
   * 
   * @param {Vect} center of the sphere
   * @param {int} r radius of the sphere
   * @param {int} segment number of rings
   * @param {string} color of the sphere
   */
  constructor( center, r, segment, color){}
  /**
   * Create a circle of radius this.r 
   */
  circleInit(){}
  /**
   * Initialise the point of the sphere
   */
  sphereInit(){}
  /**
   * Draw the sphere
   */
   draw(){}
}

/**
 * Simple cylinder class 
 */
class Cylinder extends Item{
  /**
   * 
   * @param {Vect} center of the cylinder
   * @param {int} r radius of the cylinder
   * @param {int} segment number of segments in the rings
   * @param {int} height of the cylinder
   * @param {*} hSegment number of rings
   * @param {*} color of the cylinder
   */
  constructor( center, r, segment, height, hSegment, color){}
  /**
   * Create a circle of radius this.r and offset it on the idk axis 
   * @param {int} offset of the circle compared to the cylinder center
   */
  circleInit(offset){}
  /**
  * Initialise the point of the cylinder
  */
   cylinderInit(){}
  /**
  * Draw the cylinder
  */
draw(){}

}

/**
 * Simple cone class 
 */
class Cone extends Item{
  /**
   * 
   * @param {Vect} center of the cone
   * @param {int} r radius of the base of the cone
   * @param {int} segment number of segments in the rings
   * @param {int} height of the cone 
   * @param {int} hSegment number of rings 
   * @param {*} color of the cone
   */
  constructor( center, r, segment, height, hSegment, color){}
    /**
   * Create a circle of radius tempR and offset it on the idk axis 
   * @param {int} offset of the circle compared to the cone center
   * @param {int} tempR radius of the circle to generate
   */
  circleInit(tempR, offset){} 
  /**
  * Initialise the point of the cone
  */
  coneInit(){}
  /**
  * Draw the cone
  */
  draw(){}
}