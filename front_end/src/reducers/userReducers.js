import { userConstants } from "../constants";

const initialState = {
  data: []
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    /* Add contacts to the state array */
    case userConstants.FETCH_SUCCESS: {
      return Object.assign({}, state, action.user);
    }

    default:
      return state;
  }
}
