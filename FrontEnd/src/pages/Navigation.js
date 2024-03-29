// Stephen Davis
// stephendavis.io

import React from "react";
import * as CONSTANTS from "../Constants";
import { Navbar, Container, Nav, NavLink } from "react-bootstrap";
import logo from "../logo.svg";

function Navigation() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href={CONSTANTS.ROUTES.HOME}>
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Default React Logo"
          />
          {CONSTANTS.APP_NAME}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink href={CONSTANTS.ROUTES.HOME}>Home</NavLink>
            <NavLink href={CONSTANTS.ROUTES.EMPLOYEES}>
              List All Employees
            </NavLink>
            <NavLink href={CONSTANTS.ROUTES.CREATE_EMPLOYEE}>
              New Employee
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
