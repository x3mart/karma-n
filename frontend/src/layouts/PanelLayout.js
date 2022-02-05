import React, { Fragment, useEffect, useState } from 'react'

const PanelLayout = ({children, title, heading}) => {

  return (
    <>
      <div className='panel'>
        <div className='bio-graph-heading'>{title}</div>
        <div className='panel-body bio-graph-info mb-4'>
          <div className='reviews-page-wrapper'>
            <div className='mb-4' style={{ fontSize: 24 }}>
              {heading}
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default PanelLayout
