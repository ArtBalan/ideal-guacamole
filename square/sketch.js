let width = 0;
let height = 0;

let xSize = 10;
let ySize = 10;

// inner color of the circle
let strokeColor;
// circle stroke color

// target color
let newColor;
let tempColor;
let alphaValue = 100;
let deltaAlpha = -10;
// for the color shift
let amt;
let steps = 2;
let shiftamt = 1 / steps;
shiftamt = 0.2;

function drawSquare(x,y,r){
  strokeWeight(2);
  line(x+r,y,x,y+r);
  line(x-r,y,x,y+r);
  line(x+r,y,x,y-r);
  line(x-r,y,x,y-r);
}

class SquareList{
  constructor(){
    this.list = [];
  }
}

let diag1 = new SquareList();
let diag2 = new SquareList();
let hory = new SquareList();
let vert = new SquareList();
let cust1 = new SquareList();
let cust2 = new SquareList();
let cust3 = new SquareList();
let cust4 = new SquareList();

function setup() {

  width = displayWidth;
  height = displayHeight;

  // max canvas size
  createCanvas(width, height);
  background(255);
  // drawSquare(60,height/2,100,12)

  let x = width/2;
  let y = height/2;
  let r = 40;
  let counter = 5;

  let fact = 300;
  let j = random(fact);
  console.log(j)
  for(let i=0;i<j;i++){
    diag1.list.push([[random(width),random(height),r,counter]]);
  }
  // diag1.list.push([[x,y,r,counter]]);


  j = random(fact);
  console.log(j)
  for(let i=0;i<j;i++){
    diag2.list.push([[random(width),random(height),r,counter]])
  }

  j = random(fact);
  console.log(j)
  for(let i=0;i<j;i++){
    hory.list.push([[random(width),random(height),r,counter]]);
  }
  // hory.list.push([[x,y,r,counter]]);


  j = random(fact);
  console.log(j)
  for(let i=0;i<j;i++){
    // vert.list.push([[random(width),random(height),r,counter]]);
  }
  j = random(fact);
  console.log(j)
  for(let i=0;i<j;i++){
    // cust1.list.push([[width/2,height/2,100,1000]]);
    // cust1.list.push([[random(width),random(height),100,1000]]);
  }

  // cust1.list.push([[x,y,100,1000]]);
  // cust2.list.push([[x,y,100,1000]]);
  // cust3.list.push([[x,y,100,1000]]);
  // cust4.list.push([[x,y,100,1000]]);


  // frameRate(2)

  // strokeColor = color(255, 204, 0, alphaValue);
  strokeColor = color(random(255), random(255), random(255), alphaValue);
  newColor = color(random(255), random(255), random(255), alphaValue);
  // idk why i need this
  colorMode(RGB);

  // color shift start at 0
  amt = 0;
}

let decrease = 2;
let decreaseStatic = -2;

// let p = (x,r) => (x+r*2);
// let n = (x,r) => (x-r*2);
let p = (x,r) => (x+random(r)*((Math.random(2)>=1)?1:-1));
let n = (x,r) => (x+random(r)*((Math.random(2)>=1)?1:-1));

function draw() {

  // Diag1
  for(let i=0; i<diag1.list.length; i++){
    if(diag1.list[i].length>0){
      let tempList = [];
      diag1.list[i].forEach(square => {
        let x = square[0];
        let y = square[1];
        let r = square[2];
        let counter = square[3];
        drawSquare(square[0],square[1],square[2]);
        if(counter>0 && r-decrease>0){
          tempList.push([p(x,r),n(y,r),r/2-decreaseStatic,counter-1])
          tempList.push([n(x,r),p(y,r),r/2-decreaseStatic,counter-1])
        }    
      });
      diag1.list[i] = tempList;
    }
  }

  // Diag2
  for(let i=0; i<diag2.list.length; i++){
    if(diag2.list[i].length>0){
      let tempList = [];
      diag2.list[i].forEach(square => {
        let x = square[0];
        let y = square[1];
        let r = square[2];
        let counter = square[3];
        drawSquare(square[0],square[1],square[2]);
        if(counter>0 && r-decrease>0){
          tempList.push([p(x,r),p(y,r),r/2-decreaseStatic,counter-1])
          tempList.push([n(x,r),n(y,r),r/2-decreaseStatic,counter-1])
        }    
      });
      diag2.list[i] = tempList;
    }
  }

    // Hory
    for(let i=0; i<hory.list.length; i++){
      if(hory.list[i].length>0){
        let tempList = [];
        hory.list[i].forEach(square => {
          let x = square[0];
          let y = square[1];
          let r = square[2];
          let counter = square[3];
          drawSquare(square[0],square[1],square[2]);
          if(counter>0 && r-decrease>0){
            tempList.push([p(x,r),y,r/2-decreaseStatic,counter-1])
            tempList.push([n(x,r),y,r/2-decreaseStatic,counter-1])
          }    
        });
        hory.list[i] = tempList;
      }
    }

    // Hory
    for(let i=0; i<vert.list.length; i++){
      if(vert.list[i].length>0){
        let tempList = [];
        vert.list[i].forEach(square => {
          let x = square[0];
          let y = square[1];
          let r = square[2];
          let counter = square[3];
          drawSquare(square[0],square[1],square[2]);
          if(counter>0 && r-decrease>0){
            tempList.push([x,p(y,r),r/2-decreaseStatic,counter-1])
            tempList.push([x,n(y,r),r/2-decreaseStatic,counter-1])
          }    
        });
        vert.list[i] = tempList;
      }
    }

    // custom1
    for(let i=0; i<cust1.list.length; i++){
      if(cust1.list[i].length>0){
        let tempList = [];
        cust1.list[i].forEach(square => {
          let x = square[0];
          let y = square[1];
          let r = square[2];
          let counter = square[3];
          drawSquare(square[0],square[1],square[2]);
          if(counter>0){
            tempList.push([p(x,r),y,(r-decrease)*-1,counter-1])
          }    
        });
        cust1.list[i] = tempList;
      }
    }

  // custom2
  for(let i=0; i<cust2.list.length; i++){
    if(cust2.list[i].length>0){
      let tempList = [];
      cust2.list[i].forEach(square => {
        let x = square[0];
        let y = square[1];
        let r = square[2];
        let counter = square[3];
        drawSquare(square[0],square[1],square[2]);
        if(counter>0){
          tempList.push([n(x,r),y,(r-decrease)*-1,counter-1])
        }    
      });
      cust2.list[i] = tempList;
    }
  }

  // custom3
  for(let i=0; i<cust3.list.length; i++){
    if(cust3.list[i].length>0){
      let tempList = [];
      cust3.list[i].forEach(square => {
        let x = square[0];
        let y = square[1];
        let r = square[2];
        let counter = square[3];
        drawSquare(square[0],square[1],square[2]);
        if(counter>0){
          tempList.push([x,p(y,r),(r-decrease)*-1,counter-1])
        }    
      });
      cust3.list[i] = tempList;
    }
  }
  // custom4
  for(let i=0; i<cust4.list.length; i++){
    if(cust4.list[i].length>0){
      let tempList = [];
      cust4.list[i].forEach(square => {
        let x = square[0];
        let y = square[1];
        let r = square[2];
        let counter = square[3];
        drawSquare(square[0],square[1],square[2]);
        if(counter>0){
          tempList.push([x,n(y,r),(r-decrease)*-1,counter-1])
        }    
      });
      cust4.list[i] = tempList;
    }
  }

  decrease *= -1

  tempColor = lerpColor(strokeColor, newColor, amt);
  stroke(tempColor);
  amt += shiftamt;
  strokeColor = tempColor;
    if (amt >= 1) {
      amt = 0.0;
      strokeColor = tempColor;
      newColor = color(random(255), random(255), random(255),200);
    
    }
}
