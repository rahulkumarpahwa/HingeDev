import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequests: (state, action) => {
      const newStateArray = state.filter(
        (eachRequest) => eachRequest.fromUserId._id !== action.payload
      );
      return newStateArray;
      // here we are taking out the request interested in the current user out of the current redux store to make it erase from the page.
    },
  },
});

export const { addRequests, removeRequests } = requestsSlice.actions;
export default requestsSlice.reducer;
