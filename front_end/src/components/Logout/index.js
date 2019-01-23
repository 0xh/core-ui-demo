import { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions";

class Logout extends Component {
  UNSAFE_componentWillMount() {
    this.props.logout();
  }
  render() {
    return null;
  }
}

const mapDispatchToProps = {
  logout
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
