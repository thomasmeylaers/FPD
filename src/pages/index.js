import * as React from "react"
import { useEffect, useRef, useState } from "react";
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../styles/styles.scss"
import Nav from "../components/Nav/Nav"
import Header from "../components/Home/Sections/Header/Header"
import AnimationCanvas from "../webgl/AnimationCanvas";
import Over from "../components/Home/Sections/Over/Over";
import Werk from "../components/Home/Sections/Werk/Werk";
import Proces from "../components/Home/Sections/Proces/Proces";
import Diensten from "../components/Home/Sections/Diensten/Diensten";
import Contact from "../components/Home/Sections/Contact/Contact";
import Loader from "../components/Loader/Loader";
import Hamburger from "../components/Hamburger/Hamburger";
import MobileNav from "../components/MobileNav/MobileNav";

export const WebGLContext = React.createContext()


const IndexPage = () => {
  gsap.registerPlugin(ScrollTrigger);

  // Refs
  const containerRef = useRef()
  const scrollRef = useRef()
  scrollRef.current = 0
  const mousePosRef = useRef()
  mousePosRef.current = { x: 0, y: 0 }
  const pepperRef = useRef()
  const sphereContainer = useRef()
  const scrollObject = useRef()
  const materialsRef = useRef()
  const progressContainer = useRef()
  const progressTop = useRef()
  const progressState = useRef()
  const contactTop = useRef()
  const pageColor = useRef()
  pageColor.current = "dark"
  const timeRef = useRef()

  const horizontalSliderRect = useRef()
  const horizontalSliderRecording = useRef(false)
  const verticalSliderRect = useRef()
  const verticalSliderRecording = useRef(false)

  const sliderProgress = useRef({ x: 0, y: 0 })

  // State
  const [loading, setLoading] = useState(true)
  const [windowDefined, setWindowDefined] = useState(false)
  const [desktop, setDesktop] = useState(true)


  //Context
  let contextObject = { mousePosRef, scrollRef, pepperRef, sphereContainer, materialsRef, progressContainer, progressState, timeRef, loading, setLoading, desktop, scrollObject, horizontalSliderRecording, verticalSliderRecording, sliderProgress, horizontalSliderRect }

  let scrollFunction = (obj) => {
    scrollRef.current = obj.scroll.y
    if (desktop) {
      if (window !== "undefined") {
        if (progressTop.current && contactTop.current) {
          if (obj.scroll.y <= progressTop.current) {
            pageColor.current = "dark"
          } else if (obj.scroll.y + window.innerHeight > contactTop.current) {
            pageColor.current = "dark"
          } else if (progressTop.current < obj.scroll.y && obj.scroll.y <= contactTop.current) {
            pageColor.current = "white"
          }
        }

      }

      let bgColor = "#000"

      if (pageColor.current == "dark") {
        gsap.to('.bg', {
          backgroundColor: bgColor
        })
        gsap.to('.big, .small', {
          backgroundColor: '#f5f5f5'
        })
        gsap.to('#sliderArrowPath', {
          fill: '#f5f5f5'
        })
        gsap.to('.proces', {
          color: '#f5f5f5'
        })
        gsap.to('body', {
          color: "#f5f5f5"
        })
      } else {
        gsap.to('.proces, .diensten, body', {
          color: bgColor
        })
        gsap.to('.big, .small', {
          backgroundColor: bgColor
        })
        gsap.to('#sliderArrowPath', {
          fill: bgColor
        })
        gsap.to('.bg', {
          backgroundColor: "#f5f5f5"
        })
      }
    }

  }


  useEffect(() => {
    if (window !== "undefined") {
      if (window.innerWidth < 1200) {
        setDesktop(false)
      }

      let rect = document.querySelector("#bgChange").getBoundingClientRect()
      progressTop.current = rect.y - rect.height - window.innerHeight * 0.2
      let rect2 = document.querySelector("#bgChange2").getBoundingClientRect()
      contactTop.current = rect2.y - rect2.height
      horizontalSliderRect.current = document.querySelector("#sliderHorizontal").getBoundingClientRect()

      // Locomotive scroll init
      scrollObject.current = new LocomotiveScroll({
        el: containerRef.current,
        smooth: true,
        // lerp: .05,
        multiplier: .8
      });
      scrollObject.current.on("scroll", scrollFunction)
      scrollObject.current.on("scroll", ScrollTrigger.update)

      // ScrollTrigger
      ScrollTrigger.scrollerProxy("[data-scroll-container]", {
        scrollTop(value) {
          return arguments.length ? scrollObject.current.scrollTo(value, 0, 0) : scrollObject.current.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: containerRef.current.style.transform ? "transform" : "fixed"
      });

      gsap.utils.toArray(".scroll_reveal").forEach(element => {
        gsap.to(element, {
          clipPath: 'polygon(0 0,100% 0, 100% 100%, 0 100%)',
          transform: "skewY(0deg)",
          duration: 1,
          scrollTrigger: {
            scroller: "[data-scroll-container]",
            trigger: element,
          }
        })
      })

      // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
      // ScrollTrigger.addEventListener("refresh", () => scrollObject.current.update());


      // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
      ScrollTrigger.refresh();
    }
    setWindowDefined(true)
  }, [])

  useEffect(() => {
    if (!loading) {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.to('.text-reveal', {
        clipPath: 'polygon(0 0,100% 0, 100% 100%, 0 100%)',
        transform: "skewY(0deg)",
        stagger: .3,
        duration: 1.5,
        delay: 0.5
      }).to('.reveal', {
        opacity: 1,
        duration: 1,
        delay: -2
      }).to('.hamburger', {
        opacity: 1,
        delay: -3,
        duration: 2
      })

    }
  }, [loading])

  // Get normalized mouse position
  const handleMouseMove = (e) => {
    verticalSliderRect.current = document.querySelector("#sliderVertical").getBoundingClientRect()

    if (window !== "undefined") {
      gsap.to(mousePosRef.current, {
        x: (e.pageX * 2 - window.innerWidth) / 2,
        y: -(e.pageY * 2 - window.innerHeight) / 2,
        duration: 2,
        ease: 'power4.out'
      })
      if (horizontalSliderRecording.current) {
        if (e.pageX > horizontalSliderRect.current.x && e.pageX < (horizontalSliderRect.current.x + horizontalSliderRect.current.width)) {
          gsap.to('#sliderArrowHorizontal', {
            y: (e.pageX - horizontalSliderRect.current.x) - 2,
            duration: 1,
            ease: 'power1.out'
          })
          gsap.to(sliderProgress.current, {
            x: (e.pageX - horizontalSliderRect.current.x) / horizontalSliderRect.current.width,
            duration: 1,
            ease: 'power1.out'
          })
        }

        // gsap.to('#sliderArrowVertical', {
        //   y: e.pageY / window.innerHeight * sliderWidth.current - 1,
        //   duration: 1,
        //   ease: 'power4.out'
        // })
      }
      if (verticalSliderRecording.current) {
        if (e.pageY > verticalSliderRect.current.y && e.pageY <= verticalSliderRect.current.y + horizontalSliderRect.current.width) {
          gsap.to('#sliderArrowVertical', {
            y: e.pageY - verticalSliderRect.current.y - 2,
            duration: 1,
            ease: 'power4.out'
          })
          gsap.to(sliderProgress.current, {
            y: (e.pageY - verticalSliderRect.current.y) / horizontalSliderRect.current.width,
            duration: 1,
            ease: 'power1.out'
          })
        }
      }
    }
  }
  const mouseUp = (e) => {

    horizontalSliderRecording.current = false

    verticalSliderRecording.current = false


  }

  return (
    <>
      <WebGLContext.Provider value={contextObject}>
        <Loader />
        {!desktop ? <Hamburger /> : ""}
        <MobileNav selected={'over ons'} />
        <main className=".main" onMouseUp={mouseUp} onMouseMove={handleMouseMove} data-scroll-container ref={containerRef}>
          <Nav selected="over ons" />
          <Header />
          <Over />
          <Werk />
          <Proces />
          <Diensten />
          <Contact />

        </main>
        <div className="bg"></div>
        {windowDefined ? <AnimationCanvas /> : ""}


      </WebGLContext.Provider>
    </>
  )
}

export default IndexPage



