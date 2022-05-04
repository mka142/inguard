import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";
import appReducer from "./dashboard/appBarSlice";
import spaceReducer from "./space/spaceSlice";
import itemReducer from "./item/itemSlice";
import placeReducer from "./space/placeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appBar: appReducer,
    space: spaceReducer,
    item: itemReducer,
    place: placeReducer,
  },
});
