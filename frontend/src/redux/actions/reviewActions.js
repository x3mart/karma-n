import axios from "axios";

export const GET_REVIEW_TEMPLATE_SUCCESS = "GET_REVIEW_TEMPLATE_SUCCESS";
export const GET_REVIEW_TEMPLATE_FAIL = "GET_REVIEW_TEMPLATE_FAIL";
export const SET_REVIEW_SUCCESS = "SET_REVIEW_SUCCESS";
export const SET_REVIEW_FAIL = "SET_REVIEW_FAIL";
export const GET_REVIEWS_ABOUT_ME_SUCCESS = "GET_REVIEWS_ABOUT_ME_SUCCESS";
export const GET_REVIEWS_ABOUT_ME_FAIL = "GET_REVIEWS_ABOUT_ME_FAIL";
export const GET_MY_REVIEWS_SUCCESS = "GET_MY_REVIEWS_SUCCESS";
export const GET_MY_REVIEWS_FAIL = "GET_MY_REVIEWS_FAIL";
export const SET_COMMENT_SUCCESS = "SET_COMMENT_SUCCESS";
export const SET_COMMENT_FAIL = "SET_COMMENT_FAIL";
export const CLEAR_REVIEWS = "CLEAR_REVIEWS";
export const RESET_STATUS = 'RESET_STATUS'
export const RESET_REVIEW_ERROR = 'RESET_REVIEW_ERROR'


export const getReviewTemplates = n => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.get(
      `http://novosti247.ru/api/reviewtemplates/?is_customer=${n}`,
      config
    )

    const data = {
      templates: res.data
    }

    dispatch({
      type: GET_REVIEW_TEMPLATE_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: GET_REVIEW_TEMPLATE_FAIL
    })
  }
};

export const setReview = ({phone_number, attributes, body}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('access')}`,
      'Accept': 'application/json'
    }
  };

  const content = JSON.stringify({ phone_number, attributes, body })

  try {
    const res = await axios.post(`http://novosti247.ru/api/reviews/`, content, config);

    dispatch({
      type: SET_REVIEW_SUCCESS,
      payload: res.status
    });
  } catch (err) {
    dispatch({
      type: SET_REVIEW_FAIL,
      payload: err.response.data.error,
    })
  }
};

export const resetReviewError = () => dispatch => {
  dispatch({
    type: RESET_REVIEW_ERROR,
  })
};

export const getReviewsAboutMe = phone_number => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `JWT ${localStorage.getItem('access')}`,
      'Accept': 'application/json'
    }
  };

  const getPhone = (n) => {
    const phone = n.replace(/[^+\d]/g, '')
    return phone[0] === '+' ? phone.substring(1) : phone
  }

  try {
    const res = await axios.get(
      `http://novosti247.ru/api/reviews/?phone__phone_number=${getPhone(
        phone_number
      )}/`,
      config
    )

    const data = {
      reviews_about_me: res.data
    }

    dispatch({
      type: GET_REVIEWS_ABOUT_ME_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: GET_REVIEWS_ABOUT_ME_FAIL,
      payload: err.massage
    })
  }
};

export const getMyReviews = id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('access')}`,
      'Accept': 'application/json'
    }
  };

  try {
    const res = await axios.get(`http://novosti247.ru/api/reviews/?owner=${id}`, config);

    const data = {
      my_reviews: res.data
    }

    dispatch({
      type: GET_MY_REVIEWS_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: GET_MY_REVIEWS_FAIL,
      payload: err
    })
  }
};

export const setComment = (review, body, owner_id) => async dispatch => {

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('access')}`,
      'Accept': 'application/json'
    }
  };

  const content = JSON.stringify({review, body});

  try {
    await axios.post(`http://novosti247.ru/api/comments/`, content, config);

    dispatch({
      type: SET_COMMENT_SUCCESS
    });
    dispatch(getMyReviews(owner_id));
  } catch (err) {
    dispatch({
      type: SET_COMMENT_FAIL,
      payload: err,
    })
  }
};

export const clearReviews = () => dispatch => {
  dispatch({
    type: CLEAR_REVIEWS
  });
};

export const resetStatus = () => dispatch => {
  dispatch({
    type: RESET_STATUS,
  })
};

