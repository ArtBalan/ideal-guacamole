
let screenObject = {
  width: 600,
  height: 600,
  cellX: 10,
  cellY: 10,
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let posX = 0;
let posY = 0;


function setup() {
  createCanvas(screenObject.width, screenObject.height);
  background(255);

  // grid initialisation
  let table = []
  for(let i=0; i<screenObject.cellX; i++){
    table.push([]);
    for(let j=0; j<screenObject.cellY; j++){
      table[i].push(0)
    }
  }

  posX  = getRandomInt(screenObject.cellX);
  
  table[posX][0] = 1;
  table = generateCoridor(posX,0,3,table);
  console.log(table)
  drawTable(table);

  let i = 0;
  while (i<10){
    let dir = getRandomInt(3);
    if(dir == 0 && posY-2>0){
      generateCoridor(posX,posY,dir,table)
      i++;
    }
    if(dir == 1 && posX+2<screenObject.cellX){
      generateCoridor(posX,posY,dir,table)
      i++;
    }
    if(dir == 2 && posY+2<screenObject.cellY){
      generateCoridor(posX,posY,dir,table)
      i++;
    }
    if(dir == 3 && posX-2>0){
      generateCoridor(posX,posY,dir,table)
      i++;
    }
    drawTable(table)
  }

}

function draw() {}


function generateCoridor(x,y,direction,table){
  // up
  if(direction == 0){
    table[x][y-1] = 2
    table[x][y-2] = 2
    posY -= 2;
  }
  // right
  if(direction == 1){
    table[x+1][y] = 2
    table[x+2][y] = 2
    posX += 2;
  }
  // down
  if(direction == 2){
    table[x][y+1] = 2
    table[x][y+2] = 2
    posY += 2;
  }
  // left
  if(direction == 3){
    table[x-1][y] = 2
    table[x-2][y] = 2
    posX -= 2;
  }
  return table;
}




function drawTable(table){
  for(let i=0; i<screenObject.cellX; i++){
    for(let j=0; j<screenObject.cellY; j++){
      drawCell(i,j,table[i][j]);
    } 
  }
}

function drawCell(x, y, color) {
  stroke("white")
  switch (color) {
    case 0:
      fill("white");
      break;
    case 1:
      fill("red");
      break;
    case 2:
      fill("black");
      break;
  }
  let xRatio = screenObject.width/screenObject.cellX;
  let yRatio = screenObject.height/screenObject.cellY;
  rect(x*xRatio,y*yRatio,xRatio,yRatio);
}
