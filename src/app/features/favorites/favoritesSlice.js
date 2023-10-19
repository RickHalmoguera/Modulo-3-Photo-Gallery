import { createSlice } from '@reduxjs/toolkit'

const value = localStorage.getItem('FavoritesPhotos')!== null ? JSON.parse(localStorage.getItem('SearchPhotos')) :[] 
export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    data:value,
    sortedData: value
  }
  ,
  reducers: {
    addFavorite: (state, action) => {
      state.data.push(action.payload);
      state.sortedData.push(action.payload)
      localStorage.setItem('favoritesPhotos', JSON.stringify(state.data))
      localStorage.setItem('sortedFavoritesPhotos', JSON.stringify(state.sortedData))
    },
    removeFavorite: (state, action) => {
      const photoIdToRemove = action.payload
      state.data= state.data.filter((photo) => photo.id !== photoIdToRemove)
      state.sortedData= state.sortedData.filter((photo) => photo.id !== photoIdToRemove)
      localStorage.setItem('favoritesPhotos', JSON.stringify(state.data))
      localStorage.setItem('sortedFavoritesPhotos', JSON.stringify(state.sortedData))
    },
    updatePhotoFavoritesList: (state, action) => {
      state.data = action.payload 
      localStorage.setItem('favoritesPhotos', JSON.stringify(state.data))
    },
    searchInsideFavorites: (state, action) => {
      const searchWord = action.payload
      if (searchWord === '') {
    
        state.sortedData = state.data
      } else {
        state.sortedData = state.data.filter((photo) =>
          photo.description && photo.description.includes(searchWord)
        )
      }
      localStorage.setItem('sortedFavoritesPhotos', JSON.stringify(state.sortedData))
    }
  },
})

export const { addFavorite, removeFavorite, updatePhotoFavoritesList, searchInsideFavorites } = favoriteSlice.actions
export const getFavoritesData = (state)=> state.favorites
