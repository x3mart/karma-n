import React, { Fragment, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  get_all_categories,
  set_category,
  set_service,
  get_all_users_services,
  set_users_service,
} from '../../redux/actions/serviceActions'

const MenuItemSpeciality = ({
  get_all_categories,
  set_category,
  service_categories,
  temp_category_title,
  set_service,
  get_all_users_services,
  set_users_service,
  user,
}) => {
  const searchInput = useRef(null)

  const [specialityOpened, setSpecialityOpened] = useState(false)
  const [specialityFormActive, setSpecialityFormActive] = useState(false)
  const [categoryFormActive, setCategoryFormActive] = useState(false)
  const [textInput, setTextInput] = useState(false)
  const [categoryInputData, setCategoryInputData] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [serviceCategories, setServiceCategories] = useState([])
  const [userSpecialities, setUserSpecialities] = useState([])

  useEffect(() => {
    get_all_categories()
  }, [])

  useEffect(() => {
    if (user) {
      get_all_users_services(user.id)
    }
  }, [user])

  useEffect(() => {
    if (service_categories) {
      setServiceCategories(service_categories)
    }
  }, [service_categories])

  useEffect(() => {
    if (temp_category_title) {
      serviceCategories &&
        serviceCategories.map(item => {
          if (item.title === temp_category_title) {
            setCategoryId(item.id)
          }
        })
    }
  }, [temp_category_title])

  useEffect(() => {
    if (textInput) {
      searchInput.current.focus()
    }
  }, [textInput])

  useEffect(() => {
    if (user) {
      setUserSpecialities()
    }
  }, [user])

  const handleSpecialityToggle = e => {
    e.preventDefault()
    setSpecialityOpened(!specialityOpened)
  }

  const handleCategorySelectChange = e => {
    setCategoryInputData(e.target.value)
  }

  const handleCategoryInputChange = e => {
    setCategoryInputData(e.target.value)
  }

  const handleCategorySubmit = e => {
    e.preventDefault()
    set_category(categoryInputData)
    setCategoryFormActive(false)
    // window.location.reload()
  }

  const SpecialityForm = () => (
    <form className={`d-${specialityFormActive ? 'block' : 'none'}`}>
      {textInput ? (
        <input
          className='form-control input-sidebar input-sidebar-speciality'
          type='text'
          ref={searchInput}
          // value={}
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
        <button type='submit' className='btn-sidebar btn-sidebar-success'>
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
  )

  const CategoryForm = id => (
    <form
      className={`d-${
        categoryFormActive && categoryId === id ? 'block' : 'none'
      }`}
      onSubmit={handleCategorySubmit}
    >
      {textInput || serviceCategories.length === 0 ? (
        <input
          className='form-control input-sidebar input-sidebar-category'
          type='text'
          ref={searchInput}
          value={categoryInputData}
          onChange={handleCategoryInputChange}
        ></input>
      ) : (
        <select
          className='form-select select-sidebar select-sidebar-category'
          aria-label='Default select example'
          onChange={handleCategorySelectChange}
        >
          <option selected>Выберите...</option>
          {serviceCategories.map(category => (
            <option value={category.id}>{category.title}</option>
          ))}
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
        <button type='submit' className='btn-sidebar btn-sidebar-success'>
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
  )

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
              <SpecialityForm />
            </div>
            {temp_category_title && (
              <>
                <div className='speciality-category-name'>
                  <div>{temp_category_title}</div>
                  <div
                    className={`add-icon d-${
                      specialityFormActive ? 'none' : 'block'
                    }`}
                    onClick={() => setSpecialityFormActive(true)}
                  >
                    <i className='pe-7s-plus'></i>
                  </div>
                </div>
                <SpecialityForm />
              </>
            )}
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
              <div>Добавить категорию</div>
            </div>
            <CategoryForm />
          </div>
        </div>
      </li>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  service_categories: state.service.categories,
  temp_category_title: state.service.temp_title,
  user: state.auth.user,
})

const mapDispatchToProps = {
  get_all_categories,
  set_category,
  set_service,
  get_all_users_services,
  set_users_service,
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemSpeciality)
