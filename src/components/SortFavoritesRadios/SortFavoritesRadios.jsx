import { useState, useEffect } from 'react'
import FormControl from '@mui/material/FormControl'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import { useDispatch} from 'react-redux'
import {sortFavoritesList} from '../../app/features/favorites/favoritesSlice'

export const SortFavoritesRadios = ()=>{
    const dispatch = useDispatch()
    const [sortValue,setSortValue] = useState("")
    
    
    const handleChange = (e) => {
        setSortValue(e.target.value);
    }

    useEffect(() => {
    dispatch(sortFavoritesList(sortValue))
    }, [sortValue])

    return(
        <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Sort by:</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleChange}
                    >
                        <FormControlLabel
                        color="default"
                        value="width"
                        control={<Radio/>}
                        label="Width"
                        sx={{ color: 'white',
                                fontSize:'1.5rem' }} 
                        />
                        <FormControlLabel
                        value="height"
                        control={<Radio />}
                        label="Height"
                        sx={{ color: 'white',
                                fontSize:'1.5rem' }}
                        />
                        <FormControlLabel
                        value="likes"
                        control={<Radio />}
                        label="Likes"
                        sx={{ color: 'white',
                                fontSize:16 }}
                        />
                        <FormControlLabel
                        value="date"
                        control={<Radio />}
                        label="Date"
                        sx={{
                            color: 'white',
                            '&.Mui-checked': {
                            color: 'white',
                            },
                        }}
                        />
                    </RadioGroup>
                </FormControl>
    )
}