import PropTypes from "prop-types";
import React from "react";
import {Link} from "react-router-dom";

const Logo = ({imageUrl, logoClass, logoText}) => {
  return (
    <div className={`${logoClass ? logoClass : ""}`}>
      <Link to={process.env.PUBLIC_URL + "/"}>

        {imageUrl && logoText ?
          <div className="d-flex align-items-center">

            <img className="logo-image" alt="" src={process.env.PUBLIC_URL + imageUrl} width="50px"/>
            <p className="logo-text">{logoText}</p>

          </div>
          :
          imageUrl ?
            <img alt="" src={process.env.PUBLIC_URL + imageUrl} width="50px"/>
            :
            logoText ?
              <p className="logo-text">{logoText}</p>
              :
              ''
        }

      </Link>
    </div>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string,
  logoClass: PropTypes.string
};

export default Logo;
