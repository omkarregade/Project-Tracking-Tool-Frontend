import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { isAuthenticated, logout, getRole } from '../Service/Util';
import { useNavigate } from 'react-router-dom';
import { CustomNavbarContainer, Logo, NavLinkMain } from '../../NavbarStyles';

function CustomNavbar() {
  const navigate = useNavigate();
  const userRole = getRole();
  console.log(typeof (userRole));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDashboardClick = () => {
    if (userRole === 'Employee') {
      navigate('/employee-dashboard');
    } else if (userRole === 'Manager') {
      navigate('/manager-dashboard');
    } else if (userRole === 'Admin') {
      navigate('/admin-dashboard');
    }
  };

  return (
    <>
      <CustomNavbarContainer expand="lg" className="navbar sticky-top navbar-expand-sm navbar-main">
        <Container fluid>
          <Logo>
            <Navbar.Brand href="#" className="navbar-brand-main logo">
              <span className="align-top mb-1" style={{ color: 'white', fontSize: '1.5rem', marginRight: '10px' }}>
                SprintHub
              </span>
            </Navbar.Brand>
          </Logo>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="ms-auto navbar-nav mx-auto">
              <LinkContainer to="/">
                <NavLinkMain className="nav-link-main">Home</NavLinkMain>
              </LinkContainer>
              {isAuthenticated() && (
                <>
                  <NavLinkMain className="nav-link-main" onClick={handleDashboardClick}>Dashboard</NavLinkMain>
                </>
              )}
              <LinkContainer to="/about-us">
                <NavLinkMain className="nav-link-main">About Us</NavLinkMain>
              </LinkContainer>
              <LinkContainer to="/contact-us">
                <NavLinkMain className="nav-link-main">Contact-Us</NavLinkMain>
              </LinkContainer>

              {!isAuthenticated() && (
                <>
                  <LinkContainer to="/login">
                    <NavLinkMain className="nav-link-main">Login</NavLinkMain>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <NavLinkMain className="nav-link-main">Register</NavLinkMain>
                  </LinkContainer>
                </>
              )}


              {isAuthenticated() && (
                <Nav>
                  <NavLinkMain className="nav-link-main" onClick={handleLogout}>Logout</NavLinkMain>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </CustomNavbarContainer>
    </>
  );
}

export default CustomNavbar;
