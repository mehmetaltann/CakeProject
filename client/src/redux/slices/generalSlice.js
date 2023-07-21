import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  snackbar: null,
  searchQuery: "",
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setSnackbar: (state, { payload }) => {
      state.snackbar = payload;
    },
    setSearchQuery: (state, { payload }) => {
      state.searchQuery = payload;
    },
  },
});

export default generalSlice.reducer;
export const { setSnackbar,setSearchQuery } = generalSlice.actions;
