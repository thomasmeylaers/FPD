import React from 'react'
import Service from '../../Service/Service'

export default function DienstenSection({ scrollObject }) {

  const brandingItems = [["Logo design", "uitleg logo"], ["Drukwerk", "uitleg logo"], ["Fotografie & Video", "uitleg logo"], ["Copywriting", "uitleg logo"], ["Grafisch Design", "uitleg logo"], ["Style Guide", "uitleg logo"],]

  const digitalItems = [["Web design", "uitleg logo"], ["SEO", "uitleg logo"], ["E-Commerce", "uitleg logo"], ["Emailing", "uitleg logo"], ["Wordpress", "uitleg logo"], ["UI/UX", "uitleg logo"],]

  const developmentItems = [["Front-end", "uitleg logo"], ["Responsief", "uitleg logo"], ["Back-end", "uitleg logo"], ["Web Applicaties", "uitleg logo"],]

  return (
    <section className='diensten-section' data-scroll-section>
      <div className="container">
        <Service scrollObject={scrollObject} id={1} title={"branding"} caption={"Wij ontwerpen websites die met jou mee evolueren."} items={brandingItems} />
        <Service scrollObject={scrollObject} id={2} title={"digital"} caption={"Wij ontwerpen websites die met jou mee evolueren."} items={digitalItems} />
        <Service scrollObject={scrollObject} id={3} title={"development"} caption={"Wij ontwerpen websites die met jou mee evolueren."} items={developmentItems} />
      </div>
    </section>
  )
}
