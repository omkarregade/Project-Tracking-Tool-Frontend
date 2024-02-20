import React, { useState, useEffect } from "react";
import { Container, Col, Row, Modal, Button, Form } from "react-bootstrap";
import "../../CssFiles/AdminProfile.css"; // Adjust the path according to your project structure
import { updateAdmin, getAdminById } from "../../Service/AdminService";
import { getId } from "../../Service/Util";

const AdminProfile = () => {
  const [adminData, setAdminData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const fetchAdminProfile = async () => {
    try {
      const id = getId("id");
      const data = await getAdminById(id);
      console.log("data for emp : ", data);
      setAdminData(data);
      setEditedProfile(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = getId("id");
    try {
      await updateAdmin(id, editedProfile);
      setAdminData(editedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCancelEdit = () => {
    setEditedProfile(adminData);
    setIsEditing(false);
  };

  const handleInputChange = (e, field) => {
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [field]: e.target.value,
    }));
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-3">
        <Col md={10}>
          <div className="admin-profile my-5">
            {/* Profile Image Section */}
            <div className="profile-image-section text-center mb-3">
              {/* Placeholder profile image */}
              <div className="placeholder-profile-image rounded-circle">
                {/* Add text or icon here */}
                <span>Profile</span>
              </div>
            </div>

            <div className="admin-profile-header">
              <h1>{adminData.fullName}</h1>
            </div>
            <div className="admin-profile-details">
              <p>ID: {adminData.adminId}</p>
              <p>Email: {adminData.email}</p>
              <p>Phone: {adminData.phoneNumber}</p>
              <p>City: {adminData.city}</p>
            </div>
            <button
              className="admin-profile-button mt-3"
              onClick={handleEditProfile}
            >
              Edit Profile
            </button>

            {/* Replace the modal with the updated structure */}
            <Modal
              show={isEditing}
              onHide={handleCancelEdit}
              className="edit-profile-modal"
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body className="p-4">
                <Form onSubmit={handleSubmit} className="edit-profile-form">
                  <Form.Group className="mb-3">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={editedProfile.fullName}
                      onChange={(e) => handleInputChange(e, "fullName")}
                    />
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={editedProfile.email}
                      onChange={(e) => handleInputChange(e, "email")}
                    />
                    <Form.Label>Phone:</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={editedProfile.phoneNumber}
                      onChange={(e) => handleInputChange(e, "phoneNumber")}
                    />
                    <Form.Label>City:</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={editedProfile.city}
                      onChange={(e) => handleInputChange(e, "city")}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCancelEdit}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminProfile;
