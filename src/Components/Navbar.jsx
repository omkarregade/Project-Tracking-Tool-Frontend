import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './CssFiles/Navbar.css'

function CustomNavbar() {
  return (
    <Navbar expand="lg" className="navbar sticky-top navbar-expand-sm navbar-primary bg-primary">
      <Container fluid>
        <Navbar.Brand href="#" className="navbar-brand logo">
          <span>
            <span className="align-top mb-1" style={{fontSize: '1rem'}}>SprintHub</span>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ms-auto navbar-nav mx-auto">
            <Nav.Link href="#home" className="nav-link">Register</Nav.Link>
            <Nav.Link href="#Get-started" className="nav-link">Login</Nav.Link>
            <Nav.Link href="#contact" className="nav-link">About Us</Nav.Link>
            <Nav.Link href="#contact" className="nav-link">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
