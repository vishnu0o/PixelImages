import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  data: null,
  refresh:0
};

const dataSlice = createSlice({
  name: "data",
  initialState: INITIAL_STATE,
  reducers: {
    saveData: (state, action) => {
      state.data = action.payload;
    },
    removeData: (state) => {
      state.data = null;
    },
    doRefresh: (state) => {
      state.refresh = state.refresh + 1;
    },
    
  },
});

export const { saveData, removeData, doRefresh } = dataSlice.actions;

export default dataSlice.reducer;