import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Table } from 'react-bootstrap';

const CreateTask = () => {
    const [projects, setProjects] = useState([]); // State to hold projects
    const [tasks, setTasks] = useState([]); // State to hold tasks
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [taskName, setTaskName] = useState(''); // State for Task name
    const [taskDescription, setTaskDescription] = useState(''); // State for Task description

    // Mock projects data
    const mockProjects = [
        {
            id: 1,
            name: 'Project 1',
            description: 'Description for Project 1',
        },
        {
            id: 2,
            name: 'Project 2',
            description: 'Description for Project 2',
        },
        // Add more projects here
    ];

    // Mock tasks data
    const mockTasks = [
        {
            id: 1,
            projectId: 1,
            projectName: 'Project 1',
            taskName: 'Task 1',
            taskDescription: 'Task 1 Description',
            status: 'Pending',
        },
        {
            id: 2,
            projectId: 2,
            projectName: 'Project 2',
            taskName: 'Task 2',
            taskDescription: 'Task 2 Description',
            status: 'Completed',
        },
        // Add more tasks here
    ];

    useEffect(() => {
        // Simulate API calls to fetch projects and tasks
        // Replace with actual API calls

        setProjects(mockProjects);
        setTasks(mockTasks);
    }, []);

    // Function to create a task for a specific project
    const createTaskForProject = (projectId, taskName, taskDescription) => {
        // Simulate API call to create task
        // Replace with actual API call
        const newTask = {
            id: tasks.length + 1, // Replace this with ID from response
            projectId,
            projectName: projects.find((project) => project.id === projectId)?.name || '',
            taskName,
            taskDescription,
            status: 'Pending', // Initial status
        };

        setTasks([...tasks, newTask]);
        setShowModal(false);
    };

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleCreateTask = (e) => {
        e.preventDefault();
        if (taskName && taskDescription) {
            const selectedProjectId = projects.length > 0 ? projects[0].id : null;

            if (selectedProjectId) {
                createTaskForProject(selectedProjectId, taskName, taskDescription);
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
            {/* Existing Project Cards */}
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
