import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Link as RouterLink,
  Typography,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";


const roles = ["Admin", "Manager", "Employee"];

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleSignup = () => {
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Designation:", designation);
    console.log("Gender:", gender);
    console.log("Contact Number:", contactNo);
    console.log("City:", city);
    console.log("Role:", role);
  };

  const handleLoginRedirect = () => {
    setRedirectToLogin(true);
  };

  return (
    <div className="comp">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <div
            style={{
              backgroundColor: "#96EFFF",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              SignUp
            </Typography>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                style: {
                  backgroundColor: "#ffffff", // Input background color
                  borderRadius: "5px", // Input border-radius
                },
              }}
            />

            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                style: {
                  backgroundColor: "#ffffff", // Input background color
                  borderRadius: "5px", // Input border-radius
                },
              }}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                style: {
                  backgroundColor: "#ffffff", // Input background color
                  borderRadius: "5px", // Input border-radius
                },
              }}
            />

            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel>Designation</InputLabel>
              <Select
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                label="Designation"
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "5px",
                }}
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel>Gender</InputLabel>
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                label="Gender"
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "5px",
                }}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Contact Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              InputProps={{
                style: {
                  backgroundColor: "#ffffff", // Input background color
                  borderRadius: "5px", // Input border-radius
                },
              }}
            />

            <TextField
              label="City"
              variant="outlined"
              fullWidth
              margin="normal"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              InputProps={{
                style: {
                  backgroundColor: "#ffffff", // Input background color
                  borderRadius: "5px", // Input border-radius
                },
              }}
            />

            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label="Role"
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "5px",
                }}
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Label"
              />{" "}
              Click me
            </FormGroup>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSignup}
            >
              Register
            </Button>

            <Link
              component={RouterLink}
              to="/login"
              underline="hover"
              fullWidth
              style={{ textDecoration: "none" }}
            >
              <Button fullWidth>Already have an account? Login</Button>
            </Link>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signup;
