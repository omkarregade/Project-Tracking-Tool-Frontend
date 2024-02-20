// ManageProjects.js

import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Modal,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import {
  updateProject,
  getAllProjects,
  updateProjectData,
} from "../../Service/ProjectService"; // Assuming these functions exist
import "../../CssFiles/ManageProject.css"; // Import the CSS file for the flip effect

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedProjectInfo, setUpdatedProjectInfo] = useState({});
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const fetchedProjects = await getAllProjects();
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsFlipped(!isFlipped);
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
    setUpdatedProjectInfo({ ...selectedProject });
  };

  const handleUpdate = async () => {
    try {
      console.log(selectedProject.id);
      await updateProjectData(parseInt(selectedProject.id), updatedProjectInfo);

      console.log("Project updated successfully:", updatedProjectInfo);
      setIsModalOpen(false);
      setIsFlipped(false);
      fetchProjects();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsFlipped(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProjectInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-3">
        <Col md={10}>
          <div className="manage-projects">
            <h2>All Projects</h2>
            <Row xs={1} md={2} lg={4} className="g-4">
              {projects.map((project, index) => (
                <Col key={index}>
                  <Card
                    className={`project-card ${
                      isFlipped && selectedProject === project
                        ? "is-flipped"
                        : ""
                    }`}
                    onClick={() => handleProjectClick(project)}
                  >
                    <div className="card-inner">
                      <div className="card-front">
                        <Card.Body>
                          <h4 className="mb-3">
                            <strong>{project.projectTitle}</strong>
                          </h4>
                          <p>{project.projectDescription}</p>
                        </Card.Body>
                        <div className="edit-button">
                          <span onClick={handleEditClick}>Edit</span>
                        </div>
                      </div>
                      <div className="card-back">
                        {/* Additional information about the project */}
                        <Card.Body>
                          <Card.Title>Assigned to:</Card.Title>
                          <Card.Text>{project.manager?.fullName}</Card.Text>
                          <p>Created :{project.createDate}</p>
                        </Card.Body>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            <Modal
              show={isModalOpen}
              onHide={handleCloseModal}
              className="project-modal"
            >
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
                      value={updatedProjectInfo.projectTitle || ""}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="projectDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="projectDescription"
                      value={updatedProjectInfo.projectDescription || ""}
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
        </Col>
      </Row>
    </Container>
  );
};

export default ManageProjects;
