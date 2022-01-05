import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import user_svg from '../../assets/user.svg'
import { connect } from 'react-redux'

const SideBar = ({ isAuthenticated, user, cat }) => {

  const [avatar, setAvatar] = useState(<img src={user_svg} alt='user' />)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (user && user.avatar) {
      setAvatar(user.avatar)
    }
    if (user && user.email) {
      setEmail(user.email)
    }
    if (user && user.full_name) {
      setName(user.full_name)
    } else if (user && !user.full_name && user.user_name) {
      setName(user.user_name)
    }
  }, [user])

  return (
    <Fragment>
      <div className='panel'>
        <div
          className={`${
            isAuthenticated ? 'user-heading round' : 'bio-graph-heading'
          }`}
        >
          {isAuthenticated && (
            <Fragment>
              <a href='' style={{ pointerEvents: 'none' }}>
                {avatar}
              </a>
              <h1>{name}</h1>
              <p className='text-white'>{email}</p>
            </Fragment>
          )}
        </div>

        <ul className='profile-sidebar-nav profile-sidebar-nav-pills profile-sidebar-nav-stacked'>
          {isAuthenticated && (
            <Fragment>
              <li className={cat === 'profile' ? 'active' : ''}>
                <Link to='/profile'>
                  {' '}
                  <i className='fa fa-user' /> Профиль
                </Link>
              </li>
              <li className={cat === 'review' ? 'active' : ''}>
                <Link to='/review'>
                  {' '}
                  <i className='fa fa-comment' /> Добавить отзыв
                </Link>
              </li>
            </Fragment>
          )}
          <li className={cat === 'search' ? 'active' : ''}>
            <Link to='/search'>
              {' '}
              <i className='fa fa-search' /> Поиск отзывов
            </Link>
          </li>
        </ul>
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
})

export default connect(mapStateToProps)(SideBar)
