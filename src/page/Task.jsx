import React from 'react'
import { Box,Typography,Button} from '@mui/material'
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
import { useEffect,useState,useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../component/Authcontext';
import { Link } from 'react-router-dom';



const Task = () => {

  const { currentUser} = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(currentUser);
  

  useEffect(() => {
    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:8800/api/userTask/allTaks"); 
            const userTasks = response.data.filter((task) => task.userId === currentUser.id); 
            setTasks(userTasks);
        } catch (err) {
            setError(err.response ? err.response.data : "Failed to fetch tasks");
        } finally {
            setLoading(false);
        }
    };

    if (currentUser?.id) {
        fetchTasks();
    } else {
        setError("User not logged in or invalid context");
        setLoading(false);
    }
}, [currentUser]);

const handleDelete = async (taskId) => {
  try {
    await axios.delete(`http://localhost:8800/api/userTask/removeTask/${taskId}`)
    setTasks(tasks.filter(task => task.id !== taskId)) 
    console.log(taskId);
    
  } catch (err) {
    console.error("Failed to delete task", err)
    setError("Failed to delete task")
  }
}

if (loading) return <p>Loading tasks...</p>;
if (error) return <p>Error: {error}</p>;




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
        My Tasks
      </Typography>
      {tasks.length === 0 ? (
                <p>No tasks available for you</p>
                
            ) : (
      <TableContainer>
      <Table sx={{  }} aria-label="customized table">
        <TableHead>
          <TableRow sx={{
            backgroundColor: '#08B4B1',
          }}>
            <TableCell sx={{
                border: "1px solid #dedede",
                color: 'white'
              }}>Task Title</TableCell>
            <TableCell sx={{
                border: "1px solid #dedede",
                color: 'white'
              }}>Description</TableCell>
            <TableCell sx={{
                border: "1px solid #dedede",
                color: 'white'
              }}>Rank</TableCell>
            <TableCell sx={{
                border: "1px solid #dedede",
                color: 'white'
              }}>Edit</TableCell>
            <TableCell sx={{
                border: "1px solid #dedede",
                color: 'white'
              }}>Delete</TableCell>
          </TableRow>
        </TableHead>
        {tasks.map((task) => (
        <TableBody key={task.id}>
            <TableRow >
              <TableCell sx={{
                border: "1px solid #dedede",
              }}>{task.title}</TableCell>
              <TableCell sx={{
                border: "1px solid #dedede",
              }}>{task.desc}</TableCell>
              <TableCell sx={{
                border: "1px solid #dedede",
              }}>{task.rank}</TableCell>
              <TableCell sx={{
                border: "1px solid #dedede",
              }}><Link to={`/updatetask/${task.id}`}><EditIcon color='primary' sx={{
                cursor: 'pointer'
              }}/></Link></TableCell>
              <TableCell sx={{
                border: "1px solid #dedede",
              }}><DeleteIcon
              onClick={() => handleDelete(task.id)}
               sx={{
                color: 'red',
                cursor: 'pointer'
              }}/></TableCell>
            </TableRow>
        </TableBody>
        ))}
      </Table>
    </TableContainer>
       )}
       
       <Link to="/addtask" style={{
        marginTop: '10px'
       }}><Button variant="outlined">Add Task</Button></Link>
       
    </Box>
    </Box>
  )
}

export default Task