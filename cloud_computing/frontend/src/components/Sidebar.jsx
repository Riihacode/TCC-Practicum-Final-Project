import React from 'react';
import { logoutUser } from '../api';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaRegUser, FaFileUpload, FaFire, FaMusic, FaGamepad, FaFilm, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser()
      localStorage.clear(); // hapus token/session
      alert("Berhasil Logout");
      navigate('/');
    } catch (error) {
      console.error("Logout gagal:", error);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-between h-100">
      <Nav className="flex-column p-3 pt-5 mt-3">
        <Nav.Link onClick={() => navigate('/home')}>
          <FaHome className="me-2" /> Home
        </Nav.Link>
        <Nav.Link onClick={() => navigate('/profile')}>
          <FaRegUser className="me-2" /> Profile
        </Nav.Link>
        <Nav.Link onClick={() => navigate('/videoUpload')}>
          <FaFileUpload className="me-2" /> Upload
        </Nav.Link>
        <Nav.Link onClick={() => navigate('/studio')}>
          <FaFire className="me-2" /> Studio
        </Nav.Link>
      </Nav>

      <div className="p-3 border-top">
        <Nav.Link onClick={handleLogout} className="text-danger">
          <FaSignOutAlt className="me-2" /> Logout
        </Nav.Link>
      </div>
    </div>
  );
};

export default Sidebar;
