/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  iremboPayToken: "",
  accountId: "9f6d595a-85fa-4527-847d-8c985e7dd405",
  // accountId: "767c9673-298a-4e1d-b325-eb44577494d8"
  // accountId: "e4ff6e99-02c5-4b3f-8286-2e20030b379a"
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
