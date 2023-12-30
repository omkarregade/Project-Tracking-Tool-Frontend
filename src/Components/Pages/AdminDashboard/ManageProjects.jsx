import React, { useState, useEffect } from 'react';
import { Card, Modal, Button, Form, Row, Col } from 'react-bootstrap';

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedProjectInfo, setUpdatedProjectInfo] = useState({});

    // Fetch projects data from the API
    useEffect(() => {
        // Simulated API call or actual fetch implementation
        const fetchedProjects = [
            { id: 1, name: 'Project 1', description: 'Description for Project 1' },
            { id: 2, name: 'Project 2', description: 'Description for Project 2' },
            { id: 3, name: 'Project 3', description: 'Description for Project 3' },
            { id: 4, name: 'Project 4', description: 'Description for Project 4' },
            { id: 5, name: 'Project 5', description: 'Description for Project 5' },

            // ... Add more projects as needed
        ];
        setProjects(fetchedProjects);
    }, []);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
        setUpdatedProjectInfo({ ...project });
    };

    const handleUpdate = () => {
        // Simulated API call to update project data
        console.log('Updated Project Info:', updatedProjectInfo);
        // Make your API call here with updatedProjectInfo
        // After successful update, close the modal
        setIsModalOpen(false);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProjectInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    return (
        <div className="manage-projects">
            <Row xs={1} md={4} className="g-4">
                {projects.map((project, index) => (
                    <Col key={index}>
                        <Card
                            className="project-card"
                            onClick={() => handleProjectClick(project)}
                        >
                            <Card.Body>
                                <Card.Title>{project.name}</Card.Title>
                                <Card.Text>{project.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={isModalOpen} onHide={handleCloseModal} className="project-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Update Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="projectName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={updatedProjectInfo.name || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="projectDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={updatedProjectInfo.description || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageProjects;
