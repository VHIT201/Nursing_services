import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import relativeReducer from './slices/relativeSlice'
import servicesReducer from './slices/servicesSlice'
import medicalCaseSlice from './slices/medicalCaseSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    relative: relativeReducer,
    services: servicesReducer,
    medicals : medicalCaseSlice
  }
})