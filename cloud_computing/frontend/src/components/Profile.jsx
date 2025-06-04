import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

const Profile = () => {
  const [username, setUsername] = useState('hafizh_dev');
  const [email] = useState('hafizh@example.com');
  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/150');
  const [newPic, setNewPic] = useState(null);

  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPic(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    if (newPic) {
      setProfilePic(newPic);
      setNewPic(null);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <Card style={{ width: '22rem' }} className="shadow-sm">
        <Card.Img
          variant="top"
          src={newPic || profilePic}
          alt="Profile"
          className="rounded-circle mx-auto mt-4"
          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Change Profile Picture</Form.Label>
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
                Save Changes
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
