import axios from 'axios'

export const GET_ALL_CATEGORIES_SUCCESS = 'GET_ALL_CATEGORIES_SUCCESS'
export const GET_ALL_CATEGORIES_FAIL = 'GET_ALL_CATEGORIES_FAIL'
export const SET_CATEGORY_SUCCESS = 'SET_CATEGORY_SUCCESS'
export const SET_CATEGORY_FAIL = 'SET_CATEGORY_FAIL'
export const GET_ALL_SERVICES_SUCCESS = 'GET_ALL_SERVICES_SUCCESS'
export const GET_ALL_SERVICES_FAIL = 'GET_ALL_SERVICES_FAIL'
export const SET_SERVICE_SUCCESS = 'SET_SERVICE_SUCCESS'
export const SET_SERVICE_FAIL = 'SET_SERVICE_FAIL'
export const GET_ALL_USERS_SERVICES_SUCCESS = 'GET_ALL_USERS_SERVICES_SUCCESS'
export const GET_ALL_USERS_SERVICES_FAIL = 'GET_ALL_USERS_SERVICES_FAIL'
export const SET_USERS_SERVICE_SUCCESS = 'SET_USERS_SERVICE_SUCCESS'
export const SET_USERS_SERVICE_FAIL = 'SET_USERS_SERVICE_FAIL'

export const get_all_categories = () => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/servicecategories/`,
      config
    )

    const data = {
      templates: res.data,
    }

    dispatch({
      type: GET_ALL_CATEGORIES_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: GET_ALL_CATEGORIES_FAIL,
    })
  }
}

export const set_category = title => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  }

  const content = JSON.stringify({ title: title })

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/servicecategories/`,
      content,
      config
    )

    const payload = {
      data: res.data,
      title: title
     }

    dispatch({
      type: SET_CATEGORY_SUCCESS,
      payload: payload,
    })
  } catch (err) {
    dispatch({
      type: SET_CATEGORY_FAIL,
      payload: err.response.data.error,
    })
  }
}

export const set_service = (title, category_id) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  }

  const content = JSON.stringify({service: title})

  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/servicecategories/${category_id}/`,
      content,
      config
    )

    const payload = {
      data: res.data,
      title: ''
     }

    dispatch({
      type: SET_SERVICE_SUCCESS,
      payload: payload,
    })
  } catch (err) {
    dispatch({
      type: SET_SERVICE_FAIL,
      payload: err.response.data.error,
    })
  }
}

export const get_all_users_services = id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  }

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/servicecategories/?services_accounts=${id}`,
      config
    )

    dispatch({
      type: GET_ALL_USERS_SERVICES_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: GET_ALL_USERS_SERVICES_FAIL,
    })
  }
}

export const set_users_service = (title, category_id) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  }

  const content = JSON.stringify(title, category_id)

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/servicecategories/`,
      content,
      config
    )

    dispatch({
      type: SET_USERS_SERVICE_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: SET_USERS_SERVICE_FAIL,
      payload: err.response.data.error,
    })
  }
}
