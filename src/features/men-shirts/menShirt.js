import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menshirts: [],
};

const menShirt = createSlice({
  name: "menshirts",
  initialState,
  reducers: {
    saveMenShirts: (state, action) => {
      state.menshirts = action.payload.documents;
    },
  },
});

export const { saveMenShirts } = menShirt.actions;

export const getMenShirts = (state) => state.menshirts;

export default menShirt.reducer;
