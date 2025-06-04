import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';

const TopNavbar = ({ onToggleSidebar }) => {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container fluid className="d-flex align-items-center">
        <Button variant="outline-light" onClick={onToggleSidebar} className="me-3">
          <FaBars />
        </Button>
        <Navbar.Brand>YouTube Clone</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
