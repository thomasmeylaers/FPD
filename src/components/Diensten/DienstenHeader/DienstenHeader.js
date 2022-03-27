import React, { useContext } from 'react'
import { DienstenContext } from '../../../pages/diensten'

export default function DienstenHeader() {

  const contextObject = useContext(DienstenContext)

  return (
    <section data-scroll-section className="diensten-header">
      <div className="container">
        <div className="title skewed text-reveal">
          <span className='red'>Experienced companies</span>, new players <br /> or ferocious startups
        </div>
      </div>
      <div ref={contextObject.sphereContainer} className="sphere-container"></div>
    </section>
  )
}
