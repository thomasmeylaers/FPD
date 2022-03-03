import React, { useMemo, useRef, useEffect } from 'react'
import { useFrame } from 'react-three-fiber'
import { smoothstep, smootherstep } from 'three/src/math/MathUtils'
import { gsap } from 'gsap'
import * as THREE from 'three'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"

import fragmentShader from './shaders/progress/fragmentShader.glsl'
import vertexShader from './shaders/progress/vertexShader.glsl'


export default function Progress({ mousePos, progressContainer, scrollRef, state }) {
  const pointsRef = useRef()
  const bufferGeometryRef = useRef()
  const progressContainerRect = useRef()
  const materialRef = useRef()
  const uAnimationProgress1 = useRef()
  uAnimationProgress1.current = { t: 0 }
  const torusCount1 = useRef(), torusCount2 = useRef(), torusCount3 = useRef()
  torusCount1.current = 0
  torusCount2.current = 0
  torusCount3.current = 0
  const knotCount = useRef()


  // Sphere positions
  let N = 25000
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
  useEffect(() => {
    progressContainerRect.current = progressContainer.current.getBoundingClientRect()

    // TORUS 
    const torus2 = new THREE.TorusGeometry(progressContainerRect.current.width / 3, 20, 16, 100, 0);
    torusCount2.current = torus2.attributes.position.count
    bufferGeometryRef.current.setAttribute('aPosition1', new THREE.BufferAttribute(torus2.attributes.position.array, 3))

    const torus3 = new THREE.TorusGeometry(progressContainerRect.current.width / 3, 20, 16, 100);
    torusCount3.current = torus3.attributes.position.count
    bufferGeometryRef.current.setAttribute('aPosition2', new THREE.BufferAttribute(torus3.attributes.position.array, 3))

    // KNOT
    const knot = new THREE.TorusKnotGeometry(progressContainerRect.current.width / 4, 20, 200, 16);
    knotCount.current = knot.attributes.position.count
    bufferGeometryRef.current.setAttribute('aPosition3', new THREE.BufferAttribute(knot.attributes.position.array, 3))

  }, [])


  useFrame(({ clock }, delta) => {
    // Position element
    gsap.to(pointsRef.current.position, {
      y: scrollRef.current - progressContainerRect.current.top + window.innerHeight / 2 - progressContainerRect.current.height / 2,
      x: progressContainerRect.current.left - window.innerWidth / 2 + progressContainerRect.current.width / 4,
      duration: 0
    })

    // console.log(bufferGeometryRef.current.attributes.position);
    // bufferGeometryRef.current.attributes.position.count = 1717

    // Different States
    // DESIGN
    if (state.current == "DEVELOPMENT") {
      gsap.to(bufferGeometryRef.current.attributes.position, {
        count: torusCount2.current,
        duration: 0.5,
      })
      gsap.to(materialRef.current.uniforms.uAnimationProgress1, {
        value: 1,
        ease: "power1.out",
        duration: 1,
      })
    } else {
      gsap.to(materialRef.current.uniforms.uAnimationProgress1, {
        value: 0,
        ease: "power1.out",
        duration: 1,
      })
    }

    // DEVELOPMENT
    if (state.current == "DEVELOPMENT") {
      gsap.to(bufferGeometryRef.current.attributes.position, {
        count: torusCount3.current,
        duration: 0.5,
      })
      gsap.to(materialRef.current.uniforms.uAnimationProgress2, {
        value: 1,
        ease: "power1.out",
        duration: 1,
      })
    } else {
      gsap.to(materialRef.current.uniforms.uAnimationProgress2, {
        value: 0,
        ease: "power1.out",
        duration: 1,
      })
    }
    // FEEDBACK
    if (state.current == "FEEDBACK") {
      gsap.to(bufferGeometryRef.current.attributes.position, {
        count: knotCount.current,
        duration: 0.5,
      })
      gsap.to(materialRef.current.uniforms.uAnimationProgress3, {
        value: 1,
        ease: "power1.out",
        duration: 3,
      })
    } else {
      gsap.to(materialRef.current.uniforms.uAnimationProgress3, {
        value: 0,
        ease: "power1.out",
        duration: 3,
      })
    }
  })
  return (
    <points ref={pointsRef} position={[250, -50, 0]}>
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
          uAnimationProgress1: { value: 0 },
          uAnimationProgress2: { value: 0 },
          uAnimationProgress3: { value: 0 },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </points>
  )
}
