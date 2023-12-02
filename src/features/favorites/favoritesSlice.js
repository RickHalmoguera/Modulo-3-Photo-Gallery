import { createSlice } from '@reduxjs/toolkit'

const loadFavoritesFromStorage = () => {
  const storedFavorites = localStorage.getItem('favorites')
  return storedFavorites ? JSON.parse(storedFavorites) : []
}

const saveFavoritesToStorage = (favorites) => {
  localStorage.setItem('favorites', JSON.stringify(favorites))
}

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    data: loadFavoritesFromStorage(),
  },
  reducers: {
    addFavorite: (state, action) => {
      const newPhoto = action.payload
      const isAlreadyInFavorites = state.data.some(photo => photo.id === newPhoto.id)

      if (!isAlreadyInFavorites) {
        const photoToFavorites = { ...newPhoto, isFavorite: true }
        state.data.push(photoToFavorites)
        saveFavoritesToStorage(state.data)
      }
    },

    removeFavorite: (state, action) => {
      const photoIdToRemove = action.payload.id
      state.data = state.data.filter(photo => photo.id !== photoIdToRemove)
      saveFavoritesToStorage(state.data)
    },

    changeDescription: (state, action) => {
      const photoToModify = action.payload.id
      const newDescription = action.payload.newDescription
      state.data = state.data.map(photo =>
        photo.id === photoToModify ? { ...photo, description: newDescription } : photo
      )
      saveFavoritesToStorage(state.data)
    },
  },
})

export const { addFavorite, removeFavorite, changeDescription } = favoriteSlice.actions
export const getFavoritesData = state => state.favorites.data
