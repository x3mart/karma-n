import {
  GET_REVIEW_TEMPLATE_SUCCESS,
  GET_REVIEW_TEMPLATE_FAIL,
  SET_REVIEW_SUCCESS,
  SET_REVIEW_FAIL,
  GET_REVIEWS_ABOUT_ME_SUCCESS,
  GET_REVIEWS_ABOUT_ME_FAIL,
  GET_MY_REVIEWS_SUCCESS,
  GET_MY_REVIEWS_FAIL,
  SET_COMMENT_SUCCESS,
  CLEAR_REVIEWS,
  SET_COMMENT_FAIL,
  RESET_STATUS,
  RESET_REVIEW_ERROR,
} from '../actions/reviewActions'

const initialState = {
  review_templates: [],
  reviews_about_me: [],
  my_reviews: [],
  set_review_success: '', 
  error: ''
};

const reviewReducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case GET_REVIEW_TEMPLATE_SUCCESS:
      return {
        ...state,
        review_templates: payload,
      }
    case SET_REVIEW_SUCCESS:
      return {
        ...state,
        set_review_success: payload,
      }
    case RESET_STATUS:
      return {
        ...state,
        set_review_success: '',
      }
    case GET_REVIEWS_ABOUT_ME_SUCCESS:
      return {
        ...state,
        reviews_about_me: payload.reviews_about_me,
      }
    case GET_MY_REVIEWS_SUCCESS:
      return {
        ...state,
        my_reviews: payload.my_reviews,
      }
    case SET_REVIEW_FAIL:
      return {
        ...state,
        error: payload,
      }
    case RESET_REVIEW_ERROR:
      return {
        ...state,
        error: '',
      }
    case CLEAR_REVIEWS:
      return {
        ...state,
        review_templates: [],
        reviews_about_me: [],
        my_reviews: [],
      }
    case GET_REVIEW_TEMPLATE_FAIL:
    case SET_REVIEW_FAIL:
    case GET_MY_REVIEWS_FAIL:
    case SET_COMMENT_SUCCESS:
    case SET_COMMENT_FAIL:
    case GET_REVIEWS_ABOUT_ME_FAIL:
    case SET_COMMENT_FAIL:
      return {
        ...state,
      }
    default:
      return state
  }
}


export default reviewReducer;