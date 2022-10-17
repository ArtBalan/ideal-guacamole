let nbr_Point = 100*130;
let nbr_Node = 20;


let step = 0;

let screenObject = {
  width : 255,
  height : 255
};

class Point { 
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
  }
}


class Node{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
    this.pointList = [];
  }
}

function setup(){

  // point list initialisation
  pointList = [];
  for(let i=0; i<nbr_Point; i++){
    let x = Math.random()*screenObject.width;
    let y = Math.random()*screenObject.height;
    let z = Math.random()*screenObject.width;
    let tempPoint = new Point(x,y,z);
    pointList.push(tempPoint);
  }

  // node list initialisation
  nodeList = [];
  for(let i=0; i<nbr_Node; i++){
    let x = Math.random()*screenObject.width;
    let y = Math.random()*screenObject.height;
    let z = Math.random()*screenObject.width;
    let tempNode = new Node(x,y,z);
    nodeList.push(tempNode);
  }

  // frameRate(2);
  createCanvas(screenObject.width,screenObject.height);
}

function draw(){

  background(255);
  // Cleaning link
  nodeList.forEach(node => node.pointList = [] ); 

  // Assigns point to nearest node
  for(let i=0; i<pointList.length; i++){
    let minDist = screenObject.width * screenObject.height;
    let minDistNodeIndex = 0;
    for(let j=0; j<nodeList.length; j++){
      let tempDist = caldist(pointList[i],nodeList[j]);
      if(minDist > tempDist){
        minDist = tempDist;
        minDistNodeIndex = j;
      }
    }
    nodeList[minDistNodeIndex].pointList.push(i)
  }

  let stop = true;
  nodeList.forEach(node =>{
    let tempX = 0;
    let tempY = 0;
    let tempZ = 0;
    node.pointList.forEach(e => {
      tempX += pointList[e].x;
      tempY += pointList[e].y;
      tempZ += pointList[e].z;
    });
    if(node.pointList.length > 0){
      tempX /= node.pointList.length;
      tempY /= node.pointList.length;
      tempZ /= node.pointList.length;
      let tempPoint = new Point(tempX,tempY,tempZ);
      if(caldist(tempPoint,node)>1){
        stop = false;
      }
      node.x = tempX;
      node.y = tempY;
      node.z = tempZ;
    }
  });

  // Draw points
  pointList.forEach(e => {
    strokeWeight(5);
    stroke(e.z/2, 0, 0);
    point(e.x,e.y);
  });
  // Draw nodes
  nodeList.forEach(e =>{
    strokeWeight(5);
    stroke("blue");
    point(e.x,e.y);
    e.pointList.forEach(f =>{
      strokeWeight(1);
      stroke("green");
      line(e.x,e.y,pointList[f].x,pointList[f].y);
    })
  });

  step ++;

  if(stop){
    console.log("stopped, nbr of steps : " + step);
    noLoop();
  }
}

function caldist(a, b) {
  // pythagore goes brrr
  return (b.x - a.x) ** 2 + (b.y - a.y) ** 2 + (b.z - a.z) ** 2;
}