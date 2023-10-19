import { createSlice } from '@reduxjs/toolkit'

const value = localStorage.getItem('SearchPhotos')!== null ? JSON.parse(localStorage.getItem('SearchPhotos')).filter(item => item.isFavorite === true) :[] 
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
    sortFavoritesList: (state, action) => {
      const sortValue = action.payload

      if (sortValue === "width") {
        state.sortedData = state.sortedData.sort((a, b) => a.width - b.width)
        } else if (sortValue === "height") {
        state.sortedData = state.sortedData.sort((a, b) => a.height - b.height)
        } else if (sortValue === "likes") {
        state.sortedData = state.sortedData.sort((a, b) => a.likes - b.likes)
        } else if (sortValue === "date") {
        state.sortedData = state.sortedData.sort(
            (a, b) => new Date(a.date).getFullYear() - new Date(b.date).getFullYear()
        )} 

      localStorage.setItem('sortedFavoritesPhotos', JSON.stringify(state.sortedData))
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

export const { addFavorite, removeFavorite, sortFavoritesList, searchInsideFavorites } = favoriteSlice.actions
export const getFavoritesData = (state)=> state.favorites
