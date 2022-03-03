import React, { useContext, useEffect, useRef, useCallback } from 'react'
import { gsap } from "gsap"
import { WebGLContext } from '../../pages'

export default function Slider2({ id, state, orientation }) {
  const partRef = useRef([])
  const heights = useRef([])
  const arrowRef = useRef()

  const contextObject = useContext(WebGLContext)
  const mousePos = useRef(contextObject.mousePosRef.current)


  const selected = state[0]
  const setSelected = state[1]

  useEffect(() => {
    // part0.current = part0.current.getBoundingClientRect().height
    partRef.current.forEach((el) => {
      heights.current.push(el.getBoundingClientRect().height)
    })
  }, [])


  const cunt = (e) => {
    console.log("X: " + e.clientX + " | Y: " + e.clientY)
    e.preventDefault()

    gsap.to("#sliderArrowHorizontal", {
      y: e.clientX / window.innerWidth * 100
    }
    )
  }


  const mouseDown = (e) => {
    e.preventDefault()
    if (orientation == "horizontal") {
      contextObject.horizontalSliderRecording.current = true
    } else {
      contextObject.verticalSliderRecording.current = true
    }
  }

  return (
    <div onMouseDown={mouseDown} id={id} className={`slider2 ${orientation == "horizontal" ? "horizontal" : "vertical"}`}>
      <div ref={arrowRef} className="arrow"><svg id={`${orientation == "horizontal" ? "sliderArrowHorizontal" : "sliderArrowVertical"}`} width="8" height="8" viewBox="0 0 3 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id='sliderArrowPath' d="M3 2L3.13704e-07 3.73205L4.65125e-07 0.267949L3 2Z" fill="black" />
      </svg>
      </div>
      <div className="slider_wrapper">
        <div ref={(el) => partRef.current.push(el)} className="part">
          <div className="big"></div>
          <div className="small"></div>
          <div className="small"></div>
          <div className="small"></div>
        </div>
        <div ref={(el) => partRef.current.push(el)} className="part">
          <div className="big"></div>
          <div className="small"></div>
          <div className="small"></div>
          <div className="small"></div>
        </div>
        <div ref={(el) => partRef.current.push(el)} className="part">
          <div className="big"></div>
          <div className="small"></div>
          <div className="small"></div>
          <div className="small"></div>
        </div>
        <div ref={(el) => partRef.current.push(el)} className="part">
          <div className="big"></div>
        </div>
      </div>
    </div>
  )
}
