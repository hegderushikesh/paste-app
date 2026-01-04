import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Paste from './components/paste'
import Viewpaste from './components/Viewpaste'

function App() {
 const router=createBrowserRouter([
  {
    path:'/',
    element:
    <div>
      <NavBar/>
      <Home/>
    </div>
  },
   {
    path:'/paste',
    element:
    <div>
      <NavBar/>
      <Paste/>
    </div>
  },
   {
    path:'/paste/:id',
    element:
    <div>
      <NavBar/>
      <Viewpaste/>
    </div>
  },
   
 ])

  return (
    <>
    <RouterProvider router={router}/>
    
    </>
  )
}

export default App
