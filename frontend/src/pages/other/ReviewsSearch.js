import React, {Fragment} from "react";
import InnerLayout from "../../layouts/InnerLayout";
import SideBar from "../../components/my-account/SideBar";
import Search from "../../components/SearchContent";

const ReviewsSearch = ({ location }) => {

  const {pathname} = location;

  const meta_tags = (
    <Fragment>
      <meta
          name="description"
          content="Поиск"
        />
    </Fragment>
  )

  const content = (
    <Fragment>

      <div className="panel">
                  <div className="bio-graph-heading">
                    Поиск
                  </div>
                  <div className="panel-body bio-graph-info">
                    <Search />

                  </div>
                </div>


    </Fragment>
  )
  const sidebar = <SideBar cat='search'/>

  return (
    <InnerLayout content={content} meta_tags={meta_tags} pathname={pathname} sidebar={sidebar} title="Поиск"/>
  )

}

export default ReviewsSearch
