import React, { useContext } from 'react'
import { WorkContext } from '../../../pages/werk'

export default function Header({ caption }) {
  const contextObject = useContext(WorkContext)

  return (
    <section data-scroll-section className="work-header">
      <div className="container">
        <div className="title skewed text-reveal">
          <span className='red'>Experienced companies</span>, new players <br /> or ferocious startups
        </div>
      </div>
      <div ref={contextObject.sphereContainer} className="sphere-container"></div>
    </section>
  )
}
