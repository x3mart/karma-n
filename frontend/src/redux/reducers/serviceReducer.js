import {
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAIL,
  SET_CATEGORY_SUCCESS,
  SET_CATEGORY_FAIL,
  GET_ALL_SERVICES_SUCCESS,
  GET_ALL_SERVICES_FAIL,
  SET_SERVICE_SUCCESS,
  SET_SERVICE_FAIL,
  GET_ALL_USERS_SERVICES_SUCCESS,
  GET_ALL_USERS_SERVICES_FAIL,
  SET_USERS_SERVICE_SUCCESS,
  SET_USERS_SERVICE_FAIL,
} from '../actions/serviceActions'

const initialState = {
  categories: [],
  temp_title: '',
  services: [],
  service: {},
  users_services: [],
  error: '',
}

const serviceReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload,
      }
    case GET_ALL_USERS_SERVICES_SUCCESS:
      return {
        ...state,
        users_services: payload,
      }
    case SET_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: payload.data,
        temp_title: payload.title,
      }

    case SET_SERVICE_SUCCESS:
      return {
        ...state,
        service: payload.data,
        temp_title: payload.title,
      }

    case GET_ALL_CATEGORIES_FAIL:
      return {
        ...state,
      }
    case SET_CATEGORY_FAIL:
      return {
        ...state,
        error: payload,
      }
    default:
      return state
  }
}

export default serviceReducer
