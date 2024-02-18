import React, { useState } from 'react';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../CssFiles/ManagerDashboard.css'; // Adjust the path based on the actual folder structure
import { Kanban } from '../../KanbanBoard/Kanban';
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
            case 'Manager Profile':
                return <ManagerProfile />;
            case 'Assign Projects':
                return <AssignProjectToEmployee/>;
            // case 'Kanban Board':
            //     return <Kanban />;
            case 'Create Task':
                return <CreateTask />;
            default:
                return <div>Please select an option from the sidebar</div>;
        }
    };

    return (
            <Container fluid className="content-container dashboard-container">
                <Row className="flex-xl-nowrap">
                    <Col md={2} className="sidebar mySidebar">
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
                                    {/* <Nav.Link onClick={() => handleNavigation('Kanban Board')}
                                        className={selectedOption === 'Kanban Board' ? 'active' : ''}>
                                        Kanban Board for Projects
                                    </Nav.Link> */}
                                    <Nav.Link onClick={() => handleNavigation('Create Task')}
                                        className={selectedOption === 'Create Task' ? 'active' : ''}>
                                        Create Task
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                    <Col md={10} className="main-content p-4">
                        {renderContent()}
                    </Col>
                </Row>
            </Container>
    );
};

export default ManagerDashboard;
