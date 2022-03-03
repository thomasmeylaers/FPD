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
            <div className="title scroll_reveal">Lorem Ipsum is slechts een proeftekst uit het
              drukkerij- en zetterijwezen.</div>

            <div className="text_wrapper">
              <div className="text scroll_reveal">Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds
              </div>
              <div className="text scroll_reveal">Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds
              </div>
              <div className="text scroll_reveal">Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds
              </div>
              <div className="text_mobile scroll_reveal">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae ab tenetur sint, esse temporibus vero possimus, alias cumque veniam iste similique ducimus fuga quae aliquid quis ea reiciendis quos tempore. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus quisquam modi ducimus, nesciunt, eum impedit est adipisci eaque explicabo odit esse minus ipsum voluptatum atque nemo fugiat provident inventore quod.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
