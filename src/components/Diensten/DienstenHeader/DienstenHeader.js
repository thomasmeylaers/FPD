import React, { useContext } from 'react'
import { DienstenContext } from '../../../pages/diensten'

export default function DienstenHeader() {

  const contextObject = useContext(DienstenContext)

  return (
    <section data-scroll-section className="diensten-header">
      <div className="container">
        <div className="title skewed text-reveal">
          We'll <span className='red'>solve any problem</span>  <br /> you throw at us
        </div>
      </div>
      <div ref={contextObject.sphereContainer} className="sphere-container"></div>
    </section>
  )
}
