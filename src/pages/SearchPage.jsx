import { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Typography } from '@mui/material'
import { Box } from "@mui/material"
import { SearchBar } from '../components/SearchBar/SearchBar'
import { SearchGallery } from '../components/SearchGallery/SearchGallery'
import { getRandomPhotosThunk } from '../features/search/getPhotosApiThunk'
import { getPhotoData, getPhotoError,getPhotoStatus} from "../features/search/searchSlice" 
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { getFavoritesData } from '../features/favorites/favoritesSlice'
import { MagnifyingGlass } from 'react-loader-spinner'


export const SearchPage = () =>{

    const THEME = createTheme({
        palette: {
          primary: { main:'#fff'},
          secondary: {main:'#5A698F'},
        },
    })

    const dispatch = useDispatch()
    const photoListData = useSelector(getPhotoData)
    const favoritesListData = useSelector(getFavoritesData)
    const photoListError = useSelector(getPhotoError)
    const photoListStatus = useSelector(getPhotoStatus)
    const [spinner,setSpinner] = useState(true)
    const [photosList,setPhotosList] = useState([])
    const [error, setError] = useState("")


    const errorToasty = () => {
        toast.error(`Opps something happen! ${error}`, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })
    }



    useEffect(() => {  
        const updateFavoritesStatus = () => {
            const updatedPhotosList = photoListData.map(photo => {
                const isFavorite = favoritesListData.some(favorite => favorite.id === photo.id);
                return { ...photo, isFavorite }
            });
            setPhotosList(updatedPhotosList)
        }

        if(photoListStatus === "idle"){
            dispatch(getRandomPhotosThunk())
        }else if(photoListStatus === "pending"){
            setSpinner(true)
        }else if(photoListStatus==="fulfilled"){
            updateFavoritesStatus();
            setSpinner(false)
        }
        else if(photoListStatus =="rejected"){
            setError(photoListError)
            errorToasty()
        }
    }, [ dispatch,photoListData, photoListStatus])

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
                {photoListError && 
                <Typography 
                variant='h6' 
                component='h1' 
                color='primary'>
                    <ToastContainer/>
                </Typography>} 


              { spinner ? 
                <MagnifyingGlass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="MagnifyingGlass-loading"
                    wrapperStyle={{}}
                    wrapperClass="MagnifyingGlass-wrapper"
                    glassColor = '#c0efff'
                    color = '#e15b64'
                />
              : 
              <SearchGallery photosList={photosList}/> }
            </Box>  
            <ToastContainer/> 
        </ThemeProvider>
    )
}

