import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
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
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CreateIcon from '@mui/icons-material/Create';

const ManagerDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('Manager Profile'); // Set default option to 'Manager Profile'
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
    // Handle additional side effects if needed
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

  // Mapping icons to each option
  const iconMap = {
    'Manager Profile': <AccountCircleIcon fontSize="small" style={{ marginRight: '8px' }} />,
    'Assign Projects': <AssignmentIcon fontSize="small" style={{ marginRight: '8px' }} />,
    'Create Task': <CreateIcon fontSize="small" style={{ marginRight: '8px' }} />,
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
      <div className="flex-xl-nowrap">
        <Row className="mySidebar">
          <Button onClick={toggleDrawer('left', true)}>Open Dashboard</Button>
          <Drawer
            anchor="left"
            open={drawerState.left}
            onClose={toggleDrawer('left', false)}
          >
            {list}
          </Drawer>
        </Row>
        <Row md={10} className="main-content p-4">
          {renderContent()}
        </Row>
      </div>
    </Container>
  );
};

export default ManagerDashboard;
