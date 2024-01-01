import React, { useState } from 'react';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../CssFiles/EmployeeDashboard.css'; // Adjust the path based on the actual folder structure
import EmployeeProfile from './EmployeeProfile';
import DemoKanbanBoard from './KanbanBoard';
import { Kanban } from '../../KanbanBoard/Kanban';

const EmployeeDashboard = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleNavigation = (option) => {
        setSelectedOption(option);
    };

    const renderContent = () => {
        switch (selectedOption) {
            case 'Employee Profile':
                return <EmployeeProfile />;
            case 'Kanban Board':
                return <Kanban />;
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
                                    <Nav.Link onClick={() => handleNavigation('Employee Profile')}
                                        className={selectedOption === 'Employee Profile' ? 'active' : ''}>
                                        Employee Profile
                                    </Nav.Link>
                                    <Nav.Link onClick={() => handleNavigation('Kanban Board')}
                                        className={selectedOption === 'Kanban Board' ? 'active' : ''}>
                                        Kanban Board
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

export default EmployeeDashboard;