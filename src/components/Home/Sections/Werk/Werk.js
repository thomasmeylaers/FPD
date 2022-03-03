import React, { useContext } from 'react'
import { WebGLContext } from '../../../../pages'
import ImageTile from '../../../ImageTile/ImageTile'
import SectionHeader from '../../../SectionHeader/SectionHeader'
import SectionHeader2 from '../../../SectionHeader2/SectionHeader2'

export default function Werk() {
  const contextObject = useContext(WebGLContext)

  return (
    <section className='werk' data-scroll-section >
      <div className="container">
        <SectionHeader2>
          ONS WERK
        </SectionHeader2>
        <div className="content_wrapper">
          <ImageTile img={1} even={false} imgUrl={"winters"} title={"Winters"} id={"wintersImageTile"} text={"Web Design, UX/UI, Development, Fotografie"} />
          <ImageTile img={2} even={true} imgUrl={"barbara"} title={"Bar Barbara"} id={"barBarbaraImageTile"} text={"Web Design, UX/UI, Development, Fotografie, Film"} />
          <div id="bgChange"></div>
        </div>
      </div>
    </section>
  )
}