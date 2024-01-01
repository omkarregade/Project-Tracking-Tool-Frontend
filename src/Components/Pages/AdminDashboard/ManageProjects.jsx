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
            const fetchedProjects = await getAllProjects();
            
                setProjects(fetchedProjects);
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
            await updateProject(parseInt(selectedProject.projectId), updatedProjectInfo);
            console.log('Project updated successfully:', updatedProjectInfo);
            setIsModalOpen(false);
            fetchProjects();
        } catch (error) {
            console.error('Error updating project:', error);
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
        <h2>All Projects</h2>
            <Row xs={1} md={4} className="g-4">
                {projects.map((project, index) => (
                    <Col key={index}>
                        <Card
                            className="project-card"
                            onClick={() => handleProjectClick(project)}
                        >
                            <Card.Body>
                                <Card.Title>{project.projectTitle}</Card.Title>
                                <Card.Text>{project.projectDescription}</Card.Text>
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
                                name="projectTitle"
                                value={updatedProjectInfo.projectTitle || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="projectDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="projectDescription"
                                value={updatedProjectInfo.projectDescription || ''}
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
