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
import { deleteUser, addUser, findUser } from "../../actions";
import { PanelHeader } from "components";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

const thead = ["ID", "Username", "Name", "Email", ""];

class Users extends React.Component {
  componentDidMount() {
    this.props.findUser();
  }
  render() {
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">User List</CardTitle>
                </CardHeader>
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
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = {
  addUser,
  deleteUser,
  findUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
