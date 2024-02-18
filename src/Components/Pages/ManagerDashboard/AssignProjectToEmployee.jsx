import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Table,
  Accordion,
} from "react-bootstrap";
import {
  getAllEmployees,
  mapEmployeeToProject,
  updateEmployeeDesignation,
} from "../../Service/EmployeeService";
import { getProjectsByManagerId } from "../../Service/ProjectService";
import { getTasksByProjectId } from "../../Service/TaskService";

const AssignProjectToEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [projectTasks, setProjectTasks] = useState({});

  useEffect(() => {
    fetchEmployees();
    fetchProjects();
  }, []);

  useEffect(() => {
    // Fetch tasks for each project in the list
    projects.forEach((project) => {
      fetchTasksForProject(project.projectId);
    });
  }, [projects]);

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
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchTasksForProject = async (projectId) => {
    try {
      console.log("Fetching tasks for project ID:", projectId);

      const fetchedTasks = await getTasksByProjectId(projectId);
      setProjectTasks((prevTasks) => ({
        ...prevTasks,
        [projectId]: fetchedTasks,
      }));

      if (fetchedTasks.length > 0) {
        const firstTaskEmployeeId = fetchedTasks[0].employeeId;
        if (firstTaskEmployeeId) {
          fetchEmployees(firstTaskEmployeeId);
        }
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAssignProject = async () => {
    try {
      const designationData = {
        title: selectedDesignation,
      };

      await mapEmployeeToProject(selectedEmployeeId, selectedProjectId);
      console.log("Project assigned successfully");

      // Fetch tasks for the selected project
      fetchTasksForProject(selectedProjectId);
    } catch (error) {
      console.log("Error assigning project:", error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={10}>
          <div className="inner-box">
            <h2>Assign Project to Employee</h2>
            <Form>
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
                >
                  <option value="">Select from ongoing projects</option>
                  {projects.map((project) => (
                    <option
                      key={project.projectId}
                      value={project.projectId}
                    >
                      {project.projectTitle}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Button
                variant="primary"
                type="button"
                onClick={handleAssignProject}
              >
                Assign
              </Button>
            </Form>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col md={12}>
          <div className="inner-box">
            <h2>Project List</h2>
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => (
                    <tr key={project.projectId}>
                      <td>
                        <Accordion>
                          <Accordion.Item eventKey={index.toString()}>
                            <Accordion.Header>
                              {project.projectTitle}
                            </Accordion.Header>
                            <Accordion.Body>
                              <Table striped bordered hover>
                                <thead>
                                  <tr>
                                    <th>Task Name</th>
                                    <th>Employee Name</th>
                                    <th>Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {projectTasks[project.projectId]?.map(
                                    (task) => (
                                      <tr key={task.taskId}>
                                        <td>{task.title}</td>
                                        <td>{task.employeeName}</td>
                                        <td>{task.status}</td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </Table>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </td>
                      <td>{project.projectDescription}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AssignProjectToEmployee;
