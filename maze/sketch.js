let screenObject = {
  width: 900,
  height: 900,
  cellX: 50,
  cellY: 50
}

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

let elements = [];

class Cell{
  constructor(paterne){
    this.paterne = paterne;
    this.neighboorList = [];
  }
}

let cellList = [];

function setup() {
  for(let i=1; i<16; i++){
    let bin = dec2bin(i).split("").reverse();
    let temp = [ 0, bin[0], 0, bin[1], 1, bin[2], 0, bin[3], 0];
    let tempCorrected = [];
    temp.forEach(e => tempCorrected.push( ( (e)? parseInt(e) : 0)) );    
    tempCell = new Cell(tempCorrected);
    cellList.push(tempCell);
  }

  for(let src=0; src<cellList.length; src++){
    for(let dst=0; dst<cellList.length; dst++){
      // Neighboor calculation
      // Array shifting or 4 if with nested if 


    }
  }

  createCanvas(screenObject.width,screenObject.height);
  background(0);

  let x = 0;
  let y = 0;
  console.log(elements.length)

  cellList.forEach(cell=>{
    drawElement(cell,x,y,screenObject);
    if( x+3 > screenObject.cellX/3){
      x = 0;
      y += 2;
    } 
    else x += 2
  })

}

function draw() {

}


function drawElement(cell, x, y,screenObject){
  let i=0;
  let j=0;
  x *= 3;
  y *= 3;

  let xRatio = width/screenObject.cellX;
  let yRatio = height/screenObject.cellY;

  cell.paterne.forEach(e => {
    if(e == 1){
      fill("white")
      stroke("black")
      rect(x*xRatio + i*xRatio, y*yRatio + j*yRatio, xRatio,yRatio);
    } else {
      fill("black")
      stroke("white")
      rect(x*xRatio + i*xRatio, y*yRatio + j*yRatio, xRatio,yRatio);
    }
    if(i==2){
      i = 0;
      j += 1;
    } else {
      i += 1;
    }
  })
}