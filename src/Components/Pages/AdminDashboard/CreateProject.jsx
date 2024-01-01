import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { addProject } from '../../Service/ProjectService';
const CreateProject = () => {
  const [projectData, setProjectData] = useState({
    projectName: '',
    domain: '',
    description: '',
    createDate: '',
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
      const response = await addProject(projectData);
      console.log('Project created successfully:', response);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div>
      <h2>Create Project</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="projectName" className="mb-3">
          <Form.Label>Project Name:</Form.Label>
          <Form.Control
            type="text"
            name="projectName"
            value={projectData.projectName}
            onChange={handleChange}
            placeholder="Enter project name"
          />
        </Form.Group>
        <Form.Group controlId="domain" className="mb-3">
          <Form.Label>Domain:</Form.Label>
          <Form.Control
            type="text"
            name="domain"
            value={projectData.domain}
            onChange={handleChange}
            placeholder="Enter domain"
          />
        </Form.Group>
        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={projectData.description}
            onChange={handleChange}
            placeholder="Enter project description"
          />
        </Form.Group>
        <Form.Group controlId="createDate" className="mb-3">
          <Form.Label>Create Date:</Form.Label>
          <Form.Control
            type="date"
            name="createDate"
            value={projectData.createDate}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Project
        </Button>
      </Form>
    </div>
  );
};

export default CreateProject;