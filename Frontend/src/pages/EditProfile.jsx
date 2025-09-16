import { useReducer, useState } from "react";
import { actions, reducer } from "../utils/updateProfileReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { fetchUser } from "../utils/fetchUser.js";
import { Card } from "../components/Card.jsx";

// values: ["male", "female", "others"],

//https://medium.com/@sriweb/replace-multiple-usestate-hooks-with-usereducer-f70b0a058343

export const EditProfile = () => {
  // "about", "photoUrl", "skills", "age"
  const user = useSelector((store) => store.user);

  const initialState = {
    age: user.age,
    photoUrl: user.photoUrl,
    skills: user.skills,
    about: user.about,
  };

  // this reducer is not linked to redux.
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const updateAbout = (about) => {
    dispatch({ type: actions.updateAbout, payload: about });
  };

  const changePhotoUrl = (photoUrl) => {
    dispatch({ type: actions.changePhotoUrl, payload: photoUrl });
  };

  const updateSkills = (skills) => {
    dispatch({ type: actions.updateSkills, payload: skills });
  };

  const updateAge = (age) => {
    dispatch({ type: actions.updateAge, payload: age });
  };

  // calling the fetch User Api to get the details updated in the redux store as well!
  const storeDispatch = useDispatch(); // redux store

  // calling the api to update the data:
  const handleUpdateProfile = async () => {
    try {
      const response = await axios.patch(BASE_URL + "/profile/edit", state, {
        withCredentials: true,
      });
      console.log(response.data.message);
      fetchUser(storeDispatch);
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.message || error.message + "!");
      console.log(error?.response?.message || error.message);
    }
  };

  // console.log(state);

  const [error, setError] = useState("");

  return (
    <div className="flex items-center justify-center flex-col gap-7 min-h-screen ">
      <h1 className="font-bold text-4xl">Update Profile Details</h1>
      <div className="flex items-center justify-center gap-5">
       
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              <label className="label">Age</label>
              <input
                type="number"
                className="input"
                placeholder="Enter New Age"
                value={state.age}
                onChange={(e) => {
                  const val = e.target.value;
                  updateAge(val === "" ? "" : Number(val));
                }}
              />
              <label className="label">About</label>
              <input
                type="text"
                className="input"
                placeholder="Add New About"
                value={state.about}
                onChange={(e) => {
                  updateAbout(e.target.value);
                }}
              />

              <label className="label">Photo URL</label>
              <input
                type="text"
                className="input"
                placeholder="Add New Photo URL"
                value={state.photoUrl}
                onChange={(e) => {
                  changePhotoUrl(e.target.value);
                }}
              />

              <label className="label">Skills</label>
              <input
                type="text"
                className="input"
                placeholder="Add New About"
                value={state.skills}
                onChange={(e) => {
                  const arr = e.target.value
                    .split(",")
                    .map((item) => item.trim()); //converting the string to the array but trimming the space around.
                  updateSkills(arr);
                }}
              />

              <div>
                <Link to="/updatepassword" className="link link-hover">
                  Update Password?
                </Link>
              </div>
              <p className="text-red-500 text-center font-bold">{error}</p>
              <button
                className="btn btn-neutral mt-4"
                onClick={handleUpdateProfile}
              >
                Update
              </button>
            </fieldset>
          </div>
        </div>
         <Card user={state} />
      </div>
    </div>
  );
};
