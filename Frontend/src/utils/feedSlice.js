import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload; // it will passed to the current state.
    },
    removeFeed: (state, action) => {
      const newStateArr = state.filter((feed) => feed._id != action.payload);
      // we are removing the element from the current state of the redux store which is either Interested or Ignored and we will remove the current id which is clicked on the page.
      return newStateArr;
    },
  },
});
export const { addFeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;
