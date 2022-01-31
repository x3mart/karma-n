import PropTypes from 'prop-types'
import React, { Fragment, useEffect, useState } from 'react'
import MetaTags from 'react-meta-tags'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb'
import { connect } from 'react-redux'
import {
  getPhoneCode,
  setPhoneApproved,
  signup,
} from '../../redux/actions/authActions'
import { isNotEmptyObject } from '../../functions'

import InputMask from 'react-input-mask'
import { useForm, Controller } from 'react-hook-form'
import { Link, Redirect } from 'react-router-dom'

const Register = ({
  location,
  phone_approved,
  phone_error,
  getPhoneCode,
  setPhoneApproved,
  signup,
  phone,
  isAuthenticated,
}) => {
  const { pathname } = location

  const { register, handleSubmit, control } = useForm()

  const [phoneNumber, setPhoneNumber] = useState('')
  const [smsCode, setSmsCode] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [activated, setActivated] = useState(false)
  const [seconds, setSeconds] = useState(20)
  const [buttonActive, setButtonActive] = useState(true)
  const [timer, setTimer] = useState(false)
  const [accountCreated, setAccountCreated] = useState(false)

  const [errorStatus, setErrorStatus] = useState('')
  const [errorText, setErrorText] = useState([])

  const handleRegister = e => {
    const data = {
      name: name,
      email: email,
      password: password,
      re_password: rePassword,
    }
    e.preventDefault()
    if (password === rePassword) {
      signup(data)
    }
  }
  
  // setAccountCreated(true)
  
  useEffect(() => {
    setPhoneNumber(phone)
  }, [phone])

  useEffect(() => {
    if (isNotEmptyObject(phone_error)) {
      setErrorStatus(phone_error.status)
      setErrorText(phone_error.text)
    }
  }, [phone_error])

  const handleSmsSend = () => {
    setTimer(true)
    setSeconds(20)
    getPhoneCode(phoneNumber)
  }

  const handleSmsCheck = () => {
    setPhoneApproved(phone, smsCode)
  }

  useEffect(() => {
    let interval = null
    if (timer && seconds !== 0) {
      setActivated(true)
      setButtonActive(false)
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1)
      }, 1000)
    } else if (seconds === 0) {
      setActivated(false)
      setTimer(false)
      setButtonActive(true)
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [timer, seconds])

  if (isAuthenticated) {
    return <Redirect to='/my-account' />
  }
  if (accountCreated) {
    setPhoneApproved('+70000000000', '00000')
    return <Redirect to='/login' />
  }

  return (
    <Fragment>
      <MetaTags>
        <title>Карман | Регистрация</title>
        <meta name='description' content='Регистрация' />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>
        Главная
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Регистрация
      </BreadcrumbsItem>
      <MainLayout headerTop='visible'>
        {/* breadcrumb */}
        <Breadcrumb />
        <div className='login-register-area pt-100 pb-100'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-7 col-md-12 ml-auto mr-auto'>
                <div className='login-register-wrapper'>
                  <Tab.Container defaultActiveKey='register'>
                    <Nav variant='pills' className='login-register-tab-list'>
                      <Nav.Item>
                        <Nav.Link
                          eventKey='register'
                          className='text-center'
                          style={{ pointerEvents: 'none' }}
                        >
                          <h4>Регистрация</h4>
                        </Nav.Link>
                        <h5 className='mt-3'>
                          Уже зарегистрированы?{' '}
                          <Link to='/login'>Авторизуйтесь</Link>
                        </h5>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey='register'>
                        <div className='login-form-container'>
                          <div className='login-register-form'>
                            <div>
                              {/* <form
                                onSubmit={event => event.preventDefault()}
                                className={`${phone_approved ? 'd-none' : ''}`}
                              >
                                <div className='row'>
                                  <div className='col-lg-8'>
                                    <Controller
                                      control={control}
                                      name='phone'
                                      defaultValue={phoneNumber}
                                      render={({ field }) => (
                                        <InputMask
                                          type='tel'
                                          className={
                                            errorStatus
                                              ? 'form-control is-invalid'
                                              : ''
                                          }
                                          mask='+7 (999) 999-99-99'
                                          placeholder='Номер телефона'
                                          value={phoneNumber}
                                          onChange={e =>
                                            field.onChange(
                                              setPhoneNumber(e.target.value)
                                            )
                                          }
                                        />
                                      )}
                                    />
                                    <div
                                      className={`small-text ${
                                        !activated ? 'd-none' : 'd-flex'
                                      }`}
                                    >
                                      Повторно отправить смс вы сможете через{' '}
                                      {seconds} сек.
                                    </div>
                                    {errorText
                                      ? errorText.map((item, i) => (
                                          <div
                                            key={i}
                                            className='invalid-feedback'
                                          >
                                            {item}
                                          </div>
                                        ))
                                      : ''}
                                  </div>

                                  <div className='col-lg-4 d-flex justify-content-center justify-content-lg-end mb-3 mb-lg-0'>
                                    <div className='button-box'>
                                      <button
                                        className='mb-3 mb-lg-0'
                                        onClick={() => handleSmsSend()}
                                        style={
                                          !buttonActive
                                            ? { pointerEvents: 'none' }
                                            : {}
                                        }
                                      >
                                        <span>отправить</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form> */}
                              {/* <form
                                onSubmit={event => event.preventDefault()}
                                className={`${phone_approved ? 'd-none' : ''}`}
                              >
                                <div className='row'>
                                  <div className='col-lg-8'>
                                    <Controller
                                      control={control}
                                      name='code'
                                      defaultValue={phoneNumber}
                                      render={({ field }) => (
                                        <InputMask
                                          className={
                                            errorStatus
                                              ? 'form-control is-invalid'
                                              : ''
                                          }
                                          mask='99999'
                                          placeholder='Код из SMS'
                                          value={smsCode}
                                          onChange={e =>
                                            field.onChange(
                                              setSmsCode(e.target.value)
                                            )
                                          }
                                        />
                                      )}
                                    />
                                  </div>

                                  <div className='col-lg-4 d-flex justify-content-center justify-content-lg-end'>
                                    <div className='button-box'>
                                      <button onClick={() => handleSmsCheck()}>
                                        <span>подтвердить</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form> */}
                              <form
                                onSubmit={handleRegister}
                                // className={`${phone_approved ? '' : 'd-none'}`}
                              >
                                <input
                                  name='user-email'
                                  placeholder='Email'
                                  type='email'
                                  onChange={v => {
                                    setEmail(v.target.value)
                                  }}
                                  value={email}
                                />
                                <input
                                  name='name'
                                  placeholder='Имя пользователя'
                                  type='text'
                                  onChange={v => {
                                    setName(v.target.value)
                                  }}
                                  value={name}
                                />
                                <input
                                  name='password'
                                  placeholder='Пароль'
                                  type='password'
                                  onChange={v => {
                                    setPassword(v.target.value)
                                  }}
                                  value={password}
                                />
                                <input
                                  name='re_password'
                                  placeholder='Подтвердите пароль'
                                  type='password'
                                  onChange={v => {
                                    setRePassword(v.target.value)
                                  }}
                                  value={rePassword}
                                />
                                <div className='button-box'>
                                  <button type='submit'>
                                    <span>Зарегистрироваться</span>
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </Fragment>
  )
}

Register.propTypes = {
  location: PropTypes.object,
}

const mapStateToProps = state => ({
  phone_approved: state.auth.phone_approved,
  phone_error: state.auth.phone_error,
  phone: state.auth.phone,
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, {
  getPhoneCode,
  setPhoneApproved,
  signup,
})(Register)
