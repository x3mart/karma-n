import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import authReducer from "./authReducer";
import reviewReducer from "./reviewReducer";
import serviceReducer from "./serviceReducer";

const rootReducer = combineReducers({
  searchData: searchReducer,
  auth: authReducer,
  review: reviewReducer,
  service: serviceReducer,
});

export default rootReducer;
