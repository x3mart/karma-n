import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { animateScroll } from "react-scroll";
import FooterCopyright from "../../components/footer/FooterCopyright";
import FooterNewsletter from "../../components/footer/FooterNewsletter";

const FooterOne = ({
  backgroundColorClass,
  spaceTopClass,
  spaceBottomClass,
  spaceLeftClass,
  spaceRightClass,
  containerClass,
  extraFooterClass,
  sideMenu
}) => {
  const [scroll, setScroll] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    setTop(100);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <footer
      className={`footer-area ${
        backgroundColorClass ? backgroundColorClass : ''
      } ${spaceTopClass ? spaceTopClass : ''} ${
        spaceBottomClass ? spaceBottomClass : ''
      } ${extraFooterClass ? extraFooterClass : ''} ${
        spaceLeftClass ? spaceLeftClass : ''
      } ${spaceRightClass ? spaceRightClass : ''}`}
    >
      {' '}
      <div className={`${containerClass ? containerClass : 'container'}`}>
        <div className='row'>
          <div
            className={`${
              sideMenu ? 'col-xl-4 col-sm-4' : 'col-lg-4 col-sm-4'
            }`}
          >
            <FooterCopyright
              footerLogo='/assets/img/logo/logo.png'
              imageUrl='/assets/img/logo/logo-karman.png'
              logoText='карман'
            />
          </div>
          <div
            className={`${
              sideMenu ? 'col-xl-2 col-sm-2' : 'col-lg-2 col-sm-2'
            }`}
          >
            <div className='footer-widget mb-30 ml-30'>
              <div className='footer-title'>
                <h3>КАРМАН</h3>
              </div>
              <div className='footer-list'>
                <ul>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '/about'}>Вход/регистрация</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '#/'}>
                      Поиск отзывов
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '/contact'}>
                      Оставить отзыв
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '#/'}>
                      Личный кабинет
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`${
              sideMenu ? 'col-xl-2 col-sm-2' : 'col-lg-2 col-sm-2'
            }`}
          >
            <div className='footer-widget mb-30 ml-30'>
              <div className='footer-title'>
                <h3>МЫ В СОЦСЕТЯХ</h3>
              </div>
              <div className='footer-list'>
                <ul>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '/about'}>Facebook</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '#/'}>
                      Instagram
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '/contact'}>
                      Vkontakte
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '#/'}>
                      Tweeter
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`${
              sideMenu ? 'col-xl-4 col-sm-4' : 'col-lg-4 col-sm-4'
            }`}
          >
            <div
              className={`${
                sideMenu
                  ? 'footer-widget mb-30 ml-95'
                  : 'footer-widget mb-30 ml-50'
              }`}
            >
              <div className='footer-title'>
                <h3>СВЯЖИТЕСЬ С НАМИ</h3>
              </div>
              <div className='footer-list'>
                <ul>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '#/'}>Returns</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '#/'}>
                      Support Policy
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '#/'}>Size guide</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '#/'}>FAQs</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className={`scroll-top ${scroll > top ? 'show' : ''}`}
        onClick={() => scrollToTop()}
      >
        <i className='fa fa-angle-double-up'></i>
      </button>
    </footer>
  )
};

FooterOne.propTypes = {
  backgroundColorClass: PropTypes.string,
  containerClass: PropTypes.string,
  extraFooterClass: PropTypes.string,
  sideMenu: PropTypes.bool,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string
};

export default FooterOne;
