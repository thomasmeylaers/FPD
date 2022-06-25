import React from 'react'
import ImageTile from '../../ImageTile/ImageTile'

export default function Pictures({ materialsRef }) {
  return (
    <section className='werk-pictures' data-scroll-section>
      <div className="container">
        <div className="content-wrapper">
          <ImageTile materialsRef={materialsRef} img={1} even={false} imgUrl={"winters"} title={"Winters"} id={"wintersImageTile"} text={"Web Design, UX/UI, Development, Fotografie"} />
          <ImageTile materialsRef={materialsRef} img={2} even={true} imgUrl={"maison"} title={"Maison l'Aventure"} id={"barBarbaraImageTile"} text={"Web Design, UX/UI, Development, Fotografie, Film"} />
        </div>
      </div>
    </section>
  )
}
