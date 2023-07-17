/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  iremboPayToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: () => initialState,
    // set token
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIremboPayToken: (state, action) => {
      state.iremboPayToken = action.payload;
    }
  },
});
export const {
  resetAuth,
  setToken,
  setIremboPayToken
} = authSlice.actions;
export default authSlice.reducer;
