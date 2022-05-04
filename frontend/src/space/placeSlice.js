import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const initialState = {
  place: [],
  selected: null,
  isLoading: false,
  isError: false,
};

export const fetchPlaces = createAsyncThunk(
  "space/fetchPlaces",
  async ({ space = null, uuid = null }) => {
    let response;
    if (uuid) {
      response = await api.get(`space/place/${uuid}/`);
      const data = await response.data;
      return [data];
    } else if (space) {
      response = await api.get(`space/place/`, { params: { space } });
      const data = await response.data;
      return data;
    } else {
      response = await api.get("space/place/");
      const data = await response.data;
      return data;
    }
  }
);

export const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlaces.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchPlaces.fulfilled, (state, action) => {
      state.place = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchPlaces.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { setSelected } = placeSlice.actions;

export default placeSlice.reducer;
