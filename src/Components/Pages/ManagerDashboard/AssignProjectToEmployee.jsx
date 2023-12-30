import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AssignProjectToEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [designations, setDesignations] = useState(['Junior Developer', 'Senior Developer', 'UI/UX Designer']);
    const [selectedDesignation, setSelectedDesignation] = useState('');
    const [projects, setProjects] = useState([
        { id: 1, name: 'Project A', description: 'Description for Project A' },
        { id: 2, name: 'Project B', description: 'Description for Project B' },
        // Add more project data as needed
    ]);
    const [selectedProject, setSelectedProject] = useState(''); // Define selectedProject state

    // Simulated API call to fetch employees
    useEffect(() => {
        const fetchedEmployees = [
            { id: 1, name: 'Employee 1' },
            { id: 2, name: 'Employee 2' },
            { id: 3, name: 'Employee 3' },
        ];
        setEmployees(fetchedEmployees);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Selected Employee:', selectedEmployee);
        console.log('Selected Designation:', selectedDesignation);
        console.log('Selected Project:', selectedProject);
        // Here you can handle the submission logic
    };
    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={6}>
                    <div className="inner-box">
                        <h2>Assign Project to Employee</h2>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="employeeSelect" className="mb-3">
                                <Form.Label>Select Employee:</Form.Label>
                                <Form.Control as="select" value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
                                    <option value="">Select Employee</option>
                                    {employees.map((employee) => (
                                        <option key={employee.id} value={employee.id}>
                                            {employee.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="designationSelect" className="mb-3">
                                <Form.Label>Select Designation:</Form.Label>
                                <Form.Control as="select" value={selectedDesignation} onChange={(e) => setSelectedDesignation(e.target.value)}>
                                    <option value="">Assign designation for the employee</option>
                                    {designations.map((designation) => (
                                        <option key={designation} value={designation}>
                                            {designation}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="projectSelect" className="mb-3">
                                <Form.Label>Select Project:</Form.Label>
                                <Form.Control as="select" value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
                                    <option value="">Select from ongoing projects</option>
                                    {projects.map((project) => (
                                        <option key={project.id} value={project.id}>
                                            {project.name}
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
                                    <tr key={project.id}>
                                        <td>{project.name}</td>
                                        <td>{project.description}</td>
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
