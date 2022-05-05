import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const initialState = {
  items: [],
  selected: null,
  isLoading: false,
  isError: false,
  error: null,
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
export const setItemQuantity = createAsyncThunk(
  "item/setItemQuantity",
  async ({ uuid, quantity }) => {
    const response = await api.patch(`item/item/${uuid}/`, { quantity });
    const data = await response.data;
    return data;
  }
);
export const createItem = createAsyncThunk(
  "item/createItem",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api({
        method: "post",
        url: `item/item/`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const data = await response.data;
      return data;
    } catch (err) {
      let error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const editItem = createAsyncThunk(
  "item/editItem",
  async ({ uuid, formData }) => {
    const response = await api({
      method: "patch",
      url: `item/item/${uuid}/`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    const data = await response.data;
    return data;
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

      state.items = merged.sort((a, b) => a.name.localeCompare(b.name));

      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(setItemQuantity.fulfilled, (state, action) => {
      state.items = state.items.map((e) => {
        if (e.uuid === action.payload.uuid) {
          return action.payload;
        }
        return e;
      });
      state.isLoading = false;
    });
    builder.addCase(setItemQuantity.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(setItemQuantity.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(createItem.fulfilled, (state, action) => {
      state.items = [...state.items, action.payload];
      state.isLoading = false;
      state.selected = action.payload.uuid;
    });
    builder.addCase(createItem.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log(action);
      state.error = action.payload;
    });
    builder.addCase(createItem.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(editItem.fulfilled, (state, action) => {
      state.items = state.items.map((e) => {
        if (e.uuid === action.payload.uuid) {
          return action.payload;
        }
        return e;
      });
      state.isLoading = false;
    });
    builder.addCase(editItem.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(editItem.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
  },
});

export const { setSelected } = itemSlice.actions;
export default itemSlice.reducer;
