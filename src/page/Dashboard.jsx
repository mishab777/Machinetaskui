import React from 'react'
import SideBar from '../component/SideBar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';




export default function Dashboard() {
  return (
    <Box sx={{display:'flex'}}>
      <SideBar />
      <Box component="main" sx={{ padding: '20px',display: 'grid',gridTemplateColumns:{
        xs: '1 fr',
        md: 'auto auto'
      },gap: '20px' }}>
    <Box sx={{
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      padding: '15px'
    }}>    
    <Typography sx={{
      fontSize: '20px',
      fontWeight: 600,
      textAlign: 'center',
    }}>
      Tasks Last Week
    </Typography>
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['1','2','3','4','5','6','7'] }]}
      series={[{ data: [4,7,5,10,14,10,6],color: '#08B4B1' }]}
      width={400}
      height={250}
      borderRadius={5}
    />

      </Box>
      <Box sx={{
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      padding: '15px'
    }}>    
    <Typography sx={{
      fontSize: '20px',
      fontWeight: 600,
      textAlign: 'center',
    }}>
      Monthly Statistics
    </Typography>
    <LineChart
      xAxis={[{ data: [5, 10, 15, 20, 25, 30] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
        },
      ]}
      width={400}
      height={250}
    />

      </Box>
      </Box>
    </Box>
  )
}