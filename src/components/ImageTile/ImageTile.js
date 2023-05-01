import { StaticImage } from 'gatsby-plugin-image'
import React, { useContext } from 'react'
import { WebGLContext } from '../../pages';
import { gsap } from 'gsap'

export default function ImageTile({ img, title, text, even, id, imgUrl, materialsRef }) {
  const contextObject = useContext(WebGLContext)

  function mouseEnter(e) {
    gsap.to(materialsRef.current[img - 1].uniforms.progress, {
      value: 1,
      duration: 0.8,
      ease: 'power1.out',
    })
  }

  function mouseLeave(e) {
    gsap.to(materialsRef.current[img - 1].uniforms.progress, {
      value: 0,
      duration: 0.8,
      ease: 'power1.out',
    })
  }

  function goToUrl(e) {
    if (imgUrl == "winters") {
      window.open("https://freshpepperdesign.com/winters/", "_blank")
    } else {
      window.open("https://maisonlaventure.be/index.html", "_blank")

    }
  }

  return (
    <div onClick={goToUrl} id={id} className={`image_tile ${even ? "even" : ""}`}>
      <div className="wrapper">
        {/* <div className="imagePicture"></div> */}
        {/* <StaticImage alt="astronaut" imgClassName='imgName' className='imagePicture' src='../../images/test.jpg' /> */}
        <img onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} src={`/images/${imgUrl}.jpg`} className='imagePicture' />
        <div className="title scroll_reveal">{title}
          <svg className='arrow' width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 1C21 0.447716 20.5523 1.14819e-06 20 8.95305e-07L11 1.6961e-06C10.4477 1.35892e-06 10 0.447717 10 1C10 1.55229 10.4477 2 11 2L19 2L19 10C19 10.5523 19.4477 11 20 11C20.5523 11 21 10.5523 21 10L21 1ZM1.70711 20.7071L20.7071 1.70711L19.2929 0.292895L0.292893 19.2929L1.70711 20.7071Z" fill="black" />
          </svg>

          {/* <StaticImage alt="arrow" className='arrow' src="../../images/arrow.svg" placeholder="tracedSVG" /> */}
        </div>
        <div className="text scroll_reveal">{text}</div>
      </div>
    </div>
  )
}
