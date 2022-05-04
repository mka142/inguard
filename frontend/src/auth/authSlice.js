import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const initialState = {
  user: {},
  isSignIn: null,
  cantSignIn: false,
};

export const login = createAsyncThunk("auth/login", async (data) => {
  const response = await api.post("auth/login/", data);
  const response_data = await response.data;
  return response_data;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  const response = await api.get("auth/logout/");
  const data = await response.data;
  return data;
});

export const fetchUserInfo = createAsyncThunk(
  "auth/fetchUserInfo",
  async () => {
    const response = await api.get("auth/user/me/");
    const data = await response.data;
    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isSignIn = true;
      state.cantSignIn = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.user = {};
      state.isSignIn = false;
      state.cantSignIn = true;
    });
    builder.addCase(logout.fulfilled, (state, payload) => {
      state.user = {};
      state.isSignIn = false;
      state.cantSignIn = false;
    });
    builder.addCase(logout.rejected, (state, payload) => {
      state.user = {};
      state.isSignIn = false;
      state.cantSignIn = false;
    });
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isSignIn = true;
      state.cantSignIn = false;
    });
    builder.addCase(fetchUserInfo.rejected, (state, action) => {
      state.user = {};
      state.isSignIn = false;
      state.cantSignIn = false;
    });
  },
});

export default authSlice.reducer;
