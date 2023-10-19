import { createSlice } from '@reduxjs/toolkit'

const value = localStorage.getItem('FavoritesPhotos')!== null ? JSON.parse(localStorage.getItem('SearchPhotos')) :[] 
export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    data:value
  }
  ,
  reducers: {
    addFavorite: (state, action) => {
    
      state.data.push(action.payload);
      localStorage.setItem('favoritesPhotos', JSON.stringify(state.data))
    },
    removeFavorite: (state, action) => {
      const photoIdToRemove = action.payload
      state.data= state.data.filter((photo) => photo.id !== photoIdToRemove)
      localStorage.setItem('favoritesPhotos', JSON.stringify(state.data))

    },
    updatePhotoFavoritesList: (state, action) => {
      state.data = action.payload 
      localStorage.setItem('favoritesPhotos', JSON.stringify(state.data))
    }
  },
})

export const { addFavorite, removeFavorite, updatePhotoFavoritesList } = favoriteSlice.actions
export const getFavoritesData = (state)=> state.favorites
