uniform float time;
uniform vec2 uMouse;


void main() { 
  vec3 red = vec3(1.0,0.0,0.05);
  vec3 secondary = vec3(0.7882352, 0.0,0.08627 );
  vec3 white = vec3(1.,1.,1.);
  vec3 green = vec3(132, 206, 46) / 255.;

  vec3 finalColor0 = vec3(0.,0.,0.);

  vec3 finalColor = finalColor0;

  gl_FragColor = vec4(finalColor,1.);

}