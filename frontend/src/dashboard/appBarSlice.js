import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  back: false,
  backClicked: false,
  backLink: "/",
  add: false,
  addClicked: false,
  search: true,
  searchQuery: null,
  loading: false,
};

export const appSlice = createSlice({
  name: "appBar",
  initialState,
  reducers: {
    setAppBar: (state, action) => {
      const previous = { ...state };
      const merged = { ...state, ...action.payload };
      Object.keys(merged).forEach((key) => {
        state[key] = merged[key];
      });
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setBack: (state, action) => {
      const previous = {
        back: state.back,
        backClicked: state.backClicked,
        backLink: state.backLink,
      };
      const merged = { ...previous, ...action.payload };
      state.back = merged.back;
      state.backClicked = merged.backClicked;
      state.backLink = merged.backLink;
    },
    setAdd: (state, action) => {
      const previous = {
        add: state.add,
        addClicked: state.addClicked,
      };
      const merged = { ...previous, ...action.payload };
      state.add = merged.add;
      state.addClicked = merged.addClicked;
    },
    setSearch: (state, action) => {
      const previous = {
        search: state.search,
        searchQuery: state.searchQuery,
      };
      const merged = { ...previous, ...action.payload };
      state.search = merged.search;
      state.searchQuery = merged.searchQuery;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const { setTitle, setBack, setAdd, setSearch, setLoading, setAppBar } =
  appSlice.actions;
export default appSlice.reducer;
