import React, { useContext, useEffect, useState, useRef } from 'react'
import { WebGLContext } from '../../../../pages'
import SectionHeader from '../../../SectionHeader/SectionHeader'
import SectionHeader2 from '../../../SectionHeader2/SectionHeader2'
import Selection from '../../../Selection/Selection'
import Slider from '../../../Slider/Slider'
import Slider2 from '../../../Slider2/Slider2'
import { gsap } from 'gsap'

export default function Proces() {
  const contextObject = useContext(WebGLContext)
  const [selected, setSelected] = useState("BRIEFING")
  const [lastSelected, setLastSelected] = useState("BRIEFING")
  const texten = useRef({
    "BRIEFING": "Bij de briefing fase bespreken we samen met u wat de noden zijn voor uw bedrijf en welke diensten er nodig zijn om tot uw doel te komen. Wij gaan ook een marktonderzoek doen om te kijken wat de concurrentie doet en hoe we zo goed mogelijk uw doelpubliek kunnen berijken.",
    "DESIGN": "Wij maken een design dat uw boodschap duidelijk en op een creatieve manier overbrengt naar de klant. Wij streven naar een design dat perfect overeenkomt met het brand van uw bedrijf en gebruiksvriendelijk is voor alle mogelijk toestellen. Er is steeds een wisselwerking met u waar we regelmatig een update geven waar we staan om een zo goed mogelijk product te leveren.",
    "DEVELOPMENT": "Als het design gefinaliseerd is gaan we over tot de ontwikkeling. Uw product wordt voor het correcte platform ontwikkeld om zo uw klanten het best te kunnen bereiken. Met onze expertise en moderne technologie zorgen we voor een creatieve, maar functionele digitale ervaring.",
    "FEEDBACK": "Na de finalisatie en de uitrolling van het product blijft er een continue wisselwerking met u. Wij geven u data over hoe het product presteert. Samen met u proberen we zo het product te verbeteren zodat uw boodschap door zoveel mogelijk mensen gezien kan worden."
  })
  const progresses = useRef({
    "BRIEFING": { x: 0, y: 0 },
    "DESIGN": { x: 0, y: 0 },
    "DEVELOPMENT": { x: 0, y: 0 },
    "FEEDBACK": { x: 0, y: 0 },
  })

  useEffect(() => {
    // OLD
    progresses.current[lastSelected].x = contextObject.sliderProgress.current.x
    progresses.current[lastSelected].y = contextObject.sliderProgress.current.y

    if (contextObject.horizontalSliderRect.current) {

      gsap.to('#sliderArrowHorizontal', {
        y: contextObject.horizontalSliderRect.current.width * progresses.current[selected].x - 2,
        duration: 1,
        ease: 'power1.out'
      })
      gsap.to('#sliderArrowVertical', {
        y: contextObject.horizontalSliderRect.current.width * progresses.current[selected].y - 2,
        duration: 1,
        ease: 'power4.out'
      })
      gsap.to(contextObject.sliderProgress.current, {
        x: progresses.current[selected].x,
        y: progresses.current[selected].y,
        duration: 0,
        ease: 'power1.out'
      })
    }
    setLastSelected(selected)
  }, [selected])

  return (
    <section className='proces' data-scroll-section>

      <div className="container">
        <div className="title_wrapper">
          <SectionHeader2 >
            ONS PROCES
          </SectionHeader2>
          <div className="title scroll_reveal">Een proces waar we samenwerken om tot een finaal product te komen.</div>
        </div>
        <div className="content_wrapper">
          <div className="selector_wrapper">
            <Selection state={[selected, setSelected]} title={"BRIEFING"} number={1} sub={"Lorem Ipsum is slechts een proeftekst uit ij- zetterijwezen. "} />
            <Selection state={[selected, setSelected]} title={"DESIGN"} number={2} sub={"Everything starts with an idea"} />
            <Selection state={[selected, setSelected]} title={"DEVELOPMENT"} number={3} sub={"Everything starts with an idea"} />
            <Selection state={[selected, setSelected]} title={"FEEDBACK"} number={4} sub={"Everything starts with an idea"} />
          </div>
          <div className="cunt">
            <div className="sub_wrapper">
              <div className="sub_hr"></div>

              <div className="sub scroll_reveal">
                {texten.current[selected]}
              </div>
            </div>
          </div>

          <div ref={contextObject.progressContainer} className="progress_container">
            <Slider2 id="sliderVertical" state={[selected, setSelected]} />
            <Slider2 id="sliderHorizontal" orientation={"horizontal"} state={[selected, setSelected]} />
          </div>
        </div>
      </div>
    </section>
  )
}
