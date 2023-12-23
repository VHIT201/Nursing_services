import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../utils/http";
import AsyncStorage from '@react-native-async-storage/async-storage';


//NOTE - Khởi tạo
const initialState = {
    loading: false,
    success: false,
    error:[],
    message : '',
    services: [],
    subServices : []
  };


  //Lấy danh sách service
  export const getListServices = createAsyncThunk(
    "auth/get-list-services",
    async (values, thunkAPI) => {
      try {

        const {data:result} = await http.get("/services/get-all", {
          signal: thunkAPI.signal,

          
       });
        // console.log("🚀 ~ file: user.slice.ts:41 ~ result:", result.data);
          return {
               result
          };
      } catch (error) {
        // console.log(
        //   "🚀 ~ file: user.slice.ts:47 ~ error:",
        //   error.response.data.error
        // );
        return thunkAPI.rejectWithValue(error.response.data.error);
      }
    }
  );



  export const servicesSlice = createSlice({
    name: "services", //tên
    initialState,
    reducers: {
        updateUser: (state, action) => {
        
      },
    },




extraReducers(builder) {
    builder
    .addCase(getListServices.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getListServices.fulfilled, (state, action) => {
        // console.log(action.payload.result.message)
        state.loading = false
        state.services = action.payload.result.data
        state.message = action.payload.result.message
      })
      .addCase(getListServices.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        console.log(action.payload);
      })    
    }

})

export default servicesSlice.reducer;