import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  snackbar: null,
  searchQuery: "",
  parameterType: "Pasta Türü",
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
    setParameterType: (state, { payload }) => {
      state.parameterType = payload;
    },
  },
});

export default generalSlice.reducer;
export const { setSnackbar, setSearchQuery,setParameterType } = generalSlice.actions;
