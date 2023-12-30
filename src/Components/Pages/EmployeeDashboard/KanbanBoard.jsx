import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DemoKanbanBoard = () => {
    const [tasks, setTasks] = useState([]);

    // Simulated API call to fetch tasks for the To Do column by default
    useEffect(() => {
        // Simulated API call to fetch tasks from backend for the To Do column
        // Replace this with your actual API call
        const fetchedTasks = [
            { id: 1, title: 'Task 1', status: 'To Do' },
            { id: 2, title: 'Task 2', status: 'To Do' },
            { id: 3, title: 'Task 3', status: 'To Do' },
            // Add more task objects here
        ];
        setTasks(fetchedTasks);
    }, []);

    // Function to handle moving tasks to different columns
    const handleStatusChange = (taskId, newStatus) => {
        // Update the status of the task locally
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);
        // Here you can add API logic to update the task status on the server
    };

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h2>To Do</h2>
                    {tasks
                        .filter((task) => task.status === 'To Do')
                        .map((task) => (
                            <div key={task.id} className="task-card">
                                <p>{task.title}</p>
                                <Button variant="primary" onClick={() => handleStatusChange(task.id, 'Doing')}>
                                    Start
                                </Button>
                            </div>
                        ))}
                </Col>
                <Col>
                    <h2>Doing</h2>
                    {tasks
                        .filter((task) => task.status === 'Doing')
                        .map((task) => (
                            <div key={task.id} className="task-card">
                                <p>{task.title}</p>
                                <Button variant="info" onClick={() => handleStatusChange(task.id, 'Review')}>
                                    Review
                                </Button>
                            </div>
                        ))}
                </Col>
                <Col>
                    <h2>Review</h2>
                    {tasks
                        .filter((task) => task.status === 'Review')
                        .map((task) => (
                            <div key={task.id} className="task-card">
                                <p>{task.title}</p>
                                <Button variant="success" onClick={() => handleStatusChange(task.id, 'Done')}>
                                    Complete
                                </Button>
                            </div>
                        ))}
                </Col>
                <Col>
                    <h2>Done</h2>
                    {tasks
                        .filter((task) => task.status === 'Done')
                        .map((task) => (
                            <div key={task.id} className="task-card">
                                <p>{task.title}</p>
                                {/* Optionally, you can have an option to revert task status */}
                                {/* <button onClick={() => handleStatusChange(task.id, 'Review')}>Revert</button> */}
                            </div>
                        ))}
                </Col>
            </Row>
        </Container>
    );
};

export default DemoKanbanBoard;
