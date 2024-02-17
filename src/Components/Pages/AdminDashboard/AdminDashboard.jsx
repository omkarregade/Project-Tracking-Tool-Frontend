import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../CssFiles/AdminDashboard.css'; // Adjust the path based on the actual folder structure
import CreateProject from './CreateProject';
import AdminProfile from './AdminProfile';
import AssignProjectToManager from './AssignProjectToManager';
import ManageProjects from './ManageProjects';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ListIcon from '@mui/icons-material/List';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const AdminDashboard = () => {
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

    const renderContent = () => {
        switch (selectedOption) {
            case 'Create Project':
                return <CreateProject />;
            case 'Project List':
                return <ManageProjects />;
            case 'Assign Manager':
                return <AssignProjectToManager />;
            case 'Admin Profile':
                return <AdminProfile />;
            default:
                return <div>Please select an option from the drawer</div>;
        }
    };

    // Mapping icons to each option
    const iconMap = {
        'Admin Profile': <PersonIcon fontSize="small" style={{ marginRight: '8px' }} />,
        'Create Project': <AddBoxIcon fontSize="small" style={{ marginRight: '8px' }} />,
        'Project List': <ListIcon fontSize="small" style={{ marginRight: '8px' }} />,
        'Assign Manager': <AssignmentIndIcon fontSize="small" style={{ marginRight: '8px' }} />,
    };

    const list = (
        <Box sx={{ width: 'auto' }} role="presentation">
            <List>
                {['Admin Profile', 'Create Project', 'Project List', 'Assign Manager'].map((text) => (
                    <ListItem key={text} disablePadding onClick={() => handleNavigation(text)}>
                        <ListItemButton>
                            {iconMap[text]} {/* Use the icon based on the mapping */}
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
                <Button onClick={toggleDrawer('left', true)}>Open Dashboard</Button>
                <Drawer anchor="left" open={drawerState.left} onClose={toggleDrawer('left', false)}>
                    {list}
                </Drawer>
                <Col md={11} xl={11} className="main-content p-4">
                    {renderContent()}
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;
