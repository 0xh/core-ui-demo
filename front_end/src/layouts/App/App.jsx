import React, { Component } from "react";
import Login from "../../components/Login";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PrivateRoute from "../../components/PrivateRoute";
import indexRoutes from "../../routes/index";
import PropTypes from "prop-types";

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <Switch>
        {this.props.auth.isAuthenticated ? null : (
          <Route path="/login" component={Login} />
        )}

        {indexRoutes.map((prop, key) => {
          return (
            <PrivateRoute
              path={prop.path}
              key={key}
              component={prop.component}
              isAuthenticated={this.props.auth.isAuthenticated}
            />
          );
        })}
      </Switch>
    );
  }
}

App.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps)(App));
