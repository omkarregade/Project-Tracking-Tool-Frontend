import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllEmployees, mapEmployeeToProject, updateEmployeeDesignation } from '../../Service/EmployeeService'; // Import the EmployeeService functions
import {getAllProjects} from '../../Service/ProjectService';
const AssignProjectToEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedDesignation, setSelectedDesignation] = useState('');

    useEffect(() => {
        fetchEmployees();
        fetchProjects();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await getAllEmployees(); // API call to fetch employees
            if (response.ok) {
                const fetchedEmployees = await response.json();
                setEmployees(fetchedEmployees);
            } else {
                console.error('Failed to fetch employees');
            }
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const fetchProjects = async () => {
        try {
            const response = await getAllProjects(); // API call to fetch projects
            if (response.ok) {
                const fetchedProjects = await response.json();
                setProjects(fetchedProjects);
            } else {
                console.error('Failed to fetch projects');
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await mapEmployeeToProject(selectedEmployee.employeeId, selectedProject.ProjectId); // API call to assign project to employee
            await updateEmployeeDesignation(selectedEmployee, selectedDesignation);
            alert('Project assigned successfully:', selectedProject);
        } catch (error) {
            alert('Error assigning project:', error);
        }
    };

    const hardcodedDesignations = [
        'SOFTWARE_ENGINEER',
        'UI_UX_DESIGNER',
        'QA_TESTER',
        'DEVOPS_ENGINEER',
        'SYSTEM_ADMINISTRATOR',
        'CONTENT_WRITER',
        'SEO_SPECIALIST',
        'BUSINESS_ANALYST',
        'DATA_ANALYST',
    ];

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={6}>
                    <div className="inner-box">
                        <h2>Assign Project to Employee</h2>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="employeeSelect" className="mb-3">
                                <Form.Label>Select Employee:</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedEmployee}
                                    onChange={(e) => setSelectedEmployee(e.target.value)}
                                >
                                    <option value="">Select Employee</option>
                                    {employees.map((employee) => (
                                        <option key={employee.employeeId} value={employee.employeeId}>
                                            {employee.firstName}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="designationSelect" className="mb-3">
                                <Form.Label>Select Designation:</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedDesignation}
                                    onChange={(e) => setSelectedDesignation(e.target.value)}
                                >
                                    <option value="">Assign designation for the employee</option>
                                    {hardcodedDesignations.map((designation) => (
                                        <option key={designation} value={designation}>
                                            {designation}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="projectSelect" className="mb-3">
                                <Form.Label>Select Project:</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedProject}
                                    onChange={(e) => setSelectedProject(e.target.value)}
                                >
                                    <option value="">Select from ongoing projects</option>
                                    {projects.map((project) => (
                                        <option key={project.projectId} value={project.projectId}>
                                            {project.projectTitle}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <div className="d-grid">
                                <Button variant="primary" type="submit">
                                    Assign
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>

            {/* Project List Section */}
            <Row className="justify-content-md-center mt-5">
                <Col md={8}>
                    <div className="inner-box">
                        <h2>Project List</h2>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Project Name</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => (
                                    <tr key={project.projectId}>
                                        <td>{project.projectTitle}</td>
                                        <td>{project.projectDescription}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AssignProjectToEmployee;