import React from 'react'

export default function SectionHeader3({ title, caption, textColor }) {
  return (
    <div className={`sectionheader-3 ${textColor} `}>
      <div className="title-wrapper">
        <div className="title scroll_reveal">{title}</div>
      </div>
      <div className="caption-wrapper">
        <div className=" scroll_reveal sectionheader-caption">
          {caption}
        </div>
      </div>
    </div>
  )
}
