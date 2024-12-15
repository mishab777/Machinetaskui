import React from 'react'
import { Box,Typography,TextField,Button} from '@mui/material'
import SideBar from '../component/SideBar'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';



const Updatetask = () => {

    const { taskId } = useParams(); 
  const [inputs, setInputs] = useState({
    title: '',
    desc: '',
    rank: 0,
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClick = async () => {
    const { title, desc, rank } = inputs;
    if (!title || !desc || rank === '') {
      alert("All fields must be filled!");
      return;
    }
  
    try {
      const response = await axios.patch(`http://localhost:8800/api/userTask/updateTask/${taskId}`, {
        title,  
        desc,
        rank,
      });
  
      if (response.status === 200) {
        alert('Task updated successfully');
        setInputs({
            title: "",
            desc: "",
            rank: 0,
          });
      } else {
        alert('Error: ' + (response.data.error || response.data.details));
      }
    } catch (error) {
      alert('Failed to update task: ' + error.message);
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
        Update Your Task
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
      <TextField id="filled-basic" name='desc' onChange={handleChange} value={inputs.desc} label="Description" variant="filled" />
      <TextField id="filled-basic" name='rank' onChange={handleChange} value={inputs.rank} label="Rank" variant="filled" />
      <Button onClick={handleClick} variant="contained" sx={{
        width: '100%'
      }}>Update</Button>
    </Box>
      
    </Box>
    </Box>
  )
}

export default Updatetask