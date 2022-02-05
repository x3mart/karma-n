import PropTypes from 'prop-types'
import React, { Fragment, useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import user_svg from '../../assets/user.svg'
import {
  update_user,
  setUserStatus,
  getCode,
  checkCode,
  resetScreenName,
  deleteScreenName,
} from '../../redux/actions/authActions'

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

const PersonalInfo = ({
  user,
  update_user,
  getCode,
  checkCode,
  sentStatus,
  checkedStatus,
  resetScreenName,
  deleteScreenName,
  user_status,
}) => {
  const [updateProfile, setUpdateProfile] = useState({
    name: '',
    full_name: '',
    city: '',
    birthday: null,
    about: '',
  })

  const [userData, setUserData] = useState({
    full_name: '',
    name: '',
    city: '',
    birthday: '',
    email: '',
    about: '',
  })

  const [screenName, setScreenName] = useState('')
  const [screenNameCode, setScreenNameCode] = useState('')
  const [screenNameType, setScreenNameType] = useState('')

  const [currentData, setCurrentData] = useState({})
  const [extraPhone, setExtraPhone] = useState('')
  const [extraPhoneAddActive, setExtraPhoneAddActive] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const handleClose = () => {
    resetScreenName()
    setScreenName('')
    setScreenNameCode('')
    setScreenNameType('')
    setIsOpened(false)
  }

  const handleAccountDelete = id => {
    deleteScreenName(id)
  }

  useEffect(() => {
    if (isOpened && checkedStatus) {
      setIsOpened(false)
    }
  }, [checkedStatus])

  useEffect(() => {
    user &&
      setUserData({
        full_name: user.full_name,
        name: user.name,
        city: user.city,
        birthday: user.birthday,
        email: user.email,
        about: user.about,
      })
  }, [user])

  const [edit, setEdit] = useState(false)

  const getScreenNameCode = () => {
    let data = screenNameType === 'phone' ? '7' + screenName : screenName
    console.log(1, data)
    getCode({
      screen_name: data,
      resourcetype: screenNameType,
    })
  }

  const sendScreenNameCode = () => {
    let data = screenNameType === 'phone' ? '7' + screenName : screenName
    console.log(2, data)
    checkCode({
      screen_name: data,
      resourcetype: screenNameType,
      code: screenNameCode,
    })
  }

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
    update_user(userData)
    setEdit(false)
  }

  const handlePhoneAddActivate = () => {
    setExtraPhoneAddActive(true)
  }
  const handlePhoneAddSave = () => {
    // add_phone_action(extraPhone)
    setExtraPhoneAddActive(false)
  }
  const handlePhoneAddReset = () => {
    setExtraPhone('')
    setExtraPhoneAddActive(false)
  }

  const handleAccountAdd = account => {
    setIsOpened(true)
    setScreenNameType(account)
  }

  return (
    <>
      <Modal show={isOpened} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Добавить{' '}
            {screenNameType === 'phone'
              ? 'телефон'
              : screenNameType === 'instagram'
              ? 'инстаграм'
              : screenNameType === 'vk'
              ? 'VK'
              : ''}{' '}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className='input-control'>
              <input
                name='phone'
                className='input-control-input input-phone'
                type='tel'
                pattern='[0-9]{10}'
                value={screenName}
                onChange={e => setScreenName(e.target.value)}
              />
              <span className='input-control-prefix'>+7</span>
              {sentStatus && (
                <input
                  name='code'
                  className='input-control-input input-code'
                  type='text'
                  value={screenNameCode}
                  onChange={e => setScreenNameCode(e.target.value)}
                />
              )}
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          {sentStatus ? (
            <button
              className='input-control-button'
              onClick={sendScreenNameCode}
            >
              Подтвердить
            </button>
          ) : (
            <button
              className='input-control-button'
              onClick={getScreenNameCode}
            >
              Получить код
            </button>
          )}
        </Modal.Footer>
      </Modal>
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
              <i class='pe-7s-note' style={{ fontSize: 20 }}></i>
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
        <div className='row pl-3'>
          <div className='col-md-4 account-row-left'>Телефон:</div>
          <div className='col-md-8 account-row-right'>
            {user && user.reviewables && (
              <>
                {user &&
                  user.reviewables &&
                  user.reviewables.map(
                    item =>
                      item.resourcetype === 'Phone' && (
                        <div className='d-flex'>
                          <div style={{ width: 130 }}>+{item.screen_name}</div>
                          <div
                            onClick={() => handleAccountDelete(item.id)}
                            style={{
                              fontSize: 24,
                              lineHeight: '24px',
                              color: 'red',
                              cursor: 'pointer',
                            }}
                          >
                            <i
                              className='pe-7s-close-circle'
                              aria-hidden='true'
                            />
                          </div>
                        </div>
                      )
                  )}
                <div
                  className='add-account'
                  onClick={() => {
                    handleAccountAdd('phone')
                  }}
                >
                  Добавить телефон
                </div>
              </>
            )}
          </div>
          <div className='col-md-4 account-row-left'>Инстаграм:</div>
          <div className='col-md-8 account-row-right '>
            {user && user.reviewables && (
              <>
                {user &&
                  user.reviewables &&
                  user.reviewables.map(
                    item =>
                      item.resourcetype === 'Instagram' && (
                        <div className='d-flex'>
                          <div style={{ width: 130 }}>+{item.screen_name}</div>
                          <div
                            onClick={() => handleAccountDelete(item.id)}
                            style={{
                              fontSize: 24,
                              lineHeight: '24px',
                              color: 'red',
                              cursor: 'pointer',
                            }}
                          >
                            <i
                              className='pe-7s-close-circle'
                              aria-hidden='true'
                            />
                          </div>
                        </div>
                      )
                  )}
                <div
                  className='add-account'
                  onClick={() => {
                    handleAccountAdd('instagram')
                  }}
                >
                  Добавить инстаграм
                </div>
              </>
            )}
          </div>
          <div className='col-md-4 account-row-left'>Вконтакте:</div>
          <div className='col-md-8 account-row-right'>
            {user && user.reviewables && (
              <>
                {user &&
                  user.reviewables &&
                  user.reviewables.map(
                    item =>
                      item.resourcetype === 'VK' && (
                        <div className='d-flex'>
                          <div style={{ width: 130 }}>+{item.screen_name}</div>
                          <div
                            onClick={() => handleAccountDelete(item.id)}
                            style={{
                              fontSize: 24,
                              lineHeight: '24px',
                              color: 'red',
                              cursor: 'pointer',
                            }}
                          >
                            <i
                              className='pe-7s-close-circle'
                              aria-hidden='true'
                            />
                          </div>
                        </div>
                      )
                  )}
                <div
                  className='add-account'
                  onClick={() => {
                    handleAccountAdd('vk')
                  }}
                >
                  Добавить вконтакте
                </div>
              </>
            )}
          </div>
        </div>
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
              {/* <div
                style={{ lineHeight: '42px', margin: '0 0 20px 5px' }}
                className='d-none d-xl-block'
              >
                Добавить телефон
              </div> */}
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
    </>
  )
}

const mapStateToProps = state => ({
  sentStatus: state.auth.screenname_sent_success,
  checkedStatus: state.auth.screenname_checked_success,
  userStatus: state.auth.user_status,
})

export default connect(mapStateToProps, {
  update_user,
  getCode,
  checkCode,
  resetScreenName,
  deleteScreenName,
  setUserStatus,
})(PersonalInfo)
