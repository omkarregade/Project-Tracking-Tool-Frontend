import React, { useState } from "react";
import { BASE_URL } from "../Service/APIConstant";
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
  Snackbar,
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const phoneNumberRegex = /^[6-9]\d{9}$/;

  const isValidEmail = (email) => emailRegex.test(email);
  const isValidPassword = (password) => passwordRegex.test(password);
  const isValidPhoneNumber = (phoneNumber) => phoneNumberRegex.test(phoneNumber);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSignup = async () => {
    let errors = [];

    if (!fullName) {
      errors.push("Full Name is required.");
    }

    if (!isValidEmail(email)) {
      errors.push("Invalid Email.");
    }

    if (!isValidPassword(password)) {
      errors.push("Invalid Password. It should have at least 8 characters, one lowercase letter, one uppercase letter, and one number.");
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      errors.push("Invalid Phone Number. It should be a 10-digit number starting with 6-9.");
    }

    if (!city) {
      errors.push("City is required.");
    }

    if (errors.length > 0) {
      setSnackbarMessage(errors.join("\n"));
      setSnackbarOpen(true);
      return;
    }

    try {
      let signupEndpoint = `${BASE_URL}/auth/register`;

      const userData = {
        fullName,
        email,
        password,
        phoneNumber,
        city,
        role,
      };

      console.log(userData);
      const response = await axios.post(signupEndpoint, userData);

      console.log("User registered successfully:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error.message);
      navigate("/register");
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

            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
              message={snackbarMessage}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUp;
