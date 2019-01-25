/* eslint-disable react/prop-types */
/* eslint-disable react/no-string-refs */
import React from "react";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container
} from "reactstrap";

import dashboardRoutes from "routes/dashboard.jsx";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      color: "transparent"
    };
    this.toggle = this.toggle.bind(this);
    this.dropdownToggle = this.dropdownToggle.bind(this);
  }
  toggle() {
    if (this.state.isOpen) {
      this.setState({
        color: "transparent"
      });
    } else {
      this.setState({
        color: "white"
      });
    }
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  dropdownToggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  getBrand() {
    var name;
    let url = this.props.location.pathname;
    if (url.includes("/")) {
      let arr = url.split("/");
      if (arr.length > 2) {
        url = "/" + arr[1];
      }
    }
    dashboardRoutes.map(prop => {
      if (prop.collapse) {
        prop.views.map(prop => {
          if (prop.path === url) {
            name = prop.name;
          }
          return null;
        });
      } else {
        if (prop.redirect) {
          if (prop.path === url) {
            name = prop.name;
          }
        } else {
          if (prop.path === url) {
            name = prop.name;
          }
        }
      }
      return null;
    });
    return name;
  }
  openSidebar() {
    document.documentElement.classList.toggle("nav-open");
    this.refs.sidebarToggle.classList.toggle("toggled");
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor() {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({
        color: "white"
      });
    } else {
      this.setState({
        color: "transparent"
      });
    }
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor.bind(this));
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      this.refs.sidebarToggle.classList.toggle("toggled");
    }
  }
  render() {
    return (
      // add or remove classes depending if we are on full-screen-maps page or not
      <Navbar
        color={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "white"
            : this.state.color
        }
        expand="lg"
        className={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute fixed-top"
            : "navbar-absolute fixed-top " +
              (this.state.color === "transparent" ? "navbar-transparent " : "")
        }
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref="sidebarToggle"
                className="navbar-toggler"
                onClick={() => this.openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand href="/">{this.getBrand()}</NavbarBrand>
          </div>
          <NavbarToggler onClick={this.toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse
            isOpen={this.state.isOpen}
            navbar
            className="justify-content-end"
          >
            <Nav navbar>
              <Dropdown
                nav
                isOpen={this.state.dropdownOpen}
                toggle={e => this.dropdownToggle(e)}
              >
                <DropdownToggle caret nav>
                  <i className="now-ui-icons users_single-02" />
                  <p>
                    <span>{this.props.auth.userName}</span>
                  </p>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag="a" href="/logout">
                    Logout
                  </DropdownItem>
                  <DropdownItem tag="a">Another Action</DropdownItem>
                  <DropdownItem tag="a">Something else here</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Header);
