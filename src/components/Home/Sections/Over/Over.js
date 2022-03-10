import React, { useContext, useEffect, useRef } from 'react'
import { WebGLContext } from '../../../../pages'
import SectionHeader from '../../../SectionHeader/SectionHeader'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader2 from '../../../SectionHeader2/SectionHeader2';

export default function Over() {
  gsap.registerPlugin(ScrollTrigger);
  const contextObject = useContext(WebGLContext)
  const pepper = useRef()

  useEffect(() => {
    // contextObject.pepperRef.current = { x: pepper.current.getBoundingClientRect().x, y: pepper.current.getBoundingClientRect().y }
    contextObject.pepperRef.current = pepper.current.getBoundingClientRect()

  })


  return (
    <section id='scrollDownTarget' data-scroll-section className="over">
      <div className="container">
        {/* <SectionHeader>
          OVER ONS
        </SectionHeader> */}
        <SectionHeader2>
          OVER ONS
        </SectionHeader2>
        <div className="wrapper">
          <div ref={pepper} className="pepper"></div>
          <div className="content_wrapper">
            <div className="title scroll_reveal">Wij maken appplicaties, websites en digitale producten.</div>

            <div className="text_wrapper">
              <div className="text scroll_reveal"><b>CHANGE-MAKING</b> <br /> <p>Ons team bestaat uit mensen met diverse talenten gefocust op een creative ontwikkeling.</p>
              </div>
              <div className="text scroll_reveal"><b>FUTURE-PROOF</b> <br /> <p>De digitale wereld staat niet stil, daarom leveren wij producten die ook morgen nog relevant zijn.</p>
              </div>
              <div className="text scroll_reveal"><b>PURPOSE-DRIVEN</b> <br /> <p>Voor wij beginnen aan het design bedenken wij een strategie om uw specifieke doelen te bereiken.</p>
              </div>
              <div className="text_mobile scroll_reveal"><b>CHANGE-MAKING</b> <br /> <p>Ons team bestaat uit mensen met diverse talenten gefocust op een creative ontwikkeling.</p><b>FUTURE-PROOF</b> <br /> <p>De digitale wereld staat niet stil, daarom leveren wij producten die ook morgen nog relevant zijn.</p><b>PURPOSE-DRIVEN</b> <br /> <p>Voor wij beginnen aan het design bedenken wij een strategie om uw specifieke doelen te bereiken.</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
