import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import VideoUploadForm from '../components/UploadVideo';

const VideoUploadPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPage, setSelectedPage] = useState('videoUpload'); // 'home' or 'profile' etc

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderContent = () => {
    switch (selectedPage) {
      case 'videoUpload':
        return <VideoUploadForm />;
    }
  };

  return (
    <div>
      <Navbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <Container fluid>
        <Row>
          {sidebarOpen && (
            <Col xs={2} className="bg-light min-vh-100 border-end p-0">
              <Sidebar onSelectPage={setSelectedPage} /> {/* kirim callback */}
            </Col>
          )}
          <Col className="p-3" style={{ marginTop: '56px' }}>
            {renderContent()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VideoUploadPage;
