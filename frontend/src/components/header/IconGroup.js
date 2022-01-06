import PropTypes from "prop-types";
import React, {Fragment, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../redux/actions/authActions";

const IconGroup = ({
                     iconWhiteClass,
                     isAuthenticated,
                     logout,
                     user
                   }) => {
  const handleClick = e => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const logout_user = () => {
    logout();
  };

  const authLinks = () => (
    <Fragment>
      <li>
        <Link to={process.env.PUBLIC_URL + "/profile"}>
          Моя страница
        </Link>
      </li>
      <li>
        <a className='nav-link' href='' onClick={() => logout_user()}>Выход</a>

      </li>
    </Fragment>
  );

  const guestLinks = () => (
    <Fragment>
      <li>
        <Link to={process.env.PUBLIC_URL + "/register"}>
          Регистрация
        </Link>
      </li>
      <li>
        <Link to={process.env.PUBLIC_URL + "/login"}>
          Вход
        </Link>
      </li>
    </Fragment>
  );

  return (
    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ''}`}
    >
      <div className='same-style cart-wrap d-flex justify-content-between'>
        <Link to='/search' className='d-flex align-items-center add-review'>
          <i className='pe-7s-search mr-2' style={{ fontSize: 30 }} />
        </Link>
      </div>
      <div className='same-style cart-wrap d-flex justify-content-between'>
        <Link to='/review' className='d-flex align-items-center add-review'>
          <i className='pe-7s-plus mr-2' style={{ fontSize: 30 }} />
        </Link>
      </div>
      <div className='same-style cart-wrap d-none d-lg-flex justify-content-between'>
        <button
          className='account-setting-active d-flex align-items-center'
          onClick={e => handleClick(e)}
        >
          <i className='pe-7s-user-female mr-2' style={{ fontSize: 32 }} />{' '}
          <span style={{ fontSize: 16 }}>{user && user.name}</span>
        </button>
        <div className='account-dropdown'>
          <ul>{isAuthenticated ? authLinks() : guestLinks()}</ul>
        </div>
      </div>
      <div className='same-style cart-wrap d-block d-lg-none'>
        <button
          className='account-setting-active'
          onClick={e => handleClick(e)}
        >
          <i className='pe-7s-user-female' style={{ fontSize: 32, marginTop: 3 }} />
        </button>

        <div className='account-dropdown'>
          <ul>{isAuthenticated ? authLinks() : guestLinks()}</ul>
        </div>
      </div>
    </div>
  )
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  deleteFromCart: PropTypes.func,
  wishlistData: PropTypes.array
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);
