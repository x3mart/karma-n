import {
  SET_PHONE_APPROVED_SUCCESS,
  SET_PHONE_APPROVED_FAIL,
  GET_PHONE_CODE_SUCCESS,
  GET_PHONE_CODE_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  LOGOUT,
  USER_ADD_EXTRA_PHONE_SUCCESS,
  USER_ADD_EXTRA_PHONE_FAIL,
} from '../actions/authActions'

const initialState = {
  phone_approved: false,
  phone_error: '',
  phone: '',
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated: null,
  user: null,
}

const authReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_PHONE_APPROVED_SUCCESS:
      return {
        ...state,
        phone_approved: true,
      }
    case USER_ADD_EXTRA_PHONE_SUCCESS:
      return {
        ...state,
        user: state.user.phones.push(payload),
      }
    case SET_PHONE_APPROVED_FAIL:
    case GET_PHONE_CODE_FAIL:
      return {
        ...state,
        phone_error: payload.phone_error,
      }
    case GET_PHONE_CODE_SUCCESS:
      return {
        ...state,
        phone: payload.phone,
      }
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        phone: '',
        isAuthenticated: true,
      }
    case LOGIN_SUCCESS:
      localStorage.setItem('access', payload.access)
      localStorage.setItem('refresh', payload.refresh)
      return {
        ...state,
        phone: '',
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        phone: '',
        isAuthenticated: false,
      }
    case USER_LOADED_SUCCESS:
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        phone: '',
        user: payload,
      }
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        phone: '',
        isAuthenticated: false,
      }
    case USER_LOADED_FAIL:
      return {
        ...state,
        phone: '',
        user: null,
      }
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
    case LOGOUT:
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      return {
        ...state,
        phone: '',
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
      }
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
    case PASSWORD_RESET_CONFIRM_FAIL:
    case ACTIVATION_SUCCESS:
    case ACTIVATION_FAIL:
    case USER_UPDATE_FAIL:
      return {
        ...state,
      }
    default:
      return state
  }
}

export default authReducer
