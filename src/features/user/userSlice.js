import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  photo: "",
  uid: "",
  phoneNumber: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
      state.uid = action.payload.uid;
      state.phoneNumber = action.payload.phoneNumber;
    },

    setSignOut: (state, action) => {
      state.name = null;
      state.email = null;
      state.photo = null;
      state.uid = null;
      state.phoneNumber = null;
    },
  },
});

export const { setUser, setSignOut } = userSlice.actions;

export const getUserName = (state) => state.user.name;
export const getUserEmail = (state) => state.user.email;
export const getUserPhoto = (state) => state.user.photo;
export const getUserUid = (state) => state.user.uid;
export const getUserNumber = (state) => state.user.phoneNumber;

export const getUserDetails = (state) => state.user;

export default userSlice.reducer;
