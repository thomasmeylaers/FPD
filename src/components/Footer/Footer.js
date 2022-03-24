import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { Link } from 'gatsby'

export default function Footer({ scrollObject, selected }) {
  const navLinks = useRef([])
  const [navSelected, setNavSelected] = useState(selected)
  const navArray = ["over ons", "werk", "diensten", "contact"]


  const click = () => {
    if (scrollObject.current) {
      scrollObject.current.destroy()
    }
  }

  return (
    <div className="footer">
      <div className="hr"></div>
      <div className="content_wrapper scroll_reveal">
        <div className="link_wrapper">
          <div className="socials">
            <Link to="/" className="link socials_link">Fb</Link>
            <Link to="/" className="link socials_link">Ig</Link>
          </div>
          <a className='link' href="tel:+32497689056">+32 497 68 90 56</a>
        </div>
        <div className="nav_wrapper">
          {navArray.map((element, index) => {
            return (
              <Link onClick={click} to={`${element !== 'over ons' ? '/' + element : '/'}`} ref={(element) => navLinks.current.push(element)} key={index} className={`nav_link ${element == navSelected || element == selected ? "selected" : ""}`}>
                {element}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

