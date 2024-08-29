function setup() {
  w = window.innerWidth;
  h = window.innerHeight;  

  createCanvas(w, h-4,WEBGL);

}

let cSize = 50;
let degToRad = Math.PI/180;

function draw() {
  background(220);
  
  let nbrOfCubePerCircle = 4;

  for(let iter=4;iter<8;iter++){
    angleStep = 360/nbrOfCubePerCircle;
    for(let angle=0;angle<360;angle+=angleStep){
      push();
      translate(
        4*iter*Math.cos(angle*degToRad)*nbrOfCubePerCircle,
        4*iter*Math.sin(angle*degToRad)*nbrOfCubePerCircle,
        0
        );
      rotateZ((360-(90+angle))*degToRad);
      box(cSize);
      pop();
    }
    nbrOfCubePerCircle += nbrOfCubePerCircle/2;
  }
}