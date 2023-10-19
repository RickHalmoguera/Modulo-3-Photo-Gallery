
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {searchSlice} from '../features/search/searchSlice'
import {favoriteSlice} from '../features/favorites/favoritesSlice' 

const rootReducer = combineReducers({
  photo: searchSlice.reducer,
  favorites: favoriteSlice.reducer, 
 
})

export const store = configureStore({
  reducer: rootReducer,
})


