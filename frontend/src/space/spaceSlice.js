import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const initialState = {
  space: [],
  selected: null,
  isLoading: false,
  isError: false,
};

export const fetchSpaces = createAsyncThunk(
  "space/fetchSpaces",
  async (uuid = null) => {
    let response;
    if (uuid) {
      response = await api.get(`space/space/${uuid}/`);
      const data = await response.data;
      return [data];
    } else {
      response = await api.get("space/space/");
      const data = await response.data;
      return data;
    }
  }
);

export const spaceSlice = createSlice({
  name: "space",
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSpaces.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchSpaces.fulfilled, (state, action) => {
      state.space = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchSpaces.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { setSelected } = spaceSlice.actions;

export default spaceSlice.reducer;
