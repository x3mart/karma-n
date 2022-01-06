import PropTypes from "prop-types";
import React, {Fragment, useState} from "react";
import MetaTags from "react-meta-tags";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import MainLayout from "../../layouts/MainLayout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {connect} from "react-redux";
import {reset_password_confirm} from "../../redux/actions/authActions";

import {Redirect} from "react-router-dom";

const PasswordConfirm = ({location, match, reset_password_confirm}) => {
  const {pathname} = location;

  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [requestSent, setRequestSent] = useState(false)


  const handleSubmit = () => {
    const uid = match.params.uid;
    const token = match.params.token;
    reset_password_confirm(uid, token, password, rePassword);
    setRequestSent(true);
  };

  if (requestSent) {
    return <Redirect to='/login'/>
  }

  return (
    <Fragment>
      <MetaTags>
        <title>Карман | Новый пароль</title>
        <meta
          name="description"
          content="Регистрация"
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Главная</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Новый пароль
      </BreadcrumbsItem>
      <MainLayout headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb/>
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="register">
                    <Nav variant="pills" className="login-register-tab-list">

                      <Nav.Item>
                        <Nav.Link eventKey="register" className="text-center" style={{pointerEvents: 'none'}}>
                          <h4>Введите новый пароль</h4>
                        </Nav.Link>
                      </Nav.Item>

                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <div>
                              <form
                                onSubmit={event => event.preventDefault()}
                              >

                                <input
                                  type="password"
                                  name="password"
                                  placeholder="Пароль"
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                                <input
                                  type="password"
                                  name="re_password"
                                  placeholder="Подтвердите пароль"
                                  onChange={(e) => setRePassword(e.target.value)}
                                />
                                <div className="button-box">
                                  <button
                                    type="submit"
                                    onClick={() => handleSubmit()}
                                  >
                                    <span>Отправить</span>
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
  );
};

PasswordConfirm.propTypes = {
  location: PropTypes.object
};

export default connect(null, {reset_password_confirm})(PasswordConfirm);
