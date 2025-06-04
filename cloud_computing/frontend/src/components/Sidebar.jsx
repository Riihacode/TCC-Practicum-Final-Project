import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaRegUser, FaFileUpload, FaFire, FaMusic, FaGamepad, FaFilm, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // hapus token/session
    navigate('/');    // redirect ke halaman login (ganti sesuai route login kamu)
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
        <Nav.Link onClick={() => navigate('/trending')}>
          <FaFire className="me-2" /> Trending
        </Nav.Link>
        <Nav.Link onClick={() => navigate('/music')}>
          <FaMusic className="me-2" /> Music
        </Nav.Link>
        <Nav.Link onClick={() => navigate('/gaming')}>
          <FaGamepad className="me-2" /> Gaming
        </Nav.Link>
        <Nav.Link onClick={() => navigate('/movies')}>
          <FaFilm className="me-2" /> Movies
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
