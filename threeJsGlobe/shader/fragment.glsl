uniform sampler2D globeTexture;

varying vec2 vertexUV;
varying vec3 vertexNormal;

void main(){
  vec3 myTexture = texture2D(globeTexture,vertexUV).xyz;
  float med = (myTexture.x + myTexture.y + myTexture.z)/3.0;
  // myTexture.x = med;
  // myTexture.y = med;
  // myTexture.z = med;

  float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
  vec3 atmosphere = vec3(0.3, 0.6, 0.9) * pow(intensity, 1.5);

  gl_FragColor = vec4( atmosphere + myTexture + vec3(0,0,0.2), 1.0);
}