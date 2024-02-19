// NavbarStyles.js
import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';

export const CustomNavbarContainer = styled(Navbar)`
background-image: linear-gradient(to left top, #4049ce, #383fc5, #2f35bc, #262bb2, #1c20a9, #1c20a9, #1c20a9, #1c20a9, #262bb2, #2f35bc, #383fc5, #4049ce);
  .nav-link-main {
    color: white !important; /* Add this line to override Bootstrap's default color */
    transition: transform 0.3s ease-in-out;
  }

  .nav-link-main:hover {
    transform: scale(1.2); /* You can adjust the scale factor as needed */
  }
`;

export const Logo = styled.span`
  .navbar-brand-main & {
    color: white !important; /* Use !important to ensure the style is applied */
    font-size: 1.5rem; /* Adjust the font size as needed */
    margin-right: 10px; /* Add spacing to the right of the logo */
  }
`;

export const NavLinkMain = styled.a`
  color: white !important; /* Use !important to ensure the style is applied */
  font-family: 'Open Sans', sans-serif;
  margin-right: 15px;
`;

export const GlobalStyles = styled.div`
  ${CustomNavbarContainer} {
    /* Add global styles for the Navbar here */
  }

  ${NavLinkMain} {
    color: white !important; /* Add this line to override Bootstrap's default color */
    /* Add any other global styles for NavLinkMain here */
  }
`;
