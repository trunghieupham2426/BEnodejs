import { combineReducers } from "redux";
import loginStatusReducer from "./loginStatusReducer";
import handleProductReducer from "./handleProductReducer";

const rootReducer = combineReducers({
  isLoggedIn: loginStatusReducer,
  productList: handleProductReducer,
});

export default rootReducer;
