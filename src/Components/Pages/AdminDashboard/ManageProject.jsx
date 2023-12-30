import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; // Commented out react-router-dom Link
import CreateProject from './CreateProject'; // Import the CreateProject component

const ManageProject = () => {
  const [projects, setProjects] = useState([]);
  const [editProjectId, setEditProjectId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Simulate fetching projects from the database
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // Make an API call to fetch projects
      const response = await fetch('/api/projects'); // Replace with your actual API endpoint
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleEditProject = (projectId) => {
    setEditProjectId(projectId);
    setShowModal(true);
  };

  const handleDeleteProject = async (projectId) => {
    try {
      // Make an API call to delete the project with the given projectId
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
        // Additional headers or authentication tokens if needed
      });

      if (response.ok) {
        console.log(`Project with ID ${projectId} deleted successfully.`);
        // After deletion, you may want to fetch the updated project list
        // fetchProjects();
      } else {
        console.error(`Failed to delete project with ID ${projectId}.`);
        // Handle failure scenario
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      // Handle error scenario
    }
  };

  const closeModal = () => {
    setEditProjectId(null);
    setShowModal(false);
  };

  return (
    <div>
      <h2>Project List</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.name}
            <button onClick={() => handleEditProject(project.id)}>Edit</button>
            <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Modal for creating/editing project */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            {/* Render the CreateProject component with editProjectId prop */}
            <CreateProject editProjectId={editProjectId} closeModal={closeModal} />
          </div>
        </div>
      )}

      {/* React-router-dom Link commented out */}
      {/* <Link to="/admin-dashboard">Back to Admin Dashboard</Link> */}
    </div>
  );
};

export default ManageProject;
