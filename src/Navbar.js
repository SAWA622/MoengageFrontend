// Navbar.js
// Import dependencies
import React from "react";
import { Link } from "react-router-dom";
// Use a different name for the imported Navbar component
import { Navbar as BootstrapNavbar, Nav, Button } from "react-bootstrap";

// Define Navbar component
function Navbar({ user, handleLogout }) {
  // Return the JSX elements
  return (
    // Use the imported Navbar component with the different name
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <BootstrapNavbar.Brand as={Link} to="/">
        Brewery Review
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {user ? (
            <>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
}

// Export Navbar component
export default Navbar;
