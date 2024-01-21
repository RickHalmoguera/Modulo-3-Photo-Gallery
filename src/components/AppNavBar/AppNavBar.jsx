import { useState } from "react"
import { NavLink } from "react-router-dom"

import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ImageSearchIcon from '@mui/icons-material/ImageSearch'


export const AppNavBar=()=> {
    const [value, setValue] = useState('search')
    const handleChange = (event, newValue) => {
      setValue(newValue)
    }

    return (
      <Box  
      sx={{ 
      padding:'1em',
      backgroundColor: '#161D2F',
      width:{md: 160},
      minHeight:{md:'100vh'},
      display: "flex",
      flexDirection:{md:'column'}, 
      
      alignItems:'center',
      gap:'3em',
      }}>
          
        <Typography variant='h3' component='h1' color='#FC4747' fontWeight='700'>
          PG
        </Typography>
        
        <BottomNavigation 
        showLabels
        sx={{
          backgroundColor: 'transparent',
          width:130,
          display: "flex",
          flexDirection: { md: 'column' },
          gap:'2em',
          flex: { xs: 1, sm: 1, md: 0, lg: 0, xl: 0 },
          
        }}
        value={value} 
        onChange={handleChange}>
          
          <BottomNavigationAction
          sx={{color:'#5A698F'}}
            component={NavLink}
            to="/"
            label="Search"
            value="search"
            icon={<ImageSearchIcon  />}
          />
          <BottomNavigationAction
            sx={{color:'#5A698F'}}
            component={NavLink}
            to="/favorites"
            label="Favorites"
            value="favorites"
            icon={<FavoriteIcon />}
          /> 
        </BottomNavigation>

    
        
      </Box>
        
    )
}




