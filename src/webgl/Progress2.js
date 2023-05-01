import React, { useMemo, useRef, useEffect, useCallback } from 'react'
import { useFrame } from 'react-three-fiber'
import { smoothstep, smootherstep } from 'three/src/math/MathUtils'
import { gsap } from 'gsap'
import * as THREE from 'three'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"
import { GUI } from 'dat.gui'

import fragmentShader from './shaders/progress/fragmentShader2.glsl'
import vertexShader from './shaders/progress/vertexShader2.glsl'

export default function Progress2({ loading, mousePos, progressContainer, scrollRef, state, sliderProgress }) {
  // Refs
  const materialRef = useRef()
  const sphereRef = useRef()
  const startProgress = useRef()
  const pepperArray = useRef()
  const animationProgress = useRef()
  animationProgress.current = { t: 0 }
  const pepperRotation = useRef()
  pepperRotation.current = { rotX: 0, rotZ: 0 }
  const spherePosition = useRef()
  spherePosition.current = { x: 250, y: -50 }
  const offsetRef = useRef()
  offsetRef.current = { x: spherePosition.current.x, y: spherePosition.current.y }
  const pepperCount = useRef()
  const geometryRef = useRef()
  const lightA = useRef()
  const lightB = useRef()
  const progressContainerRect = useRef()
  const completed = useRef({
    "BRIEFING": {
      size: 1,
      color: "#000"
    },
    "DESIGN": {
      uDisplacementFrequency: 0.01,
      uDisplacementStrength: 10
    },
    "DEVELOPMENT": {
      uDistortionFrequency: 0.005,
      uDistortionStrength: 50
    },
    "FEEDBACK": {
      uFresnelOffset: -0.5,
      uFresnelMultiplier: 0.9
    }
  })

  // LIGHTS
  lightA.current = {}

  lightA.current.intensity = 0.5

  lightA.current.color = {}
  lightA.current.color.value = '#fff'
  lightA.current.color.instance = new THREE.Color(lightA.current.color.value)

  lightA.current.spherical = new THREE.Spherical(1, 0.615, 2.049)

  lightB.current = {}

  lightB.current.intensity = 0.5

  lightB.current.color = {}
  lightB.current.color.value = '#fff'
  lightB.current.color.instance = new THREE.Color(lightB.current.color.value)

  lightB.current.spherical = new THREE.Spherical(1, 2.561, - 1.844)

  // OBJLoader
  // const loader = new OBJLoader()
  // loader.load('/models/paprika2.obj',
  //   (obj) => {
  //     let positionPepper = obj.children[0].geometry.attributes.position
  //     let finalPosition = positionPepper
  //     pepperCount.current = finalPosition.count
  //     pepperArray.current = finalPosition
  //   }, (xhr) => {
  //     // the request is in progress
  //     console.log(xhr)
  //   },
  //   (err) => {
  //     // something went wrong
  //     console.error("loading .obj went wrong, ", err)
  //   }
  // )

  // Sphere positions
  // let N = 30000
  // let positions = useMemo(() => {
  //   let positions = new Float32Array(N * 3)
  //   let inc = Math.PI * (3 - Math.sqrt(5))
  //   let off = 4 / N
  //   let rad = 180
  //   for (let i = 0; i < N; i++) {
  //     let y = i * off - 1 + (off / 2)
  //     let r = Math.sqrt(1 - y * y)
  //     let phi = i * inc

  //     positions[3 * i] = rad * Math.cos(phi) * r;
  //     positions[3 * i + 1] = rad * y;
  //     positions[3 * i + 2] = rad * Math.sin(phi) * r;
  //   }
  //   return positions
  // })

  // let t = 0;
  // let f = 0.002;
  // let a = 3;
  // const graph = useCallback((x, z) => {
  //   return Math.sin(f * (x ** 2 + z ** 2 + t)) * a;
  // }, [t, f, a])

  // const count = 100
  // const sep = 3
  // let positions = useMemo(() => {
  //   let positions = []

  //   for (let xi = 0; xi < count; xi++) {
  //     for (let zi = 0; zi < count; zi++) {
  //       let x = sep * (xi - count / 2);
  //       let z = sep * (zi - count / 2);
  //       let y = graph(x, z);
  //       positions.push(x, y, z);
  //     }
  //   }

  //   return new Float32Array(positions)
  // });

  // useEffect
  // const gui = new GUI()
  useEffect(() => {
    // const folder = gui.addFolder("Displacement")
    // folder.add(materialRef.current.uniforms.uDistortionFrequency, 'value', 0, 0.05, 0.001)
    // folder.add(materialRef.current.uniforms.uDistortionStrength, 'value', 0, 200, 1)
    // folder.add(materialRef.current.uniforms.uDisplacementFrequency, 'value', 0, 0.05, 0.001)
    // folder.add(materialRef.current.uniforms.uDisplacementStrength, 'value', 0, 200, 1)
    // // folder.open()
    // const fresnelFolder = gui.addFolder("FresnelFolder")
    // fresnelFolder.add(materialRef.current.uniforms.uFresnelOffset, 'value', -3, 3, 0.1)
    // fresnelFolder.add(materialRef.current.uniforms.uFresnelMultiplier, 'value', 0, 4, 0.1)
    // fresnelFolder.add(materialRef.current.uniforms.uFresnelPower, 'value', 0, 3, 0.1)
    // fresnelFolder.open()
    progressContainerRect.current = progressContainer.current.getBoundingClientRect()

    startProgress.current = 0


    materialRef.current.uniforms.uLightAPosition.value.setFromSpherical(lightA.current.spherical)
    materialRef.current.uniforms.uLightBPosition.value.setFromSpherical(lightB.current.spherical)

    geometryRef.current.computeTangents()



  }, [])

  // useFrame
  useFrame(({ clock }, delta) => {
    const tick = clock.getElapsedTime()
    let normalMouse = {
      x: (mousePos.x + window.innerWidth / 2) / window.innerWidth,
      y: (mousePos.y + window.innerHeight / 2) / window.innerHeight
    }
    // uniforms
    materialRef.current.uniforms.time.value = tick * 0.5
    materialRef.current.uniforms.uMouse.value = new THREE.Vector2(mousePos.x, mousePos.y)
    materialRef.current.uniforms.uMouseNormal.value = new THREE.Vector2(mousePos.x + window.innerWidth / 2, mousePos.y + window.innerHeight / 2)
    // materialRef.current.uniforms.uAnimationProgress.value = animationProgress.current.t


    sphereRef.current.position.y = scrollRef.current + offsetRef.current.y
    sphereRef.current.position.x = offsetRef.current.x
    materialRef.current.uniforms.uLightBColor.value = new THREE.Color(lightB.current.color.value)
    materialRef.current.uniforms.uLightAColor.value = new THREE.Color(lightA.current.color.value)

    if (!loading) {
      gsap.to(sphereRef.current.position, {
        y: scrollRef.current - progressContainerRect.current.top + window.innerHeight / 2 - progressContainerRect.current.height / 2.5,
        x: progressContainerRect.current.left - window.innerWidth / 2 + progressContainerRect.current.width / 2.5,
        duration: 0,
      })
    }


    // DIFFERENT STATES
    if (state.current == "BRIEFING") {
      // DEFAULTS
      gsap.to(materialRef.current.uniforms.uDisplacementFrequency, { value: completed.current["DESIGN"].uDisplacementFrequency })
      gsap.to(materialRef.current.uniforms.uDisplacementStrength, { value: completed.current["DESIGN"].uDisplacementStrength })
      gsap.to(materialRef.current.uniforms.uDistortionFrequency, { value: completed.current["DEVELOPMENT"].uDistortionFrequency })
      gsap.to(materialRef.current.uniforms.uDistortionStrength, { value: completed.current["DEVELOPMENT"].uDistortionStrength })
      gsap.to(materialRef.current.uniforms.uFresnelOffset, { value: completed.current["FEEDBACK"].uFresnelOffset })
      gsap.to(materialRef.current.uniforms.uFresnelMultiplier, { value: completed.current["FEEDBACK"].uFresnelMultiplier })


      // CHANGING
      gsap.to(materialRef.current.uniforms.uSize, { value: sliderProgress.x / 2 + 0.5 })
      completed.current["BRIEFING"].size = sliderProgress.x / 2 + 0.5
      materialRef.current.uniforms.uColor.value = new THREE.Color(`hsl(${sliderProgress.y * 360},70%,8%)`)
      completed.current["BRIEFING"].color = `hsl(${sliderProgress.y * 360},70%,8%)`

    }
    else if (state.current == "DESIGN") {
      // DEFAULTS
      gsap.to(materialRef.current.uniforms.uSize, {
        value: completed.current["BRIEFING"].size
      })
      materialRef.current.uniforms.uColor.value = new THREE.Color(completed.current["BRIEFING"].color)
      gsap.to(materialRef.current.uniforms.uDistortionFrequency, { value: completed.current["DEVELOPMENT"].uDistortionFrequency })
      gsap.to(materialRef.current.uniforms.uDistortionStrength, { value: completed.current["DEVELOPMENT"].uDistortionStrength })
      gsap.to(materialRef.current.uniforms.uFresnelOffset, { value: completed.current["FEEDBACK"].uFresnelOffset })
      gsap.to(materialRef.current.uniforms.uFresnelMultiplier, { value: completed.current["FEEDBACK"].uFresnelMultiplier })

      // CHANGING
      gsap.to(materialRef.current.uniforms.uDisplacementFrequency, { value: sliderProgress.y * 0.01 + 0.01 })
      completed.current["DESIGN"].uDisplacementFrequency = sliderProgress.y * 0.01 + 0.01
      gsap.to(materialRef.current.uniforms.uDisplacementStrength, { value: sliderProgress.x * 50 + 10 })
      completed.current["DESIGN"].uDisplacementStrength = sliderProgress.x * 50 + 10

    }
    else if (state.current == "DEVELOPMENT") {
      // DEFAULTS
      gsap.to(materialRef.current.uniforms.uSize, {
        value: completed.current["BRIEFING"].size
      })
      materialRef.current.uniforms.uColor.value = new THREE.Color(completed.current["BRIEFING"].color)
      gsap.to(materialRef.current.uniforms.uDisplacementFrequency, { value: completed.current["DESIGN"].uDisplacementFrequency })
      gsap.to(materialRef.current.uniforms.uDisplacementStrength, { value: completed.current["DESIGN"].uDisplacementStrength })
      gsap.to(materialRef.current.uniforms.uFresnelOffset, { value: completed.current["FEEDBACK"].uFresnelOffset })
      gsap.to(materialRef.current.uniforms.uFresnelMultiplier, { value: completed.current["FEEDBACK"].uFresnelMultiplier })


      // CHANGING
      gsap.to(materialRef.current.uniforms.uDistortionFrequency, { value: sliderProgress.y * 0.006 + 0.005 })
      completed.current["DEVELOPMENT"].uDistortionFrequency = sliderProgress.y * 0.006 + 0.005
      gsap.to(materialRef.current.uniforms.uDistortionStrength, { value: sliderProgress.x * 100 + 50 })
      completed.current["DEVELOPMENT"].uDistortionStrength = sliderProgress.x * 100 + 50

    }
    else if (state.current == "FEEDBACK") {
      // DEFAULTS
      gsap.to(materialRef.current.uniforms.uSize, {
        value: completed.current["BRIEFING"].size
      })
      materialRef.current.uniforms.uColor.value = new THREE.Color(completed.current["BRIEFING"].color)
      gsap.to(materialRef.current.uniforms.uDisplacementFrequency, { value: completed.current["DESIGN"].uDisplacementFrequency })
      gsap.to(materialRef.current.uniforms.uDisplacementStrength, { value: completed.current["DESIGN"].uDisplacementStrength })
      gsap.to(materialRef.current.uniforms.uDistortionFrequency, { value: completed.current["DEVELOPMENT"].uDistortionFrequency })
      gsap.to(materialRef.current.uniforms.uDistortionStrength, { value: completed.current["DEVELOPMENT"].uDistortionStrength })

      // CHANGING
      gsap.to(materialRef.current.uniforms.uFresnelOffset, { value: sliderProgress.x - 0.5 })
      completed.current["FEEDBACK"].uFresnelOffset = sliderProgress.x - 0.5
      gsap.to(materialRef.current.uniforms.uFresnelMultiplier, { value: sliderProgress.y * 1 + 0.9 })
      completed.current["FEEDBACK"].uFresnelMultiplier = sliderProgress.y * 1 + 0.9

    }

  })

  return (
    <mesh ref={sphereRef} position={[280, -60, -10]}>
      <sphereGeometry ref={geometryRef} args={[446 / 3, 256, 256]} />
      {/* <meshBasicMaterial /> */}
      {/* <bufferGeometry ref={bufferGeometryRef} attach='geometry' >
        <bufferAttribute

          attachObject={['attributes', 'position']}
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry> */}
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          time: { value: 0 },
          uMouse: { value: new THREE.Vector2(mousePos.x, mousePos.y) },
          uMouseNormal: { value: new THREE.Vector2(mousePos.x, mousePos.y) },
          uAnimationProgress: { value: 0 },

          uLightAColor: { value: lightA.current.color.instance },
          uLightAPosition: { value: new THREE.Vector3(1, 1, 0) },
          uLightAIntensity: { value: lightA.current.intensity },
          uSubdivision: { value: new THREE.Vector2(256, 256) },
          uLightBColor: { value: lightB.current.color.instance },
          uLightBPosition: { value: new THREE.Vector3(- 1, - 1, 0) },
          uLightBIntensity: { value: lightB.current.intensity },

          // uFresnelOffset: { value: 0.8 },
          // uFresnelMultiplier: { value: 0.2 },
          // uFresnelPower: { value: 0.593 },
          uFresnelOffset: { value: -0.5 },
          uFresnelMultiplier: { value: 0.9 },
          uFresnelPower: { value: 1 },

          uSize: { value: 0. },
          uColor: { value: new THREE.Color("#000") },
          uLightAOffset: { value: new THREE.Vector3(0, 0, 0) },
          uLightBOffset: { value: new THREE.Vector3(0, 0, 0) },


          uDistortionFrequency: { value: 0.005 },
          uDistortionStrength: { value: 150 },
          uDisplacementFrequency: { value: 0.01520 },
          uDisplacementStrength: { value: 15 },

          uOffset: { value: new THREE.Vector3() },

        }}
        defines={{
          USE_TANGENT: ''
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}
