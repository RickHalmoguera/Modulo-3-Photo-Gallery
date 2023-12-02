
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
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateFavoriteIcon } from '../../features/search/searchSlice'
import { changeDescription, removeFavorite } from '../../features/favorites/favoritesSlice'

export const FavoritesGallery = ({favoritesList})=>{
  const dispatch = useDispatch()

  const [editingPhotoId, setEditingPhotoId] = useState(null) 
  const [newDescription, setNewDescription] = useState("")
 

  const handleRemoveFromFavorites = (photo)=>{
    dispatch(updateFavoriteIcon(photo))
    dispatch(removeFavorite(photo))
  }

  const handleEdit = (photo) => {
    setEditingPhotoId(photo.id) 
  }
  
  const handleSave = (photo) => {
    const photoToModify = {
      id:photo.id,
      newDescription : newDescription
    }
    
    dispatch(changeDescription(photoToModify))
    setEditingPhotoId(null) 
  }
  
    return(
      
            <ImageList
              sx={{
                width: '90%',
                gridTemplateColumns: 'repeat(auto-fill,minmax(350px,1fr))!important',
              }}
            >
              
              {favoritesList.map((photo) => (
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
                        onClick={() => {handleRemoveFromFavorites(photo)}}
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
}