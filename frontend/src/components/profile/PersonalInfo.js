import PropTypes from 'prop-types'
import React, { Fragment, useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import user_svg from '../../assets/user.svg'
import { update_user } from '../../redux/actions/authActions'

import { useForm } from 'react-hook-form'
import {
  getReviewTemplates,
  setReview,
  getReviewsAboutMe,
  getMyReviews,
  setComment,
} from '../../redux/actions/reviewActions'
import { isNotEmptyObject } from '../../functions'
import Row from 'react-bootstrap/Row'
import Rating from '../Rating'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const PersonalInfo = ({ user, update_action, add_phone_action }) => {
  const [updateProfile, setUpdateProfile] = useState({
    name: '',
    full_name: '',
    city: '',
    birthday: null,
    avatar: null,
    about: '',
  })

  const [userData, setUserData] = useState({
    full_name: '',
    name: '',
    city: '',
    birthday: '',
    email: '',
    phones: [],
  })

  const [currentData, setCurrentData] = useState({})
  const [extraPhone, setExtraPhone] = useState('')
  const [extraPhoneAddActive, setExtraPhoneAddActive] = useState(false)

  useEffect(() => {
    user &&
      setUserData({
        full_name: user.full_name,
        name: user.name,
        city: user.city,
        birthday: user.birthday,
        email: user.email,
        phones: `${user.phones && user.phones.filter(
          item => item.phone_number != user.phone
        )}`,
      })
  }, [user])

  const [edit, setEdit] = useState(false)

  const handleEdit = bool => {
    setCurrentData(userData)
    setEdit(bool)
  }

  const handleUserUpdate = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  }

  const handleReset = () => {
    setUserData(currentData)
    setEdit(false)
  }

  const handleUserSave = () => {
    update_action(userData)
    setEdit(false)
  }

  const handlePhoneAddActivate = () => {
    setExtraPhoneAddActive(true)
  }
  const handlePhoneAddSave = () => {
    add_phone_action(extraPhone)
    setExtraPhoneAddActive(false)
  }
  const handlePhoneAddReset = () => {
    setExtraPhone('')
    setExtraPhoneAddActive(false)
  }

  return (
    <Fragment>
      <div className='d-flex justify-content-between'>
        <div className='personal-info-heading'>
          <h1>Личная информация</h1>
        </div>
        {!edit && (
          <div
            className='d-flex'
            style={{ cursor: 'pointer' }}
            onClick={() => handleEdit(true)}
          >
            {/* <div style={{ fontSize: 30, lineHeight: '42px' }}>
              <i className='pe-7s-note' aria-hidden='true' />
            </div> */}
            <div
              style={{ lineHeight: '42px', margin: '0 0 20px 5px' }}
              className='d-none d-xl-block'
            >
              Редактировать
            </div>
            <div
              style={{ lineHeight: '42px', margin: '0 0 20px 5px' }}
              className='d-block d-xl-none'
            >
              Редактировать
            </div>
          </div>
        )}
        {edit && (
          <div className='d-flex flex-row'>
            <div
              className='d-flex text-success mr-3'
              style={{ cursor: 'pointer' }}
              onClick={handleUserSave}
            >
              <div style={{ fontSize: 30, lineHeight: '42px' }}>
                <i className='pe-7s-check' aria-hidden='true' />
              </div>
              <div
                style={{ lineHeight: '42px', margin: '0 0 20px 5px' }}
                className='d-none d-xl-block'
              >
                Сохранить
              </div>
            </div>
            <div
              className='d-flex text-danger'
              style={{ cursor: 'pointer' }}
              onClick={handleReset}
            >
              <div style={{ fontSize: 30, lineHeight: '42px' }}>
                <i className='pe-7s-close-circle' aria-hidden='true' />
              </div>
              <div
                style={{ lineHeight: '42px', margin: '0 0 20px 5px' }}
                className='d-none d-xl-block'
              >
                Сбросить
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='personal-info-wrapper'>
        <div className='row pl-3'>
          <div className='col-md-4 inner-row-left'>Имя:</div>
          <div className='col-md-8 inner-row-right'>
            <input
              disabled={!edit}
              name='full_name'
              className='personal-info-input'
              type='text'
              value={userData.full_name}
              onChange={handleUserUpdate}
            />
          </div>
        </div>
        <div className='row pl-3'>
          <div className='col-md-4 inner-row-left'>Имя пользователя:</div>
          <div className='col-md-8 inner-row-right'>
            <input
              disabled={!edit}
              name='name'
              className='personal-info-input'
              type='text'
              value={userData.name}
              onChange={handleUserUpdate}
            />
          </div>
        </div>
        <div className='row pl-3'>
          <div className='col-md-4 inner-row-left'>Город:</div>
          <div className='col-md-8 inner-row-right'>
            <input
              disabled={!edit}
              name='city'
              className='personal-info-input'
              type='text'
              value={userData.city}
              onChange={handleUserUpdate}
            />
          </div>
        </div>
        <div className='row pl-3'>
          <div className='col-md-4 inner-row-left'>Дата рождения:</div>
          <div className='col-md-8 inner-row-right'>
            <input
              disabled={!edit}
              name='birthday'
              className='personal-info-input'
              type='date'
              value={userData.birthday}
              onChange={handleUserUpdate}
            />
          </div>
        </div>
        <div className='row pl-3'>
          <div className='col-md-4 inner-row-left'>Обо мне:</div>
          <div className='col-md-8 inner-row-right'>
            <textarea
              style={{ resize: `${edit ? '' : 'none'}` }}
              disabled={!edit}
              name='about'
              className='personal-info-input'
              value={userData.about}
              onChange={handleUserUpdate}
            />
          </div>
        </div>
        <div className='row pl-3'>
          <div className='col-md-4 inner-row-left'>Email:</div>
          <div className='col-md-8 inner-row-right'>
            <input
              disabled
              name='email'
              className='personal-info-input'
              type='email'
              value={userData.email}
              onChange={handleUserUpdate}
            />
          </div>
        </div>
      </div>

      <div className='personal-info-heading'>
        <h1>Аккаунты:</h1>
      </div>

      {/* {userData &&
        userData.phones &&
        userData.phones.length > 0 &&
        userData.phones.map((item, index) => (
          <div className='row pl-3' style={{ color: '#333' }}>
            <div className='col-md-4 inner-row-left'>
              {index === 0 ? 'Телефоны:' : ''}
            </div>
            <div className='col-md-8 inner-row-right'>
              <input
                disabled
                name='phones'
                className='personal-info-input'
                type='text'
                value={item.phone_number}
              />
            </div>
          </div>
        ))} */}

      <div className='row pl-3' style={{ color: '#333' }}>
        <div className='col-md-4 inner-row-left'>
          {userData.phones && userData.phones.length === 0 ? 'Телефоны:' : ''}
        </div>
        <div className='col-md-8 inner-row-right d-flex'>
          <input
            name='phones'
            className={`w-auto mr-3 personal-info-input ${
              extraPhoneAddActive ? 'd-inline-block' : 'd-none'
            }`}
            type='tel'
            value={extraPhone}
            onChange={e => setExtraPhone(e.target.value)}
          />
          {!extraPhoneAddActive ? (
            <div
              className='d-flex text-success mr-3'
              style={{ cursor: 'pointer' }}
              onClick={handlePhoneAddActivate}
            >
              <div
                style={{ lineHeight: '42px', margin: '0 0 20px 5px' }}
                className='d-none d-xl-block'
              >
                Добавить телефон
              </div>
            </div>
          ) : (
            <div className='d-flex flex-row'>
              <div
                className='d-flex text-success mr-3'
                style={{ cursor: 'pointer' }}
                onClick={handlePhoneAddSave}
              >
                <div style={{ fontSize: 30, lineHeight: '42px' }}>
                  <i className='pe-7s-check' aria-hidden='true' />
                </div>
                <div
                  style={{ lineHeight: '42px', margin: '0 0 20px 5px' }}
                  className='d-none d-xl-block'
                >
                  Сохранить
                </div>
              </div>
              <div
                className='d-flex text-danger'
                style={{ cursor: 'pointer' }}
                onClick={handlePhoneAddReset}
              >
                <div style={{ fontSize: 30, lineHeight: '42px' }}>
                  <i className='pe-7s-close-circle' aria-hidden='true' />
                </div>
                <div
                  style={{ lineHeight: '42px', margin: '0 0 20px 5px' }}
                  className='d-none d-xl-block'
                >
                  Сбросить
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default PersonalInfo
