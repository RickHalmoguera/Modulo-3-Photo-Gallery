import { createAsyncThunk } from "@reduxjs/toolkit"



export const getRandomPhotosThunk = createAsyncThunk(
  "photo/getRandomPhotos",
  async () => {
    try {
      const request = await fetch(`${URL_API}/photos/random/?client_id=${CLIENT_ID}&count=30`)
      if (!request.ok) {
        throw new Error(`Failed to fetch photos from API. Status code: ${request.status}`)
      }
      const json = await request.json()

      return json.map((photo) => ({
        isFavorite: false,
        id: photo.id,
        description: photo.alt_description,
        date: photo.created_at,
        width: photo.width,
        height: photo.height,
        img: photo.urls.small_s3,
        download: photo.links.download,
        likes: photo.likes,
      }))
    } catch (error) {
      throw error
    }
  }
)

export const getPhotobySearchWordThunk = createAsyncThunk(
  "photo/getSearchPhotos",
  async (searchWord) => {
    try {
      const request = await fetch(`${API_URL}search/photos/?client_id=${CLIENT_ID}&query=${searchWord}&per_page=30`)
      if (!request.ok) {
        throw new Error(`Failed to fetch photos by search word. Status: ${request.status}`)
      }
      const json = await request.json()

      return json.results.map((photo) => ({
        isFavorite: false,
        id: photo.id,
        description: photo.alt_description,
        date: photo.created_at,
        width: photo.width,
        height: photo.height,
        img: photo.urls.small_s3,
        download: photo.links.download_location,
        likes: photo.likes,
      }))
    } catch (error) {
      throw error
    }
  }
)
