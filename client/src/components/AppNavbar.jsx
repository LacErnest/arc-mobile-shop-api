import { Component, Fragment } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Container, NavLink } from "reactstrap";
import RegisterModal from "./RegisterModal";
import Logout from "./Logout";
import LoginModal from "./LoginModal";
import { connect } from "react-redux";

class AppNavbar extends Component{
  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const {isAuthenticated, user} = this.props.auth

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user? `Bienvenue  ${user.name}`: ''}</strong>
          </span>
        </NavItem>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/cart">Cart</NavLink>
        </NavItem>
        <NavItem className="mr-2">
          <NavLink href="/orders">Orders</NavLink>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    )

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    )

    return(
      <div>
        <Navbar color="black" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">Arc Mobile Shop</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse>
              <Nav className="ml-auto" navbar>
                {isAuthenticated? authLinks:guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavbar)