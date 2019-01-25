/* eslint-disable react/prop-types */
import React from "react";
import { Row, Col } from "reactstrap";
import UserList from "../../components/UserList/UserList";
import CreateUser from "../../components/CreateUser/CreateUser";
import { PanelHeader } from "components";
import PrivateRoute from "../../components/PrivateRoute";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Users extends React.Component {
  render() {
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={12}>
              <Switch>
                <PrivateRoute
                  path={`${this.props.match.url}/create`}
                  exact
                  component={CreateUser}
                  isAuthenticated={this.props.auth.isAuthenticated}
                />
                <PrivateRoute
                  component={UserList}
                  isAuthenticated={this.props.auth.isAuthenticated}
                />
              </Switch>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Users)
);
