import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    accessToken:"",
    id : "",
    fullname:"Unknown User",
    email:"",
    phoneNumber:"",
    avatar:"",
    role:""
}

export const userSlice = createSlice({

    name: "user", //tên
    initialState, 
    reducers:{
        updateUser: (state, action) => {
            const {accessToken,_id,fullname,email,phoneNumber,avatar,role} = action.payload;
            state.accessToken = accessToken;
            state.id = _id;
            state.fullname = fullname;
            state.email = email;
            state.phoneNumber = phoneNumber;
            state.avatar = avatar;
            state.role = role;
        }
    }
})

export const {updateUser} = userSlice.actions

export default userSlice.reducer