import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import VideoDetailPage from "./pages/VideoDetailPage";
import ProfilePage from "./pages/ProfilePage";
import VideoUploadPage from "./pages/UploadVideoPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/videos/:id" element={<VideoDetailPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/videoUpload" element={<VideoUploadPage/>} />
        <Route/>
      </Routes>
    </Router>
      
  );
}


export default App;
