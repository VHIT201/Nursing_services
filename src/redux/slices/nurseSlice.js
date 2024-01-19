import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../utils/http";
import AsyncStorage from '@react-native-async-storage/async-storage';


//NOTE - Khởi tạo
const initialState = {
    loading: false,
    success: false,
    error:[],
    message : '',
    medical : [],

  };

//SECTION - getallmedical
  export const getAllMedical = createAsyncThunk(
    "auth/get-all-medical",
    async (values, thunkAPI) => {
      try {
        const {data:result} = await http.get("medical/all", {
          signal: thunkAPI.signal,
       });
        console.log("🚀 ~ file: user.slice.ts:41 ~ result:", result.data);
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
  //!SECTION - createmedical
  //Tạo ca
export const createMedical = createAsyncThunk(
    "auth/create-medical",
    async (values, thunkAPI) => {
      try {
        const {data:result} = await http.post("medical", values, {
          signal: thunkAPI.signal,
          headers: {
            Authorization : "Bearer " + values.token,
          }
       });
        console.log("🚀 ~ file: user.slice.ts:41 ~ result:", result);
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


  export const medicalSlice = createSlice({
    name: "medical", //tên
    initialState,
    reducers: {
        updateUser: (state, action) => {
        
      },
    },


extraReducers(builder) {
    builder
    .addCase(getAllMedical.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getAllMedical.fulfilled, (state, action) => {
        console.log(action.payload.result)
        state.loading = false
        state.services = action.payload.result.data
        state.message = action.payload.result.message
      })
      .addCase(getAllMedical.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        console.log(action.payload);
      })    
    .addCase(createMedical.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createMedical.fulfilled, (state, action) => {
        console.log(action.payload.result)
        state.loading = false
        state.services = action.payload.result.data
        state.message = action.payload.result.message
      })
      .addCase(createMedical.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        console.log(action.payload);
      })    
 
    }

})

export default medicalSlice.reducer;