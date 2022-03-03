import { StaticImage } from 'gatsby-plugin-image'
import React, { useContext, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { WebGLContext } from '../../pages'

export default function Scroll() {
  const contextObject = useContext(WebGLContext)

  const [arrowActive, setArrowActive] = useState(false)
  const arrowRef = useRef()
  const arrowEnter = () => {
    gsap.to(".arrow", {
      top: 25
    })
  }

  const arrowLeave = () => {
    // setArrowActive(false)
    gsap.to(".arrow", {
      top: 10
    })
  }

  const click = () => {
    contextObject.scrollObject.current.scrollTo("#scrollDownTarget")
  }

  return (
    <div onClick={click} onMouseEnter={arrowEnter} onMouseLeave={arrowLeave} className='scroll '>
      <StaticImage innerRef={arrowRef} className={`reveal arrow ${arrowActive ? "active" : ""}`} alt="arrow" src="../../images/right.svg" placeholder="tracedSVG" />
      <span className='reveal' >SCROLL</span>

    </div>
  )
}
