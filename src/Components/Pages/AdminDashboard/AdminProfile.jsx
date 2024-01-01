import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../CssFiles/AdminProfile.css'; // Adjust the path according to your project structure
import { updateAdmin } from '../../Service/AdminService';
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
            const id = getId('id');
            const data = await fetchAdminProfile(id);
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
        try {
            await updateAdmin(editedProfile);
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
            </div>
            <div className="admin-profile-details">
                <p>ID: {adminData.id}</p>
                <p>Email: {adminData.email}</p>
                <p>Phone: {adminData.phoneNumber}</p>
                <p>City: {adminData.city}</p>
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
