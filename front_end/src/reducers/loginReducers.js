import { loginConstants } from "../constants";
import auth from "../services/auth";

const initialState = {
  isAuthenticated: auth.loggedIn(),
  userName: auth.getUserName(),
  loginFailed: false
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case loginConstants.LOGIN_SUCCESS: {
      return Object.assign({}, state, { isAuthenticated: true });
    }

    case loginConstants.LOGOUT_REQUEST: {
      return Object.assign({}, state, { isAuthenticated: false });
    }

    case loginConstants.LOGIN_FAILED: {
      return Object.assign({}, state, { loginFailed: true });
    }

    default:
      return state;
  }
}
