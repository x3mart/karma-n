import PropTypes from "prop-types";
import React, {Fragment, useEffect, useState} from "react";
import MetaTags from "react-meta-tags";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import MainLayout from "../../layouts/MainLayout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {connect} from "react-redux";
import {reset_password} from "../../redux/actions/authActions";
import {isNotEmptyObject} from "../../functions";

import InputMask from "react-input-mask";
import {useForm, Controller} from "react-hook-form";
import {Link, Redirect} from "react-router-dom";

const PasswordReset = ({location, reset_password}) => {
  const {pathname} = location;

  const [email, setEmail] = useState('')
  const [requestSent, setRequestSent] = useState(false)


  const handleSubmit = () => {
    reset_password(email);
    setRequestSent(true);
  };

  if (requestSent) {
        return <Redirect to='/request-sent' />
    }

  return (
    <Fragment>
      <MetaTags>
        <title>Карман | Восстановление пароля</title>
        <meta
          name="description"
          content="Регистрация"
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Главная</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Восстановление пароля
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
                          <h4>Восстановление пароля</h4>
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
                                  type="email"
                                  name="user-email"
                                  placeholder="Email"
                                  onChange={(e) => setEmail(e.target.value)}
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

PasswordReset.propTypes = {
  location: PropTypes.object
};

export default connect(null, {reset_password})(PasswordReset);
