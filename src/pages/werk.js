import * as React from "react"
import { useEffect, useRef, useState } from "react";
import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Header from '../components/Work/Header/Header'
import Nav from '../components/Nav/Nav'
import MobileNav from "../components/MobileNav/MobileNav";
import Hamburger from "../components/Hamburger/Hamburger";
import WorkCanvas from "../webgl/WorkCanvas"
import AnimationCanvas from "../webgl/AnimationCanvas";
import Pictures from "../components/Work/Pictures/Pictures";
import Loader from "../components/Loader/Loader";
import Contact from "../components/Home/Sections/Contact/Contact";

export const WorkContext = React.createContext()


export default function Werk() {
  gsap.registerPlugin(ScrollTrigger);

  const containerRef = useRef()
  const scrollObject = useRef()
  const sphereContainer = useRef()
  const materialsRef = useRef()
  const mousePos = useRef()
  mousePos.current = { x: 0, y: 0 }
  const scrollRef = useRef()
  scrollRef.current = 0

  const [loading, setLoading] = useState(true)
  const [windowDefined, setWindowDefined] = useState(false)
  const [desktop, setDesktop] = useState(true)

  // Context
  let contextObject = { sphereContainer, loading, setLoading, mousePos, scrollRef, desktop, materialsRef }

  useEffect(() => {
    if (window !== "undefined") {
      if (window.innerWidth < 1200) {
        setDesktop(false)
      }



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
        delay: 1
      })
        .to('.canvas', {
          opacity: 1,
          delay: -1.3,
          duration: 1.5
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

  const handleMouseMove = (e) => {
    if (window !== "undefined") {
      gsap.to(mousePos.current, {
        x: (e.pageX * 2 - window.innerWidth) / 2,
        y: -(e.pageY * 2 - window.innerHeight) / 2,
        duration: 2,
        ease: 'power4.out'
      })
    }
  }

  const scrollFunction = (obj) => {
    scrollRef.current = obj.scroll.y
  }

  return (
    <>
      <WorkContext.Provider value={contextObject}>
        <Loader loading={loading} page={'werk'} />
        <MobileNav selected={'werk'} />
        {!desktop ? <Hamburger /> : ""}
        <main onMouseMove={handleMouseMove} className=".main work-main" data-scroll-container ref={containerRef}>
          <Nav selected="werk" />
          <Header />
          <Pictures materialsRef={materialsRef} />
          <Contact scrollObject={scrollObject} selected={'werk'} />
        </main>
        <div className="werk-bg"></div>
        {windowDefined ? <WorkCanvas /> : ""}
      </WorkContext.Provider>
    </>
  )
}
