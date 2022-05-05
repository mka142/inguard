import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import { errorHandler } from "../utils";

const initialState = {
  place: [],
  selected: null,
  isLoading: false,
  isError: false,
};

export const fetchPlaces = createAsyncThunk(
  "place/fetchPlaces",
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

export const createPlace = createAsyncThunk(
  "place/createPlace",
  async (formData, { rejectWithValue }) => {
    return await errorHandler(rejectWithValue, async () => {
      const response = await api({
        method: "post",
        url: `space/place/`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const data = await response.data;
      return data;
    });
  }
);

export const editPlace = createAsyncThunk(
  "place/editPlace",
  async (formData, { rejectWithValue }) => {
    return await errorHandler(rejectWithValue, async () => {
      const response = await api({
        method: "patch",
        url: `space/place/${formData.uuid}/`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const data = await response.data;
      return data;
    });
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
    builder.addCase(createPlace.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(createPlace.fulfilled, (state, action) => {
      state.place.push(action.payload);
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(createPlace.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(editPlace.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(editPlace.fulfilled, (state, action) => {
      state.place = state.place.map((place) =>
        place.uuid === action.payload.uuid ? action.payload : place
      );
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(editPlace.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { setSelected } = placeSlice.actions;

export default placeSlice.reducer;
