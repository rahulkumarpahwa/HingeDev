import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload; // this return value will go to the curr state. 
    },
    removeUser : ()=>{ // normally we pass the state and action argument here. here values are not used so we don't pass.
        return null; // going back to the initial state
    }
  },
});

export const {addUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
