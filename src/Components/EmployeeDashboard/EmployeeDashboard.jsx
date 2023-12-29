import React, { useState } from 'react';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeProfile from "../EmployeeDashboard/EmployeeProfile";


const EmployeeDashboard = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleNavigation = (option) => {
        setSelectedOption(option);
    };

    const renderContent = () => {
        // ... (same as before)
    };

    return (
        <Container fluid>
            <Row>
                {/* Sidebar/Menu */}
                <Col md={2} className="sidebar">
                    <Navbar bg="light" expand="md" className="flex-column">
                        <Navbar.Toggle aria-controls="sidebar-nav" />
                        <Navbar.Collapse id="sidebar-nav">
                            <Nav className="flex-column">
                                {/* ... (same as before) */}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>

                {/* Main content area */}
                <Col md={10} className="main-content">
                    {renderContent()}
                </Col>
            </Row>
            {/* Footer */}
            <Row>
                <Col md={12} className="footer">
                    {/* Your footer content */}
                </Col>
            </Row>
        </Container>
    );
};

export default EmployeeDashboard;



