import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import AppNavbar from '../components/Navbar';
import Studio from '../components/Studio';

const StudioPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div>
      <AppNavbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <Container fluid>
        <Row>
          {sidebarOpen && (
            <Col xs={2} className="bg-light min-vh-100 border-end p-0">
              <Sidebar />
            </Col>
          )}
          <Col className="p-3" style={{ marginTop: '56px' }}>
            <Studio />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StudioPage;
