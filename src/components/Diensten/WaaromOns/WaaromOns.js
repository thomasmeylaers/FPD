import React from 'react'
import SectionHeader2 from '../../SectionHeader2/SectionHeader2'
import SectionHeader3 from '../../SectionHeader3/SectionHeader3'


function Reason({ title, text }) {
  return (
    <div className="reason-wrapper ">
      <div className="reason-title scroll_reveal">{title}</div>
      <div className="reason-text scroll_reveal">{text}</div>
    </div>
  )
}


export default function WaaromOns() {
  return (
    <section data-scroll-section className='waarom-ons'>
      <div className="container">
        <SectionHeader3 textColor={"white"} title={"waarom ons"} caption={"caption"} />
        <div className="reason-container">
          <Reason title={"Op maat gemaakt"} text={"Omdat we ervan overtuigd zijn dat elk project uniek is, stellen we automatisch oplossingen op maat voor. We gebruiken onze energie om een merkstrategie te bepalen die perfect bij jouw business past."} />
          <Reason title={"Op maat gemaakt"} text={"Omdat we ervan overtuigd zijn dat elk project uniek is, stellen we automatisch oplossingen op maat voor. We gebruiken onze energie om een merkstrategie te bepalen die perfect bij jouw business past."} />
          <Reason title={"Op maat gemaakt"} text={"Omdat we ervan overtuigd zijn dat elk project uniek is, stellen we automatisch oplossingen op maat voor. We gebruiken onze energie om een merkstrategie te bepalen die perfect bij jouw business past."} />
        </div>
      </div>
    </section>
  )
}
