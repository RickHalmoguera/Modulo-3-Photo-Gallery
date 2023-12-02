import { useState } from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'


export const SearchFavoritesBar = ({ getSearchWord })=>{
    
    const [searchFavorite, setSearchFavorite] = useState('');

    return(
        <Stack 
        component='form' 
        direction='row' 
        >
            <TextField 
            id="searchPhoto" 
            name="searchFavorite"
            label="Search in Favorites..." 
            variant="standard" 
            focused
            onChange={(e) => getSearchWord(e.target.value)}
            InputProps={{
                sx: {
                    color: '#fff',
                    borderBottomColor: '#fff'}}}
            />

        </Stack>

    )
}