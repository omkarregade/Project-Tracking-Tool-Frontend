import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import '../../CssFiles/EmployeeProfile.css'; // Adjust the path according to your project structure
import { getEmployeeById, updateEmployee } from '../../Service/EmployeeService'; // Import the EmployeeService functions
import { getId } from "../../Service/Util";


const EmployeeProfile = () => {
    const [employeeData, setEmployeeData] = useState({
        employeeId: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        city: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({ ...employeeData });

    const fetchEmployeeProfile = async () => {
        try {
            const id = getId('id');
            const response = await getEmployeeById(id);
            console.log(response.data);
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
            await updateEmployee(id, editedProfile);
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
                    <div className="employee-profile my-5">
                        {/* Profile Image Section */}
                        <div className="profile-image-section text-center mb-3">
                            {/* Placeholder profile image */}
                            <div className="placeholder-profile-image rounded-circle">
                                {/* Add text or icon here */}
                                <span>Profile</span>
                            </div>
                        </div>
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
                                            value={editedProfile.fullName}
                                            onChange={(e) => handleInputChange(e, 'fullName')}
                                        />
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={editedProfile.email}
                                            onChange={(e) => handleInputChange(e, 'email')}
                                        />
                                        <Form.Label>Phone:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={editedProfile.phoneNumber}
                                            onChange={(e) => handleInputChange(e, 'phoneNumber')}
                                        />
                                        <Form.Label>City:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
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

export default EmployeeProfile;