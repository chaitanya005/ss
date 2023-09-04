import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
  orderId: "",
  billingInfo: {},
  totalBill: "",
  coupon: "",
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // console.log(action.payload);
      state.cartItem = [...state.cartItem.concat(action.payload.newItem)];
    },

    updateCart: (state, action) => {
      // console.log(action.payload.updatedItem);
      state.cartItem = state.cartItem.map((updateElement) =>
        updateElement.name === action.payload.updatedItem.name
          ? {
              ...updateElement,
              newPrice: action.payload.updatedItem.newPrice,
              qty: action.payload.updatedItem.qty,
            }
          : updateElement
      );
    },

    removeItem: (state, action) => {
      // console.log(action.payload.removeeItem);
      /* state.cartItem.map((veggie, i) =>
        veggie.veggieId === action.payload.removeeItem.veggieId
          ? state.cartItem.splice(i, 1)
          : veggie
      ); */

      state.cartItem = state.cartItem.filter(
        (item) => item.veggieId !== action.payload.removeeItem.veggieId
      );
    },

    removeDryFruitItem: (state, action) => {
      // console.log(action.payload.removeeItem);
      state.cartItem = state.cartItem.filter(
        (item) => item.name !== action.payload.removeeItem.name
      );
    },

    removeFoodItem: (state, action) => {
      state.cartItem = state.cartItem.filter(
        (item) => item.id !== action.payload.removeeItem.id
      );
    },

    removeClothItem: (state, action) => {
      state.cartItem = state.cartItem.filter(
        (item) => item.id !== action.payload.removeeItem.id
      );
    },

    setOrderId: (state, action) => {
      state.orderId = action.payload.orderId;
    },

    setBillingDetails: (state, action) => {
      state.billingInfo = action.payload.values;
    },

    setTotalBill: (state, action) => {
      state.totalBill = action.payload.total;
    },

    setCouponName: (state, action) => {
      state.coupon = action.payload.coupon;
    },

    removeCart: (state, action) => {
      state.cartItem = [];
    },
  },
});

export const {
  addToCart,
  updateCart,
  removeItem,
  removeCart,
  setOrderId,
  setBillingDetails,
  setTotalBill,
  setCouponName,
  removeDryFruitItem,
  removeFoodItem,
  removeClothItem,
} = cart.actions;

export const storeCart = (state) => state.cart.cartItem;
export const billingInfo = (state) => state.cart.billingInfo;
export const getTotalBill = (state) => state.cart.totalBill;
export const couponApplied = (state) => state.cart.coupon;
export const orderId = (state) => state.cart.orderId;

export default cart.reducer;
