import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeVeggies: [],
  inStock: [],
};

const veggies = createSlice({
  name: "veggie",
  initialState,
  reducers: {
    saveVeggies: (state, action) => {
      state.storeVeggies = action.payload.allVeggies;
    },

    inStock: (state, action) => {
      state.inStock = action.payload.inStockVeggies;
    },
  },
});

export const { saveVeggies, inStock } = veggies.actions;

export const storedVeggies = (state) => state.veggie;

export default veggies.reducer;
