import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Table } from 'react-bootstrap';
import { getAllProjects } from '../../Service/ProjectService';
import { createTask } from '../../Service/TaskService';
import { getId } from '../../Service/Util';

const CreateTask = () => {
    const [projects, setProjects] = useState([]); // State to hold projects
    const [tasks, setTasks] = useState([]); // State to hold tasks
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [taskName, setTaskName] = useState(''); // State for Task name
    const [taskDescription, setTaskDescription] = useState(''); // State for Task description
    const [taskDomain, setTaskDomain] = useState(''); // State for Task domain
    const [taskDeadline, setTaskDeadline] = useState(''); // State for Task domain
    const [selectedProjectId, setSelectedProjectId] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(()=>{
        fetchAllTasks();
    }, []);

    const fetchProjects = async () => {
        try {
            const id = getId('id');
            const fetchedProjects = await getAllProjects(id);
            setProjects(fetchedProjects);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const fetchAllTasks = async () => {
    const response = await getAllTasks();
    if (response) {
      setTasks(response);
    } else {
      console.error("Failed to fetch tasks");
    }
  };

    const handleShow = (projectId) => {
        setShowModal(true);
        setTaskName('');
        setTaskDescription('');
        setTaskDomain('');
        setTaskDeadline('');
        setSelectedProjectId(projectId); // Set the selected project ID
    };

    const handleClose = () => setShowModal(false);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        const taskData = {
            taskName,
            taskDescription,
            taskDomain,
            taskDeadline,
        };

        try {
            const projectId = selectedProjectId;
            const newTask = await createTask(projectId, taskData);
            setTasks([...tasks, newTask]);
            setShowModal(false);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <div>
            <h2>Projects</h2>
            <div className="d-flex flex-wrap">
                {projects.map((project) => (
                    <Card key={project.id} style={{ width: '18rem', margin: '10px' }}>
                        <Card.Body>
                            <Card.Title>{project.projectTitle}</Card.Title>
                            <Card.Text>{project.projectDescription}</Card.Text>
                            <Button onClick={() => handleShow(project.projectId)}>Add Task</Button>
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
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="taskDescription" className="mb-3">
                            <Form.Label>Task Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description"
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="taskDomain" className="mb-3">
                            <Form.Label>Task Domain</Form.Label>
                            <Form.Control
                                type="text"
                                rows={3}
                                placeholder="Enter domain"
                                value={taskDomain}
                                onChange={(e) => setTaskDomain(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="taskDeadline" className="mb-3">
                            <Form.Label>Task Deadline</Form.Label>
                            <Form.Control
                                type="date"
                                rows={3}
                                placeholder="Enter deadline date"
                                value={taskDeadline}
                                onChange={(e) => setTaskDeadline(e.target.value)}
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
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Task Description</th>
                        <th>Project Name</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.taskName}</td>
                            <td>{task.taskDescription}</td>
                            <td>{task.projectName}</td>
                            <td>{task.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default CreateTask;
