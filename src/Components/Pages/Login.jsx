import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Link,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import { BASE_URL } from "../Service/APIConstant";
import { loginUser } from "../Service/LoginService";

const Login = () => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
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
          console.log("this is error from login , unexpected !!!!");
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

            {/* <FormControl component="fieldset" fullWidth margin="normal">
              <RadioGroup
                row
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
            </FormControl> */}

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
