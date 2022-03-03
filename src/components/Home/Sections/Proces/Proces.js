import React, { useContext, useEffect, useState, useRef } from 'react'
import { WebGLContext } from '../../../../pages'
import SectionHeader from '../../../SectionHeader/SectionHeader'
import SectionHeader2 from '../../../SectionHeader2/SectionHeader2'
import Selection from '../../../Selection/Selection'
import Slider from '../../../Slider/Slider'

export default function Proces() {
  const contextObject = useContext(WebGLContext)
  const [selected, setSelected] = useState("BRIEFING")
  const texten = useRef({
    "BRIEFING": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut pteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "DESIGN": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero leo, pellentesque ornare, adipiscing vitae,s commodo, nulla. Fusce quis ipsum. Nulla neque massa, feugiat sed, commodo in, adipiscing ut,orper, neque.",
    "DEVELOPMENT": "Op deze tekst bestaan echter talloze varianten, die alleen de eerste zinsnede (Lorem ipsum dolor sit amet, consectetur adipisicing elit) steeds gemeen hebben. Zo is bijvoorbeeld ook de volgende tekst in omloop:",
    "FEEDBACK": "De eerste woorden van het Lorem Ipsum vinden hun oorsprong in het boek De finibus bonorum et malorum (Over de grenzen van goed en kwaad) van Marcus Tullius Cicero uit 45 voor Christus. In alinea 1.10.32 van dit boek komt namelijk de volgende zinsnede voor:"
  })





  return (
    <section className='proces' data-scroll-section>

      <div className="container">
        <div className="title_wrapper">
          <SectionHeader2 >
            ONS PROCES
          </SectionHeader2>
          <div className="title scroll_reveal">Lorem Ipsum is slechts een proeftekst uit ij- zetterijwezen. </div>
        </div>
        <div className="content_wrapper">
          <div className="selector_wrapper">
            <Selection state={[selected, setSelected]} title={"BRIEFING"} number={1} sub={"Lorem Ipsum is slechts een proeftekst uit ij- zetterijwezen. "} />
            <Selection state={[selected, setSelected]} title={"DESIGN"} number={2} sub={"Everything starts with an idea"} />
            <Selection state={[selected, setSelected]} title={"DEVELOPMENT"} number={3} sub={"Everything starts with an idea"} />
            <Selection state={[selected, setSelected]} title={"FEEDBACK"} number={4} sub={"Everything starts with an idea"} />
          </div>
          <div className="sub_wrapper">
            <div className="sub_hr"></div>

            <div className="sub scroll_reveal">
              {texten.current[selected]}
            </div>
          </div>


          <div ref={contextObject.progressContainer} className="progress_container">
            <Slider id="sliderHorizontal" orientation={"horizontal"} state={[selected, setSelected]} />
            <Slider id="sliderVertical" state={[selected, setSelected]} />
          </div>
        </div>
      </div>
    </section>
  )
}
