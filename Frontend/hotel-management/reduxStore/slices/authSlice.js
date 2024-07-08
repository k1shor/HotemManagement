import { createSlice } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";

let initialState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      // storing in localstorage
    },
    logout: (state, action) => {
      state.userInfo = null;
      // remove from localstorage
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

// setCredentials({ name: "rRAmesh" });

export default authSlice.reducer;
