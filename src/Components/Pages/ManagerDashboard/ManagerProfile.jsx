import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../CssFiles/ManagerProfile.css'; // Adjust the path according to your project structure

const ManagerProfile = () => {
    const [managerData, setManagerData] = useState({
        id: null,
        name: '',
        department: '',
        email: '',
        phone: '',
        address: '',
        // Add more fields as needed
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({ ...managerData });

    const fetchManagerProfile = () => {
        // Simulated API call or actual fetch implementation
        const fetchedData = {
            id: 1,
            name: 'Michael Scott',
            department: 'Regional Manager',
            email: 'michael@dundermifflin.com',
            phone: '+1-123-456-7890',
            address: '1725 Slough Avenue, Scranton, PA',
            // Add more fields as needed
        };
        setManagerData(fetchedData);
        setEditedProfile(fetchedData);
    };

    useEffect(() => {
        fetchManagerProfile();
    }, []);

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulated logic - update the profile data
        setManagerData(editedProfile);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditedProfile(managerData);
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
                <h1>{managerData.name}</h1>
                <p>{managerData.department}</p>
            </div>
            <div className="manager-profile-details">
                {/* Display manager profile details */}
                <p>ID: {managerData.id}</p>
                <p>Department: {managerData.department}</p>
                <p>Email: {managerData.email}</p>
                <p>Phone: {managerData.phone}</p>
                <p>Address: {managerData.address}</p>
            </div>
            <button className="manager-profile-button mt-3" onClick={handleEditProfile}>
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

export default ManagerProfile;
