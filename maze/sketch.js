let screenObject = {
  width: 900,
  height: 900,
  cellX: 10 * 3,
  cellY: 10 * 3
}

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

let elements = [];

class Paterne{
  constructor(list){
    this.list = list;
    this.neighboorList = [[],[],[],[]];
  }
}

class Cell{
  picked;
  constructor(x,y,paterneList){
    this.x = x;
    this.y = y;
    this.paterneList = paterneList;
    this.isPicked = false;
  }

  pickCell(index){
    this.paterneList = paterneList[index];
    this.isPicked = true;
  }

  getEntropy(){
    return neighboorList[0].length + neighboorList[1].length + neighboorList[2].length + neighboorList[3].length; 
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let paterneList = [];
let cellList = [];

function setup() {
  // cell paterne initialisation
  for(let i=1; i<16; i++){
    let bin = dec2bin(i).split("").reverse();
    let temp = [ 0, bin[0], 0, bin[1], 1, bin[2], 0, bin[3], 0];
    let tempCorrected = [];
    temp.forEach(e => tempCorrected.push( ( (e)? parseInt(e) : 0)) );    
    tempCell = new Paterne(tempCorrected);
    paterneList.push(tempCell);
  }

  // neighboor initialisation
  for(let src=0; src<paterneList.length; src++){
    for(let dst=0; dst<paterneList.length; dst++){
      //top neighboor
      if(paterneList[src].list[1] == 1){
        if(paterneList[dst].list[7] == 1) paterneList[src].neighboorList[0].push(dst);
      }
      // left neighboor
      if(paterneList[src].list[3] == 1){
        if(paterneList[dst].list[5] == 1) paterneList[src].neighboorList[1].push(dst);
      }
      // right neighboor
      if(paterneList[src].list[5] == 1){
        if(paterneList[dst].list[3] == 1) paterneList[src].neighboorList[2].push(dst);
      }
      // bottom neighboor
      if(paterneList[src].list[7] == 1){
        if(paterneList[dst].list[1] == 1) paterneList[src].neighboorList[3].push(dst);
      }
    }
  }

  // table initialisation
  for(let i=0; i<screenObject.cellX; i+=3){
    for(let j=0; j<screenObject.cellY; j+=3){
      let tempCell = new Cell(i,j,paterneList);
      cellList.push(tempCell);
    }
  }

  createCanvas(screenObject.width,screenObject.height);
  background(0);

  let startCellIndex = getRandomInt(cellList.length);
  let startCellPaterneIndex = getRandomInt(cellList[startCellIndex].paterneList.length);

  cellList[startCellIndex].pickCell(14);

  let topNeighboorIndex = startCellIndex -  1 ; 
  let bottomNeighboorIndex = startCellIndex +  1 ; 
  let rightNeighboorIndex = startCellIndex + screenObject.cellY/3;
  let leftNeighboorIndex = startCellIndex - screenObject.cellY/3;

  cleanNeighboor(cellList[startCellIndex], cellList[topNeighboorIndex], 0);
  cleanNeighboor(cellList[startCellIndex], cellList[bottomNeighboorIndex], 2);
  cleanNeighboor(cellList[startCellIndex], cellList[rightNeighboorIndex], 3);
  cleanNeighboor(cellList[startCellIndex], cellList[leftNeighboorIndex], 1);

  let newCellIndex = getRandomInt(cellList[topNeighboorIndex].paterneList.length);
  cellList[topNeighboorIndex].pickCell(cellList[topNeighboorIndex].paterneList[newCellIndex]);

  newCellIndex = getRandomInt(cellList[bottomNeighboorIndex].paterneList.length);
  cellList[bottomNeighboorIndex].pickCell(cellList[bottomNeighboorIndex].paterneList[newCellIndex]);

  newCellIndex = getRandomInt(cellList[rightNeighboorIndex].paterneList.length);
  cellList[rightNeighboorIndex].pickCell(cellList[rightNeighboorIndex].paterneList[newCellIndex]);

  newCellIndex = getRandomInt(cellList[leftNeighboorIndex].paterneList.length);
  cellList[leftNeighboorIndex].pickCell(cellList[leftNeighboorIndex].paterneList[newCellIndex]);


  drawCell(cellList[startCellIndex],screenObject);
  drawCell(cellList[topNeighboorIndex],screenObject);
  drawCell(cellList[bottomNeighboorIndex],screenObject);
  drawCell(cellList[leftNeighboorIndex],screenObject);
  drawCell(cellList[rightNeighboorIndex],screenObject);

}

function draw() {

}


function cleanNeighboor(cellSrc, cellDst, direction){
  
  if(cellSrc.isPicked && !cellDst.isPicked){
  
  
      let autorisedNeighboor = cellSrc.paterneList.neighboorList[direction];
      var tempNewNeighbootList = [];
  
      for(let i=0; i< autorisedNeighboor.length; i++)
      autorisedNeighboor.forEach( e=> {
        for(let f=0; f<cellDst.paterneList.length; f++){
          if( e == f){
            if(tempNewNeighbootList.indexOf(e) == -1) tempNewNeighbootList.push(e);
          }
        }
      });
    };
    cellDst.paterneList = tempNewNeighbootList;
}


// CAN ONLY DRAWN CELL WITH PICKED PATERNE
function drawCell(cell, screenObject){

  let i=0;
  let j=0;
  let x = cell.x;
  let y = cell.y;
  // x *= 3;
  // y *= 3;

  let xRatio = width/screenObject.cellX;
  let yRatio = height/screenObject.cellY;

  cell.paterneList.list.forEach(e => {
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
  });
}