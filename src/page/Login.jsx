import { Box, TextField, Typography, Button } from "@mui/material";
import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../component/Authcontext";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState(null);
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(inputs);
      navigate("/dashboard");
    } catch (err) {
      setErr(err.response.data);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        backgroundImage:
          'url("https://coloredbrain.com/wp-content/uploads/2016/07/login-background.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: 3,
          gap: "15px",
          width: 300,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        autoComplete="off"
      >
        <Typography fontSize={20} fontWeight={600} color="white">
          Login
        </Typography>
        <TextField
          onChange={handleChange}
          id="standard-basic"
          label="Email"
          name="email"
          variant="standard"
          value={inputs.email}
          sx={{
            width: "100%",
            "& .MuiInputBase-root": {
              color: "white",
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiInput-underline:before": {
              borderBottom: "2px solid white",
            },
            "& .MuiInput-underline:hover:before": {
              borderBottom: "2px solid white",
            },
            "& .MuiInput-underline:after": {
              borderBottom: "2px solid white",
            },
          }}
        />
        <TextField
          onChange={handleChange}
          id="standard-basic"
          label="Password"
          variant="standard"
          name="password"
          value={inputs.password}
          sx={{
            width: "100%",
            "& .MuiInputBase-root": {
              color: "white",
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiInput-underline:before": {
              borderBottom: "2px solid white",
            },
            "& .MuiInput-underline:hover:before": {
              borderBottom: "2px solid white",
            },
            "& .MuiInput-underline:after": {
              borderBottom: "2px solid white",
            },
          }}
        />
        {err && <Typography sx={{
          color:'red'
        }}>{err}</Typography>}
        <Button
          onClick={handleLogin}
          variant="contained"
          sx={{
            width: "100%",
            color: "white",
          }}
        >
          Log In
        </Button>
        <Typography sx={{
          color: 'white'
        }}>Don't have an account? <Link style={{
          textDecoration: 'underline'
        }} to='/register'>Register</Link></Typography>
      </Box>
    </Box>
  );
};

export default Login;
