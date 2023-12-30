import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Link,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link as RouterLink } from "react-router-dom";

const roles = ["Admin", "Manager", "Employee"];

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = () => {
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Role:", role);
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
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
                  backgroundColor: "#ffffff",
                  borderRadius: "5px",
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
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
