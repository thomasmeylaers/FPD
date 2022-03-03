import React from 'react'

export default function Card2({ title, items }) {
  return (
    <div className="card2">
      <div className="hr_wrapper">
        <div className="hr"></div>
      </div>
      <div className="card_wrapper2">
        <div className="title scroll_reveal">{title}</div>
        <div className="item_wrapper">
          <ul>
            {items.map((item, index) => {
              return (
                <li className='scroll_reveal' key={index}> {item} </li>
              )
            })}
            <li className='scroll_reveal'>...</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
