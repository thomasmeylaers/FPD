import React, { Suspense, useMemo, useRef, useContext, useEffect, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { DienstenContext } from '../pages/diensten'
import DienstenSphere from './DienstenSphere'
import { PerspectiveCamera, OrbitControls, shaderMaterial } from '@react-three/drei'

export default function DienstenCanvas() {
  const contextObject = useContext(DienstenContext)



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
      <DienstenSphere sphereContainer={contextObject.sphereContainer} setLoading={contextObject.setLoading} scrollRef={contextObject.scrollRef} mousePos={contextObject.mousePos.current} />

    </Canvas>

  )
}
