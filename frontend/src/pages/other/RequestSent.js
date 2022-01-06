import PropTypes from "prop-types";
import React, {Fragment, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import MetaTags from "react-meta-tags";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import MainLayout from "../../layouts/MainLayout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";


import {Link, Redirect} from "react-router-dom";

const RequestSent = ({location, reset_password}) => {

  const {pathname} = location;
  let history = useHistory();


  useEffect(() => {
    const timer = setTimeout(() => {
      history.push("/")
    }, 4000);
    return () => clearTimeout(timer);
  }, []);


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
        <div className="error-area pt-40 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8 text-center">
                <div className="error">
                  <h2>Проверьте почту</h2>
                  <p>
                    Письмо с дальнейшими инструкциями отправлено вам на почту.
                  </p>

                  <Link to={process.env.PUBLIC_URL + "/"} className="error-btn">
                    Вернуться на главную страницу
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </Fragment>
  );
};

RequestSent.propTypes = {
  location: PropTypes.object
};

export default RequestSent;
