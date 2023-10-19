import './App.css'
import CssBaseline from '@mui/material/CssBaseline'


import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { Root } from './pages/Root'
import { Favorites } from "./pages/Favorites"
import { Search } from './pages/Search'


export const App=()=> {

  const router = createBrowserRouter( createRoutesFromElements(
    <Route path="/" element={<Root/>}>
        <Route path="/" element={<Search/>}/>
        <Route path="favorites" element={<Favorites/>}/>  
    </Route>
))
  return (
    <RouterProvider router ={router}>
      
    </RouterProvider>
    
  )
}

