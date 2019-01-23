import http from "../http";
import { host } from "../constants";

const userService = {
  async find() {
    return http
      .get(`${host}/users`)
      .then(res => res.data)
      .catch(err => {
        throw err;
      });
  },
  async get(id) {
    return http
      .get(`${host}/users${id}`)
      .then(res => res.data)
      .catch(err => {
        throw err;
      });
  },
  async create(user) {
    return http
      .post(`${host}/users`, user)
      .then(res => res.data)
      .catch(err => {
        throw err;
      });
  },
  async delete(id) {
    return http
      .delete(`${host}/users/${id}`)
      .then(res => res.data)
      .catch(err => {
        throw err;
      });
  }
};

export default userService;
