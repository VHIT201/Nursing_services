import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../utils/http";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch,useSelector, } from 'react-redux';


// khởi tạo các biến

const initialState = {
  user: {
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
  message:'',
  messsageVerifyOtp:"",
  dataRelativeUser : [],
  RelativeUserDetails:{}
};

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('userStoreData', jsonValue);
  } catch (e) {
    // saving error
  }
};
const storeToken = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.setItem('userToken', jsonValue);
  } catch (e) {
    console.log('Lỗi store giá trị token : ', e)
  }
};
const updateUserAsyncStorage = async (value) => {
  try {
    await AsyncStorage.removeItem('userStoreData')
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('userStoreData', jsonValue);
  } catch (e) {
    // saving error
  }
};

//hàm persistent session


// export const persistentSession = createAsyncThunk(
//   "auth/login",
//   async (values, thunkAPI) => {
//     try {
//       const {data:result} = await http.post("/users/login", values, {
//         signal: thunkAPI.signal
//      });
//     //   console.log("🚀 ~ file: user.slice.ts:41 ~ result:", result.data);
//         return {
//             user: result.data.user ,
//             token: result.data.accessToken,
//             persistentSessionSuccess : result.success
//         };
//     } catch (error) {
//       // console.log(
//       //   "🚀 ~ file: user.slice.ts:47 ~ error:",
//       //   error.response.data.error
//       // );
//       return thunkAPI.rejectWithValue(error.response.data.error);
//     }
//   }
// );


//hàm login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (values, thunkAPI) => {
    try {
      const {data:result} = await http.post("/users/login", values, {
        signal: thunkAPI.signal
     });
    //  const userData = result.data.user
     const tokenData = result.data.accessToken
    //  storeData(userData)
     storeToken(tokenData)
      // console.log("🚀 ~ file: user.slice.ts:41 ~ result:", result.data);
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
//NOTE - get info user
export const getInfoUser = createAsyncThunk(
  "auth/getInfoUser",

  async (values, thunkAPI) => {
    try {
      const {data:result} = await http.get("/users/info", {
        signal: thunkAPI.signal,
        headers: {
          Authorization : "Bearer " + values,
          
        },
     });
     
     const userData = result.data
     console.log('Data user từ sv : ', userData)
    //  storeData(userData)
    //  storeToken(tokenData)
      console.log("🚀 ~ file: user.slice.ts:41 ~ result:", result.data);
        return {
            user: result.data,
            token: result.data.accessToken,
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
// quên mật khẩu
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
//gửi verify code
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



//NOTE - Hàm update
export const update = createAsyncThunk(
  "auth/update",
  
  async (values, thunkAPI) => {
    // console.log('values in update : ',values)
    try {
      const {data:result} = await http.patch("/users/update", values, {
        signal: thunkAPI.signal,
        //truyền token
        headers: {
          Authorization : "Bearer " + values.token,
          
        },

     });
      console.log("🚀 ~ file: user.slice.ts:41 ~ result:", result);
      storeData(result.data)
      console.log("đã update user : ",result.data)
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
//hàm update password
export const updatePassword = createAsyncThunk(
  "auth/update-password",
  async (values, thunkAPI) => {
    try {
      // console.log(values.token)
      const {data:result} = await http.patch("/users/update-password", values, {
        signal: thunkAPI.signal,
        //truyền token
        headers: {
          Authorization : "Bearer " + values.token,

        }
     });
      console.log("🚀 ~ file: user.slice.ts:41 ~ result:", result);
      console.log("đã update user")
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
//hàm reset password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (values, thunkAPI) => {
    try {
      // console.log(values.token)
      const {data:result} = await http.put("/users/reset-password", values, {
        signal: thunkAPI.signal,
     });
      console.log("🚀 ~ file: user.slice.ts:41 ~ result:", result);
      console.log("đã update user")
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





//tạo người thân
export const createRelativeUser = createAsyncThunk(
  "auth/createRelativeUser",
  async (values, thunkAPI) => {
    try {
      console.log('data values : ',values.fullname)
      const {data:result} = await http.post("/users/create-relative-user", values, {
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




export const userSlice = createSlice({
  name: "user", //tên
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { accessToken, _id, fullname, email, phoneNumber, avatar, role } =
        action.payload;
      state.token = accessToken;
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
       //NOTE - addCase Login
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

        
        // if(action.payload.success === true) 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        console.log(action.payload);
      })
     //NOTE - addCase getInfoUser
      .addCase(getInfoUser.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getInfoUser.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.loading = false
      })
      .addCase(getInfoUser.rejected, (state, action) => {
        state.loading = false;
        // console.log('Lỗi')
        state.error = action.payload;
        console.log(action.payload);
      })
         //NOTE - addCase Registeruser
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
      .addCase(createRelativeUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRelativeUser.fulfilled, (state, action) => {
        console.log('payload : ' ,action.payload)
        state.loading = false
        state.message = action.payload.message
        // state.success = true
      })
      .addCase(createRelativeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        console.log('payload : ' ,action.payload)
        state.loading = false
        state.message = action.payload.message
        // state.success = true
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // console.log(action.payload);
      })
      //NOTE - addCase ResetPassword
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        console.log('payload : ' ,action.payload.result)
        state.loading = false
        state.message = action.payload.result.message
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // console.log(action.payload);
      })
      
  },
});




export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
