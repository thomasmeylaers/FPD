#define M_PI 3.1415926535897932384626433832795

uniform vec3 uLightAColor;
uniform vec3 uLightAPosition;
uniform float uLightAIntensity;
uniform vec3 uLightBColor;
uniform vec3 uLightBPosition;
uniform float uLightBIntensity;
uniform vec2 uMouse;
uniform vec2 uMouseNormal;
uniform float uAnimationProgress;
uniform vec3 uSphereColor;

uniform vec2 uSubdivision;

uniform vec3 uOffset;

uniform float uDistortionFrequency;
uniform float uDistortionStrength;
uniform float uDisplacementFrequency;
uniform float uDisplacementStrength;

uniform float uFresnelOffset;
uniform float uFresnelMultiplier;
uniform float uFresnelPower;
uniform float uSpeed;

uniform float time;
uniform float uSize2;

varying vec3 vColor;

#pragma glslify: perlin4d = require('../partials/perlin4d.glsl')
#pragma glslify: perlin3d = require('../partials/perlin3d.glsl')

vec3 getDisplacedPosition(vec3 _position)
{
    vec3 distoredPosition = _position;
    distoredPosition += perlin4d(vec4(distoredPosition * uDistortionFrequency    + uOffset, time)) * uDistortionStrength;

    float perlinStrength = perlin4d(vec4(distoredPosition * uDisplacementFrequency   + uOffset, time));
    
    vec3 displacedPosition = _position;
    displacedPosition += normalize(_position) * perlinStrength * uDisplacementStrength;

    return displacedPosition;
}

void main()
{
    // Position
    vec3 newPosition = position ;
  // newPosition.x -= uMouse.x *0.1;
  // newPosition.y -= uMouse.y *0.1;
    vec3 displacedPosition = getDisplacedPosition(newPosition);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);

    // Bi tangents
    float distanceA = (M_PI * 2.0) / uSubdivision.x;
    float distanceB = M_PI / uSubdivision.x;

    vec3 biTangent = cross(normal, tangent.xyz);

  vec3 aOffset = vec3(0.,0.,0.);
    vec3 positionA = newPosition + aOffset + tangent.xyz * distanceA;
    vec3 displacedPositionA = getDisplacedPosition(positionA);

    vec3 positionB = newPosition + biTangent.xyz * distanceB;
    vec3 displacedPositionB = getDisplacedPosition(positionB);

    vec3 computedNormal = cross(displacedPositionA - displacedPosition.xyz, displacedPositionB - displacedPosition.xyz);
    computedNormal = normalize(computedNormal);

    // Fresnel
    vec3 viewDirection = normalize(displacedPosition.xyz - cameraPosition);
    float fresnel = uFresnelOffset + (1.0 + dot(viewDirection, computedNormal)) * uFresnelMultiplier;
    fresnel = pow(max(0.0, fresnel), uFresnelPower);

    // Color
    vec3 Aoffset = vec3(-1.2,-0.2,0.);
    vec3 Boffset =  vec3(1.,0.,0.);
    float lightAIntensity = max(0.0, - dot(computedNormal.xyz, normalize(- uLightAPosition - Aoffset))) * uLightAIntensity;
    float lightBIntensity = max(0.0, - dot(computedNormal.xyz, normalize(- uLightBPosition - Boffset))) * uLightBIntensity;

    vec3 color = uSphereColor;
    color = mix(color, uLightAColor, lightAIntensity * fresnel);
    color = mix(color, uLightBColor, lightBIntensity * fresnel);
    color = mix(color, vec3(1.0), clamp(pow(max(0.0, fresnel - 0.8), 3.0), 0.0, 1.0));

    // Varying
    vColor = color;
}