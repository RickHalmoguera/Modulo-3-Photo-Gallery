import { useState, useEffect } from 'react'
import { removeFavorite, updateFavoritesArray } from '../../app/features/favorites/favoritesSlice'
import { getPhotoData, updatePhotoList } from "../../app/features/search/searchSlice"
import { useDispatch, useSelector } from 'react-redux'


import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import DownloadIcon from '@mui/icons-material/Download'
import FavoriteIcon from '@mui/icons-material/Favorite'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import { Link } from 'react-router-dom'
import { Box } from '@mui/material'
import TextField from '@mui/material/TextField'

export const FavoritesGallery = ()=>{
    const dispatch = useDispatch()
    const photos = useSelector(getPhotoData)
    const sortedFavoritesPhotos = useSelector(state => state.favorites.sortedData)
    const [favoritesPhotos, setFavoritesPhotos] = useState(sortedFavoritesPhotos)
    const [editingPhotoId, setEditingPhotoId] = useState(null) 
    const [newDescription, setNewDescription] = useState("")

    const handleRemoveFromFavorite = (photo) => {
        const idToRemove = photo.id
        dispatch(removeFavorite(idToRemove))
        
        const updatedPhotosToShow = photos.map((item) =>
        item.id === idToRemove ? { ...item, isFavorite: false } : item
        )
        
        dispatch(updatePhotoList(updatedPhotosToShow))
        setFavoritesPhotos((prevFavorites) => prevFavorites.filter((fav) => fav.id !== idToRemove))
    }

    const handleEdit = (photo) => {
      setEditingPhotoId(photo.id) 
    }

    const handleSave = (photo) => {
      const photoModify = photo.id
  
      const updatedFavorites = favoritesPhotos.map((item) =>
        item.id === photoModify ? { ...item, description: newDescription } : item
      )
  
      dispatch(updateFavoritesArray(updatedFavorites))
      setFavoritesPhotos(updatedFavorites)
      setEditingPhotoId(null) 
    }

    useEffect(() => {
        const localStorageFavoritesPhotos = localStorage.getItem('sortedFavoritesPhotos');
        if (localStorageFavoritesPhotos) {
            const parsedFavoritesPhotos = JSON.parse(localStorageFavoritesPhotos);
            setFavoritesPhotos(parsedFavoritesPhotos);
        }
    }, [sortedFavoritesPhotos]);
    return(
        favoritesPhotos && (
            <ImageList
              sx={{
                width: '100%',
                gridTemplateColumns: 'repeat(auto-fill,minmax(350px,1fr))!important',
              }}
            >
              
              {favoritesPhotos.map((photo) => (
                <ImageListItem key={photo.img}>
                  <img
                    srcSet={`${photo.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`${photo.img}?w=248&fit=crop&auto=format`}
                    alt={photo.description}
                    style={{ borderRadius: '20px' }}
                  />
                  <ImageListItemBar
                    
                    title={photo.description ? photo.description : 'No description'}
                    subtitle={ `W: ${photo.width} H:${photo.height} Likes: ${photo.likes} Date : ${new Date(photo.date).getFullYear()} `}
                    actionIcon={
                      <Box sx={{ display: 'flex' }}>
                        {editingPhotoId === photo.id ?
                          <IconButton 
                          sx={{ color: "#fff" }}
                          onClick={() => {handleSave(photo)}}
                          >
                            <SaveIcon/>
                          </IconButton>
                          :
                          <IconButton 
                          sx={{ color: "#fff" }}
                          onClick={() => {handleEdit(photo)}}
                          >
                            <EditIcon/>
                          </IconButton>
                        }
                        <IconButton 
                        sx={{ color: "#fff" }}
                        onClick={() => {handleRemoveFromFavorite(photo)}}
                        >
                          <FavoriteIcon />
                        </IconButton>
                        <IconButton 
                        component={Link}
                        to={photo.download}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: '#fff' }}
                        >
                          <DownloadIcon />
                        </IconButton>
                        
                      </Box>
                    }
                  />
                  {editingPhotoId === photo.id ? (
                    <ImageListItemBar position='top'
                    title={<TextField
                      placeholder=' Set new description'
                      position='top'
                      focused
                      variant='standard'
                      id='description'
                      onChange={(e) => setNewDescription(e.currentTarget.value)}
                      InputProps={{
                        sx: {
                            color: '#fff',
                            borderBottomColor: '#fff'}}}
                    />
                    }>
                    </ImageListItemBar>
                  ) : "" }

                </ImageListItem>
              ))}
            </ImageList>
          )
    )
}