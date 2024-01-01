import React, { useState } from "react";
import {BASE_URL} from '../Service/APIConstant';

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
  const [role, setRole] = useState("");
  const navigate = useNavigate ();

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Phone number validation regex for Indian phone numbers
    const phoneNumberRegex = /^[6-9]\d{9}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  



  const handleSignup = async () => {

    console.log(role);

  if (fullName && isValidEmail(email) && password  &&  isValidPhoneNumber(phoneNumber) && city ) {

    try {
      let signupEndpoint = "";

      switch (role) {
        case "Admin":
          signupEndpoint = `${BASE_URL}/admins/register`;
          break;
        case "Manager":
          signupEndpoint = `${BASE_URL}/managers/register`;
          break;
        case "Employee":
          signupEndpoint = `${BASE_URL}/employee`;
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
      console.log(signupEndpoint);
      console.log(userData);
      const response = await axios.post(signupEndpoint, userData);

      console.log("User registered successfully:", response.data);
      navigate('/login');

    } catch (error) {
      console.error("Error registering user:", error.message);
      navigate('/register');
    }

     } else {
      console.log("Form data is invalid. Please check the fields.");
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
