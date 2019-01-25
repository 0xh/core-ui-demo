/* eslint-disable react/prop-types */
import React from "react";
import {
  Card,
  CardBody,
  Table,
  Row,
  Col,
  Button,
  CardTitle,
  CardHeader
} from "reactstrap";
import { deleteUser, findUser } from "../../actions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

const thead = ["ID", "Username", "Name", "Email", ""];

class UserList extends React.Component {
  componentDidMount() {
    this.props.findUser();
  }
  render() {
    return (
      <Card>
        <Row>
          <Col className="col-auto mr-auto">
            <CardHeader>
              <CardTitle tag="h4">Users</CardTitle>
            </CardHeader>
          </Col>
          <Col className="col-auto">
            <Link
              className="mx-3 btn btn-primary"
              to={`${this.props.match.url}/create`}
            >
              Create
            </Link>
          </Col>
        </Row>
        <CardBody>
          <Table responsive>
            <thead className="text-primary">
              <tr>
                {thead.map((prop, key) => {
                  if (key === thead.length - 1)
                    return (
                      <th key={key} className="text-right">
                        {prop}
                      </th>
                    );
                  return <th key={key}>{prop}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {this.props.users.data.map((prop, key) => {
                return (
                  <tr key={key}>
                    <td>{prop._id}</td>
                    <td>{prop.username}</td>
                    <td>{prop.name}</td>
                    <td>{prop.email}</td>
                    <td>
                      <Button
                        color="primary"
                        onClick={() => this.props.deleteUser(prop._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = {
  deleteUser,
  findUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
