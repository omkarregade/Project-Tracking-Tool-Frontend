import React, { useState } from 'react';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../CssFiles/AdminDashboard.css'; // Adjust the path based on the actual folder structure
import CreateProject from './CreateProject';
import AdminProfile from './AdminProfile'; // Import your AdminProfile component here
import AssignProjectToManager from './AssignProjectToManager';
import ManageProjects from './ManageProjects';

const AdminDashboard = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleNavigation = (option) => {
        setSelectedOption(option);
    };

    const renderContent = () => {
        switch (selectedOption) {
            case 'Create Project':
                return <CreateProject />;
            case 'Project List':
                return <ManageProjects />;
            case 'Assign Manager':
                return <AssignProjectToManager/>;
            case 'Admin Profile':
                return <AdminProfile />;
            default:
                return <div>Please select an option from the sidebar</div>;
        }
    };

    return (
        <div className="dashboard-container">
            <Container fluid className="content-container">
                <Row className="flex-xl-nowrap">
                    <Col md={2} xl={2} className="sidebar mySidebar">
                        <Navbar expand="md" className="flex-column side-navbar">
                            <Navbar.Toggle aria-controls="sidebar-nav" />
                            <Navbar.Collapse id="sidebar-nav">
                                <Nav className="flex-column">
                                    <Nav.Link
                                        onClick={() => handleNavigation('Admin Profile')}
                                        className={selectedOption === 'Admin Profile' ? 'active' : ''}
                                    >
                                        Admin Profile
                                    </Nav.Link>
                                    <Nav.Link
                                        onClick={() => handleNavigation('Create Project')}
                                        className={selectedOption === 'Create Project' ? 'active' : ''}
                                    >
                                        Create Project
                                    </Nav.Link>
                                    <Nav.Link
                                        onClick={() => handleNavigation('Project List')}
                                        className={selectedOption === 'Project List' ? 'active' : ''}
                                    >
                                        Project List
                                    </Nav.Link>
                                    <Nav.Link
                                        onClick={() => handleNavigation('Assign Manager')}
                                        className={selectedOption === 'Assign Manager' ? 'active' : ''}
                                    >
                                        Assign Project to Manager
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                    <Col md={10} xl={10} className="main-content">
                        {renderContent()}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdminDashboard;
