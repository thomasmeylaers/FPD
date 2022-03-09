import React, { Suspense, useMemo, useRef, useContext, useEffect, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import * as THREE from 'three'
import { PerspectiveCamera, OrbitControls, shaderMaterial } from '@react-three/drei'
import glsl from 'babel-plugin-glsl/macro'
import WorkSphere from './WorkSphere'
import WorkPictures from './WorkPictures'
import { WorkContext } from '../pages/werk'





export default function WorkCanvas() {

  const contextObject = useContext(WorkContext)



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
      <WorkSphere sphereContainer={contextObject.sphereContainer} setLoading={contextObject.setLoading} scrollRef={contextObject.scrollRef} mousePos={contextObject.mousePos.current} />
      {contextObject.desktop ? <WorkPictures materialsRef={contextObject.materialsRef} scrollRef={contextObject.scrollRef} /> : ""}

    </Canvas>

  )
}
