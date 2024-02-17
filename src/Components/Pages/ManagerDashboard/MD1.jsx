import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../CssFiles/ManagerDashboard.css';
import { Kanban } from '../../KanbanBoard/Kanban';
import CreateTask from './CreateTask';
import ManagerProfile from './ManagerProfile';
import AssignProjectToEmployee from './AssignProjectToEmployee';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const App = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [drawerState, setDrawerState] = useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerState({ ...drawerState, [anchor]: open });
    };

    const handleNavigation = (option) => {
        setSelectedOption(option);
        setDrawerState({ ...drawerState, left: false });
    };

    useEffect(() => {
    }, [selectedOption]);

    const renderContent = () => {
        switch (selectedOption) {
            case 'Manager Profile':
                return <ManagerProfile />;
            case 'Assign Projects':
                return <AssignProjectToEmployee />;
            // case 'Kanban Board':
            //     return <Kanban />;
            case 'Create Task':
                return <CreateTask />;
            default:
                return <div>Please select an option from the sidebar</div>;
        }
    };

    const list = (
        <Box
            sx={{ width: 'auto' }}
            role="presentation"
        >
            <List>
                {['Manager Profile', 'Assign Projects', 'Create Task'].map((text) => (
                    <ListItem
                        key={text}
                        disablePadding
                        onClick={() => handleNavigation(text)}
                    >
                        <ListItemButton>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Container fluid className="content-container dashboard-container">
            <Row className="flex-xl-nowrap">
                <Col md={2} className="mySidebar">
                    <Button onClick={toggleDrawer('left', true)}>Open Drawer</Button>
                    <Drawer
                        anchor="left"
                        open={drawerState.left}
                        onClose={toggleDrawer('left', false)}
                    >
                        {list}
                    </Drawer>
                </Col>
                <Col md={10} className="main-content p-4">
                    {
                    renderContent()}
                </Col>
            </Row>
        </Container>
    );
};

export default App;
