import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../CssFiles/ManagerProfile.css'; // Adjust the path according to your project structure
import {getManagerById, updateManager} from '../../Service/ManagerService';


const ManagerProfile = () => {
    const [managerData, setManagerData] = useState({
        managerId: null,
        fullName: '',
        email: '',
        phoneNumber: '',
        city: '',
        // Add more fields as needed
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({ ...managerData });

    const fetchManagerProfile = async () => {
        try {
            const id = localStorage.getItem('id');
            const response = await getManagerById(id); // Replace with your API call
            setManagerData(response.data);
            setEditedProfile(response.data);
        } catch (error) {
            console.error('Error fetching manager profile:', error);
        }
    };

    useEffect(() => {
        fetchManagerProfile();
    }, []);

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateManager(editedProfile); // Replace with your API call
            setManagerData(editedProfile);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating manager profile:', error);
        }
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
                <h1>{managerData.fullName}</h1>
            </div>
            <div className="manager-profile-details">
                {/* Display manager profile details */}
                <p>ID: {managerData.managerId}</p>
                <p>Email: {managerData.email}</p>
                <p>Phone: {managerData.phoneNumber}</p>
                <p>Address: {managerData.city}</p>
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
