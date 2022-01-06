import React, { Fragment, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const MenuItemSpeciality = () => {
  const searchInput = useRef(null)

  const [specialityOpened, setSpecialityOpened] = useState(false)
  const [specialityFormActive, setSpecialityFormActive] = useState(false)
  const [categoryFormActive, setCategoryFormActive] = useState(false)
  const [textInput, setTextInput] = useState(false)

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
      <li className={'dark-nav'}>
        <div
          onClick={handleSpecialityToggle}
          className='d-flex align-items-center justify-content-between menu-item'
        >
          {' '}
          <div>Специализация</div>
          <i className={`fa fa-caret-${specialityOpened ? 'up' : 'down'}`}></i>
        </div>
        <div
          className={`speciality-${specialityOpened ? 'visible' : 'hidden'}`}
        >
          <div className='speciality-wrapper'>
            <div className='speciality-category'>
              <div className='speciality-category-name'>
                <div>Дизайн</div>
                <div
                  className={`add-icon d-${
                    specialityFormActive ? 'none' : 'block'
                  }`}
                  onClick={() => setSpecialityFormActive(true)}
                >
                  <i className='pe-7s-plus'></i>
                </div>
              </div>
              <div className='speciality-speciality-name'>Веб дизайн</div>
              <div className='speciality-speciality-name'>Дизайн помещений</div>
              <div className='speciality-speciality-name'>
                Ландшафтный дизайн
              </div>
              <form className={`d-${specialityFormActive ? 'block' : 'none'}`}>
                {textInput ? (
                  <input
                    className='form-control input-sidebar input-sidebar-speciality'
                    type='text'
                    ref={searchInput}
                  ></input>
                ) : (
                  <select
                    className='form-select select-sidebar select-sidebar-speciality'
                    aria-label='Default select example'
                  >
                    <option selected>Выберите...</option>
                    <option value='1'>One</option>
                    <option value='2'>Two</option>
                    <option value='3'>Three</option>
                  </select>
                )}
                <div className='btn-sidebar-wrapper'>
                  <button
                    className='btn-sidebar btn-sidebar-success'
                    type='button'
                    onClick={() => setTextInput(true)}
                  >
                    <i className='pe-7s-plus'></i>
                  </button>
                  <button
                    type='submit'
                    className='btn-sidebar btn-sidebar-success'
                  >
                    <i className='pe-7s-check'></i>
                  </button>
                  <button
                    type='button'
                    className='btn-sidebar btn-sidebar-danger'
                    onClick={() => {
                      setSpecialityFormActive(false)
                      setTextInput(false)
                    }}
                  >
                    <i className='pe-7s-close-circle'></i>
                  </button>
                </div>
              </form>
            </div>
            <div
              className={`speciality-add d-${
                specialityFormActive
                  ? 'none'
                  : categoryFormActive
                  ? 'none'
                  : 'flex'
              }`}
              onClick={() => setCategoryFormActive(true)}
            >
              <div>Добавить</div>
              
            </div>
            <form className={`d-${categoryFormActive ? 'block' : 'none'}`}>
              {textInput ? (
                <input
                  className='form-control input-sidebar input-sidebar-category'
                  type='text'
                  ref={searchInput}
                ></input>
              ) : (
                <select
                  className='form-select select-sidebar select-sidebar-category'
                  aria-label='Default select example'
                >
                  <option selected>Выберите...</option>
                  <option value='1'>One</option>
                  <option value='2'>Two</option>
                  <option value='3'>Three</option>
                </select>
              )}
              <div className='btn-sidebar-wrapper'>
                <button
                  className='btn-sidebar btn-sidebar-success'
                  type='button'
                  onClick={() => setTextInput(true)}
                >
                  <i className='pe-7s-plus'></i>
                </button>
                <button
                  type='submit'
                  className='btn-sidebar btn-sidebar-success'
                >
                  <i className='pe-7s-check'></i>
                </button>
                <button
                  type='button'
                  className='btn-sidebar btn-sidebar-danger'
                  onClick={() => {
                    setCategoryFormActive(false)
                    setTextInput(false)
                  }}
                >
                  <i className='pe-7s-close-circle'></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </li>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
})

export default connect(mapStateToProps)(MenuItemSpeciality)
