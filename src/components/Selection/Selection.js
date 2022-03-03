import React, { useContext, useEffect, useRef } from 'react'
import { gsap } from "gsap"
import { WebGLContext } from '../../pages'

export default function Selection({ title, sub, state, number }) {
  const contextObject = useContext(WebGLContext)

  const selected = state[0]
  const setSelected = state[1]

  const titleRef = useRef()
  const subHeight = useRef()
  const subRef = useRef()

  const click = (e) => {
    setSelected(title)
  }



  useEffect(() => {
    contextObject.progressState.current = selected
    if (selected == title) {
      gsap.to(titleRef.current, {
        fontWeight: 500,
        opacity: 1,
        duration: 0.2,
      })

    } else {
      gsap.to(titleRef.current, {
        fontWeight: 200,
        duration: 0,
      })

    }
  }, [selected])
  return (
    <div className="selection scroll_reveal">
      <div ref={titleRef} onClick={click} className={`title ${selected == title ? "selected" : ""}`}>{number + ". " + title}</div>
    </div>
  )
}
