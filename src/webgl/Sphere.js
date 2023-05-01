import React, { useMemo, useRef, useEffect, useCallback, useState } from 'react'
import { useFrame } from 'react-three-fiber'
import { smoothstep, smootherstep } from 'three/src/math/MathUtils'
import { gsap } from 'gsap'
import * as THREE from 'three'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"
import { GUI } from 'dat.gui'

import fragmentShader from './shaders/sphere/fragmentShader2.glsl'
import vertexShader from './shaders/sphere/vertexShader2.glsl'

export default function Points({ mousePos, scrollRef, pepperRef, sphereContainer, timeRef, loading, setLoading, desktop }) {
  // Refs
  const materialRef = useRef()
  const sphereRef = useRef()
  const startProgress = useRef()
  const animationProgress = useRef()
  animationProgress.current = { t: 0 }

  const spherePosition = useRef()
  spherePosition.current = { x: 250, y: -50 }
  const offsetRef = useRef()
  offsetRef.current = { x: spherePosition.current.x, y: spherePosition.current.y }
  const geometryRef = useRef()
  const lightA = useRef()
  const lightB = useRef()
  const animationTrigger = useRef()



  // LIGHTS
  lightA.current = {}

  lightA.current.intensity = 1.5

  lightA.current.color = {}
  lightA.current.color.value = '#ff000e'
  lightA.current.color.instance = new THREE.Color(lightA.current.color.value)

  lightA.current.spherical = new THREE.Spherical(1, 0.615, 2.049)

  lightB.current = {}

  lightB.current.intensity = 0.6

  lightB.current.color = {}
  lightB.current.color.value = '#c90016'
  lightB.current.color.instance = new THREE.Color(lightB.current.color.value)

  lightB.current.spherical = new THREE.Spherical(1, 2.561, - 1.844)


  // useEffect

  // const gui = new GUI()
  useEffect(() => {

    // const folder = gui.addFolder("Displacement")
    // folder.add(materialRef.current.uniforms.uDistortionFrequency, 'value', 0, 0.05, 0.001)
    // folder.add(materialRef.current.uniforms.uDistortionStrength, 'value', 0, 200, 1)
    // folder.add(materialRef.current.uniforms.uDisplacementFrequency, 'value', 0, 0.05, 0.001)
    // folder.add(materialRef.current.uniforms.uDisplacementStrength, 'value', 0, 200, 1)
    // folder.open()
    // const fresnelFolder = gui.addFolder("FresnelFolder")
    // fresnelFolder.add(materialRef.current.uniforms.uFresnelOffset, 'value', -3, 3, 0.1)
    // fresnelFolder.add(materialRef.current.uniforms.uFresnelMultiplier, 'value', 0, 4, 0.1)
    // fresnelFolder.add(materialRef.current.uniforms.uFresnelPower, 'value', 0, 3, 0.1)
    // fresnelFolder.open()

    startProgress.current = 0
    // gsap.to(sphereRef.current.position, {
    //   z: -50,
    //   ease: 'expo.inOut',
    //   duration: 1.2,
    //   delay: .8,
    // })
    gsap.to('.canvas', {
      opacity: 1,
      delay: .8,
      duration: 1.8
    }
    )

    materialRef.current.uniforms.uLightAPosition.value.setFromSpherical(lightA.current.spherical)
    materialRef.current.uniforms.uLightBPosition.value.setFromSpherical(lightB.current.spherical)

    geometryRef.current.computeTangents()

    let rect = document.querySelector("#headerAnimationTrigger").getBoundingClientRect()
    animationTrigger.current = rect.y - rect.height

    setLoading(false)



  }, [])

  const lastMouseX = useRef(0)
  const lastMouseY = useRef(0)


  // useFrame
  useFrame(({ clock }, delta) => {
    const tick = clock.getElapsedTime()



    // MOUSE SPEED
    let dx = mousePos.x - lastMouseX.current
    let dy = mousePos.y - lastMouseY.current
    let speedX = (dx / delta)
    let speedY = (dx / delta)
    lastMouseX.current = mousePos.x
    lastMouseY.current = mousePos.y
    let speed = Math.sqrt(speedX ** 2 + speedY ** 2)
    if (delta > 0) {
      gsap.to(materialRef.current.uniforms.uDisplacementStrength, {
        value: speed * 0.08 + 100,
        duration: 3,
        // ease: 'power1.in'
      })
    }
    // uniforms
    if (window.innerWidth > 1800) {
      materialRef.current.uniforms.uSize2.value = 0.6
    }
    materialRef.current.uniforms.time.value = tick * 0.5
    materialRef.current.uniforms.uMouse.value = new THREE.Vector2(mousePos.x, mousePos.y)
    materialRef.current.uniforms.uMouseNormal.value = new THREE.Vector2(mousePos.x + window.innerWidth / 2, mousePos.y + window.innerHeight / 2)
    // materialRef.current.uniforms.uAnimationProgress.value = animationProgress.current.t


    sphereRef.current.position.y = scrollRef.current * (desktop ? 1 : 0.05) + offsetRef.current.y
    sphereRef.current.position.x = offsetRef.current.x

    materialRef.current.uniforms.uLightBColor.value = new THREE.Color(lightB.current.color.value)
    materialRef.current.uniforms.uLightAColor.value = new THREE.Color(lightA.current.color.value)
    if (scrollRef.current > animationTrigger.current && desktop) {
      gsap.to(offsetRef.current, {
        y: - pepperRef.current.top + window.innerHeight / 2 - pepperRef.current.height / 2,
        x: pepperRef.current.left - window.innerWidth / 2 + pepperRef.current.width / 2,
        ease: 'power1.out',
        duration: 2,
      })
      gsap.to(materialRef.current.uniforms.uAnimationProgress, {
        value: 1,
        duration: 2,
        ease: 'power1.out'
      })
      gsap.to(lightA.current.color, {
        value: "#c90016"
      })
      gsap.to(lightB.current.color, {
        value: "#c90016"
      })
      gsap.to(materialRef.current.uniforms.uAnimationProgress, {
        value: 1,
        duration: 2,
        ease: 'power1.out'
      })
      gsap.to(materialRef.current.uniforms.uDisplacementStrength, {
        value: 50,
        duration: 2,
        ease: 'power1.out'
      })
      // materialRef.current.uniforms.uLightBColor.value = new THREE.Color("#6867AC")
      // materialRef.current.uniforms.uLightAColor.value = new THREE.Color("#54BAB9")

    } else {
      gsap.to(offsetRef.current, {
        y: - sphereContainer.current.top + window.innerHeight / 2 - sphereContainer.current.height / 2,
        x: sphereContainer.current.left - window.innerWidth / 2 + sphereContainer.current.width / 1.5,
        ease: 'power1.out',
        duration: 2,
      })
      gsap.to(materialRef.current.uniforms.uAnimationProgress, {
        value: 0,
        duration: 2,
        ease: 'power1.out'
      })
      gsap.to(lightA.current.color, {
        value: "#ff000e"
      })
      gsap.to(lightB.current.color, {
        value: "#ff000e"
      })
      gsap.to(materialRef.current.uniforms.uDisplacementStrength, {
        value: 15,
        duration: 2,
        ease: 'power1.out'
      })
    }
  })



  return (
    <mesh ref={sphereRef} position={[280, -60, -50]}>
      <sphereGeometry ref={geometryRef} args={[sphereContainer.current.width, 128, 128]} />
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
          uSubdivision: { value: new THREE.Vector2(128, 128) },
          uLightBColor: { value: lightB.current.color.instance },
          uLightBPosition: { value: new THREE.Vector3(- 1, - 1, 0) },
          uLightBIntensity: { value: lightB.current.intensity },
          uSpeed: { value: 0 },

          uFresnelOffset: { value: 0.1 },
          uFresnelMultiplier: { value: 0.9 },
          uFresnelPower: { value: 2.5 },

          // uFresnelOffset: { value: -1.609 },
          // uFresnelMultiplier: { value: 2.587 },
          // uFresnelPower: { value: 0.593 },

          uDistortionFrequency: { value: 0.002 },
          uDistortionStrength: { value: 50 },
          uDisplacementFrequency: { value: 0.005 },
          uDisplacementStrength: { value: 15 },
          // uDistortionFrequency: { value: 0.001 },
          // uDistortionStrength: { value: 200 },
          // uDisplacementFrequency: { value: 0.0220 },
          // uDisplacementStrength: { value: 10 },


          uOffset: { value: new THREE.Vector3() },
          uSize2: { value: 0.8 },
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
