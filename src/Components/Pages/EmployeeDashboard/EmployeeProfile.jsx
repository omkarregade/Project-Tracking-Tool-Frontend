import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../CssFiles/EmployeeProfile.css'; // Adjust the path according to your project structure
import {getEmployeeById, updateEmployee} from '../../Service/EmployeeService'; // Import the EmployeeService functions

const EmployeeProfile = () => {
    const [employeeData, setEmployeeData] = useState({
        employeeId:'',
        fullName: '',
        email: '',
        phoneNumber: '',
        city: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({ ...employeeData });

    const fetchEmployeeProfile = async () => {
        try {
            const id = localStorage.getItem('id');
            const response = await getEmployeeById(id);
            setEmployeeData(response.data);
            setEditedProfile(response.data);
        } catch (error) {
            console.error('Error fetching employee profile:', error);
        }
    };

    useEffect(() => {
        fetchEmployeeProfile();
    }, []);

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const id = localStorage.getItem('id');
            await updateEmployee(editedProfile);
            setEmployeeData(editedProfile);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating employee profile:', error);
        }
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
                <h1>{employeeData.fullName}</h1>
            </div>
            <div className="employee-profile-details">
                <p>ID: {employeeData.employeeId}</p>
                <p>Email: {employeeData.email}</p>
                <p>Phone: {employeeData.phoneNumber}</p>
                <p>Address: {employeeData.city}</p>
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