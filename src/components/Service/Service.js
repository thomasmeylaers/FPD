import React, { useState, useEffect } from 'react'
import { gsap } from 'gsap'

export default function Service({ title, caption, items, id, scrollObject }) {

  const [selected, setSelected] = useState("")

  const onClick = (element) => {
    if (element == selected) {
      setSelected("")
    } else {
      setSelected(element)
    }
    if (scrollObject.current) {
      scrollObject.current.update()
    }
  }

  useEffect(() => {
    if (scrollObject.current) {
      scrollObject.current.update()
      setTimeout(() => {
        scrollObject.current.update()
      }, 1000);
    }

  }, [selected])

  return (
    <div className="service">
      <div className="service-wrapper">
        <div className="title-wrapper scroll_reveal">
          <div className="title">{id}. {title}</div>
        </div>
        <div className="content-wrapper">
          <div className="service-caption scroll_reveal">{caption}</div>
          <div className="items">
            <div className="items-left">
              {items.map((element, index) => {
                if (index % 2 == 1) {
                  return (
                    <div key={index} className={`items-item  ${element[0] == selected ? 'active' : ''}`}>
                      <div onClick={() => onClick(element[0])} className="item-title-wrapper">
                        <div className="item-title scroll_reveal">{element[0]}    </div>
                        <svg className='item-plus scroll_reveal' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.06055 2.22656H7.93945C8.01758 2.22656 8.05664 2.26562 8.05664 2.34375V12.6562C8.05664 12.7344 8.01758 12.7734 7.93945 12.7734H7.06055C6.98242 12.7734 6.94336 12.7344 6.94336 12.6562V2.34375C6.94336 2.26562 6.98242 2.22656 7.06055 2.22656Z" fill="black" />
                          <path d="M2.57812 6.94336H12.4219C12.5 6.94336 12.5391 6.98242 12.5391 7.06055V7.93945C12.5391 8.01758 12.5 8.05664 12.4219 8.05664H2.57812C2.5 8.05664 2.46094 8.01758 2.46094 7.93945V7.06055C2.46094 6.98242 2.5 6.94336 2.57812 6.94336Z" fill="black" />
                        </svg>
                        <svg className='item-minus' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.5 7.5H2.5" stroke="black" strokeWidth="2" strokeLinecap="round" />
                        </svg>

                      </div>
                      <div className="item-content">
                        {element[1]}
                      </div>

                    </div>
                  )
                }
              })}
            </div>
            <div className="items-right">
              {items.map((element, index) => {
                if (index % 2 == 0) {
                  return (
                    <div key={index} className={`items-item  ${element[0] == selected ? 'active' : ''}`}>
                      <div onClick={() => onClick(element[0])} className="item-title-wrapper">
                        <div className="item-title scroll_reveal">{element[0]}    </div>
                        <svg className='item-plus scroll_reveal' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.06055 2.22656H7.93945C8.01758 2.22656 8.05664 2.26562 8.05664 2.34375V12.6562C8.05664 12.7344 8.01758 12.7734 7.93945 12.7734H7.06055C6.98242 12.7734 6.94336 12.7344 6.94336 12.6562V2.34375C6.94336 2.26562 6.98242 2.22656 7.06055 2.22656Z" fill="black" />
                          <path d="M2.57812 6.94336H12.4219C12.5 6.94336 12.5391 6.98242 12.5391 7.06055V7.93945C12.5391 8.01758 12.5 8.05664 12.4219 8.05664H2.57812C2.5 8.05664 2.46094 8.01758 2.46094 7.93945V7.06055C2.46094 6.98242 2.5 6.94336 2.57812 6.94336Z" fill="black" />
                        </svg>
                        <svg className='item-minus' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.5 7.5H2.5" stroke="black" strokeWidth="2" strokeLinecap="round" />
                        </svg>

                      </div>
                      <div className="item-content">
                        {element[1]}
                      </div>

                    </div>
                  )
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
