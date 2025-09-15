import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload; // it will passed to the current state.
    },
    removeFeed: () => {
      return null;
    },
  },
});
export const { addFeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;
