import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Box } from "@mui/material"
import { Typography } from '@mui/material'
import { FavoritesGallery } from '../components/FavoritesGallery/FavoritesGallery'
import { SearchFavoritesBar } from '../components/SearchFavoritesbar/SearchFavoritesbar'
import { SortFavoritesRadios } from '../components/SortFavoritesRadios/SortFavoritesRadios'


export const Favorites = ()=>{
    const THEME = createTheme({
        palette: {
          primary: { main:'#fff'},
          secondary: {main:'#5A698F'},
        },
    })
  
    return(
        <ThemeProvider theme ={THEME}>
            <Box  sx={{
                width:'100%',
                height:'100%',
                pt:10,
                px:2,
                backgroundColor:'#10141E',
                alignItems:'center',
                display:'flex',
                flexDirection: 'column',
                gap:5
                }}>
                <Typography 
                    variant='h6' 
                    component='h1' 
                    color='primary'>
                        Your Favorites Photos
                </Typography>
                <SearchFavoritesBar/>
                <SortFavoritesRadios/>
                <FavoritesGallery/>
            </Box>
        </ThemeProvider>
    )
}