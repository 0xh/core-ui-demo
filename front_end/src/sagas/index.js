import { all } from "redux-saga/effects";
import { loginFlow, logoutFlow } from "../sagas/loginSaga";
import { findUser, deleteUser, addUser } from "../sagas/userSaga";

export default function* rootSaga() {
  yield all([loginFlow(), logoutFlow(), findUser(), deleteUser(), addUser()]);
}
