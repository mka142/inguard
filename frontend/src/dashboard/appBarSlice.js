import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const localStorageTheme = () => {
  try {
    return window.localStorage.getItem("theme") || "light";
  } catch (e) {
    return "light";
  }
};

const initialState = {
  title: "",
  back: false,
  backClicked: false,
  backLink: "/",
  add: false,
  addClicked: null,
  search: true,
  searchQuery: null,
  loading: false,
  info: false,
  infoClicked: null,
  edit: false,
  editClicked: null,
  remove: false,
  removeClicked: null,
  theme: localStorageTheme(),
};

export const appSlice = createSlice({
  name: "appBar",
  initialState,
  reducers: {
    setClear: (state, action) => {
      //used to clear backClicked,addClicked,infoClicked
      state[action.payload] = null;
    },
    setChange: (state, action) => {
      // used to ping change backClicked, addClicked, infoClicked
      state[action.payload] = uuidv4();
    },
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
export const {
  setTitle,
  setBack,
  setAdd,
  setSearch,
  setLoading,
  setAppBar,
  setClear,
  setChange,
} = appSlice.actions;
export default appSlice.reducer;
