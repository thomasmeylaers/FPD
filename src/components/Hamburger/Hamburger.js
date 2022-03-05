import React, { useContext, useEffect, useState } from 'react'
import { gsap } from "gsap"
import { WebGLContext } from '../../pages'

export default function Hamburger() {
  const contextObject = useContext(WebGLContext)
  const [navShow, setNavShow] = useState(false)

  const click = (e) => {
    setNavShow(!navShow)
  }

  useEffect(() => {
    if (navShow) {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.to('.mobileNav', {
        yPercent: 100,
        duration: 1
      })
      tl.to('.nav_reveal', {
        clipPath: 'polygon(0 0,100% 0, 100% 100%, 0 100%)',
        transform: "translateY(0) skewY(0deg)",
        stagger: .05,
        duration: 1,
        delay: 0.5
      }, '-=1.1')

      gsap.to('#hamburger_line_1', {
        transformOrigin: "center center",
        rotateZ: "45deg",
        translateY: "4px",
        ease: 'power4.out'
      })

      gsap.to('#hamburger_line_2', {
        transformOrigin: "center center",
        rotateZ: "-45deg ",
        translateY: "-4px",
        ease: 'power4.out'
      })

    } else {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.to('.mobileNav', {
        yPercent: -100,
        duration: 1
      })
      tl.to('.nav_reveal', {
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        transform: "translateY(2rem) skewY(5deg)",
        duration: 0,
      }, "-=2")

      gsap.to('#hamburger_line_1', {
        transformOrigin: "center center",
        rotateZ: "0deg",
        translateY: "0px",
        ease: 'power4.out'
      })

      gsap.to('#hamburger_line_2', {
        transformOrigin: "center center",
        rotateZ: "0deg ",
        translateY: "0px",
        ease: 'power4.out'
      })
    }
  }, [navShow])

  return (
    <div onClick={click} className="hamburger" data-scroll data-scroll-sticky data-scroll-target=".main">
      <div className="hamburger_wrapper">
        <div id='hamburger_line_1' className="hamburger_line"></div>
        <div id='hamburger_line_2' className="hamburger_line"></div>
      </div>
    </div>
  )
}
