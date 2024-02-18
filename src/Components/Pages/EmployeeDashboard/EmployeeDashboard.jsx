import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../CssFiles/EmployeeDashboard.css";
import EmployeeProfile from "./EmployeeProfile";
import { Kanban } from "../../KanbanBoard/Kanban";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";

const EmployeeDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Employee Profile"); // Set default value
  const [drawerState, setDrawerState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
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
      case "Employee Profile":
        return <EmployeeProfile />;
      case "Kanban Board":
        return <Kanban />;
      default:
        return <div>Please select an option from the drawer</div>;
    }
  };

  // Mapping icons to each option
  const iconMap = {
    "Employee Profile": <AccountCircleIcon fontSize="small" style={{ marginRight: "8px" }} />,
    "Kanban Board": <ViewColumnIcon fontSize="small" style={{ marginRight: "8px" }} />,
  };

  const list = (
    <Box sx={{ width: "auto" }} role="presentation">
      <List>
        {["Employee Profile", "Kanban Board"].map((text) => (
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
      <div className="flex-xl-nowrap">
        <Row className="mySidebar">
          <Button onClick={toggleDrawer("left", true)}>Open Dashboard</Button>
          <Drawer anchor="left" open={drawerState.left} onClose={toggleDrawer("left", false)}>
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

export default EmployeeDashboard;
