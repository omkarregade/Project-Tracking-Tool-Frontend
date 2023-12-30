import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../CssFiles/AdminProfile.css'; // Adjust the path according to your project structure

const AdminProfile = () => {
    const [adminData, setAdminData] = useState({
        id: null,
        name: '',
        role: '',
        email: '',
        phone: '',
        address: '',
        // Add more fields as needed
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({ ...adminData });

    const fetchAdminProfile = () => {
        // Simulated API call or actual fetch implementation
        const fetchedData = {
            id: 1,
            name: 'Admin Name',
            role: 'Administrator',
            email: 'admin@example.com',
            phone: '+1-234-567-8901',
            address: '123 Admin Street, Admin City',
            // Add more fields as needed
        };
        setAdminData(fetchedData);
        setEditedProfile(fetchedData);
    };

    useEffect(() => {
        fetchAdminProfile();
    }, []);

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulated logic - update the profile data
        setAdminData(editedProfile);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditedProfile(adminData);
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    return (
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
                <h1>{adminData.name}</h1>
                <p>{adminData.role}</p>
            </div>
            <div className="admin-profile-details">
                {/* Display admin profile details */}
                <p>ID: {adminData.id}</p>
                <p>Role: {adminData.role}</p>
                <p>Email: {adminData.email}</p>
                <p>Phone: {adminData.phone}</p>
                <p>Address: {adminData.address}</p>
            </div>
            <button className="admin-profile-button mt-3" onClick={handleEditProfile}>
                Edit Profile
            </button>

            {/* Replace the modal with the updated structure */}
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
                                value={editedProfile.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        {/* Add more Form.Group for other fields */}
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
    );
};

export default AdminProfile;
