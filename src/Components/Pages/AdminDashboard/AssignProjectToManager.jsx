import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { getAllManagers } from '../../Service/ManagerService';
import { updateProject, getAllProjects } from '../../Service/ProjectService';

const AssignProjectToManager = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedManager, setSelectedManager] = useState('');
  const [projects, setProjects] = useState([]);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchManagers();
  }, []);

  const fetchProjects = async () => {
    try {
      const fetchedProjects = await getAllProjects();
      setProjects(fetchedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchManagers = async () => {
    try {
      const fetchedManagers = await getAllManagers();
      setManagers(fetchedManagers);
    } catch (error) {
      console.error('Error fetching managers:', error);
    }
  };

  const handleAssignManager = async (e) => {
  e.preventDefault();
  if (selectedProject && selectedManager) {
    try {
      const projectToUpdate = projects.find(project => project.projectId === selectedProject);
      const updatedProject = { ...projectToUpdate, manager: { managerId: selectedManager } };
      await updateProject(selectedProject, updatedProject);
      console.log(`Manager assigned to Project successfully`);
      fetchProjects(); // Optionally, you can refetch projects after updating to reflect changes
    } catch (error) {
      console.error('Error assigning manager:', error);
    }
  } else {
    alert('Please select both a project and a manager before assigning.');
  }
};
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <div className="inner-box assign-manager-form">
            <h2>Assign Manager</h2>
            <Form onSubmit={handleAssignManager}>
              <Form.Group controlId="projectSelect" className="mb-3">
                <Form.Label>Select Project:</Form.Label>
                <Form.Select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                >
                  <option value="">Select Project</option>
                  {projects.map((project) => (
                    <option key={project.projectId} value={project.projectId}>
                      {project.projectTitle}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="managerSelect" className="mb-3">
                <Form.Label>Select Manager:</Form.Label>
                <Form.Select
                  value={selectedManager}
                  onChange={(e) => setSelectedManager(e.target.value)}
                >
                  <option value="">Select Manager</option>
                  {managers.map((manager) => (
                    <option key={manager.managerId} value={manager.managerId}>
                      {manager.fullName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <div className="d-grid">
                <Button variant="primary" type="submit">
                  Assign Manager
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AssignProjectToManager;
