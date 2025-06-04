import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { email,password};
            const response = await loginUser(data);

            // Simpan token ke localStorage
            localStorage.setItem("accessToken", response.accessToken);
            console.log("Token:", response.accessToken);

            console.log("Login berhasil:", response);

            alert("Login berhasil!");

            navigate("/home");
        } catch (error) {
            console.error("Login gagal:", error.response?.data || error.message);
      alert("Login gagal: " + (error.response?.data?.message || error.message));
        }
        console.log("Email: ",email);
        console.log("Password: ",password);
    };
    
return(
<div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#aeaeae' }}>
    <div className="card" style={{ maxWidth: '800px' }}>
        <div className="card-header text-center">
            LOGIN PAGE
        </div>
        <div className="card-body">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="email" className="form-label">Email address</label>
                    <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required/>
                </div>
                <div className="mb-3">
                    <label for="password"
                    className="form-label">Password</label>
                    <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-describedby="passwordHelpBlock"
                    required />
                    <div id="passwordHelpBlock" className="form-text">
                        Your password must be 8-20 characters long, contain letters and numbers, and must not contain
                        spaces, special characters, or emoji.
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" > login</button>
            </form>

        </div>
        <div className="card-footer text-body-secondary">
            <p>Dont have account? <Link to="/register">Register here</Link> </p>
        </div>
    </div>
</div>
)
}

export default LoginPage;