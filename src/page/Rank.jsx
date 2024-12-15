import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import SideBar from '../component/SideBar';
import { AuthContext } from '../component/Authcontext';
import axios from 'axios';

const Rank = () => {
  const { currentUser } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/userTask/allTaks');
        const userTasks = response.data.filter((task) => task.userId === currentUser.id);
        setTasks(userTasks);
      } catch (err) {
        setError(err.response ? err.response.data : 'Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.id) {
      fetchTasks();
    } else {
      setError('User not logged in or invalid context');
      setLoading(false);
    }
  }, [currentUser]);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  const rankedTasks = tasks.filter(task => task.rank === 0);
  const nonRankedTasks = tasks.filter(task => task.rank > 0);

  return (
    <Box display="flex">
      <SideBar />
      <Box sx={{ padding: 2, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column' }}>

        {rankedTasks.length === 0 ? (
          <p>No un-ranked tasks available.</p>
        ) : (
          <TableContainer>
            <Typography variant="h6">Un-Ranked Tasks</Typography>
            <Table aria-label="ranked tasks">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#08B4B1' }}>
                  <TableCell sx={{ border: '1px solid #dedede', color: 'white' }}>Task Title</TableCell>
                  <TableCell sx={{ border: '1px solid #dedede', color: 'white' }}>Description</TableCell>
                  <TableCell sx={{ border: '1px solid #dedede', color: 'white' }}>Rank</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rankedTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell sx={{ border: '1px solid #dedede' }}>{task.title}</TableCell>
                    <TableCell sx={{ border: '1px solid #dedede' }}>{task.desc}</TableCell>
                    <TableCell sx={{ border: '1px solid #dedede' }}>{task.rank}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {nonRankedTasks.length === 0 ? (
          <p>No tasks ranked available.</p>
        ) : (
          <TableContainer sx={{ marginTop: 4 }}>
            <Typography variant="h6">Ranked Tasks</Typography>
            <Table aria-label="non-ranked tasks">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#08B4B1' }}>
                  <TableCell sx={{ border: '1px solid #dedede', color: 'white' }}>Task Title</TableCell>
                  <TableCell sx={{ border: '1px solid #dedede', color: 'white' }}>Description</TableCell>
                  <TableCell sx={{ border: '1px solid #dedede', color: 'white' }}>Rank</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nonRankedTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell sx={{ border: '1px solid #dedede' }}>{task.title}</TableCell>
                    <TableCell sx={{ border: '1px solid #dedede' }}>{task.desc}</TableCell>
                    <TableCell sx={{ border: '1px solid #dedede' }}>{task.rank}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default Rank;
