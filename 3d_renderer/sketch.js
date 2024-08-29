const screenObject = {
  // window width and height
  width: 900,
  height: 900,
  // plan of projection z=d
  d: 2,
  // field of view
  fov: 92,
};

function drawVect(vect, screenObject, color) {
  if (!color) color = "yellow";
  let temp = vect.projectPoint(screenObject);
  stroke(color);
  point(temp.x, temp.y);
}

function drawSquare(square, screenObject, color) {
  if (!color) color = "yellow";
  square.vectList.forEach((vect) => {
    let temp = vect.projectPoint(screenObject);
    stroke(color);
    point(temp.x, temp.y);
  });
}

function drawItem(item, loopify, screenObject, color){
  if (!color) color = "yellow";

  // Pour chaque liste de vect
  for(let i=0; i<item.vectList.length; i++){
    // pour chaque liste de lien associé
    item.linkList[i].forEach((link) =>{
      // On chope les coordonnées des deux points lié
      let startPoint = item.vectList[i][link[0]].projectPoint(screenObject);
      let endPoint = item.vectList[i][link[1]].projectPoint(screenObject);
      stroke(color);
      // On dessine la ligne entre les deux points
      line(
        startPoint.x,
        startPoint.y,
        endPoint.x,
        endPoint.y
      );
    });
  }

  if(loopify){
    // pout chaque list de vect
    for(let i=0; i<item.vectList.length-1; i++){
      // Pour chaque vect de la list
      for(let j=0; j<item.vectList[0].length; j++){

        let startPoint = item.vectList[i][j].projectPoint(screenObject);
        let endPoint = item.vectList[i+1][j].projectPoint(screenObject);
        stroke(color);
        // On dessine la ligne entre les deux points
        line(
          startPoint.x,
          startPoint.y,
          endPoint.x,
          endPoint.y
        );  
      }
    }
  }
}

function setup() {
  createCanvas(screenObject.width, screenObject.height);
  background(25);
  frameRate(24);

  strokeWeight(5);
}

let tempVect = new Vect(0, 0, 5);
let item = new Item(tempVect, 1);

let tempCube = new Cube(tempVect, 1, item);

item = tempCube;

item.rotateItem(new Vect(90*(Math.PI/180),0,0), item.center, true);

function draw() {
  background(25);
  item.rotateItem(new Vect(0.01,0.01,0.01), item.center, true);
  drawItem(item, true, screenObject, "yellow");

}
