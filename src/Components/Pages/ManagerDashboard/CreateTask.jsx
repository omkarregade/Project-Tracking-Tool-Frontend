import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Table } from 'react-bootstrap';
import {getAllProjects} from '../../Service/ProjectService';
import {createTask} from '../../Service/TaskService';


const CreateTask = () => {
    const [projects, setProjects] = useState([]); // State to hold projects
    const [tasks, setTasks] = useState([]); // State to hold tasks
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [taskName, setTaskName] = useState(''); // State for Task name
    const [taskDescription, setTaskDescription] = useState(''); // State for Task description

    useEffect(() => {
        fetchProjects(); // Fetch projects on component mount
    }, []);

    const fetchProjects = async () => {
        try {
            // Fetch projects from the API
            const response = await getAllProjects();
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
            } else {
                console.error('Failed to fetch projects');
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

const createTaskForProject = async (taskData) => {
    try {
        const response = await createTask(taskData);

        if (response.ok) {
            const newTask = await response.json();
            setTasks([...tasks, newTask]);
            setShowModal(false);
        } else {
            console.error('Failed to create task');
        }
    } catch (error) {
        console.error('Error creating task:', error);
    }
};

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

const handleCreateTask = (e) => {
    e.preventDefault();
    if (taskName && taskDescription) {
        const selectedProjectId = projects.length > 0 ? projects[0].id : null;

        if (selectedProjectId) {
            const taskData = {
                projectId: selectedProjectId,
                taskName,
                taskDescription,
            };

            createTaskForProject(taskData);
            setTaskName('');
            setTaskDescription('');
        } else {
            alert('Please select a project before creating a task.');
        }
    } else {
        alert('Please provide both task name and task description.');
    }
};
    return (
        <div>
            <h2>Projects</h2>
            <div className="d-flex flex-wrap">
                {projects.map((project) => (
                    <Card key={project.id} style={{ width: '18rem', margin: '10px' }}>
                        <Card.Body>
                            <Card.Title>{project.name}</Card.Title>
                            <Card.Text>{project.description}</Card.Text>
                            <Button onClick={handleShow}>Add Task</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            {/* Modal for Creating Task */}
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
                                placeholder="Enter task description"
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleCreateTask}>
                        Create Task
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Task List Section */}
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
