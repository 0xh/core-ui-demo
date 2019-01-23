import { combineReducers } from "redux";
import userReducer from "./userReducers";
import loginReducers from "./loginReducers";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  users: userReducer,
  auth: loginReducers,
  form: formReducer
});

export default rootReducer;
