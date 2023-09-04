import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuItems: [],
};

const restomenu = createSlice({
  name: "restomenu",
  initialState,
  reducers: {
    storeMenuItems: (state, action) => {
      state.menuItems = action.payload.restoMenuItems;
    },
  },
});

export const { storeMenuItems } = restomenu.actions;

export const getStoredMenuItems = (state) => state.restomenu;
export default restomenu.reducer;
