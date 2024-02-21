import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Link,
  Snackbar,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { loginUser } from "../Service/LoginService";

const Login = () => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; // Regex for password validation

  useEffect(() => {
    // Update isEmailValid whenever username (email) changes
    setIsEmailValid(emailRegex.test(username));
  }, [username]);

  useEffect(() => {
    // Update isPasswordValid whenever password changes
    setIsPasswordValid(passwordRegex.test(password));
  }, [password]);

  const isValidEmail = isEmailValid;
  const isValidPassword = isPasswordValid;

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleLogin = async () => {
    setSubmitAttempted(true);

    if (!isValidEmail || !isValidPassword) {
      setSnackbarOpen(true);
      return;
    }

    try {
      const userData = {
        username,
        password,
      };

      const response = await loginUser(userData);

      console.log("Login Successful:", response.role);
      switch (response.role) {
        case "Admin":
          navigate("/admin-dashboard");
          break;
        case "Manager":
          navigate("/manager-dashboard");
          break;
        case "Employee":
          navigate("/employee-dashboard");
          break;
        default:
          console.log("This is an error from login, unexpected !!!!");
          navigate("/");
          break;
      }
    } catch (error) {
      console.error("Error:", error.message);
      navigate("/login");
    }
  };

  return (
    <div className="comp">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          height: "100vh",
        }}
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
              Login
            </Typography>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setEmail(e.target.value)}
              error={!isEmailValid && submitAttempted}
              helperText={
                !isEmailValid && submitAttempted
                  ? "Invalid email format"
                  : ""
              }
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
              error={!isPasswordValid && submitAttempted}
              helperText={
                !isPasswordValid && submitAttempted
                  ? "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one digit."
                  : ""
              }
              InputProps={{
                style: {
                  backgroundColor: "#ffffff",
                  borderRadius: "5px",
                },
              }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              style={{
                marginTop: "20px",
                borderRadius: "5px",
              }}
            >
              Login
            </Button>

            <Typography
              variant="body2"
              className="register-link mt-3 text-center"
            >
              <p className="mb-0">
                Don't have an account?{" "}
                <Link component={RouterLink} to="/signup" underline="hover">
                  Register
                </Link>
              </p>
            </Typography>

            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
              message="Invalid form data. Please check the fields."
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
