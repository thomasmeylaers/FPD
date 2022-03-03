import React, { useContext, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Scroll from '../../../Scroll/Scroll'
import { WebGLContext } from '../../../../pages'

export default function Header() {
  const contextObject = useContext(WebGLContext)
  const sphere = useRef()
  useEffect(() => {
    contextObject.sphereContainer.current = sphere.current.getBoundingClientRect()
  })



  return (
    <section className='header' data-scroll-section>
      <div ref={sphere} className="sphere"></div>
      <div className="container">
        <div className="title skewed text-reveal">
          fresh <span className='red'>pepper</span> design
        </div>
        <div className="subtitle">
          <div className="line skewed text-reveal">
            Digital Design Company
          </div>
          <div className='line skewed text-reveal'>
            with Focus on Aesthetics
          </div>
        </div>
        <div id='headerAnimationTrigger' className="text skewed text-reveal" >With many years of experience in digital product development, we understand how to create user-friendly and memorable interfaces for the leading world companies. Properly and harmoniously, we integrate modern technologies into the classical graphic design aesthetics.</div>
      </div>
      <Scroll />
    </section>
  )
}
