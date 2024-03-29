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
            Digital solutions
          </div>
          <div className='line skewed text-reveal'>
            with <span id='passion' className="red">passion</span>
          </div>
        </div>
        {/* <div id='headerAnimationTrigger' className="text skewed text-reveal" >With many years of experience in digital product development, we understand how to create user-friendly and memorable interfaces for the leading world companies. Properly and harmoniously, we integrate modern technologies into the classical graphic design aesthetics.</div> */}
        {/* <div id='headerAnimationTrigger' className="text skewed text-reveal" >Wij creëren unieke digitale ervaringen voor uw bedrijf om uw doelen te bereiken. Dit doen we door moderne technologie te integreren met een creatief design om zo een gebruiksvriendelijke interface te creëren voor uw klanten en zo uw boodschap de wereld in te sturen.</div> */}
        <div id='headerAnimationTrigger' className="text skewed text-reveal" >Ons team ontwikkelt digitale oplossingen met een focus op design. Wij bouwen websites, webapplicaties, e-commerce & meer.</div>
      </div>
      {/* <Scroll /> */}
    </section>
  )
}
