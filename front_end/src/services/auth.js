import axios from "axios";
import { host } from "../constants";
let localStorage = global.window.localStorage;

const auth = {
  /**
   * Logs a user in, returning a promise with `true` when done
   * @param  {string} username The username of the user
   * @param  {string} password The password of the user
   */
  login(username, password) {
    if (auth.loggedIn())
      return {
        token: localStorage.token,
        userName: localStorage.userName
      };

    return new Promise(function(resolve, reject) {
      axios
        .post(`${host}/authentication`, {
          username,
          password,
          strategy: "local"
        })
        .then(response => {
          localStorage.token = response.data.accessToken;
          localStorage.userName = response.data.user.name;
          resolve(response.data);
        })
        .catch(function(err) {
          reject(err);
        });
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
