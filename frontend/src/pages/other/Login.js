import PropTypes from 'prop-types'
import React, { Fragment, useEffect, useState } from 'react'
import MetaTags from 'react-meta-tags'
import { Link, Redirect } from 'react-router-dom'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb'
import { connect } from 'react-redux'
import { login } from '../../redux/actions/authActions'

import InputMask from 'react-input-mask'
import { useForm, Controller } from 'react-hook-form'

const Login = ({ location, login, isAuthenticated }) => {
  const { pathname } = location

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const { control } = useForm()

  const handleLogin = event => {
    event.preventDefault()
    const data = {
      email: email,
      password: pass,
    }
    login(data)
  }

  if (isAuthenticated) {
    return <Redirect to='/profile' />
  }

  return (
    <Fragment>
      <MetaTags>
        <title>Карман | Вход</title>
        <meta name='description' content='Вход/регистрация' />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>
        Главная
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Вход
      </BreadcrumbsItem>
      <MainLayout headerTop='visible'>
        {/* breadcrumb */}
        <Breadcrumb />
        <div className='login-register-area pt-100 pb-100'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-7 col-md-12 ml-auto mr-auto'>
                <div className='login-register-wrapper'>
                  <Tab.Container defaultActiveKey='login'>
                    <Nav variant='pills' className='login-register-tab-list'>
                      <Nav.Item>
                        <Nav.Link
                          eventKey='login'
                          className='text-center'
                          style={{ pointerEvents: 'none' }}
                        >
                          <h4>Вход</h4>
                        </Nav.Link>
                        <h5 className='mt-3'>
                          Нет учетной записи?{' '}
                          <Link to='/register'>Зарегистрируйтесь</Link>
                        </h5>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey='login'>
                        <div className='login-form-container'>
                          <div className='login-register-form'>
                            <form onSubmit={handleLogin}>
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
                                type='password'
                                name='user-password'
                                placeholder='Пароль'
                                onChange={e => setPass(e.target.value)}
                              />
                              <div className='button-box'>
                                <div className='login-toggle-btn'>
                                  <input type='checkbox' />
                                  <label className='ml-10'>
                                    Запомнить меня
                                  </label>
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL + '/password-reset'
                                    }
                                  >
                                    Забыли пароль?
                                  </Link>
                                </div>
                                <button type='submit'>
                                  <span>Вход</span>
                                </button>
                              </div>
                            </form>
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

Login.propTypes = {
  location: PropTypes.object,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { login })(Login)
