import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../utils/http";
import AsyncStorage from '@react-native-async-storage/async-storage';

// khởi tạo các biến

const initialState = {
  user: {
    accessToken: "",
    id: "",
    fullname: "",
    email: "",
    phoneNumber: "",
    avatar: "",
    role: "",
  },
  loading: false,
  success: false,
  error:[],
  messsageVerifyOtp:""
  
};


//hàm login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (values, thunkAPI) => {
    try {
      const {data:result} = await http.post("/users/login", values, {
        signal: thunkAPI.signal
     });
    //   console.log("🚀 ~ file: user.slice.ts:41 ~ result:", result.data);
        return {
            user: result.data.user ,
            token: result.data.accessToken,
            success : result.success
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

export const registerUser = createAsyncThunk(
  "auth/register",
  async (values, thunkAPI) => {
    try {
        console.log('hello')
      const result = await http.post("/users/register", values, {
        signal: thunkAPI.signal
     });
      console.log("🚀 ~ file: user.slice.ts:41 ~ result:", result.data);
        return result.data
    } catch (error) {
      // console.log(
      //   "🚀 ~ file: user.slice.ts:47 ~ error:",
      //   error.response.data.error
      // );
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (values, thunkAPI) => {
    try {
        console.log('forgot-password')
      const result = await http.post("/users/forgot-password", values, {
        signal: thunkAPI.signal
     });
      console.log("🚀 ~ file: user.slice.ts:41 ~ result:", result.data.message);
        return result.data 
    } catch (error) {
      console.log(
        "🚀 ~ file: user.slice.ts:47 ~ error:",
        error.response.data.error
      );
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);
export const verifyCode = createAsyncThunk(
  "auth/verify-otp",
  async (values, thunkAPI) => {
    try {
        console.log('verify-otp')
      const result = await http.post("/users/verify-otp", values, {
        signal: thunkAPI.signal
     });
      console.log("🚀 ~ file: user.slice.ts:41 ~ result:", result.data.message);
        return result.data 
    } catch (error) {
      console.log(
        "🚀 ~ file: user.slice.ts:47 ~ error:",
        error.response.data.error
      );
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

//hàm update
export const update = createAsyncThunk(
  "auth/update",
  async (values, thunkAPI) => {
    const formData = new FormData();
    console.log('values avatar : ',values.avatar)
    formData.append("avatar", values.avatar)
    try {
      const {data:result} = await http.patch("/users/update", values, {
        signal: thunkAPI.signal,
        //truyền token
        headers: {
          Authorization : "Bearer " + values.token,
          "Content-Type" : "multipart/form-data"
        }
     });
      console.log("🚀 ~ file: user.slice.ts:41 ~ result:", result);
      
        return {
            user: result.data,
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



export const userSlice = createSlice({
  name: "user", //tên
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { accessToken, _id, fullname, email, phoneNumber, avatar, role } =
        action.payload;
      state.accessToken = accessToken;
      state.id = _id;
      state.fullname = fullname;
      state.email = email;
      state.phoneNumber = phoneNumber;
      state.avatar = avatar;
      state.role = role;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload)
        state.user = action.payload.user
        state.user.accessToken = action.payload.token
        state.loading = false
        state.success = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false
        state.success = false
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        console.log('payload : ' ,action.payload)
        state.loading = false
        // state.success = true
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(verifyCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyCode.fulfilled, (state, action) => {
        console.log('payload : ' ,action.payload)
        state.loading = false
        state.message = action.payload.message
        // state.success = true
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(update.pending, (state) => {
        state.loading = true;
      })
      .addCase(update.fulfilled, (state, action) => {
        console.log('payload : ' ,action.payload)
        state.loading = false
        state.message = action.payload.message
        // state.success = true
      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
  },
});




export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
