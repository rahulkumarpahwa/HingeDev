import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import feedReducer from "./feedSlice.js";
import connectionsReducer from "./connectionsSlice.js";
import requestsReducer from "./requestsSlice.js";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionsReducer,
    requests: requestsReducer,
  },
});
export default appStore;
