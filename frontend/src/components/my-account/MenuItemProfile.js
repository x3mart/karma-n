import React, { Fragment, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUserStatus } from '../../redux/actions/authActions'


const MenuItemProfile = ({ setUserStatus, userStatus, user }) => {
  const searchInput = useRef(null)

  const [specialityOpened, setSpecialityOpened] = useState(false)
  const [specialityFormActive, setSpecialityFormActive] = useState(false)
  const [categoryFormActive, setCategoryFormActive] = useState(false)
  const [textInput, setTextInput] = useState(false)

  useEffect(() => {
    if (user) {
      if (!userStatus) {
        let status =
          user &&
          user.reviews_executors_about_me_count === 0 &&
          user.reviews_customers_about_me_count === 0
            ? 'customer'
            : 'executor'
        setUserStatus(status)
      }
    }
  }, [user, userStatus])

  useEffect(() => {
    if (textInput) {
      searchInput.current.focus()
    }
  }, [textInput])

  const handleSpecialityToggle = e => {
    e.preventDefault()
    setSpecialityOpened(!specialityOpened)
  }

  return (
    <Fragment>
      <li>
        <div
          onClick={handleSpecialityToggle}
          className='d-flex align-items-center justify-content-between menu-item'
        >
          {' '}
          <div>Профиль</div>
          <i className={`fa fa-caret-${specialityOpened ? 'up' : 'down'}`}></i>
        </div>
        <div className={`profile-${specialityOpened ? 'visible' : 'hidden'}`}>
          <div className='profile-wrapper'>
            <div className='profile-profile-name'>
              <Link
                to='/profile'
                className={`${userStatus === 'executor' && 'active-item'}`}
                onClick={() => setUserStatus('executor')}
              >
                Исполнитель
              </Link>
            </div>
            <div className='profile-profile-name'>
              <Link
                to='/profile'
                className={`${userStatus === 'customer' && 'active-item'}`}
                onClick={() => setUserStatus('customer')}
              >
                Заказчик
              </Link>
            </div>
          </div>
        </div>
      </li>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  userStatus: state.auth.user_status,
})

export default connect(mapStateToProps, { setUserStatus })(MenuItemProfile)
