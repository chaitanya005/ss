import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import movieReducer from "../features/movie/movieSlice";
import menShirtReducer from "../features/men-shirts/menShirt";
import veggiesReducer from "../features/veggies";
import restoReducer from "../features/resto";
import restoMenuReducer from "../features/restomenu";
import cartReducer from "../features/cart/cart";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import orderReducer from "../features/order";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import dryfruitsReducer from "../features/dryfruits";

const reducers = combineReducers({
  user: userReducer,
  // movie: movieReducer,
  menshirts: menShirtReducer,
  cart: cartReducer,
  veggie: veggiesReducer,
  order: orderReducer,
  restomenu: restoMenuReducer,
  resto: restoReducer,
  dryfruits: dryfruitsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

// export default reducers;
export default store;

/* export default configureStore({
    reducer: {
        user: userReducer,
        movie: movieReducer,
        menshirts: menShirtReducer
    },

    middleware: getDefaultMiddleware({
        serializableCheck: false,
    })
}) */
