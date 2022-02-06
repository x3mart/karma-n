import React, { Fragment } from 'react'
import MetaTags from 'react-meta-tags'
import MainLayout from '../../layouts/MainLayout'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import Breadcrumb from '../../components/breadcrumbs/Breadcrumb'
import SideBar from '../../components/my-account/SideBar'
import SearchContent from '../../components/SearchContent'

const Search = ({ location }) => {
  return (
    <Fragment>
      <MetaTags>
        <meta name='description' content='Поиск' />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>
        Главная
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + location}>
        Поиск
      </BreadcrumbsItem>
      <MainLayout headerTop='visible'>
        <Breadcrumb />

        <div className='container bootstrap snippets bootdey'>
          <div className='row'>
            <div className='profile-nav col-md-6 col-xl-3 mb-4'>
              <SideBar cat='search' />
            </div>
            <div className='profile-info col-md-6 col-xl-9'>
              <div className='panel'>
                <div className='bio-graph-heading'>Поиск</div>
                <div className='panel-body bio-graph-info mb-4'>
                  <SearchContent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </Fragment>
  )
}

export default Search
