import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: null,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast(state, action) {
      const { messageKey, type = "success" } = action.payload || {};
      state.current = {
        id: Date.now(),
        type,
        messageKey,
      };
    },
    hideToast(state) {
      state.current = null;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
