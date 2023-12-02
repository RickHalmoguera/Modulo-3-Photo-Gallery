import { createSlice } from "@reduxjs/toolkit";
import {getRandomPhotosThunk, getPhotobySearchWordThunk } from "./getPhotosApiThunk";

export const searchSlice = createSlice({
    name: "photo",
    initialState: {
        data: [],
        status: "idle",
        error: null
    },
    reducers: {
       
        updateFavoriteIcon:(state,action) =>{
            const photoIdToChange = action.payload.id

            state.data = state.data.map((photo) =>
                photo.id === photoIdToChange ? { ...photo, isFavorite: !photo.isFavorite } : photo
            );

        },


        updatePhotoList: (state, action) => {
            state.data = action.payload
        }
    },
    extraReducers: (builder) => {
        
        builder.addCase(getRandomPhotosThunk.pending, (state,action) => {
            state.status = "pending"
        }).addCase(getRandomPhotosThunk.rejected,(state,action) => {
            state.status = "rejected"
            state.error = action.error.message
        }).addCase(getRandomPhotosThunk.fulfilled,(state,action) => {
            state.status = "fulfilled"
            state.data = action.payload
            localStorage.setItem('SearchPhotos', JSON.stringify(state.data))

        }).addCase(getPhotobySearchWordThunk.pending, (state,action) => {
            state.status = "pending"
        }).addCase(getPhotobySearchWordThunk.rejected,(state,action) => {
            state.status = "rejected"
            state.error = action.error.message
        }).addCase(getPhotobySearchWordThunk.fulfilled,(state,action) => {
            state.status = "fulfilled"
            state.data = action.payload
            localStorage.setItem('SearchPhotos', JSON.stringify(state.data))
        })
    }
});

export const {updateFavoriteIcon, updatePhotoList} = searchSlice.actions
export const getPhotoData = (state) => state.photo.data
export const getPhotoStatus = (state) => state.photo.status
export const getPhotoError = (state) => state.photo.error