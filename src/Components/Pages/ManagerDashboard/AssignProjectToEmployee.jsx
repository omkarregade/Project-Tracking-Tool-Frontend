import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";
import {
  getAllEmployees,
  mapEmployeeToProject,
  updateEmployeeDesignation,
} from "../../Service/EmployeeService";
import { getProjectsByManagerId } from "../../Service/ProjectService";

const AssignProjectToEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");

  useEffect(() => {
    fetchEmployees();
    fetchProjects();
  }, []);

  const fetchEmployees = async () => {
    try {
      const fetchedEmployees = await getAllEmployees();
      setEmployees(fetchedEmployees);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const id = localStorage.getItem("id");
      const fetchedProjects = await getProjectsByManagerId(id);
      setProjects(fetchedProjects);
      console.log(fetchedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Selected Employee ID:", selectedEmployeeId);
      console.log("Selected Project ID:", selectedProjectId);
      console.log("Selected DESIGNATION:", selectedDesignation);

      const designationData = {
        title: selectedDesignation, // This should match one of your DesignationTitle enum values
        // Other designation properties...
      };

      // const selectedEmp = employees.find(employee => employee.employeeId === selectedEmployeeId);
      // const selectedProj = projects.find(project => project.projectId === selectedProjectId);

      await mapEmployeeToProject(selectedEmployeeId, selectedProjectId);
      console.log("Project assigned successfully");
    } catch (error) {
      console.log("Error assigning project:", error);
    }
  };

  const hardcodedDesignations = [
    "SOFTWARE_ENGINEER",
    "UI_UX_DESIGNER",
    "QA_TESTER",
    "DEVOPS_ENGINEER",
    "SYSTEM_ADMINISTRATOR",
    "CONTENT_WRITER",
    "SEO_SPECIALIST",
    "BUSINESS_ANALYST",
    "DATA_ANALYST",
  ];

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <div className="inner-box">
            <h2>Assign Project to Employee</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="employeeSelect" className="mb-3">
                <Form.Label>Select Employee:</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedEmployeeId}
                  onChange={(e) => setSelectedEmployeeId(e.target.value)}
                >
                  <option value="">Select Employee</option>
                  {employees.map((employee) => (
                    <option
                      key={employee.employeeId}
                      value={employee.employeeId}
                    >
                      {employee.fullName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="projectSelect" className="mb-3">
                <Form.Label>Select Project:</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  //   disabled={loadingProjects}
                >
                  <option value="">Select from ongoing projects</option>
                  {projects.map((project) => (
                    <option key={project.projectId} value={project.projectId}>
                      {project.projectTitle}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Button variant="primary" type="submit">
                Assign
              </Button>
            </Form>
          </div>
        </Col>
      </Row>

      {/* Display the list of projects */}
      <Row className="justify-content-md-center mt-5">
        <Col md={8}>
          <div className="inner-box">
            <h2>Project List</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.projectId}>
                    <td>{project.projectTitle}</td>
                    <td>{project.projectDescription}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AssignProjectToEmployee;
