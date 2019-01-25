/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../actions";
import { reduxForm, Field } from "redux-form";

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  return errors;
};

const createRenderer = render => ({ input, meta, id, type, label }) => (
  <div className={["form-group", meta.active ? "active" : ""].join(" ")}>
    <label htmlFor={id}>{label}</label>
    {render(input, label, type, id, meta)}

    {meta.error && meta.touched && (
      <div className="invalid-feedback">{meta.error}</div>
    )}
  </div>
);

const RenderInput = createRenderer((input, label, id, type, meta) => (
  <input
    {...input}
    type={type}
    id={id}
    placeholder={label}
    className={
      meta.error && meta.touched ? "form-control is-invalid" : "form-control"
    }
  />
));

class Login extends Component {
  render() {
    return (
      <div className="container-fluid pt-5 login">
        <div className="row justify-content-center ">
          <div>
            {this.props.auth.loginFailed ? (
              <p className="text-danger">Incorrect username and password</p>
            ) : null}
            <form onSubmit={this.props.handleSubmit(this.props.login)}>
              <Field
                name="username"
                label="Username"
                id="username"
                component={RenderInput}
              />
              <Field
                name="password"
                label="Password"
                type="password"
                id="password"
                component={RenderInput}
              />
              <div className="text-center pt-2">
                <button
                  type="submit"
                  className="btn btn-primary m-auto"
                  disabled={this.props.submitting}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "login", validate })(Login));
