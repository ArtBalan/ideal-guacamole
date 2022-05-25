varying vec2 vertexUV;
varying vec3 vertexNormal;

void main(){
  vertexUV = uv;
  vertexNormal = normalize(normalMatrix * normal);
  // voir projectionMatrix et modelVeiMatrix
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}