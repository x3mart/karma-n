import React, {Fragment} from "react";
import MetaTags from "react-meta-tags";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import MainLayout from "../../layouts/MainLayout";
import Breadcrumb from '../../components/breadcrumbs/Breadcrumb'
import SideBar from "../../components/my-account/SideBar";
import ReviewContent from "../../components/ReviewContent";

const AddReview = ({ location }) => {

  const {pathname, search} = location;

  const meta_tags = (
    <Fragment>
      <meta
          name="description"
          content="Добавить отзыв"
        />
    </Fragment>
  )

  return (
    <Fragment>
      <MetaTags>{meta_tags}</MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>
        Главная
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Добавить отзыв
      </BreadcrumbsItem>
      <MainLayout headerTop='visible'>
        <Breadcrumb />

        <div className='container bootstrap snippets bootdey'>
          <div className='row'>
            <div className='profile-nav col-md-6 col-xl-3'>
              <SideBar cat='review' />
            </div>
            <div className='profile-info col-md-6 col-xl-9'>
              <ReviewContent search={search} />
            </div>
          </div>
        </div>
      </MainLayout>
    </Fragment>
  )

}

export default AddReview
