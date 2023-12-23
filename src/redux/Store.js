import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import relativeReducer from './slices/relativeSlice'
import servicesReducer from './slices/servicesSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    relative: relativeReducer,
    services: servicesReducer
  }
})