import React, { useEffect, useState } from "react";
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
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { getId } from "../../Service/Util";

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

const CustomSnackbar = ({ open, message, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity="info">
        {message}
      </Alert>
    </Snackbar>
  );
};

const ManagerDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('Manager Profile');
  const [drawerState, setDrawerState] = useState({
    left: false,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [webSocketConnected, setWebSocketConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const setupWebSocket = () => {
    const socket = new SockJS('http://localhost:8090/ws'); // Adjust URL
    const stomp = Stomp.over(socket);

    stomp.reconnect_delay = 5000; // Reconnect after 5 seconds

    stomp.connect({}, (frame) => {
      console.log('Connected to WebSocket');
      setWebSocketConnected(true);
      setStompClient(stomp);

const subscription = stomp.subscribe('/topic/projectAssignmentUpdate', (message) => {
  try {
    const receivedProject = JSON.parse(message.body);
    console.log('Received project update:', receivedProject);
    console.log('Manager ID:', receivedProject.manager.managerId);
    console.log('Current Manager ID:', getId());

    if (receivedProject.manager.managerId == getId()) {
      console.log('Condition is true');
      setSnackbarMessage(`New Project ${receivedProject.projectTitle} has been assigned to you!`);
      setSnackbarOpen(true);
    } else {
      console.log('Condition is false');
    }

  } catch (parseError) {
    console.error('Error parsing message body:', parseError);
  }
});
    });

    stomp.ws.onclose = () => {
      console.log('WebSocket connection closed. Reconnecting...');
      // Optionally handle additional reconnection logic here
      setupWebSocket();
    };
  };

  useEffect(() => {
    setupWebSocket();

    return () => {
      // Cleanup WebSocket connection on component unmount
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleNavigation = (option) => {
    setSelectedOption(option);
    setDrawerState({ ...drawerState, left: false });
  };

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
              {iconMap[text]}
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
          <Button onClick={toggleDrawer('left', true)} style={{ color: 'Black', font:'Bold' }}><MenuOpenIcon style={{ marginRight: '8px' }}></MenuOpenIcon>Open Dashboard</Button>
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
      <CustomSnackbar open={snackbarOpen} message={snackbarMessage} onClose={handleCloseSnackbar} />
    </Container>
  );
};

export default ManagerDashboard;
