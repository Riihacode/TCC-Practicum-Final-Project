import React, { useEffect, useState } from "react";
import {
  updateVideoMetadata,
  uploadThumbnail,
  updateThumbnail,
  getThumbnail,
  deleteThumbnail
} from "../api"; // Sesuaikan path sesuai struktur proyekmu

const EditVideo = ({ videoId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [message, setMessage] = useState("");

  // Ambil thumbnail jika ada
  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        const blob = await getThumbnail(videoId);
        const url = URL.createObjectURL(blob);
        setThumbnailUrl(url);
      } catch (e) {
        console.error(e);
        setThumbnailUrl(null); // jika tidak ada thumbnail
      }
    };

    fetchThumbnail();
  }, [videoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update metadata judul & deskripsi
      await updateVideoMetadata(videoId, { title, description });

      // Upload atau update thumbnail jika ada file baru
      if (thumbnailFile) {
        if (thumbnailUrl) {
          // Sudah ada thumbnail, update
          await updateThumbnail(videoId, thumbnailFile);
        } else {
          // Belum ada thumbnail, upload baru
          await uploadThumbnail(videoId, thumbnailFile);
        }
      }

      setMessage("Video berhasil diperbarui!");
    } catch (err) {
      setMessage("Gagal memperbarui video.");
      console.error(err);
    }
  };

  const handleDeleteThumbnail = async () => {
    try {
      await deleteThumbnail(videoId);
      setThumbnailUrl(null);
      setMessage("Thumbnail berhasil dihapus.");
    } catch (err) {
      setMessage("Gagal menghapus thumbnail.");
      console.error(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h3 className="text-light text-center mb-4">✏️ Edit Video</h3>

      <form
        onSubmit={handleSubmit}
        className="shadow-lg p-4 rounded bg-dark border border-secondary"
      >
        <div className="mb-3">
          <label className="form-label text-light">Judul</label>
          <input
            type="text"
            className="form-control bg-light text-dark"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul video"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-light">Deskripsi</label>
          <textarea
            className="form-control bg-light text-dark"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tulis deskripsi video"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label text-light">Thumbnail (opsional)</label>
          <input
            type="file"
            className="form-control bg-light text-dark"
            accept="image/*"
            onChange={(e) => setThumbnailFile(e.target.files[0])}
          />
        </div>

        {thumbnailUrl && (
          <div className="mb-3 text-center">
            <img
              src={thumbnailUrl}
              alt="Thumbnail saat ini"
              className="img-fluid rounded"
              style={{ maxHeight: "200px" }}
            />
            <div className="mt-2">
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={handleDeleteThumbnail}
              >
                Hapus Thumbnail
              </button>
            </div>
          </div>
        )}

        <div className="d-grid">
          <button type="submit" className="btn btn-success">
            Simpan Perubahan
          </button>
        </div>
      </form>

      {message && (
        <div className="alert alert-info mt-3 text-center" role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default EditVideo;
