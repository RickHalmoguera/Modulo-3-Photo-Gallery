import FormControl from '@mui/material/FormControl'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'


export const SortFavoritesRadios = ({getSortValue})=>{
    
    return(
        <FormControl focused>
        
                    <FormLabel id="demo-row-radio-buttons-group-label">Sort by:</FormLabel>
                    <RadioGroup
                        
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={(e)=>getSortValue(e.target.value)}
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