import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import DownloadIcon from '@mui/icons-material/Download'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, removeFavorite } from "../../app/features/favorites/favoritesSlice"
import {getPhotoData, updatePhotoList} from '../../app/features/search/searchSlice'

export const SearchGallery = () => {
  const dispatch = useDispatch()
  const photos = useSelector(getPhotoData)
  

  const handleAddToFavorite = (photo, index) => {
    const updatedPhoto = { ...photo, isFavorite: true }
    dispatch(addFavorite(updatedPhoto))

    const updatedPhotosToShow = photos.map((item, i) =>
      i === index ? { ...item, isFavorite: true } : item
    )

    dispatch(updatePhotoList(updatedPhotosToShow))
    
  }

  const handleRemoveFromFavorite = (photo, index) => {
    dispatch(removeFavorite(photo.id))
    const updatedPhotosToShow = photos.map((item, i) =>
      i === index ? { ...item, isFavorite: false } : item
    )

    dispatch(updatePhotoList(updatedPhotosToShow))
  }
  

  return (
    photos && photos.length > 0 ? (
      <ImageList
        sx={{
          width: '100%',
          gridTemplateColumns: 'repeat(auto-fill,minmax(350px,1fr))!important',
        }}
      >
        {photos.map((photo, index) => ( 
          <ImageListItem key={photo.img}>
            <img
              srcSet={`${photo.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${photo.img}?w=248&fit=crop&auto=format`}
              alt={photo.description}
              style={{ borderRadius: '20px' }}
            />
            <ImageListItemBar
              title={photo.description ? photo.description : 'No description'}
              actionIcon={
                <Box sx={{ display: 'flex' }}>
                  <IconButton 
                    sx={{ color: "#fff" }}
                    onClick={() => {
                      photo.isFavorite
                        ? handleRemoveFromFavorite(photo, index)
                        : handleAddToFavorite(photo, index)
                    }}
                  >
                    {photo.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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
          </ImageListItem>
        ))}
      </ImageList>
    ) : 
    <Typography
    variant='h6' 
    component='h1' 
    color='#fff'>
       No Photos found 
    </Typography>
  )
}
