import axios from "axios";
import { host } from "../constants";
let localStorage;

// // If we're testing, use a local storage polyfill
// if (global.process && process.env.NODE_ENV === "test") {
//   localStorage = require("localStorage");
// } else {
//   // If not, use the browser one
//   localStorage = global.window.localStorage;
// }
localStorage = global.window.localStorage;
const auth = {
  /**
   * Logs a user in, returning a promise with `true` when done
   * @param  {string} username The username of the user
   * @param  {string} password The password of the user
   */
  async login(username, password) {
    if (auth.loggedIn()) return Promise.resolve(true);
    // var headers = {
    //   "Content-Type": "application/json"
    // };
    // Post a fake request
    return axios
      .post(
        `${host}/authentication`,
        { username, password, strategy: "local" }
        // headers
      )
      .then(response => {
        // Save token to local storage
        localStorage.token = response.data.accessToken;
        localStorage.userName = response.data.user.name;
        return Promise.resolve(true);
      });
  },
  /**
   * Logs the current user out
   */
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
  },

  getToken() {
    return localStorage.token;
  },
  getUserName() {
    return localStorage.userName;
  },
  /**
   * Checks if a user is logged in
   */
  loggedIn() {
    return !!localStorage.token;
  },
  /**
   * Registers a user and then logs them in
   * @param  {string} username The username of the user
   * @param  {string} password The password of the user
   */
  // register(username, password) {
  //   // // Post a fake request
  //   // return (
  //   //   request
  //   //     .post("/register", { username, password })
  //   //     // Log user in after registering
  //   //     .then(() => auth.login(username, password))
  //   // );
  // },
  onChange() {}
};

export default auth;
