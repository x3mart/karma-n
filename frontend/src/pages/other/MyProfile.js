import React, {Fragment} from "react";
import SideBar from "../../components/my-account/SideBar";
import Profile from "../../components/profile/Profile";
import MetaTags from 'react-meta-tags'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/breadcrumbs/Breadcrumb'

const MyProfile = ({ location }) => {

  const {pathname} = location;

  return (
    <Fragment>
      <MetaTags>
      <meta
          name="description"
          content="Поиск"
        />
        </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>
        Главная
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Моя страница
      </BreadcrumbsItem>
      <MainLayout headerTop='visible'>
        <Breadcrumb />

        <div className='container bootstrap snippets bootdey'>
          <div className='row'>
            <div className='profile-nav col-md-6 col-xl-3'><SideBar cat='profile'/></div>
            <div className='profile-info col-md-6 col-xl-9'>
              <Profile />
            </div>
          </div>
        </div>
      </MainLayout>
    </Fragment>
  )

}

export default MyProfile
