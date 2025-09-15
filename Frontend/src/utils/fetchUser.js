import axios from "axios";
import { BASE_URL } from "./constants";
import { addUser } from "./userSlice";

export const fetchUser = async (dispatch) => {
  // only core logic : try and catch will handled in the places where it is called.
  const response = await axios.get(BASE_URL + "/profile/view", {
    withCredentials: true,
  });
  console.log(response.data);
  dispatch(addUser(response.data));
};
