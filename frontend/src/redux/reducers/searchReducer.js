import { SET_SEARCH_REQUEST_SUCCESS } from "../actions/searchActions";

const initState = {
  request: ""
};

const searchReducer = (state = initState, action) => {
  const {type, payload} = action

  switch (type) {
    case SET_SEARCH_REQUEST_SUCCESS:
      return {
        ...state,
        request: payload
      }
    default:
      return {
        ...state,
      }
  }
};

export default searchReducer;
