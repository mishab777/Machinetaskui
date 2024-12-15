import React from 'react'
import {Routes,Route,BrowserRouter} from "react-router-dom"
import Dashboard from './page/Dashboard'
import Task from './page/Task'
import Login from './page/Login'
import Register from './page/Register'
import AddTask from './page/Addtask'
import Updatetask from './page/Updatetask'
import Rank from './page/Rank'
// import Product from './Page/Product'
// import AddProduct from './Page/AddProduct'
// import Settings from './Page/Settings'


export default function App() {
  return (
 <>
  <BrowserRouter>
    <Routes>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/task' element={<Task />}></Route>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/addtask' element={<AddTask />}></Route>
        <Route path='/ranktasks' element={<Rank/>}></Route>
        <Route path='/updatetask/:taskId' element={<Updatetask />}></Route>
    </Routes>
  </BrowserRouter>
 </>
  )
}