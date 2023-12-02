import { Route, BrowserRouter, Routes } from "react-router-dom"
import { Root } from './pages/Root'
import { FavoritesPage } from "./pages/FavoritesPage"
import { SearchPage } from './pages/SearchPage'


export const App=()=> {
  return (

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root/>}>
            <Route path="/" element={<SearchPage/>}/>
            <Route path="favorites" element={<FavoritesPage/>}/>  
        </Route>
      </Routes>
      </BrowserRouter>
    
  )
}

