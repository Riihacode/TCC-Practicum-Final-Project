import React, { useEffect, useState } from "react";
import { getVideosBySlug, deleteVideo } from "../api";
import { jwtDecode } from 'jwt-decode';
import { Card, Col, Row, Button } from "react-bootstrap";

const BASE_URL = "http://localhost:3000";

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
      const userSlug = decoded.slug;
      setSlug(userSlug);
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
          console.log("Video List:", data.videos);
          data.videos.forEach((video) =>
            console.log("Thumbnail:", video.thumbnail_url)
          );
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
    <div className="p-3">
      <h2 className="mb-4">Studio: {slug}</h2>
      {loading ? (
        <p>Loading videos...</p>
      ) : (
        <Row>
          {videos.map((video, index) => (
            <Col md={3} key={index} className="mb-4">
              <Card
                className="border-0 shadow-sm"
                style={{
                  cursor: "pointer",
                  transition:
                    "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow =
                    "0 0.75rem 1.25rem rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 0.25rem 0.5rem rgba(0, 0, 0, 0.05)";
                }}
              >
                <div className="ratio ratio-16x9">
                  <Card.Img
                    src={`${BASE_URL}${video.thumbnail_url}`}
                    className="rounded"
                    alt={video.title}
                  />
                </div>
                <Card.Body>
                  <Card.Title className="fs-6">{video.title}</Card.Title>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(video.id);
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
