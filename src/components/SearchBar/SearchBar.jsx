import { useState } from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import { useDispatch,useSelector } from 'react-redux'

import { getPhotobySearchWordThunk, getRandomPhotosThunk } from '../../app/features/search/getPhotosApiThunk'

export const SearchBar = ()=>{
    const dispatch = useDispatch()
    const [searchWord, setSearchWord] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault()
       if(searchWord===""){
        console.log('todo')
        dispatch(getRandomPhotosThunk())
       }else{
        dispatch(getPhotobySearchWordThunk(searchWord)).then((photos)=>{
        })
       }
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
            label="Search Photo..." 
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