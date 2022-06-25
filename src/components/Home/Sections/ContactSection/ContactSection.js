import { StaticImage } from 'gatsby-plugin-image'
import React, { useContext, useRef, useState } from 'react'
import { gsap } from "gsap"
import Footer from '../../../Footer/Footer'
import SectionHeader from '../../../SectionHeader/SectionHeader'
import { WebGLContext } from '../../../../pages'

export default function ContactSection({ scrollObject, selected }) {

  const arrowRef = useRef()

  const [arrowActive, setArrowActive] = useState(false)

  const arrowEnter = () => {
    gsap.to(".topArrow", {
      top: -65
    })
  }

  const arrowLeave = () => {
    // setArrowActive(false)
    gsap.to(".topArrow", {
      top: -50
    })
  }

  const topClick = () => {
    scrollObject.current.scrollTo('top')
  }


  return (
    <section className='contact' data-scroll-section>
      <div className="container">
        <StaticImage placeholder="blurred" className="logo scroll_reveal" src="../../images/FPD_logo.png" alt="Fresh Pepper Design Logo" />
        <div className="title scroll_reveal">Laten we samen iets geweldig maken</div>
        {/* <div className="sub scroll_reveal">Stuur ons een mailtje als u een vraag heeft of samen wilt werken.</div> */}
        <a href='mailto:info@freshpepperdesign.com' className="cta scroll_reveal">info@freshpepperdesign.com <StaticImage alt="arrow" className='arrow' src="../../images/arrow.svg" placeholder="tracedSVG" /></a>


        <Footer scrollObject={scrollObject} selected={selected} />
      </div>
      <div className="top" onClick={topClick}>
        <div id='bgChange2' className="arrow_wrapper">
          <StaticImage innerRef={arrowRef} className={`reveal arrow topArrow`} alt="arrow" src="../../images/right.svg" placeholder="tracedSVG" />
          <span onMouseEnter={arrowEnter} onMouseLeave={arrowLeave} className='reveal' >TOP</span>
        </div>
      </div>
    </section>
  )
}
