import React, {Fragment} from "react";
import MetaTags from "react-meta-tags";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import MainLayout from "./MainLayout";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";



const InnerLayout = ({pathname, meta_tags, title, sidebar, content}) => {

  return (
    <Fragment>
      <MetaTags>
        {meta_tags}
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Главная</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        {title}
      </BreadcrumbsItem>
      <MainLayout headerTop="visible">
        <Breadcrumb/>

        <div className="container bootstrap snippets bootdey">
          <div className="row">
            <div className="profile-nav col-md-6 col-xl-3">
              {sidebar}
            </div>
            <div className="profile-info col-md-6 col-xl-9">
              {content}
            </div>
          </div>
        </div>
      </MainLayout>
    </Fragment>
  );
};

export default InnerLayout;
