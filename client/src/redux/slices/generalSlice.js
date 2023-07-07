import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  snackbar: null,
  modalOpen: false,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setSnackbar: (state, { payload }) => {
      state.snackbar = payload;
    },
    setModalOpen: (state, { payload }) => {
      state.modalOpen = payload;
    },
  },
});

export default generalSlice.reducer;
export const { setSnackbar, setModalOpen } = generalSlice.actions;
