import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import DownloadIcon from '@mui/icons-material/Download'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Link } from 'react-router-dom'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { addFavorite, removeFavorite } from '../../features/favorites/favoritesSlice'
import { updateFavoriteIcon } from '../../features/search/searchSlice'



export const SearchGallery = ({photosList}) => {
  const dispatch = useDispatch()
  const handleRemoveFromFavorite = (photo) =>{
  
  dispatch(removeFavorite(photo))
    dispatch(updateFavoriteIcon(photo))
    dispatch(removeFavorite(photo))
  }

  const handleAddToFavorite = (photo) =>{
    dispatch(updateFavoriteIcon(photo))
    dispatch(addFavorite(photo))
  }
  return (
    
      <ImageList
        sx={{
          width: '90%',
          gridTemplateColumns: 'repeat(auto-fill,minmax(350px,1fr))!important',
        }}
      >
        {photosList.map((photo) => ( 
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
                        ? handleRemoveFromFavorite(photo)
                        : handleAddToFavorite(photo)
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

  )
}
