import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import authReducer from "./authReducer";
import reviewReducer from "./reviewReducer";

const rootReducer = combineReducers({
  searchData: searchReducer,
  auth: authReducer,
  review: reviewReducer
});

export default rootReducer;
