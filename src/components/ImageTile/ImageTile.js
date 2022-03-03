import { StaticImage } from 'gatsby-plugin-image'
import React, { useContext } from 'react'
import { WebGLContext } from '../../pages';
import { gsap } from 'gsap'

export default function ImageTile({ img, title, text, even, id, imgUrl }) {
  const contextObject = useContext(WebGLContext)

  function mouseEnter(e) {
    gsap.to(contextObject.materialsRef.current[img - 1].uniforms.progress, {
      value: 1,
      duration: 1.2,
      // ease: 'power1.out',
    })
  }

  function mouseLeave(e) {
    gsap.to(contextObject.materialsRef.current[img - 1].uniforms.progress, {
      value: 0,
      duration: 1.2,
      // ease: 'power1.out',
    })
  }


  return (
    <div id={id} className={`image_tile ${even ? "even" : ""}`}>
      <div className="wrapper">
        {/* <div className="imagePicture"></div> */}
        {/* <StaticImage alt="astronaut" imgClassName='imgName' className='imagePicture' src='../../images/test.jpg' /> */}
        <img onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} src={`images/${imgUrl}.jpg`} className='imagePicture' />
        <div className="title scroll_reveal">{title}
          <StaticImage alt="arrow" className='arrow' src="../../images/arrow.svg" placeholder="tracedSVG" />
        </div>
        <div className="text scroll_reveal">{text}</div>
      </div>
    </div>
  )
}
