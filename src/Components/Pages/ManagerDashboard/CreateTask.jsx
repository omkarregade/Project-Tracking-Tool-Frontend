import React, { useState, useEffect } from "react";
import { Container, Col, Row, Card, Button, Modal, Form, Table } from "react-bootstrap";
import {
  getAllProjects,
  getProjectsByManagerId,
} from "../../Service/ProjectService";
import { createTask, getAllTasks } from "../../Service/TaskService";
import { getId } from "../../Service/Util";

const CreateTask = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [domain, setDomain] = useState("");
  const [deadlineTaskDate, setdeadlineTaskDate] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");

  useEffect(() => {
    fetchProjects();
    fetchAllTasks();
  }, []);

  const fetchProjects = async () => {
    try {
      const id = localStorage.getItem("id");
      const fetchedProjects = await getProjectsByManagerId(id);
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchAllTasks = async () => {
    const response = await getAllTasks();
    console.log(response);
    if (response) {
      setTasks(response);
    } else {
      console.error("Failed to fetch tasks");
    }
  };

  const handleShow = (projectId) => {
    setShowModal(true);
    setTitle("");
    setDescription("");
    setDomain("");
    setdeadlineTaskDate("");
    setSelectedProjectId(projectId);
  };

  const handleClose = () => setShowModal(false);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const taskData = {
      title,
      description,
      domain,
      deadlineTaskDate,
    };

    try {
      const projectId = selectedProjectId;
      const newTask = await createTask(projectId, taskData);
      setTasks([...tasks, newTask]);
      setShowModal(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={12}>
          <h2>Projects</h2>
          <div className="d-flex flex-wrap">
            {projects.map((project) => (
              <Card key={project.id} style={{ width: "18rem", margin: "10px" }}>
                <Card.Body>
                  <Card.Title>{project.projectTitle}</Card.Title>
                  <Card.Text>{project.projectDescription}</Card.Text>
                  <Button onClick={() => handleShow(project.projectId)}>
                    Add Task
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>

          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create Task</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
              <Form onSubmit={handleCreateTask}>
                <Form.Group controlId="taskName" className="mb-3">
                  <Form.Label>Task Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter task name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="taskDescription" className="mb-3">
                  <Form.Label>Task Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="taskDomain" className="mb-3">
                  <Form.Label>Task Domain</Form.Label>
                  <Form.Control
                    type="text"
                    rows={3}
                    placeholder="Enter domain"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="taskDeadline" className="mb-3">
                  <Form.Label>Task Deadline</Form.Label>
                  <Form.Control
                    type="date"
                    rows={3}
                    placeholder="Enter deadline date"
                    value={deadlineTaskDate}
                    onChange={(e) => setdeadlineTaskDate(e.target.value)}
                  />
                </Form.Group>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="Submit">
                    Create Task
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>

<h2>Task List</h2>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Task Name</th>
                  <th>Task Description</th>
                  <th>Project Name</th>
                  <th>Domain</th>
                  <th>Status</th>
                  <th>DeadLine</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.taskid}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.projectId}</td>
                    <td>{task.domain}</td>
                    <td>{task.status}</td>
                    <td>{task.deadlineTaskDate}</td>
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

export default CreateTask;
