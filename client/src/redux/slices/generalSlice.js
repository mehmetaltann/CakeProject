import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  snackbar: null,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setSnackbar: (state, { payload }) => {
      state.snackbar = payload;
    },
  },
});

export default generalSlice.reducer;
export const { setSnackbar } = generalSlice.actions;
