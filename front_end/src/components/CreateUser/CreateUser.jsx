/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Button,
  Row,
  Col
} from "reactstrap";
import { addUser } from "../../actions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  }
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
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

class CreateUser extends React.Component {
  render() {
    return (
      <Card>
        <Row>
          <Col className="col-auto mr-auto">
            <CardHeader>
              <CardTitle tag="h4">Create User</CardTitle>
            </CardHeader>
          </Col>
          <Col className="col-auto">
            <Link className="mx-3 btn btn-primary" to="users">
              Back
            </Link>
          </Col>
        </Row>
        <CardBody>
          <form onSubmit={this.props.handleSubmit(this.props.addUser)}>
            <Row>
              <Col md="6">
                <Field
                  name="username"
                  label="Username"
                  id="username"
                  component={RenderInput}
                />
              </Col>
              <Col md="6">
                <Field
                  name="name"
                  label="Name"
                  id="name"
                  component={RenderInput}
                />
              </Col>
              <Col md="6">
                <Field
                  name="email"
                  label="Email"
                  id="email"
                  component={RenderInput}
                />
              </Col>
              <Col md="6">
                <Field
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  id="password"
                  component={RenderInput}
                />
              </Col>
            </Row>
            <Button
              type="submit"
              className="btn btn-primary"
              disabled={this.props.submitting}
            >
              Save
            </Button>
          </form>
        </CardBody>
      </Card>
    );
  }
}

CreateUser.propTypes = {
  addUser: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  addUser
};

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ form: "user", validate })(CreateUser));
