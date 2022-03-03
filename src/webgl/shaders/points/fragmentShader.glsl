uniform float time;
uniform float uAnimationProgress;
uniform vec2 uMouse;

varying float vHeight;
varying float vDistanceToMouse;

void main() { 
  vec3 red = vec3(1.0,0.0,0.05);
  vec3 secondary = vec3(0.7882352, 0.0,0.08627 );
  vec3 white = vec3(1.,1.,1.);
  vec3 green = vec3(132, 206, 46) / 255.;

  vec3 sphereFinalColor = mix(red, secondary, vDistanceToMouse/1800.);
  float height = vHeight - 68.;
  vec3 pepperFinalColor = vec3((1.0-height),height,0.0);
  vec3 finalColor = mix(sphereFinalColor, pepperFinalColor, uAnimationProgress );  

  gl_FragColor = vec4(vDistanceToMouse/1500.,vDistanceToMouse/1500.,vDistanceToMouse/1500.,1.);
  gl_FragColor = vec4(red,1.);

}