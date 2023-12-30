import React, { useState } from 'react';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../CssFiles/ManagerDashboard.css'; // Adjust the path based on the actual folder structure
import DemoKanbanBoard from './KanbanBoard';
import CreateTask from './CreateTask';
import ManagerProfile from './ManagerProfile';
import AssignProjectToEmployee from './AssignProjectToEmployee';

const ManagerDashboard = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleNavigation = (option) => {
        setSelectedOption(option);
    };

    const renderContent = () => {
        switch (selectedOption) {
            case 'Manager Profile': // New case for 'Edit Profile'
                return <ManagerProfile />;
            case 'Assign Projects':
                return <AssignProjectToEmployee/>;
            case 'Kanban Board':
                return <DemoKanbanBoard />;
            case 'Create Task':
                return <CreateTask />;
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
                                    <Nav.Link onClick={() => handleNavigation('Manager Profile')}
                                        className={selectedOption === 'Manager Profile' ? 'active' : ''}>
                                        Manage Profile
                                    </Nav.Link>
                                    <Nav.Link onClick={() => handleNavigation('Assign Projects')}
                                        className={selectedOption === 'Assign Projects' ? 'active' : ''}>
                                        Assign Projects
                                    </Nav.Link>
                                    <Nav.Link onClick={() => handleNavigation('Kanban Board')}
                                        className={selectedOption === 'Kanban Board' ? 'active' : ''}>
                                        Kanban Board for Projects
                                    </Nav.Link>
                                    <Nav.Link onClick={() => handleNavigation('Create Task')}
                                        className={selectedOption === 'Create Task' ? 'active' : ''}>
                                        Create Task
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                    <Col md={10} xl={10} className="main-content p-4">
                        {renderContent()}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ManagerDashboard;
