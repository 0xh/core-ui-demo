import { put, call, takeEvery } from "redux-saga/effects";
import { userConstants } from "../constants";
import userService from "../services/user";
import history from "../history";

export function* findUser() {
  yield takeEvery(userConstants.FETCH_REQUEST, function*() {
    const user = yield call(userService.find);
    yield put({ type: userConstants.FETCH_SUCCESS, user });
  });
}

export function* deleteUser() {
  yield takeEvery(userConstants.DELETE_USER, function*(request) {
    yield call(userService.delete, request.userId);
    yield put({ type: userConstants.FETCH_REQUEST });
  });
}

export function* addUser() {
  yield takeEvery(userConstants.ADD_USER, function*(request) {
    yield call(userService.create, request.user);
    yield put({ type: userConstants.FETCH_REQUEST });
    yield history.push("/users");
  });
}
