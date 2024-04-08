import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../utils/http";

// khởi tạo các biến

const initialState = {
    loading: false,
    success: false,
    error:[],
    dataRelativeUser : [],
    RelativeUserDetails:{}

  };

  
//tạo người thân
export const createRelativeUser = createAsyncThunk(
  "auth/createRelativeUser",
  async (values, thunkAPI) => {
    try {
      // console.log('data values : ',values.fullname)
      const {data:result} = await http.post("/users/create-relative-user", values, {
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
  //Lấy danh sách người thân
export const getRelativeUser = createAsyncThunk(
    "auth/get-relative-user",
    async (values, thunkAPI) => {
      try {
        // console.log(values)
        const {data:result} = await http.get("/users/get-relative-user", {
          signal: thunkAPI.signal,
          headers: {
            Authorization : "Bearer " + values.token,

          }
       });
        // console.log("🚀 ~ file: user.slice.ts:41 ~ result:", result.data);
        // storeRelativeUser(result.data)
  
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
  //Lấy thông tin 1 người thân
export const getRelativeUserData = createAsyncThunk(
    "auth/get-relative-user-data",
    async (values, thunkAPI) => {
      try {
        // console.log('id :',values);
        const {data:result} = await http.get(`/relatives/${values}`, {
          signal: thunkAPI.signal,
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
  //Xóa người thân
export const deleteRelativeUser = createAsyncThunk(
    "auth/delete-relative-user",
    async (values, thunkAPI) => {
      try {
        // console.log('values id : ',values)
        const {data:result} = await http.delete(`/relatives/${values.id}`, {
          signal: thunkAPI.signal,
          headers: {
            Authorization : "Bearer " + values.tokenUser,
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
  //Sửa người thân
export const editRelativeUser = createAsyncThunk(
    "auth/edit-relative-user",
    async (values, thunkAPI) => {
      try {
        const {data:result} = await http.patch(`/relatives/${values._id}`,values ,{
          signal: thunkAPI.signal,
          headers: {
            Authorization : "Bearer " + values._id,
          },

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

  export const relativeSlice = createSlice({
    name: "relative", //tên
    initialState,
    reducers: {
      updateUser: (state, action) => {
        
      },
    },

    extraReducers(builder) {
        builder
          .addCase(deleteRelativeUser.pending, (state) => {
            state.loading = true;
            state.success = false;
          })
          .addCase(deleteRelativeUser.fulfilled, (state, action) => {
            // console.log(action.payload)
            state.loading = false
          })
          .addCase(deleteRelativeUser.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
            console.log(action.payload);
          })
          // lấy danh sách người thân
          .addCase(getRelativeUser.pending, (state) => {
            state.loading = true;
          })
          .addCase(getRelativeUser.fulfilled, (state, action) => {
            // console.log('payload : ' , action.payload.result.data)
            state.loading = false
            state.dataRelativeUser = action.payload.result.data
            state.message = action.payload.message
          })
          .addCase(getRelativeUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            // console.log(action.payload);
          })

          //1 người
          .addCase(getRelativeUserData.pending, (state) => {
            state.loading = true;
          })
          .addCase(getRelativeUserData.fulfilled, (state, action) => {
            // console.log('payload get data đơn : ' , action.payload.result.data)
            state.loading = false
            state.RelativeUserDetails = action.payload.result.data
            state.message = action.payload.message
            

            // state.success = true
          })
          .addCase(getRelativeUserData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            // console.log(action.payload);
          })
          .addCase(editRelativeUser.pending, (state) => {
            state.loading = true;
          })
          .addCase(editRelativeUser.fulfilled, (state, action) => {
            // console.log('payload : ' ,action.payload)
            state.loading = false
            state.dataRelativeUser = action.payload.data
            state.message = action.payload.message          
          })
          .addCase(editRelativeUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            console.log(action.payload);
          })
          .addCase(createRelativeUser.pending, (state) => {
            state.loading = true;
          })
          .addCase(createRelativeUser.fulfilled, (state, action) => {
            // console.log('payload : ' ,action.payload)
            state.loading = false
            state.message = action.payload.message
            // state.success = true
          })
          .addCase(createRelativeUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            console.log(action.payload);
          })
        }

        
        


        
})

export default relativeSlice.reducer;