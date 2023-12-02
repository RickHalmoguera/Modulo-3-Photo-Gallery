import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Box } from "@mui/material"
import { Typography } from '@mui/material'
import { FavoritesGallery } from '../components/FavoritesGallery/FavoritesGallery'
import { SearchFavoritesBar } from '../components/SearchFavoritesbar/SearchFavoritesbar'
import { useSelector } from 'react-redux'
import { getFavoritesData } from '../features/favorites/favoritesSlice'
import { useEffect, useState } from 'react'
import { SortFavoritesRadios } from '../components/SortFavoritesRadios/SortFavoritesRadios'



export const FavoritesPage = ()=>{
    const THEME = createTheme({
        palette: {
          primary: { main:'#fff'},
          secondary: {main:'#5A698F'},
        },
    })

  
    const favoritesListData = useSelector(getFavoritesData)
    const [sortedFavorites,setSortedFavorites]= useState([])
    const [searchWord, setSearchWord]= useState([])
    const [sortValue, setSortValue]= useState("width")

    

    const getSearchWord = (word)=>{
       setSearchWord(word)
    }

    const getSortValue =(value)=>{
        setSortValue(value)
    }

    useEffect(() => {
        let newSortedFavorites = []
    
        if (searchWord === "") {
            newSortedFavorites = [...favoritesListData]
        } else {
            newSortedFavorites = favoritesListData.filter((photo) => photo.description && photo.description.includes(searchWord))
        }
    
        if (sortValue === "width") {
            newSortedFavorites.sort((a, b) => a.width - b.width)
        } else if (sortValue === "height") {
            newSortedFavorites.sort((a, b) => a.height - b.height)
        } else if (sortValue === "likes") {
            newSortedFavorites.sort((a, b) => a.likes - b.likes)
        } else if (sortValue === "date") {
            newSortedFavorites.sort((a, b) => new Date(a.date).getFullYear() - new Date(b.date).getFullYear())
        }
    
        setSortedFavorites(newSortedFavorites)
    }, [favoritesListData, searchWord, sortValue])
    
    
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
                        Your Favorites Photos
                </Typography>
                <SearchFavoritesBar getSearchWord={getSearchWord}/>
               <SortFavoritesRadios getSortValue={getSortValue}/>
                <FavoritesGallery favoritesList={sortedFavorites}/>
            </Box>
        </ThemeProvider>
    )
}