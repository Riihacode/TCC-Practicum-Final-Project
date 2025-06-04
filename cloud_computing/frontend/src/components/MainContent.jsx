import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { getAllVideos } from '../api'; // sesuaikan pathnya
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../api";

const BASE_URL_VIDEO = '../../../data_dummy/';

const MainContent = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getAllVideos();
        setVideos(data);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const handleCardClick = (video) => {
    // Arahkan ke halaman detail video
    navigate(`/videos/${video.id}`);
  };

  return (
    <div className="p-3">
      <Row>
        {videos.length === 0 ? (
          <p>Loading videos...</p>
        ) : (
          videos.map((video, index) => (
            <Col md={3} key={index} className="mb-4">
              <Card
                className="border-0 shadow-sm hover-shadow"
                onClick={() => handleCardClick(video)}
                style={{ cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03)';
                  e.currentTarget.style.boxShadow = '0 0.75rem 1.25rem rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 0.25rem 0.5rem rgba(0, 0, 0, 0.05)';
                }}
              >
                <div className="ratio ratio-16x9">
                  <Card.Img src={`${API_URL}${video.thumbnail_url}`} className="rounded" />
                </div>
                <Card.Body className="p-2">
                  <Card.Title className="h6 mb-1 text-truncate" title={video.title}>
                    {video.title}
                  </Card.Title>
                  <Card.Text className="text-muted small mb-0 text-truncate" title={video.user?.username}>
                    {video.user?.username}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default MainContent;
