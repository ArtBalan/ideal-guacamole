
export function caldist(a, b) {
  // pythagore goes brrr
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);;
}

export function isInCircle(point,x,y,radius){
  let centerPoint = {"x":x,"y":y};
  let autorised = (caldist(centerPoint, point)<radius)? true : false; 
  return autorised;
}


export function isInTorus(point,x,y,radiusOut,radiusIn){
  let centerPoint = {"x":x,"y":y};
  let autorised = (caldist(centerPoint, point)<radiusOut)? true : false; 
  // hmmm donuts
  if(autorised){
    autorised = (caldist(centerPoint, point)>radiusIn)? true : false; 
  }
  return autorised;
}
