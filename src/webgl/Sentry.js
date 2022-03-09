import React from 'react'

export default function Sentry() {
  return (
    <mesh>
      <sphereGeometry args={[500, 64, 64]} />
      <meshBasicMaterial color={"red"} />
    </mesh>
  )
}
