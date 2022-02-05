import {
  GET_REVIEW_TEMPLATE_SUCCESS,
  GET_REVIEW_TEMPLATE_FAIL,
  SET_REVIEW_SUCCESS,
  SET_REVIEW_FAIL,
  GET_REVIEWS_ABOUT_ME_SUCCESS,
  GET_REVIEWS_ABOUT_ME_FAIL,
  GET_MY_REVIEWS_SUCCESS,
  GET_MY_REVIEWS_FAIL,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  SET_COMMENT_SUCCESS,
  CLEAR_REVIEWS,
  SET_COMMENT_FAIL,
  RESET_STATUS,
  RESET_REVIEW_ERROR,
  SET_LIKES_SUCCESS,
  SET_LIKES_FAIL,
  SET_COMMENTS_LIKES_SUCCESS,
  SET_COMMENTS_LIKES_FAIL,
} from '../actions/reviewActions'

const initialState = {
  review_templates: [],
  reviews_about_me: [],
  my_reviews: [],
  reviews: {},
  set_review_success: '',
  error: '',
  results: [],
}

const updateArray = (obj, payload) => {
  let arr = obj.results
  obj.results = arr.map(item => (item.id === payload.id ? payload : item))
  return obj
}

const reviewReducer = (state = initialState, action) => {
  const { type, payload } = action

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
    case SET_LIKES_SUCCESS:
      return {
        ...state,
        results: state.results.map(item =>
          item.id === payload.id ? payload : item
        ),
      }
    case SET_COMMENT_SUCCESS:
      return {
        ...state,
        results: state.results.map(item => {
          if (item.id === payload.id) {
            let arr = item.comments
            item.comments = arr.map(comment =>
              comment.id === payload.data.id ? payload.data : comment
            )
            item.count_comments = item.comments.length()
            console.log(item.count_comments)
            console.log(item.comments.length())
            return item
          } else {
            return item
          }
        }),
      }
    case SET_COMMENTS_LIKES_SUCCESS:
      return {
        ...state,
        results: state.results.map(item => {
          if (item.id === payload.review_id) {
            let arr = item.comments
            item.comments = arr.map(comment =>
              comment.id === payload.data.id ? payload.data : comment
            )
            return item
          } else {
            return item
          }
        }),
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
    case GET_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: payload.reviews,
        results: payload.reviews_results,
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
    case GET_REVIEWS_ABOUT_ME_FAIL:
    case SET_COMMENT_FAIL:
      return {
        ...state,
      }
    default:
      return state
  }
}

export default reviewReducer
