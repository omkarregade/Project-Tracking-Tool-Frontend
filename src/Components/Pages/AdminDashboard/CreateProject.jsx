import React, { useState } from 'react';

const CreateProject = () => {
  const [projectData, setProjectData] = useState({
    projectName: '',
    domain: '',
    description: '',
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
      const response = await fetch('http://localhost:8080/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        console.log('Project created successfully.');
        // Additional logic after successful project creation
      } else {
        console.error('Failed to create project.');
        // Handle failure scenario
      }
    } catch (error) {
      console.error('Error creating project:', error);
      // Handle error scenario
    }
  };

  return (
    <div>
      <h2>Create Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Project Name:
          <input
            type="text"
            name="projectName"
            value={projectData.projectName}
            onChange={handleChange}
          />
        </label>
        <label>
          Domain:
          <input
            type="text"
            name="domain"
            value={projectData.domain}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={projectData.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;
