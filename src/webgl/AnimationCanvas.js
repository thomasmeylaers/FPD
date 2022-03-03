import React, { Suspense, useMemo, useRef, useContext, useEffect, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import * as THREE from 'three'
import { PerspectiveCamera, OrbitControls, shaderMaterial } from '@react-three/drei'
import glsl from 'babel-plugin-glsl/macro'
import { WebGLContext } from '../pages/index'


import Points from './Points'
import Pictures from './Pictures'
import Progress from './Progress'
import Sphere from './Sphere'
import Progress2 from './Progress2'
import Sentry from './Sentry'



export default function AnimationCanvas() {

  const contextObject = useContext(WebGLContext)
  const mousePosRef = contextObject.mousePosRef
  const scrollRef = contextObject.scrollRef


  return (
    <Canvas concurrent className='canvas'>
      <PerspectiveCamera
        fov={2 * Math.atan((window.innerHeight / 2) / 600) * (180 / Math.PI)}
        position={[0, 0, 600]}
        aspect={window.innerWidth / window.innerHeight}
        near={10}
        far={15000}
        makeDefault
      />
      {/* <Points scrollRef={scrollRef} sphereContainer={contextObject.sphereContainer} pepperRef={contextObject.pepperRef} mousePos={mousePosRef.current} /> */}
      {/* <mesh>
        <planeBufferGeometry args={[100, 100, 10, 10]} />
        <shaderMaterial
          uniforms={{
            time: { value: 0 }, color: { value: new THREE.Color(1.0, 1.0, 1.0) }
          }}
          vertexShader={vertex}
          fragmentShader={fragment}
        />
      </mesh> */}
      <Sphere loading={contextObject.loading} setLoading={contextObject.setLoading} scrollRef={scrollRef} sphereContainer={contextObject.sphereContainer} pepperRef={contextObject.pepperRef} mousePos={mousePosRef.current} timeRef={contextObject.timeRef} desktop={contextObject.desktop} />

      {contextObject.desktop ? <Pictures materialsRef={contextObject.materialsRef} scrollRef={scrollRef} /> : ""}

      {/* <Progress state={contextObject.progressState} mousePos={mousePosRef.current} progressContainer={contextObject.progressContainer} scrollRef={scrollRef} /> */}

      {contextObject.desktop ? <Progress2 state={contextObject.progressState} mousePos={mousePosRef.current} progressContainer={contextObject.progressContainer} scrollRef={scrollRef} /> : ""}

      {/* {loading ? "" : <Sphere scrollRef={scrollRef} sphereContainer={contextObject.sphereContainer} pepperRef={contextObject.pepperRef} mousePos={mousePosRef.current} />} */}

      <OrbitControls />
    </Canvas>

  )
}
