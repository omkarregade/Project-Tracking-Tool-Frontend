import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../CssFiles/EmployeeProfile.css'; // Adjust the path according to your project structure

const EmployeeProfile = () => {
    const [employeeData, setEmployeeData] = useState({
        id: null,
        name: '',
        position: '',
        department: '',
        email: '',
        phone: '',
        address: '',
        // Add more fields as needed
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({ ...employeeData });

    const fetchEmployeeProfile = () => {
        // Simulated API call or actual fetch implementation
        const fetchedData = {
            id: 1,
            name: 'John Wick',
            position: 'Software Developer',
            department: 'Engineering',
            email: 'johnwick@gmail.com',
            phone: '+91-9921463930',
            address: '9/11 Trump Tower, Pune, India',
            // Add more fields as needed
        };
        setEmployeeData(fetchedData);
        setEditedProfile(fetchedData);
    };

    useEffect(() => {
        fetchEmployeeProfile();
    }, []);

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulated logic - update the profile data
        setEmployeeData(editedProfile);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditedProfile(employeeData);
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
        <div className="employee-profile my-5">
            <div className="employee-profile-header">
                <h1>{employeeData.name}</h1>
                <p>{employeeData.position}</p>
            </div>
            <div className="employee-profile-details">
                {/* Display employee profile details */}
                <p>ID: {employeeData.id}</p>
                <p>Department: {employeeData.department}</p>
                <p>Email: {employeeData.email}</p>
                <p>Phone: {employeeData.phone}</p>
                <p>Address: {employeeData.address}</p>
            </div>
            <button className="employee-profile-button mt-3" onClick={handleEditProfile}>
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
                                value={editedProfile.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        {/* Add more Form.Group for other profile data */}
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

export default EmployeeProfile;
