import PropTypes from 'prop-types'
import React, { Fragment, useEffect, useState } from 'react'
import HeaderOne from '../wrappers/header/HeaderOne'
import FooterOne from '../wrappers/footer/FooterOne'
import useWindowDimensions from '../helpers/useWindowDimensions'

const MainLayout = ({
  children,
  headerContainerClass,
  headerTop,
  headerPaddingClass,
  headerPositionClass,
}) => {

  const [headerHeight, setHeaderHeight] = useState(0)

  const { width } = useWindowDimensions()

  useEffect(() => {
    setHeaderHeight(width <= 991 ? 67 : 90)
  }, [width])

  return (
    <div className='main-container'>
      <HeaderOne
        layout={headerContainerClass}
        top={headerTop}
        headerPaddingClass={headerPaddingClass}
        headerPositionClass={headerPositionClass}
      />
      <main className='main-content' style={{ marginTop: headerHeight }}>
        {children}
      </main>
      <FooterOne
        backgroundColorClass='bg-gray'
        spaceTopClass='pt-100'
        spaceBottomClass='pb-70'
      />
    </div>
  )
}

MainLayout.propTypes = {
  children: PropTypes.any,
  headerContainerClass: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  headerPositionClass: PropTypes.string,
  headerTop: PropTypes.string,
}

export default MainLayout
