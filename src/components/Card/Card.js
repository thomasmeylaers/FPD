import React from 'react'

export default function Card({ title, items }) {
  return (
    <div className="card_wrapper">
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
  )
}
