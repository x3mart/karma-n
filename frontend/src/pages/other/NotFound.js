import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import MainLayout from "../../layouts/MainLayout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const NotFound = ({ location }) => {
  const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
        <title>Карман | Страница не найдена</title>
        <meta
          name="description"
          content="404 Страница не найдена"
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Главная</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Страница 404
      </BreadcrumbsItem>
      <MainLayout headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="error-area pt-40 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8 text-center">
                <div className="error">
                  <h1>404</h1>
                  <h2>УПС! СТРАНИЦА НЕ НАЙДЕНА!</h2>
                  <p>
                    Сожалеем, но страница, которую вы ищете, не существует, была удалена, или переименована, или временно не доступна.
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

NotFound.propTypes = {
  location: PropTypes.object
};

export default NotFound;
