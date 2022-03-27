import React, { useMemo, useRef, useEffect, useCallback, useState } from 'react'
import { useFrame } from 'react-three-fiber'
import { gsap } from 'gsap'
import * as THREE from 'three'

import fragmentShader from './shaders/workSphere/fragmentShader2.glsl'
import vertexShader from './shaders/workSphere/vertexShader2.glsl'

export default function DienstenSphere({ mousePos, scrollRef, pepperRef, sphereContainer, timeRef, loading, setLoading, desktop }) {
  // Refs
  const materialRef = useRef()
  const sphereRef = useRef()
  const startProgress = useRef()
  const animationProgress = useRef()
  animationProgress.current = { t: 0 }
  const pepperRotation = useRef()
  pepperRotation.current = { rotX: 0, rotZ: 0 }
  const spherePosition = useRef()
  spherePosition.current = { x: 250, y: -50 }
  const offsetRef = useRef()
  offsetRef.current = { x: spherePosition.current.x, y: spherePosition.current.y }
  const geometryRef = useRef()
  const lightA = useRef()
  const lightB = useRef()
  const sphereRect = useRef()


  // LIGHTS
  lightA.current = {}

  lightA.current.intensity = 0.8

  lightA.current.color = {}
  lightA.current.color.value = '#c90016'
  lightA.current.color.instance = new THREE.Color(lightA.current.color.value)

  lightA.current.spherical = new THREE.Spherical(1, 0.615, 2.049)

  lightB.current = {}

  lightB.current.intensity = 0.8

  lightB.current.color = {}
  lightB.current.color.value = '#c90016'
  lightB.current.color.instance = new THREE.Color(lightB.current.color.value)

  lightB.current.spherical = new THREE.Spherical(1, 2.561, - 1.844)

  useEffect(() => {

    startProgress.current = 0



    materialRef.current.uniforms.uLightAPosition.value.setFromSpherical(lightA.current.spherical)
    materialRef.current.uniforms.uLightBPosition.value.setFromSpherical(lightB.current.spherical)

    geometryRef.current.computeTangents()


    setLoading(false)

    sphereRect.current = sphereContainer.current.getBoundingClientRect()


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
    if (delta < 0) {
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


    // sphereRef.current.position.y = scrollRef.current * (desktop ? 1 : 0.05) + offsetRef.current.y
    // sphereRef.current.position.x = 250
    materialRef.current.uniforms.uLightBColor.value = new THREE.Color(lightB.current.color.value)
    materialRef.current.uniforms.uLightAColor.value = new THREE.Color(lightA.current.color.value)


    gsap.to(sphereRef.current.position, {
      y: scrollRef.current - sphereRect.current.top + window.innerHeight / 2 - sphereRect.current.height / 2.5,
      x: sphereRect.current.left - window.innerWidth / 2 + sphereRect.current.width / 2.5,
      duration: 0
    })
  })

  return (
    <mesh ref={sphereRef} position={[100, -60, -50]}>
      <sphereGeometry ref={geometryRef} args={[window.innerWidth * 0.14, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          time: { value: 0 },
          uMouse: { value: new THREE.Vector2(mousePos.x, mousePos.y) },
          uMouseNormal: { value: new THREE.Vector2(mousePos.x, mousePos.y) },
          uAnimationProgress: { value: 0 },
          uSphereColor: { value: new THREE.Color("#f5f5f5") },

          uLightAColor: { value: lightA.current.color.instance },
          uLightAPosition: { value: new THREE.Vector3(1, 1, 0) },
          uLightAIntensity: { value: lightA.current.intensity },
          uSubdivision: { value: new THREE.Vector2(64, 64) },
          uLightBColor: { value: lightB.current.color.instance },
          uLightBPosition: { value: new THREE.Vector3(- 1, - 1, 0) },
          uLightBIntensity: { value: lightB.current.intensity },
          uSpeed: { value: 0 },

          uFresnelOffset: { value: -0.7 },
          uFresnelMultiplier: { value: 0.9 },
          uFresnelPower: { value: 2.5 },

          uDistortionFrequency: { value: 0.002 },
          uDistortionStrength: { value: 50 },
          uDisplacementFrequency: { value: 0.005 },
          uDisplacementStrength: { value: 30 },



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
