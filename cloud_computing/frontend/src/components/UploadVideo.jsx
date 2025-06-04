import React, { useState, useEffect } from "react";
import { uploadVideo, uploadThumbnail } from "../api";
import { jwtDecode } from "jwt-decode";


const VideoUploadForm = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.warn("Token tidak ditemukan");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    } catch (err) {
      console.error("Gagal decode token:", err);
    }
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleThumbnailChange = (e) => {
  setThumbnail(e.target.files[0]);
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title || !description) {
      setMessage("Semua field wajib diisi!");
      return;
    }

    if (!userId) {
      setMessage("❌ User belum dikenali. Silakan login ulang.");
      return;
    }

    try {
      // 1. Upload video
    const videoData = await uploadVideo(userId, file, title, description);
    setMessage("✅ Video berhasil diupload!");

    // 2. Upload thumbnail jika tersedia
    if (thumbnail && videoData?.id) {
      await uploadThumbnail(videoData.id, thumbnail);
      setMessage((prev) => prev + " ✅ Thumbnail berhasil diupload!");
    }

    // Reset form
    setTitle("");
    setDescription("");
    setFile(null);
    setThumbnail(null);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || "❌ Upload gagal.");
    }
    
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">🎥 Upload Video</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 bg-white rounded">
        <div className="mb-3">
          <label className="form-label">Judul</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul video"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Deskripsi</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tulis deskripsi video"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Thumbnail (opsional)</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleThumbnailChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">File Video</label>
          <input
            type="file"
            className="form-control"
            accept="video/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Upload Video
        </button>
      </form>
      {message && (
        <div className="alert alert-info mt-3" role="alert">
          {message}
        </div>
      )}
    </div>
  );
  
} ;


export default VideoUploadForm;
