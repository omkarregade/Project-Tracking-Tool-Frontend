import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import './../CssFiles/Navbar.css'

function CustomNavbar() {
  return (
    <Navbar expand="lg" className="navbar sticky-top navbar-expand-sm navbar-main">
      <Container fluid>
        <Navbar.Brand href="#" className="navbar-brand-main logo">
          <span>
            <span className="align-top mb-1" style={{ fontSize: '1rem' }}>SprintHub</span>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ms-auto navbar-nav mx-auto">
            <LinkContainer to="/">
              <Nav.Link className="nav-link-main">Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link className="nav-link-main">Register</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link className="nav-link-main">Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about-us">
              <Nav.Link className="nav-link-main">About Us</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact-us">
              <Nav.Link className="nav-link-main">Contact Us</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
