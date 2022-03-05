import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { Link } from 'gatsby'

export default function Footer({ selected }) {
  const navLinks = useRef([])
  const [navSelected, setNavSelected] = useState(selected)
  const navArray = ["over ons", "werk", "contact", "diensten"]

  return (
    <div className="footer">
      <div className="hr"></div>
      <div className="content_wrapper scroll_reveal">
        <div className="link_wrapper">
          <div className="">
            <Link to="/" className="link">Fb</Link>
            <Link to="/" className="link">Ig</Link>
          </div>
          <Link to="/" className="link">+32 497 68 90 56</Link>
        </div>
        <div className="nav_wrapper">
          {navArray.map((element, index) => {
            return (
              <Link to={"/"} ref={(element) => navLinks.current.push(element)} key={index} className={`nav_link ${element == navSelected || element == selected ? "selected" : ""}`}>
                {element}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

