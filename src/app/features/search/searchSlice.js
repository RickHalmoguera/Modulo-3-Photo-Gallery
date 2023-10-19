import { createSlice } from "@reduxjs/toolkit";
import {getRandomPhotosThunk, getPhotobySearchWordThunk } from "./getPhotosApiThunk";

const value = localStorage.getItem('SearchPhotos')!== null ? JSON.parse(localStorage.getItem('SearchPhotos')) :[] 
export const searchSlice = createSlice({
    name: "photo",
    initialState: {
        data: value,
        status: "idle",
        error: null
    },
    reducers: {
        getPhoto: (state,action) => {
            state.data = [...state.data,action.payload]
        },
        updatePhotoList: (state, action) => {
            state.data = action.payload
            localStorage.setItem('SearchPhotos', JSON.stringify(state.data))
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

export const {getPhoto, updatePhotoList} = searchSlice.actions
export const getPhotoData = (state) => state.photo.data
export const getPhotoStatus = (state) => state.photo.status
export const getPhotoError = (state) => state.photo.error