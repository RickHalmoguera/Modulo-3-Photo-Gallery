import { AccountTree } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit'

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    data:[],
  }
  ,
  reducers: {
    addFavorite: (state, action) => {
      const newPhoto = action.payload;
      const isAlreadyInFavorites = state.data.some(photo => photo.id === newPhoto.id);
    
      if (!isAlreadyInFavorites) {
        
        const photoToFavorites = { ...newPhoto, isFavorite: true }
        state.data.push(photoToFavorites)
      }
    },

    removeFavorite: (state, action) => {
      const photoIdToRemove = action.payload.id
      
      state.data= state.data.filter((photo) => photo.id !== photoIdToRemove)
    },

    changeDescription:(state,action)=>{
      const photoToModify = action.payload.id
      const newDescription = action.payload.newDescription
      console.log(action.payload)
      state.data = state.data.map((photo) =>
        photo.id === photoToModify ? { ...photo, description: newDescription } : photo
      )
    }
  }
})

export const { addFavorite, removeFavorite, changeDescription} = favoriteSlice.actions
export const getFavoritesData = (state)=> state.favorites.data
