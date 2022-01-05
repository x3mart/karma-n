import React, {Fragment} from "react";

const Rating = ({ratingValue}) => {
  let rating = [];

  for (let i = 0; i < 5; i++) {
    rating.push(<i className="fa fa-star-o" key={i}/>);
  }


  if (ratingValue && ratingValue > 0) {
    if ((ratingValue % Math.floor(ratingValue) > 0 && ratingValue % Math.floor(ratingValue) < 0.5) || (ratingValue % Math.floor(ratingValue) === 0)) {
      for (let i = 0; i <= ratingValue - 1; i++) {
        rating[i] = <i className="fa fa-star" key={i}/>;
      }
    } else if (ratingValue % Math.floor(ratingValue) >= 0.5) {
      for (let i = 0; i <= Math.floor(ratingValue) - 1; i++) {
        rating[i] = <i className="fa fa-star" key={i}/>;
      }
      rating[Math.floor(ratingValue)] = <i className="fa fa-star-half-o" key={Math.floor(ratingValue)}/>;
    }
  }
  return <Fragment>{rating}</Fragment>;
};

export default Rating;
