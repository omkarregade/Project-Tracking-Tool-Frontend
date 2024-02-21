import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import '../../CssFiles/ManagerProfile.css'; // Adjust the path according to your project structure
import { updateManager, getManagerById } from '../../Service/ManagerService';
import { getId } from "../../Service/Util";

const ManagerProfile = () => {
    const [managerData, setManagerData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});

    useEffect(() => {
        fetchManagerProfile();
    }, []);

    const fetchManagerProfile = async () => {
        try {
            const id = getId('id');
            const data = await getManagerById(id);
            setManagerData(data);
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
        const id = getId('id');
        try {
            await updateManager(id, editedProfile);
            setManagerData(editedProfile);
            setIsEditing(false);
        } catch (error) {
            console.error(error.message);
        }
    };
    

    const handleCancelEdit = () => {
        setEditedProfile(managerData);
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
                    <div className="manager-profile my-5">
                        {/* Profile Image Section */}
                        <div className="profile-image-section text-center mb-3">
                            {/* Placeholder profile image */}
                            <div className="placeholder-profile-image rounded-circle">
                                {/* Add text or icon here */}
                                <span>Profile</span>
                            </div>
                        </div>
                        <div className="manager-profile-header">
                            <h1>{managerData.fullName}</h1>
                        </div>
                        <div className="manager-profile-details">
                            <p>ID: {managerData.managerId}</p>
                            <p>Email: {managerData.email}</p>
                            <p>Phone: {managerData.phoneNumber}</p>
                            <p>City: {managerData.city}</p>
                        </div>
                        <button className="manager-profile-button mt-3" onClick={handleEditProfile}>
                            Edit Profile
                        </button>

                        <Modal show={isEditing} onHide={handleCancelEdit} className="edit-profile-modal">
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
                                            onChange={(e) => handleInputChange(e, 'fullName')}
                                        />
                                    </Form.Group>
                                    {/* Add more form fields */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={editedProfile.email}
                                            onChange={(e) => handleInputChange(e, 'email')}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="phone"
                                            value={editedProfile.phoneNumber}
                                            onChange={(e) => handleInputChange(e, 'phoneNumber')}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>City:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="city"
                                            value={editedProfile.city}
                                            onChange={(e) => handleInputChange(e, 'city')}
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

export default ManagerProfile;
