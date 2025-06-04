import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api"; // Pastikan fungsi ini tersedia dan benar

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        username,
        email,
        password,
      };

      const response = await registerUser(data);
      console.log("User registered:", response);

      alert("Register berhasil!");

      // Redirect ke halaman login setelah register berhasil
      navigate("/");
    } catch (error) {
      console.error("Gagal register:", error.response?.data || error.message);
      alert("Register gagal: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#aeaeae' }}>
      <div className="card" style={{ maxWidth: '800px' }}>
        <div className="card-header text-center">
          REGISTER PAGE
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby="passwordHelpBlock"
                required
              />
              <div id="passwordHelpBlock" className="form-text">
                Your password must be 8-20 characters long, contain letters and numbers,
                and must not contain spaces, special characters, or emoji.
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </div>
        <div className="card-footer text-body-secondary">
          <Link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
              <path fillRule="evenodd"
                d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
