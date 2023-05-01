import React, { useState, useEffect } from "react";
import SectionHeader2 from "../../../SectionHeader2/SectionHeader2";
import Image from "../../../Image";

function ImageTile({ piece, index, }) {

  const [hover, setHover] = useState(false)

  function goToUrl(e) {
    window.open(piece.url, "_blank")
  }

  function zoomIn(e) {
    setHover(true)
  }

  function zoomOut(e) {
    setHover(false)
  }


  return (
    <div onMouseLeave={zoomOut} onMouseOver={zoomIn} onClick={goToUrl} data-scroll className={index % 2 == 1 ? "c-image-tile-container c-image-tile-odd" : "c-image-tile-container c-image-tile-even"}>
      <div className="c-image">
        <Image
          src={piece.imageLink}
          alt="Sunset Image"
          className="c-image-StaticImage"
          imgClassName={`c-image-inner-image ${hover ? 'c-image-hover' : ''}`}
        />
      </div>
      <div className="c-title">{piece.title}          <svg className='arrow' width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 1C21 0.447716 20.5523 1.14819e-06 20 8.95305e-07L11 1.6961e-06C10.4477 1.35892e-06 10 0.447717 10 1C10 1.55229 10.4477 2 11 2L19 2L19 10C19 10.5523 19.4477 11 20 11C20.5523 11 21 10.5523 21 10L21 1ZM1.70711 20.7071L20.7071 1.70711L19.2929 0.292895L0.292893 19.2929L1.70711 20.7071Z" fill="white" />
      </svg></div>
      <div className="c-description">{piece.description}</div>
    </div>
  )
}

export default function WerkSection() {
  const portfolio = [{ title: "Industria", description: "WordPress,  Development, UX/UI, Server Management", imageLink: "industria.png", url: "https://industria.be/" },
  { title: "Winters Gereedschapsmakerij", description: "Web Design, UX/UI, Development, Fotografie", imageLink: "winters.jpg", url: "https://gmwinters.be/" },
  { title: "Maison l'Aventure", description: "Web Design, UX/UI, Development, Fotografie, Film", url: "https://maisonlaventure.be/", imageLink: 'maison.jpg' }
  ]
  return (
    <section className="werk" data-scroll-section>
      <div className="container">
        {/* <SectionHeader2>
          ONS WERK
        </SectionHeader2> */}
        <div className="c-tiles-container">
          {portfolio.map((piece, index) => (
            <ImageTile index={index} key={index} piece={piece}></ImageTile>
          ))}
        </div>
      </div>
      <div id="bgChange"></div>
    </section>
  )
}

