import React, { useState } from 'react';
import {Container, Button, Form, Alert, Col, Row } from 'react-bootstrap';
import { addProject } from '../../Service/ProjectService';


const CreateProject = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [projectData, setProjectData] = useState({
    projectTitle: '',
    projectDescription: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(projectData);
      const response = await addProject(projectData);
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
            }, 2000);

    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-3">
        <Col md={10}>
    <div>
      <h2>Create Project</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="projectName" className="mb-3">
          <Form.Label>Project Name:</Form.Label>
          <Form.Control
            type="text"
            name="projectTitle"
            value={projectData.projectTitle}
            onChange={handleChange}
            placeholder="Enter project name"
          />
        </Form.Group>
        <Form.Group controlId="projectDescription" className="mb-3">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            name="projectDescription"
            value={projectData.projectDescription}
            onChange={handleChange}
            placeholder="Enter project description"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Project
        </Button>
      </Form>
      <Row>
        <Col lg={4} className="mt-1">
          {isSubmitted ? <Alert variant="success">Project Created</Alert> : null}
        </Col>
      </Row>

    </div>
            </Col>
      </Row>
    </Container>
  );
};

export default CreateProject;