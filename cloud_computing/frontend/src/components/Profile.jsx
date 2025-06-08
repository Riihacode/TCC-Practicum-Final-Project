import React, { useState, useEffect } from 'react';
import { Button, Form, Spinner, Image, Container } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { getUserById, updateUsername, uploadProfilePic } from '../api';

const BASE_URL = "http://localhost:3000/";

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [newPicFile, setNewPicFile] = useState(null);
  const [previewPicUrl, setPreviewPicUrl] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const id = decoded.id;
      setUserId(id);

      getUserById(id)
        .then((data) => {
          setUsername(data.username || '');
          setEmail(data.email || '');
          if (data.profile_pic) setProfilePic(data.profile_pic);
        })
        .catch((err) => {
          console.error("Gagal mengambil data user:", err);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error("Token tidak valid:", error);
    }
  }, []);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPicFile(file);
      setPreviewPicUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!userId) return;

    try {
      if (username) {
        await updateUsername(userId, { username });
        alert("Username berhasil diperbarui");
      }

      if (newPicFile) {
        const res = await uploadProfilePic(userId, newPicFile);
        setProfilePic(res.profilePicUrl || profilePic);
        setNewPicFile(null);
        setPreviewPicUrl(null);
      }

      alert("Perubahan berhasil disimpan!");
    } catch (error) {
      console.error("Gagal menyimpan perubahan:", error);
      alert("Gagal menyimpan perubahan");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="py-4" style={{ maxWidth: '600px' }}>
      <h3 className="text-light mb-4 text-center">Profil Saya</h3>

      <div className="text-center mb-3">
        <Image
          src={previewPicUrl || (profilePic ? `${BASE_URL}${profilePic}` : 'https://placehold.co/150x150?text=Foto')}
          roundedCircle
          style={{
            width: 150,
            height: 150,
            objectFit: 'cover',
            border: '3px solid white',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)'
          }}
        />
      </div>

      <Form.Group className="mb-4 text-center">
        <Form.Label className="text-light">Ganti Foto Profil</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={handleProfilePicChange} className="w-100" />
      </Form.Group>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="text-light">Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Masukkan username baru"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="text-light">Email</Form.Label>
          <Form.Control type="email" value={email} readOnly />
        </Form.Group>

        <div className="d-grid">
          <Button variant="warning" size="lg" onClick={handleSave} disabled={!username.trim()}>
            💾 Simpan Perubahan
          </Button>
        </div>
      </Form>

      {/* Tabel data bisa kamu tambahkan di bawah sini */}
      {/* <Table ... /> */}
    </Container>
  );
};

export default Profile;
