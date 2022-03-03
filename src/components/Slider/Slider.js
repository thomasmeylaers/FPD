import React, { useContext, useEffect, useRef, useCallback } from 'react'
import { gsap } from "gsap"
import { WebGLContext } from '../../pages'

export default function Slider({ id, state, orientation }) {
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


  useEffect(() => {
    // 20 is margin
    let offset = 0
    switch (selected) {
      case "BRIEFING":
        offset = 0
        break;
      case "DESIGN":
        offset = heights.current[0] + 20
        break
      case "DEVELOPMENT":
        offset = (heights.current[0] + 20) * 2
        break
      case "FEEDBACK":
        offset = (heights.current[0] + 20) * 3
        break
      default:
        break;
    }


  }, [selected])






  return (
    <div id={id} className={`slider ${orientation == "horizontal" ? "horizontal" : "vertical"}`}>
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
