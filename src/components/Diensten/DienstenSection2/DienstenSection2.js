import React from 'react'
import Service2 from '../../Service2/Service2'

export default function DienstenSection2({ scrollObject }) {

  const brandingItems = [["Logo design", "uitleg logo"], ["Drukwerk", "uitleg logo"], ["Fotografie & Video", "uitleg logo"], ["Copywriting", "uitleg logo"], ["Grafisch Design", "uitleg logo"], ["Style Guide", "uitleg logo"],]

  const digitalItems = [["Web design", "uitleg logo"], ["SEO", "uitleg logo"], ["E-Commerce", "uitleg logo"], ["Emailing", "uitleg logo"], ["Wordpress", "uitleg logo"], ["UI/UX", "uitleg logo"],]

  const developmentItems = [["Front-end", "uitleg logo"], ["Responsief", "uitleg logo"], ["Back-end", "uitleg logo"], ["Web Applicaties", "uitleg logo"],]

  return (
    <section className='diensten-section' data-scroll-section>
      <div className="container">
        <Service2 scrollObject={scrollObject} id={1} title={"branding"} caption={"Ontwikkel een identiteit die bij jouw bedrijf past."} items={brandingItems} />
        <Service2 scrollObject={scrollObject} id={2} title={"digital"} caption={"Een digitale oplossing op maat."} items={digitalItems} />
        <Service2 scrollObject={scrollObject} id={3} title={"development"} caption={"Robuuste producten die op alle apparaten werken."} items={developmentItems} />
      </div>
    </section>
  )
}
