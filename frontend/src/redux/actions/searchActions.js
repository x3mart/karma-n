export const SET_SEARCH_REQUEST_SUCCESS = "SET_SEARCH_REQUEST_SUCCESS";

export const searchRequestSuccess = request => async dispatch => {
  const getPhone = n => {
    if(n){
      const phone = n.replace(/[^+\d]/g, '')
      return phone[0] === '+' ? phone.substring(1) : phone
    }
  }
  dispatch({
    type: SET_SEARCH_REQUEST_SUCCESS,
    payload: getPhone(request),
  })
}
