import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeDryFruit: [],
};

const dryfruits = createSlice({
  name: "dryfruits",
  initialState,
  reducers: {
    saveDryFruits: (state, action) => {
      state.storeDryFruit = action.payload.inStockItems;
    },
  },
});

export const { saveDryFruits } = dryfruits.actions;

export const getDryFruits = (state) => state.dryfruits;

export default dryfruits.reducer;
