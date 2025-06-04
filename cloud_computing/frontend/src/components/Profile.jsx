import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { getUserById, updateUsername, uploadProfilePic } from '../api'; // sesuaikan path-nya

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState('https://placehold.co/600x400');
  const [newPicFile, setNewPicFile] = useState(null);
  const [previewPicUrl, setPreviewPicUrl] = useState(null);
  const [user_id, setUser_id] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.warn("Token tidak ditemukan");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const id = decoded.id;
      setUser_id(id);

      getUserById(id)
        .then((data) => {
          setUsername(data.username || '');
          setEmail(data.email || '');
          if (data.profilePic) {
            setProfilePic(data.profilePic);
          }
        })
        .catch((err) => {
          console.error("Gagal mengambil data user:", err);
        });
    } catch (error) {
      console.error("Token tidak valid:", error);
    }
  }, []);

  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPicFile(file);
      setPreviewPicUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!user_id) return;

    try {
      // Update username jika berubah
      if (username) {
        await updateUsername(user_id, { username });
        console.log("Username berhasil diperbarui");
        alert("Username berhasil diperbarui")
      }

      // Upload foto profil jika ada yang baru
      if (newPicFile) {
        const res = await uploadProfilePic(user_id, newPicFile);
        setProfilePic(res.profilePicUrl || profilePic); // pastikan field-nya sesuai
        console.log("Foto profil berhasil diunggah");
        setNewPicFile(null);
        setPreviewPicUrl(null);
      }

      alert("Perubahan berhasil disimpan!");
    } catch (error) {
      console.error("Gagal menyimpan perubahan:", error);
      alert("Gagal menyimpan perubahan");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <Card style={{ width: '22rem' }} className="shadow-sm">
        <Card.Img
          variant="top"
          src={previewPicUrl || profilePic}
          alt="Profile"
          className="rounded-circle mx-auto mt-4"
          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Ganti Foto Profil</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleProfilePicChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={username} onChange={handleUsernameChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} readOnly />
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" onClick={handleSave}>
                Simpan Perubahan
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
