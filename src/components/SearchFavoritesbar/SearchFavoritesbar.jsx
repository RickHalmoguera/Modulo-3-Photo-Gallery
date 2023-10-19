import { useState } from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import { useDispatch} from 'react-redux'
import { searchInsideFavorites } from '../../app/features/favorites/favoritesSlice'


export const SearchFavoritesBar = ()=>{
    const dispatch = useDispatch()
    const [searchWord, setSearchWord] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault()
            dispatch(searchInsideFavorites(searchWord))
    }

    return(
        <Stack 
        component='form' 
        direction='row' 
        onSubmit={handleSubmit}>
            
            <TextField 
            value={searchWord}
            onChange={(e)=>setSearchWord(e.currentTarget.value)} 
            id="searchPhoto" 
            label="Search in Favorites..." 
            variant="standard" 
            focused
            InputProps={{
                sx: {
                    color: '#fff',
                    borderBottomColor: '#fff'}}}
            />

            <Button 
            variant="text" 
            type='submit'>
                <SearchIcon/>
            </Button>
        </Stack>

    )
}