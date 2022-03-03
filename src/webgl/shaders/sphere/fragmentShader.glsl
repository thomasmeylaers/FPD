uniform float time;
uniform float uAnimationProgress;
uniform vec2 uMouse;

varying float vHeight;
varying float vDistanceToMouse;
varying  vec3 vNormal;
varying float vDistortion;
varying vec2 vUv;

vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}   

void main() { 
  vec3 red = vec3(1.0,0.0,0.05);
  vec3 secondary = vec3(0.7882352, 0.0,0.08627 );
  vec3 white = vec3(1.,1.,1.);
  vec3 green = vec3(132, 206, 46) / 255.;

 float intensity = 0.05;
  float distort = vDistortion * intensity;

  // These values are my fav combination, 
  // they remind me of Zach Lieberman's work.
  // You can find more combos in the examples from IQ:
  // https://iquilezles.org/www/articles/palettes/palettes.htm
  // Experiment with these!
  vec3 brightness = vec3(0.5, 0.5, 0.5);
  vec3 contrast = vec3(0.5, 0.5, 0.5);
  vec3 oscilation = vec3(1.0, 1.0, 1.0);
  vec3 phase = vec3(0.0, 0.1, 0.2);

  // Pass the distortion as input of cospalette
  vec3 color = cosPalette(distort, red, contrast, oscilation, phase);
  gl_FragColor = vec4(0.,0.,0.,1.);

}