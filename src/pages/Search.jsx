import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Typography } from '@mui/material'
import { Box } from "@mui/material"
import { SearchBar } from '../components/SearchBar/SearchBar'
import { SearchGallery } from '../components/SearchGallery/SearchGallery'
import { getRandomPhotosThunk } from '../app/features/search/getPhotosApiThunk'
import { getPhotoData, getPhotoError,updatePhotoList } from "../app/features/search/searchSlice" 

export const Search = () =>{

    const THEME = createTheme({
        palette: {
          primary: { main:'#fff'},
          secondary: {main:'#5A698F'},
        },
    })

    const dispatch = useDispatch()
    const error = useSelector(getPhotoError)

    useEffect(() => {  
        const localStorageData = localStorage.getItem('SearchPhotos')
        !localStorageData && dispatch(getRandomPhotosThunk())
    }, [dispatch])

    return(
        <ThemeProvider theme ={THEME}>
            <Box  sx={{
                width:'100%',
                minHeight:'100%',
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
                        Welcome to Photo Gallery!
                </Typography>
                <SearchBar/>
                {error && 
                <Typography 
                variant='h6' 
                component='h1' 
                color='primary'>
                    Error: {error}
                </Typography>} 
                <SearchGallery/>
            </Box>
        </ThemeProvider>
    )
}