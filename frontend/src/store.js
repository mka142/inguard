import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";
import appReducer from "./dashboard/appBarSlice";
import spaceReducer from "./space/spaceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appBar: appReducer,
    space: spaceReducer,
  },
});
