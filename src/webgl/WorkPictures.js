import React, { useRef, useEffect } from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import * as THREE from 'three'

import fragmentShader from './shaders/workPictures/fragmentShader.glsl'
import vertexShader from './shaders/workPictures/vertexShader.glsl'

export default function WorkPictures({ scrollRef, materialsRef }) {
  const imageArray = useRef()
  const imageStore = useRef()
  const materials = useRef()

  const state = useThree()


  useEffect(() => {
    materials.current = []
    materialsRef.current = materials.current
    imageArray.current = [...document.querySelectorAll('.imagePicture')]
    imageStore.current = imageArray.current.map(img => {
      let bounds = img.getBoundingClientRect()
      let geometry = new THREE.PlaneBufferGeometry(bounds.width, bounds.height, 10, 10);
      // const texture = new THREE.TextureLoader().load(img.src)
      // texture.needsUpdate = true;
      // let material = new THREE.MeshBasicMaterial({
      //   color: 0xfff000,
      // })
      let material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          intensity: { value: 1, type: 'f', min: 0., max: 3 },
          progress: { type: "f", value: 0 },
          uImage: {
            value: 0
          },
          texture1: { type: "f", value: new THREE.TextureLoader().load(`${img.src.slice(0, -4)}_1.jpg`) },
          texture2: { type: "f", value: new THREE.TextureLoader().load(`${img.src.slice(0, -4)}_2.jpg`) },

          displacement: { type: "f", value: new THREE.TextureLoader().load('/images/disp1.jpg') },
          resolution: { type: "v4", value: new THREE.Vector4() },
        },
        side: THREE.DoubleSide,
        fragmentShader: fragmentShader,
        vertexShader: vertexShader,
      })


      materials.current.push(material)
      // material.uniforms.uImage.value = texture;

      let mesh = new THREE.Mesh(geometry, material);
      state.scene.add(mesh)

      return {
        img: img,
        mesh: mesh,
        top: bounds.top,
        left: bounds.left,
        width: bounds.width,
        height: bounds.height
      }
    })

  }, [])


  useFrame(({ clock }, delta) => {
    const tick = clock.getElapsedTime()

    imageStore.current.forEach(o => {
      // o.mesh.position.y = scrollRef.current - o.top + window.innerHeight / 2 - o.height / 2;
      // o.mesh.position.x = o.left - window.innerWidth / 2 + o.width / 2;
      o.mesh.position.y = scrollRef.current - o.top + window.innerHeight / 2 - o.height / 2;
      o.mesh.position.x = o.left - window.innerWidth / 2 + o.width / 2;
    })
    // console.log(state.scene)
    materials.current.forEach(m => {
      m.uniforms.time.value = tick;
    })


  })

  return (
    <>

    </>
  )
}
