import axios from "axios";
import Cookies from 'js-cookie';
import {clearReviews} from "./reviewActions";

export const GET_PHONE_CODE_SUCCESS = "GET_PHONE_CODE_SUCCESS";
export const GET_PHONE_CODE_FAIL = "GET_PHONE_CODE_FAIL";
export const SET_PHONE_APPROVED_SUCCESS = "SET_PHONE_APPROVED_SUCCESS";
export const SET_PHONE_APPROVED_FAIL = "SET_PHONE_APPROVED_FAIL";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";


export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';
export const ACTIVATION_SUCCESS = 'ACTIVATION_SUCCESS';
export const ACTIVATION_FAIL = 'ACTIVATION_FAIL';
export const USER_LOADED_SUCCESS = 'USER_LOADED_SUCCESS';
export const USER_LOADED_FAIL = 'USER_LOADED_FAIL';
export const AUTHENTICATED_SUCCESS = 'AUTHENTICATED_SUCCESS';
export const AUTHENTICATED_FAIL = 'AUTHENTICATED_FAIL';
export const PASSWORD_RESET_FAIL = 'PASSWORD_RESET_FAIL';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_CONFIRM_FAIL = 'PASSWORD_RESET_CONFIRM_FAIL';
export const PASSWORD_RESET_CONFIRM_SUCCESS = 'PASSWORD_RESET_CONFIRM_SUCCESS';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAIL = 'USER_UPDATE_FAIL';
export const USER_ADD_EXTRA_PHONE_SUCCESS = 'USER_ADD_EXTRA_PHONE_SUCCESS'
export const USER_ADD_EXTRA_PHONE_FAIL = 'USER_ADD_EXTRA_PHONE_FAIL'
export const LOGOUT = 'LOGOUT';

export const getPhoneCode = (raw) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const getJson = () => {
    const prephone = raw.replace(/[^+\d]/g, '')
    const phone = prephone[0] === '+' ? prephone.substring(1) : prephone
    return JSON.stringify({phone})
  }

  const body = getJson();

  try {
    await axios.post(`http://novosti247.ru/register/getcode/`, body, config);

    dispatch({
      type: GET_PHONE_CODE_SUCCESS,
      payload: {phone: raw}
    });
  } catch (err) {
    const data = {
      phone_error: err.response
    }
    dispatch({
      type: GET_PHONE_CODE_FAIL,
      payload: data
    })
  }
};

export const setPhoneApproved = (raw, code) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const getJson = () => {
    const prephone = raw.replace(/[^+\d]/g, '')
    const phone = prephone[0] === '+' ? prephone.substring(1) : prephone
    return JSON.stringify({phone, code})
  }

  const body = getJson();

  try {
    await axios.post(`http://novosti247.ru/register/checkcode/`, body, config);

    dispatch({
      type: SET_PHONE_APPROVED_SUCCESS
    });
  } catch (err) {
    const data = {
      phone_error: err.response
    }
    dispatch({
      type: SET_PHONE_APPROVED_FAIL,
      payload: data
    })
  }
};

export const load_user = () => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      }
    };

    try {
      const res = await axios.get(`http://novosti247.ru/auth/users/me/`, config);

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAIL
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL
    });
  }
};


export const checkAuthenticated = () => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    const body = JSON.stringify({token: localStorage.getItem('access')});

    try {
      const res = await axios.post(`http://novosti247.ru/auth/jwt/verify/`, body, config)

      if (res.data.code !== 'token_not_valid') {
        dispatch({
          type: AUTHENTICATED_SUCCESS
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL
      });
    }

  } else {
    dispatch({
      type: AUTHENTICATED_FAIL
    });
  }
};

export const login = (raw, password) => async dispatch => {
  const config = {
    headers: {
            'Content-Type': 'application/json'
        }
  };

  const getJson = () => {
    const phone = raw.replace(/[^+\d]/g, '')
    return JSON.stringify({phone, password})
  }

  const body = getJson();

  try {
    const res = await axios.post(`http://novosti247.ru/auth/jwt/create/`, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(load_user());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL
    })
  }
};

export const signup = (raw, email, name, password, re_password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const getJson = () => {
    const prephone = raw.replace(/[^+\d]/g, '')
    const phone = prephone[0] === '+' ? prephone.substring(1) : prephone
    return JSON.stringify({phone, email, name, password, re_password})
  }

  const body = getJson();

  try {
    const res = await axios.post(`http://novosti247.ru/auth/users/`, body, config);

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL
    })
  }
};

export const verify = (uid, token) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({uid, token});

  try {
    await axios.post(`http://novosti247.ru/auth/users/activation/`, body, config);

    dispatch({
      type: ACTIVATION_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: ACTIVATION_FAIL
    })
  }
};

export const reset_password = (email) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({email});

  try {
    await axios.post(`http://novosti247.ru/auth/users/reset_password/`, body, config);

    dispatch({
      type: PASSWORD_RESET_SUCCESS
    });
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_FAIL
    });
  }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({uid, token, new_password, re_new_password});

  try {
    await axios.post(`http://novosti247.ru/auth/users/reset_password_confirm/`, body, config);

    dispatch({
      type: PASSWORD_RESET_CONFIRM_SUCCESS
    });
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_CONFIRM_FAIL
    });
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
  dispatch(clearReviews());
};

export const update_user = ({name, full_name, city, birthday, avatar, about}) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      }
    };

    const content = JSON.stringify({name, full_name, city, birthday, avatar, about});

    try {
      const res = await axios.patch(`http://novosti247.ru/auth/users/me/`, content, config);

      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: USER_UPDATE_FAIL
      });
    }
  } else {
    dispatch({
      type: USER_UPDATE_FAIL
    });
  }
};

export const add_extra_phone = phone => async dispatch => {

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  }

  const body = JSON.stringify({ phone_number: phone })

  try {
    const res = await axios.patch(
      `http://novosti247.ru/auth/users/phone_attach/`,
      body,
      config
    )

   const data = {
     phone_number: phone,
     id: res.data
   } 

    dispatch({
      type: USER_ADD_EXTRA_PHONE_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: USER_ADD_EXTRA_PHONE_FAIL,
    })
  }
}
