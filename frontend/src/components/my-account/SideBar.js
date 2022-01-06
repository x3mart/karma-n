import React, { Fragment, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import user_svg from '../../assets/user.svg'
import { connect } from 'react-redux'
import MenuItemSpeciality from './MenuItemSpeciality'
import MenuItemProfile from './MenuItemProfile'

const SideBar = ({ isAuthenticated, user, cat }) => {

  const searchInput = useRef(null)

  const [avatar, setAvatar] = useState(<img src={user_svg} alt='user' />)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [specialityOpened, setSpecialityOpened] = useState(false)
  const [specialityFormActive, setSpecialityFormActive] = useState(false)
  const [categoryFormActive, setCategoryFormActive] =
    useState(false)
  const [textInput, setTextInput] = useState(false)

  useEffect(() => {
    if (textInput) {
      searchInput.current.focus()
    }
  }, [textInput])

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

  const handleSpecialityToggle = e => {
    e.preventDefault()
    setSpecialityOpened(!specialityOpened)
  }

  const HandleAddSpeciality = () => {
    
    console.log('Speciality added')
  }

  return (
    <Fragment>
      <div className='user-sidebar'>
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
              <MenuItemSpeciality/>
              <MenuItemProfile/>
              <li className={cat === 'review' ? 'active' : ''}>
                <Link to='/review'> Добавить отзыв</Link>
              </li>
            </Fragment>
          )}
          <li className={cat === 'search' ? 'active' : ''}>
            <Link to='/search'> Поиск отзывов</Link>
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
