import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import {
  getVideoById,
  updateVideoMetadata,
  uploadThumbnail,
  updateThumbnail,
  deleteThumbnail
} from "../api"; // Sesuaikan path

const EditVideo = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
      } catch (err) {
        console.error("Gagal decode token:", err);
      }
    }
  }, []);
  

  // // ✅ Ambil metadata video saat pertama kali dibuka
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await getVideoById(id);

  //       const data = response.video;

  //       setTitle(data.title || "");
  //       setDescription(data.description || "");
  //       console.log(data);
  //       console.log("title:", data.title);
  //       console.log("description:", data.description);
  //       console.log("thumbnail_url:", data.thumbnail_url);

  //       // Ambil thumbnail langsung dari response jika ada
  //     if (data.thumbnail_url) {
  //       setThumbnailUrl(data.thumbnail_url);
  //     } else {
  //       setThumbnailUrl(null);
  //     }
        
  //     } catch (error) {
  //       console.error("Gagal mengambil data video:", error);
  //     }
  //   };

  //   fetchData();
  // }, [id]);
  
    // ✅ Ambil metadata video saat pertama kali dibuka
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getVideoById(id);

        const data = response.video;

        setTitle(data.title || "");
        setDescription(data.description || "");
        console.log(data);
        console.log("title:", data.title);
        console.log("description:", data.description);
        console.log("thumbnail_url:", data.thumbnail_url);

        // Ambil thumbnail langsung dari response jika ada
        if (thumbnailFile) {
          if (thumbnailUrl) {
            await updateThumbnail(userId, id, thumbnailFile);
          } else {
            await uploadThumbnail(userId, id, thumbnailFile); // kamu juga perlu refactor uploadThumbnail
          }
        }
      } catch (error) {
        console.error("Gagal mengambil data video:", error);
      }
    };

    fetchData();
  }, [id]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update metadata judul & deskripsi
      await updateVideoMetadata(id, { title, description });

      // Upload atau update thumbnail jika ada file baru
      if (thumbnailFile) {
        if (thumbnailUrl) {
          await updateThumbnail(id, thumbnailFile);
        } else {
          await uploadThumbnail(id, thumbnailFile);
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
      await deleteThumbnail(id);
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
