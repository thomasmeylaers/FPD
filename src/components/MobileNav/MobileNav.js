import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function MobileNav({ selected }) {
  const navLinks = useRef([])
  const [navSelected, setNavSelected] = useState(selected)
  const navArray = ["over ons", "werk", "diensten", "contact"]




  return (
    <div className="mobileNav" data-scroll data-scroll-sticky data-scroll-target=".main">
      <div className="container">
        <Link to="/">
          <StaticImage placeholder="blurred" className="logo" src="../../images/FPD_logo.png" alt="Fresh Pepper Design Logo" /></Link>
        <div className="nav_links">
          {navArray.map((element, index) => {
            return (
              <Link to={`${element !== 'over ons' ? '/' + element : '/'}`} ref={(element) => navLinks.current.push(element)} key={index} className={`nav_link nav_reveal ${element == navSelected || element == selected ? "selected" : ""}`}>
                {element}
              </Link>
            )
          })}
        </div>
        <div className="link_wrapper">
          <div className='nav_reveal'>
            <a href="/" className="link ">Fb</a>
            <a href="/" className="link ">Ig</a>
          </div>
          <a className="link nav_reveal" href="tel:+32497689056">+32 497 68 90 56</a>
        </div>
      </div>
    </div>
  )
}
