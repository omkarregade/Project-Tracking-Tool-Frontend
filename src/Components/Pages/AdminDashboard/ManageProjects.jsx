import React, { useState, useEffect } from 'react';
import { Card, Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { updateProject, getAllProjects } from '../../Service/ProjectService'; // Assuming these functions exist


const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedProjectInfo, setUpdatedProjectInfo] = useState({});

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await getAllProjects('/api/projects'); // Replace with your API endpoint
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


    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
        setUpdatedProjectInfo({ ...project });
    };

    const handleUpdate = async () => {
        try {
            // Make the API call to update project data
            await updateProject(selectedProject.id, updatedProjectInfo); // Assuming updateProject takes project id and updated info
            console.log('Project updated successfully:', updatedProjectInfo);
            setIsModalOpen(false); // Close the modal after successful update
        } catch (error) {
            console.error('Error updating project:', error);
            // Handle error scenario
        }
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
