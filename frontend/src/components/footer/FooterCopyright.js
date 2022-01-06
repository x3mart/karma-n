import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const FooterCopyright = ({
  footerLogo,
  spaceBottomClass,
  colorClass,
  imageUrl,
  logoText,
}) => {
  const [date, setDate] = useState()

  useEffect(() => {
    setDate(new Date().getFullYear())
  }, [])

  return (
    <div
      className={`copyright ${spaceBottomClass ? spaceBottomClass : ''} ${
        colorClass ? colorClass : ''
      }`}
    >
      <div className='footer-logo'>
        <Link to={process.env.PUBLIC_URL + '/'} className='logo-link'>
          {imageUrl && logoText ? (
            <div className='d-flex flex-column'>
              <img
                className='logo-image'
                alt=''
                src={process.env.PUBLIC_URL + imageUrl}
                width='50px'
              />
              <div className='footer-logo-text'>{logoText}</div>
            </div>
          ) : imageUrl ? (
            <img alt='' src={process.env.PUBLIC_URL + imageUrl} width='50px' />
          ) : logoText ? (
            <p className='logo-text'>{logoText}</p>
          ) : (
            ''
          )}
        </Link>
      </div>
      <p>© {date}</p>
      <p>Поиск отзывов о физических и юридических лицах по номеру телефона</p>
    </div>
  )
}

export default FooterCopyright
