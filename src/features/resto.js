import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurants: [],
};

const resto = createSlice({
  name: "resto",
  initialState,
  reducers: {
    storeRestaurants: (state, action) => {
      state.restaurants = action.payload.allRestos;
    },
  },
});

export const { storeRestaurants } = resto.actions;

export const getStoredRestos = (state) => state.resto;
export default resto.reducer;
