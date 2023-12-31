import React, { useState } from "react";

import axios from "axios";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

const roles = ["Admin", "Manager", "Employee"];

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("Admin");
  const navigate = useNavigate ();

  const handleSignup = async () => {
    try {
      let signupEndpoint = "";

      switch (role) {
        case "Admin":
          signupEndpoint = "YOUR_ADMIN_SIGNUP_API_ENDPOINT";
          break;
        case "Manager":
          signupEndpoint = "YOUR_MANAGER_SIGNUP_API_ENDPOINT";
          break;
        case "Employee":
          signupEndpoint = "YOUR_EMPLOYEE_SIGNUP_API_ENDPOINT";
          break;
        default:
          break;
      }

      const userData = {
        fullName,
        email,
        password,
        phoneNumber,
        city,
      };

      // Make an API call to the respective endpoint based on the selected role
      const response = await axios.post(signupEndpoint, userData);

      console.log("User registered successfully:", response.data);
      navigate('/Login');

    } catch (error) {
      console.error("Error registering user:", error.message);
      navigate('/Signup');
    }
  };

  return (
    <div className="comp">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "125vh" }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <div
            style={{
              backgroundColor: "rgb(255, 255, 131)",
              padding: "20px",
              margin: "20px",
              borderRadius: "10px",
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              SignUp
            </Typography>

            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <TextField
              label="Phone Number"
              type="tel"
              variant="outlined"
              fullWidth
              margin="normal"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <TextField
              label="City"
              variant="outlined"
              fullWidth
              margin="normal"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <FormControl component="fieldset" margin="normal">
              <RadioGroup
                aria-label="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {roles.map((role) => (
                  <FormControlLabel
                    key={role}
                    value={role}
                    control={<Radio />}
                    label={role}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSignup}
            >
              Register
            </Button>
            <NavLink to="/login" style={{ textDecoration: "none" }}>
              <Button fullWidth>Login</Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUp;
