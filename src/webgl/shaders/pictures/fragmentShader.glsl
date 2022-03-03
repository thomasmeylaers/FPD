varying float vNoise;
varying vec2 vUv;

uniform sampler2D uImage;
uniform sampler2D displacement;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform float progress;
uniform float time;
uniform float intensity;

mat2 getRotM(float angle) {
      float s = sin(angle);
      float c = cos(angle);
      return mat2(c, -s, s, c);
}

const float PI = 3.1415;
const float angle1 = PI *0.25;
const float angle2 = -PI *0.75;

void main()	{


    vec2 newUV = (vUv - vec2(0.5)) + vec2(0.5);
    vec4 disp = texture2D(displacement, newUV);
    vec2 dispVec = vec2(disp.r, disp.g);

    vec2 distortedPosition1 = newUV + getRotM(angle1) * dispVec * intensity * progress;
    vec4 t1 = texture2D(texture1, distortedPosition1);

    vec2 distortedPosition2 = newUV + getRotM(angle2) * dispVec * intensity * (1.0 - progress);
    vec4 t2 = texture2D(texture2, distortedPosition2);

    // vec4 oceanView = texture2D(uImage,fract(uv + uv)) ;


    // gl_FragColor = vec4(vUv,0.,1.);
    // gl_FragColor = oceanView ;
    gl_FragColor = mix(t1, t2, progress);

    
}