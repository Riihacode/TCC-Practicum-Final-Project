import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = (e) => {
e.preventDefault();
console.log("Name: ",name);
console.log("Email: ",email);
console.log("Password: ",password);
};

return(
<div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#aeaeae' }}>
    <div className="card" style={{ maxWidth: '800px' }}>
        <div className="card-header text-center">
            REGISTER PAGE
        </div>
        <div className="card-body">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="your name" value={name}
                        onChange={(e)=> setName(e.target.value)}
                    required/>
                </div>
                <div className="mb-3">
                    <label for="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="name@example.com" value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                    required/>
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input type="password" id="password" className="form-control" value={password} onChange={(e)=>
                    setPassword(e.target.value)}
                    aria-describedby="passwordHelpBlock"
                    required />
                    <div id="passwordHelpBlock" className="form-text">
                        Your password must be 8-20 characters long, contain letters and numbers, and must not contain
                        spaces, special characters, or emoji.
                    </div>
                </div>
                <button type="submit" className="btn btn-primary"> login</button>
            </form>

        </div>
        <div className="card-footer text-body-secondary">
            <Link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-arrow-bar-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
            </svg>
            </Link>
        </div>
    </div>
</div>
)
}

export default RegisterPage;