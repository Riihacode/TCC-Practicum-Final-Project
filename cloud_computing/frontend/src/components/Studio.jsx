import React, { useEffect, useState } from "react";
import { getVideosBySlug, deleteVideo } from "../api";
import { jwtDecode } from 'jwt-decode';
import { Card, Col, Row, Button, Spinner } from "react-bootstrap";

const BASE_URL = "http://localhost:3000/";

const Studio = () => {
  const [slug, setSlug] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.warn("Token tidak ditemukan");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setSlug(decoded.slug);
    } catch (error) {
      console.error("Token tidak valid:", error);
    }
  }, []);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    getVideosBySlug(slug)
      .then((data) => {
        if (data && Array.isArray(data.videos)) {
          setVideos(data.videos);
        } else {
          setVideos([]);
          console.warn("Format data API tidak sesuai:", data);
        }
      })
      .catch((err) => {
        console.error("Gagal memuat video:", err);
        setVideos([]);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus video ini?")) return;

    try {
      await deleteVideo(id);
      setVideos((prev) => prev.filter((video) => video.id !== id));
    } catch (err) {
      console.error("Gagal menghapus video:", err);
      alert("Gagal menghapus video.");
    }
  };

  return (
    <div className="p-4" style={{ maxWidth: '1200px', margin: 'auto' }}>
      <h2 className="mb-4 text-warning fw-bold" style={{ letterSpacing: '1.5px' }}>
        Studio: {slug || "Loading..."}
      </h2>

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" variant="warning" role="status" />
          <span className="ms-2 fs-5 text-muted">Loading videos...</span>
        </div>
      ) : videos.length === 0 ? (
        <p className="text-muted fs-5 text-center mt-5">Tidak ada video untuk ditampilkan.</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {videos.map((video) => (
            <Col key={video.id}>
              <Card
                className="h-100 shadow-sm"
                style={{
                  cursor: "pointer",
                  borderRadius: '12px',
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 1rem 2rem rgba(241, 196, 15, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 0.125rem 0.25rem rgba(0,0,0,0.1)";
                }}
              >
                <div className="ratio ratio-16x9">
                  <Card.Img
                    src={`${BASE_URL}${video.thumbnail_url}`}
                    alt={video.title}
                    className="rounded-top"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title className="fs-6 fw-semibold text-truncate" title={video.title}>
                    {video.title}
                  </Card.Title>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="mt-3 align-self-start"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(video.id);
                    }}
                    style={{
                      borderRadius: '20px',
                      fontWeight: '600',
                      transition: 'background-color 0.3s ease, color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e74c3c';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#dc3545';
                    }}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Studio;
