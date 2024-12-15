import { Box, TextField, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);  // Track error message
  const navigate = useNavigate();

  console.log('inputs', inputs)

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs, {
        withCredentials: true,
      });
      navigate("/");  
    } catch (error) {
      setErr(error.response?.data || "An error occurred");
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        backgroundImage: 'url("https://woorise.com/wp-content/uploads/2021/03/Online-event-registration.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        component="form"
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: 3,
          gap: '15px',
          width: 300,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        autoComplete="off"
        onSubmit={handleClick}  
      >
        <Typography fontSize={20} fontWeight={600} color="white">
          Register
        </Typography>

        <TextField
          onChange={handleChange}
          name="email"  
          label="Email"
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
          name="password"  
          label="Password"
          variant="standard"
          value={inputs.password}
          type="password"
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

        {err && <Typography sx={{ color: 'red' }}>{err}</Typography>}  

        <Button
          type="submit"  
          variant="contained"
          sx={{
            width: '100%',
            color: 'white',
          }}
        >
          Sign Up
        </Button>
        <Typography sx={{
                  color: 'white'
                }}>Already have an account? <Link style={{
                  textDecoration: 'underline'
                }} to='/'>Log in</Link></Typography>
      </Box>
    </Box>
  );
};

export default Register;
