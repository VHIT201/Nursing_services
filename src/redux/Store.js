import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import relativeReducer from './slices/relativeSlice'

export const store = configureStore({
    reducer:{
        user : userReducer,
        relative : relativeReducer,
    }
})