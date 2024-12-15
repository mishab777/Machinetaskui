import React from 'react'
import { Box,Typography,TextField,Button} from '@mui/material'
import SideBar from '../component/SideBar'
import { styled } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState,useContext } from 'react';
import { AuthContext } from '../component/Authcontext';
import axios from 'axios';



const AddTask = () => {

  const { currentUser } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    title: "",
    desc: "",
    rank: 0,
    userId: currentUser.id,
  });

  const [errors, setErrors] = useState({});
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    
    const newErrors = {};
    if (!inputs.title.trim()) newErrors.title = "Please a add task title";
    if (!inputs.desc.trim()) newErrors.desc = "Please include task description";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }

    setErrors({}); 

    try {
      await axios.post("http://localhost:8800/api/userTask/addTask", inputs, {
        withCredentials: true,
      });
      alert("Task added successfully");
      setInputs({
        title: "",
        desc: "",
        rank: 0,
        userId: currentUser.id,
      });
    } catch (error) {
      setErr(error.response?.data || "An error occurred");
    }
  };

  return (
    <Box display={"flex"}>
      <SideBar/>
    <Box sx={{ padding: 2 ,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <Typography sx={{
        fontSize: '25px',
        fontWeight: 600,
        marginBottom: 1
      }}>
        Add Task
      </Typography>
      <Box
      component="form"
      sx={{ 
        width: 300,
        display:'grid',
        gap: '20px',
        gridTemplateColumns:{
            xs:'1 fr',
            md:'auto'
        }
       }}
      autoComplete="off"

    >
      <TextField id="filled-basic" name='title' onChange={handleChange} value={inputs.title} label="Title" variant="filled" />
      {errors.title && <Typography sx={{ color: "red",fontSize:'14px' }}>{errors.title}</Typography>}
      <TextField id="filled-basic" name='desc' onChange={handleChange} value={inputs.desc} label="Description" variant="filled" />
      {errors.desc && <Typography sx={{ color: "red",fontSize:'14px' }}>{errors.desc}</Typography>}
      <TextField id="filled-basic" name='rank' onChange={handleChange} value={inputs.rank} label="Rank" variant="filled" />
      <Button onClick={handleClick} variant="contained" sx={{
        width: '100%'
      }}>Add Task</Button>
      {err && <Typography sx={{ color: 'green' }}>{err}</Typography>}
    </Box>
      
    </Box>
    </Box>
  )
}

export default AddTask