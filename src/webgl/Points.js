import React, { useMemo, useRef, useEffect } from 'react'
import { useFrame } from 'react-three-fiber'
import { smoothstep, smootherstep } from 'three/src/math/MathUtils'
import { gsap } from 'gsap'
import * as THREE from 'three'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"


import fragmentShader from './shaders/points/fragmentShader.glsl'
import vertexShader from './shaders/points/vertexShader.glsl'

export default function Points({ mousePos, scrollRef, pepperRef, sphereContainer }) {
  // Refs
  const timeRef = useRef()
  const materialRef = useRef()
  const pointsRef = useRef()
  const startProgress = useRef()
  const pepperArray = useRef()
  const bufferGeometryRef = useRef()
  const animationProgress = useRef()
  animationProgress.current = { t: 0 }
  const pepperRotation = useRef()
  pepperRotation.current = { rotX: 0, rotZ: 0 }
  const spherePosition = useRef()
  spherePosition.current = { x: 250, y: -50 }
  const offsetRef = useRef()
  offsetRef.current = { x: spherePosition.current.x, y: spherePosition.current.y }
  const pepperCount = useRef()
  const knotCount = useRef()

  // OBJLoader
  const loader = new OBJLoader()
  loader.load('/models/paprika2.obj',
    (obj) => {
      let positionPepper = obj.children[0].geometry.attributes.position
      let finalPosition = positionPepper
      pepperCount.current = finalPosition.count
      console.log(pepperCount.current)
      pepperArray.current = finalPosition
    }, (xhr) => {
      // the request is in progress
      console.log(xhr)
    },
    (err) => {
      // something went wrong
      console.error("loading .obj went wrong, ", err)
    }
  )

  // Sphere positions
  let N = 30000
  let positions = useMemo(() => {
    let positions = new Float32Array(N * 3)
    let inc = Math.PI * (3 - Math.sqrt(5))
    let off = 2 / N
    let rad = 180
    for (let i = 0; i < N; i++) {
      let y = i * off - 1 + (off / 2)
      let r = Math.sqrt(1 - y * y)
      let phi = i * inc

      positions[3 * i] = rad * Math.cos(phi) * r;
      positions[3 * i + 1] = rad * y;
      positions[3 * i + 2] = rad * Math.sin(phi) * r;
    }
    return positions
  })

  // useEffect
  useEffect(() => {
    startProgress.current = 0
    gsap.to(pointsRef.current.position, {
      z: 0,
      ease: 'expo.inOut',
      duration: 1.2,
      delay: .8
    })
    gsap.to('.canvas', {
      opacity: 1,
      delay: .8,
      duration: 1.8
    }
    )

    const knot = new THREE.TorusKnotGeometry(pepperRef.current.width / 4, 20, 300, 30);
    knotCount.current = knot.attributes.position.count
    bufferGeometryRef.current.setAttribute('aPosition3', new THREE.BufferAttribute(knot.attributes.position.array, 3))
  }, [])

  // useFrame
  useFrame(({ clock }, delta) => {
    const tick = clock.getElapsedTime()

    // uniforms
    materialRef.current.uniforms.time.value = tick
    materialRef.current.uniforms.uMouse.value = new THREE.Vector2(mousePos.x, mousePos.y)
    materialRef.current.uniforms.uAnimationProgress.value = animationProgress.current.t

    pointsRef.current.position.y = scrollRef.current + offsetRef.current.y
    pointsRef.current.position.x = offsetRef.current.x
    pointsRef.current.rotation.x = pepperRotation.current.rotX
    pointsRef.current.rotation.z = pepperRotation.current.rotZ

    if (scrollRef.current > 200) {

      gsap.to(bufferGeometryRef.current.attributes.position, {
        count: knotCount.current,
        duration: 0.5,
      })

      gsap.to(offsetRef.current, {
        y: -pepperRef.current.top + window.innerHeight / 2 - pepperRef.current.height / 2,
        x: pepperRef.current.left - window.innerWidth / 2 + pepperRef.current.width / 1.5,
        ease: 'power1.out',
        duration: 2,
      })

      gsap.to(animationProgress.current, {
        t: 1,
        duration: 2,
        ease: 'power1.out',
      })

      gsap.to(pepperRotation.current, {
        rotX: Math.PI / 8 + mousePos.x * 0.0005,
        duration: 5,
        ease: 'power1.out',
      })
      gsap.to(pepperRotation.current, {
        rotZ: Math.PI / 6 + mousePos.y * 0.001,
        duration: 5,
        ease: 'power1.out',
      })

    } else {
      gsap.to(offsetRef.current, {
        y: -sphereContainer.current.top + window.innerHeight / 2 - sphereContainer.current.height / 2,
        x: sphereContainer.current.left - window.innerWidth / 2 + sphereContainer.current.width / 2,
        ease: 'power1.out',
        duration: 2,
      })
      gsap.to(animationProgress.current, {
        t: 0,
        duration: 3,
        ease: 'power1.out',
      })
      gsap.to(pepperRotation.current, {
        rotX: 0,
        duration: 5,
        ease: 'power1.out',
      })
      gsap.to(pepperRotation.current, {
        rotZ: 0,
        duration: 5,
        ease: 'power1.out',
      })
      gsap.to(bufferGeometryRef.current.attributes.position, {
        count: N,
        duration: 0.5,
      })
    }
    if (pepperArray.current && bufferGeometryRef.current) {
      bufferGeometryRef.current.setAttribute('aPosition', new THREE.BufferAttribute(pepperArray.current.array, 3))
    }
  })

  return (
    <points ref={pointsRef} position={[250, -50, -14000]}>
      <bufferGeometry ref={bufferGeometryRef} attach='geometry' >
        <bufferAttribute

          attachObject={['attributes', 'position']}
          array={positions}
          count={N}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          time: { value: 0 },
          uMouse: { value: new THREE.Vector2(mousePos.x, mousePos.y) },
          uAnimationProgress: { value: 0 }
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </points>
  )
}
