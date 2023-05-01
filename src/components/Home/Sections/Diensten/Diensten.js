import React from 'react'
import Card from '../../../Card/Card'
import Card2 from '../../../Card2/Card2'
import SectionHeader from '../../../SectionHeader/SectionHeader'
import SectionHeader2 from '../../../SectionHeader2/SectionHeader2'

export default function Diensten() {
  return (
    <section className='diensten' data-scroll-section>
      <div className="container">
        <div className="title_wrapper">
          <SectionHeader2>
            DIENSTEN
          </SectionHeader2>
          <div className="title scroll_reveal">
            {/* We help brands be their most inspiring selves. Own their quirks - their edge - their culture. */}
            Wij helpen bedrijven om te inspireren en de juiste oplossing te vinden voor hun noden.
          </div>
        </div>
        <div className="content_wrapper">
          <Card2 title={"BRANDING"} items={["Logodesign", "Font & Color palette", "Fotografie", "Drukwerk"]} />

          <Card2 title={"DIGITAL"} items={["Webdesign", "E-Commerce", "SEO", "Email template & handtekening"]} />
          <Card2 title={"DEVELOPMENT"} items={["Front-end ", "Back-end ", "Responsive", "Web Applicaties"]} />
        </div>
      </div>
      {/* <div id='bgChange2'></div> */}

    </section>
  )
}
