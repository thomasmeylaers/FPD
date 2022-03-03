import React, { useContext, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { StaticImage } from 'gatsby-plugin-image'
import { WebGLContext } from '../../pages'

export default function Loader() {
  const contextObject = useContext(WebGLContext)


  useEffect(() => {
    // setTimeout(function () {
    //   contextObject.setLoading(false)
    // }, 100000)

  }, [])

  useEffect(() => {
    if (!contextObject.loading) {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.to('.caption', {
        opacity: 0
      }).to('.loader', {
        opacity: 0,
        duration: 1.5
      }).to('.loader', {
        display: 'none',
      }, "-=2")
    }
  }, [contextObject.loading])

  return (
    <div className={`loader `}>
      <div className="caption">
        {/* <StaticImage placeholder="blurred" className="loaderLogo" src="../../images/Logo.svg" alt="Fresh Pepper Design Logo" /> */}
        {/* <img src="images/FPD_logo.png" className='loaderLogo' alt="" /> */}
        <svg className="loaderLogo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 718.65 248.9"><defs><style></style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon className="cls-1" points="287.59 165.83 143.97 248.75 143.97 82.92 287.59 0 287.59 165.83" /><polygon className="cls-1" points="574.74 165.83 431.13 248.75 431.13 82.92 574.74 0 574.74 165.83" /><polygon className="cls-2" points="287.58 165.83 431.2 248.75 431.2 82.92 287.58 0 287.58 165.83" /><polygon className="cls-2" points="0 165.9 144 82.9 144 248.9 0 165.9" /><polygon className="cls-3" points="718.65 83 574.65 0 574.65 166 718.65 83" /></g></g></svg>
        <div className="hr"></div>
        <div className="name">FRESH <span>PEPPER</span> DESIGN</div>
      </div>
    </div>
  )
}
