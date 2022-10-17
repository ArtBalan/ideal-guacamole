
function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const tiles = [];
const grid = [];

const DIM = 3;

let screenObject = {
  width: 600,
  height: 600,
  cellX: DIM * 3,
  cellY: DIM *3 
}


function setup(){

  // cell partern initialisation
  for(let i=1; i<16; i++){
    let bin = dec2bin(i).split("").reverse();
    let temp = [ 0, bin[0], 0, bin[1], 1, bin[2], 0, bin[3], 0];
    let tempCorrected = [];
    temp.forEach(e => tempCorrected.push( ( (e)? parseInt(e) : 0)) );    
    tiles.push(tempCorrected);
  }

  for (let i=0; i<DIM*DIM; i++){
    grid[i] = {
      collapsed : false,
      options : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    }
  }

  drawCell(1,1,tiles[0],screenObject);
  // // neighboor initialisation
  // for(let src=0; src<paterneList.length; src++){
  //   for(let dst=0; dst<paterneList.length; dst++){
  //     //top neighboor
  //     if(paterneList[src].list[1] == 1){
  //       if(paterneList[dst].list[7] == 1) paterneList[src].neighboorList[0].push(dst);
  //     }
  //     // left neighboor
  //     if(paterneList[src].list[3] == 1){
  //       if(paterneList[dst].list[5] == 1) paterneList[src].neighboorList[1].push(dst);
  //     }
  //     // bottom neighboor
  //     if(paterneList[src].list[7] == 1){
  //       if(paterneList[dst].list[1] == 1) paterneList[src].neighboorList[2].push(dst);
  //     }
  //     // right neighboor
  //     if(paterneList[src].list[5] == 1){
  //       if(paterneList[dst].list[3] == 1) paterneList[src].neighboorList[3].push(dst);
  //     }
  //   }
  // }

  createCanvas(screenObject.width,screenObject.height);
  background(0);

}

function draw(){

  // Pick cell with least entropy
  const gridCopy = grid.slice();
  gridCopy.sort((a,b) => { return a.options.length - b.options.length});

  // Create array with the cell having the least entropy
  let len =  gridCopy[0].options.length; 
  let stopIndex = 0;
  for(let i=0; i<gridCopy.length; i++){
    if(gridCopy[i].options.length > len){
      stopIndex = i;
      break;
    }
  }
  if(stopIndex > 0) gridCopy.splice(stopIndex);
  // collapse the cell
  const cell = random(gridCopy);
  cell.collapsed = true;
  const pick = random(cell.options);
  cell.options = [pick];

  for(let j=0; j<DIM; j++){
    for(let i=0; i<DIM; i++){
      let cell = grid[i + j*DIM];
      if(cell.collapsed){
        let index = cell.options[0];
        drawCell(i,j,tiles[index],screenObject);
      }
    }
  }

  const nextTiles = [];
  for(let j=0; j<DIM; j++){
    for (let i = 0; i < DIM; i++) {
      let index = i + j*DIM;
      if(tile[index].collapsed){
        nextTiles[index] = tiles[index];
      } else {
        let options = [];
        // LOOK UP
        // LOOK RIGHT
        // LOOK DOWN
        // LOOK LEFT
      }      
    }
  }

  noLoop();
}


function drawCell(x,y,tile,screenObject){
  let i=0;
  let j=0;
  let xRatio = width/screenObject.cellX;
  let yRatio = height/screenObject.cellY;
  x *= 3;
  y *= 3;

  tile.forEach(e => {
    console.log(e);
    if(e == 1){
      fill("white");
      stroke("black");
      rect(x*xRatio + i*xRatio, y*yRatio + j*yRatio, xRatio,yRatio);
    } else {
      fill("black");
      stroke("white");
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