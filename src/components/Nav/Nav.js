import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

export default function Nav({ selected }) {
  const textEffect = useRef([])
  const navLinks = useRef([])
  const [navSelected, setNavSelected] = useState(selected)
  const navArray = ["over ons", "werk", "diensten", "contact"]
  useEffect(() => {
    const items = ["over ons", "portfolio", "diensten", "contact"]
    if (textEffect.current[3]) {
      textEffect.current.forEach(element => {
        let innerText = element.innerText;
        element.innerHTML = '';

        let textContainer = document.createElement('div');
        textContainer.classList.add('block');

        for (let letter of innerText) {
          let span = document.createElement('span');
          span.innerText = letter.trim() === '' ? '\xa0' : letter;
          span.classList.add('letter');
          textContainer.appendChild(span);
        }

        element.appendChild(textContainer);
        element.appendChild(textContainer.cloneNode(true));
      });

    }
  }, [])
  const hover = () => {
    textEffect.current[0].classList.remove('play');
  }
  return (
    <div className='nav' data-scroll-section>

      <div data-scroll className="container text-reveal">
        <div className="nav__wrapper">
          <Link to="/werk">
            <StaticImage placeholder="blurred" className="nav__logo" src="../../images/FPD_logo.png" alt="Fresh Pepper Design Logo" /></Link>
          <div className="nav__links__wrapper">
            {/* {navArray.map((element, index) => {
              return (
                <Link to={`${element !== 'over ons' ? element : '/'}`} ref={(element) => navLinks.current.push(element)} key={index} className={`nav_link ${element == navSelected || element == selected ? "selected" : ""}`}>
                  {element}
                </Link>
              )
            })} */}
          </div>
          <div className="nav__links__mobile">
            <div className="nav_burger">
              <span className="nav_burger_line"></span>
              <span className="nav_burger_line"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
