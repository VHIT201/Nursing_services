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
    subServices : {}
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
  //Lấy danh sách subServices
  export const getListSubServices = createAsyncThunk(
    "auth/get-list-sub-services",
    async (values, thunkAPI) => {
      try {
        console.log('Get list subservices')
        const services = [values]
        console.log(services)
        const {data:result} = await http.get("/services/get-services",  {
          body:{
            services : ["657c43e1f3b7efaf17b4740e"]
          },
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
  //Lấy danh sách subServices by id service
  export const getListSubServicesByIDService = createAsyncThunk(
    "auth/get-list-sub-services-by-id-service",
    async (values, thunkAPI) => {
      try {
        console.log('Get list subservices')
        const {data:result} = await http.get(`/services/get-sub-service/${values}`,{
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
        // console.log(action.payload.result.data)
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
    .addCase(getListSubServices.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getListSubServices.fulfilled, (state, action) => {
        console.log('action payload : ',action.payload)
        state.loading = false
        state.services = action.payload.result.data
        state.message = action.payload.result.message
      })
      .addCase(getListSubServices.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        console.log(action.payload);
      })    
    .addCase(getListSubServicesByIDService.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getListSubServicesByIDService.fulfilled, (state, action) => {
        console.log('action payload : ',action.payload.result.data)
        state.loading = false
        state.subServices = action.payload.result.data
        state.message = action.payload.result.message
      })
      .addCase(getListSubServicesByIDService.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        console.log(action.payload);
      })    
    }

})

export default servicesSlice.reducer;