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
    listNurseBySubID : [],
    listMedicalByNurseId :[],
    medicalDetails : {}

  };

//SECTION - getallmedical
  export const getAllMedical = createAsyncThunk(
    "auth/get-all-medical",
    async (values, thunkAPI) => {
      try {
        const {data:result} = await http.get("medical/all", {
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
        // console.log("🚀 ~ file: user.slice.ts:41 ~ result:", result);
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

  //SECTION - getListNurse
  export const getListNurseByIDSubservice = createAsyncThunk(
    "auth/get-list-nurse-by-id-subservice",
    async (values, thunkAPI) => {
      try {
        // console.log(values);
        const { data: result } = await http.get(`/users/get-all/nurse?service=${values.status}`, {
          signal: thunkAPI.signal,
          headers: {
            Authorization : "Bearer " + values.token,
          },
          body:{
            nurseId : values.nurseId
          }
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
  //!SECTION -


  //SECTION - GetListMedicalByNurseId
  export const getListMedicalByNurseId = createAsyncThunk(
    "auth/get-list-medical-by-nurse-id",
    async (values, thunkAPI) => {
      try {
        // console.log(values);
        const { data: result } = await http.get(`/medical/nurse`, {
          signal: thunkAPI.signal,
          headers: {
            Authorization : "Bearer " + values.token,
          },
       });
        // console.log("🚀 ~ file: user.slice.ts:41 ~ result:", result.result);
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
  //!SECTION -

    //Lấy thông tin ca by id
    export const getDataMedicalById = createAsyncThunk(
      "auth/get-data-medical-by-id",
      async (values, thunkAPI) => {
        try {
          // console.log('Get ca by id');
          // const {data:result} = await http.get(`/medical/${values.id}`,{
          const {data:result} = await http.get(`/medical/659e39a3cbb06db057b115d4`,{
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
        // console.log(action.payload.result)
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
        // console.log(action.payload.result)
        state.loading = false
        state.message = action.payload.result.message
      })
      .addCase(createMedical.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        console.log(action.payload);
      })    
      .addCase(getListNurseByIDSubservice.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getListNurseByIDSubservice.fulfilled, (state, action) => {
        state.loading = false
        state.message = action.payload.result.message
        state.listNurseBySubID = action.payload.result.data
      })
      .addCase(getListNurseByIDSubservice.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        console.log(action.payload);
      })    
      .addCase(getListMedicalByNurseId.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getListMedicalByNurseId.fulfilled, (state, action) => {
        // console.log('data get list medical by status and nurse id : ',action.payload.result.result)
        state.loading = false
        state.message = action.payload.result.message
        state.listMedicalByNurseId = action.payload.result.result
      })
      .addCase(getListMedicalByNurseId.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        console.log(action.payload);
      })    
      .addCase(getDataMedicalById.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getDataMedicalById.fulfilled, (state, action) => {
        // console.log('action payload : ',action.payload.result)
        state.loading = false
        state.medicalDetails = action.payload.result.result
        state.message = action.payload.result.message
      })
      .addCase(getDataMedicalById.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        console.log(action.payload);
      })   
 
    }

})

export default medicalSlice.reducer;