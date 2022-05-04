import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const initialState = {
  items: [],
  selected: null,
  isLoading: false,
  isError: false,
};

export const fetchItems = createAsyncThunk(
  "item/fetchItems",
  async ({ space = null, uuid = null }) => {
    let response;
    if (uuid) {
      response = await api.get(`item/item/${uuid}/`);
      const data = await response.data;
      return [data];
    } else if (space) {
      response = await api.get(`item/item/`, { params: { space } });
      const data = await response.data;
      return data;
    } else {
      response = await api.get("item/item/");
      const data = await response.data;
      return data;
    }
  }
);

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      const merged = state.items.concat(
        action.payload.filter(
          (e) => !state.items.find((f) => f.uuid === e.uuid)
        )
      );

      console.log(merged);
      state.items = merged.sort((a, b) => a.name.localeCompare(b.name));

      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { setSelected } = itemSlice.actions;
export default itemSlice.reducer;
