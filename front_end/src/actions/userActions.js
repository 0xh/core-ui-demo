import { userConstants } from "../constants";

export const addUser = user => {
  return {
    type: userConstants.ADD_USER,
    user
  };
};

export const findUser = () => {
  return {
    type: userConstants.FETCH_REQUEST
  };
};

export const deleteUser = userId => {
  return {
    type: userConstants.DELETE_USER,
    userId
  };
};
