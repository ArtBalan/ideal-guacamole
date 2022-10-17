let nbr_Point = 15000;
let nbr_Node = 5;


let step = 0;

let screenObject = {
  width : 700,
  height : 700
};

class Point { 
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}


class Node{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.pointList = [];
  }
}

function setup(){

  // point list initialisation
  pointList = [];
  for(let i=0; i<nbr_Point; i++){
    let x = Math.random()*screenObject.width;
    let y = Math.random()*screenObject.height;
    let tempPoint = new Point(x,y);
    pointList.push(tempPoint);
  }

  // node list initialisation
  nodeList = [];
  for(let i=0; i<nbr_Node; i++){
    let x = Math.random()*screenObject.width;
    let y = Math.random()*screenObject.height;
    let tempNode = new Node(x,y);
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
    node.pointList.forEach(e => {
      tempX += pointList[e].x;
      tempY += pointList[e].y;
    });
    tempX /= node.pointList.length;
    tempY /= node.pointList.length;
    let tempPoint = new Point(tempX,tempY);
    if(caldist(tempPoint,node)>1){
      stop = false;
    }
    node.x = tempX;
    node.y = tempY;
  });

  // Draw points
  pointList.forEach(e => {
    strokeWeight(5);
    stroke("red");
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
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
}