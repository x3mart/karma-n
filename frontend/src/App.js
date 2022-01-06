import PropTypes from "prop-types";
import React, {useEffect, Suspense, lazy} from "react";
import ScrollToTop from "./helpers/scroll-top";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {ToastProvider} from "react-toast-notifications";
// import {multilanguage, loadLanguages} from "redux-multilanguage";
// import {connect} from "react-redux";
import {BreadcrumbsProvider} from "react-breadcrumbs-dynamic";

// home pages
const Home = lazy(() => import("./pages/home/Home"));
const ReviewsSearch = lazy(() => import("./pages/search/Search"));
// const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const MyProfile = lazy(() => import("./pages/other/MyProfile"));
const Login = lazy(() => import("./pages/other/Login"));
const Register = lazy(() => import("./pages/other/Register"));
const PasswordReset = lazy(() => import("./pages/other/PasswordReset"));
const PasswordConfirm = lazy(() => import("./pages/other/PasswordConfirm"));
const RequestSent = lazy(() => import("./pages/other/RequestSent"));
const AddReview = lazy(() => import("./pages/other/AddReview"));
const NotFound = lazy(() => import("./pages/other/NotFound"));

const App = () => {

  return (
    <ToastProvider placement='bottom-left'>
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className='flone-preloader-wrapper'>
                  <div className='flone-preloader'>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Switch>
                <Route
                  exact
                  path={process.env.PUBLIC_URL + '/'}
                  component={Home}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/search'}
                  component={ReviewsSearch}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/profile'}
                  component={MyProfile}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/review'}
                  component={AddReview}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/login'}
                  component={Login}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/register'}
                  component={Register}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/password-reset'}
                  component={PasswordReset}
                />

                <Route
                  path={
                    process.env.PUBLIC_URL +
                    '/password/reset/confirm/:uid/:token'
                  }
                  component={PasswordConfirm}
                />

                <Route
                  path={process.env.PUBLIC_URL + '/request-sent'}
                  component={RequestSent}
                />

                <Route exact component={NotFound} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  )
};

App.propTypes = {
  dispatch: PropTypes.func
};

export default App;
// export default connect()(multilanguage(App));
