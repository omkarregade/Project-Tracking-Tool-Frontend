import React, { useState, useEffect } from 'react';
// No react-router-dom imports needed, so nothing to comment out

const AssignManager = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedManager, setSelectedManager] = useState('');
  const [projects, setProjects] = useState([]); // Placeholder for projects
  const [managers, setManagers] = useState([]); // Placeholder for managers

  useEffect(() => {
    fetchProjects();
    fetchManagers();
  }, []);

  const fetchProjects = async () => {
    try {
      const fetchedProjects = [
        { id: 1, name: 'Project A' },
        { id: 2, name: 'Project B' },
        // ... Add more project data if needed
      ];
      setProjects(fetchedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchManagers = async () => {
    try {
      const fetchedManagers = [
        { id: 1, name: 'Manager 1' },
        { id: 2, name: 'Manager 2' },
        // ... Add more manager data if needed
      ];
      setManagers(fetchedManagers);
    } catch (error) {
      console.error('Error fetching managers:', error);
    }
  };

  const handleAssignManager = () => {
    if (selectedProject && selectedManager) {
      alert(`Manager ${selectedManager} assigned to Project ${selectedProject}`);
    } else {
      alert('Please select both a project and a manager before assigning.');
    }
  };

  return (
    <div>
      <h2>Assign Manager</h2>
      <label>
        Select Project:
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="">Select Project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Select Manager:
        <select
          value={selectedManager}
          onChange={(e) => setSelectedManager(e.target.value)}
        >
          <option value="">Select Manager</option>
          {managers.map((manager) => (
            <option key={manager.id} value={manager.id}>
              {manager.name}
            </option>
          ))}
        </select>
      </label>

      <button type="button" onClick={handleAssignManager}>
        Assign Manager
      </button>
    </div>
  );
};

export default AssignManager;
