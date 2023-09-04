import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  yourOrders: [],
};

const order = createSlice({
  name: "order",
  initialState,
  reducers: {
    storeOrders: (state, action) => {
      state.yourOrders = action.payload.documents;
    },

    removeOrders: (state, action) => {
      state.yourOrders = [];
    },
  },
});

export const { storeOrders, removeOrders } = order.actions;

export const getOrders = (state) => state.order;

export default order.reducer;
