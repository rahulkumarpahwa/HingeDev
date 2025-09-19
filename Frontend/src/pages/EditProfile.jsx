import { useReducer, useState } from "react";
import { actions, reducer } from "../utils/updateProfileReducer";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { Card } from "../components/Card.jsx";
import { DiasyToast } from "../components/DiasyToast.jsx";

//https://medium.com/@sriweb/replace-multiple-usestate-hooks-with-usereducer-f70b0a058343

export const EditProfile = () => {
  //"firstName", "lastName", "gender", "about", "photoUrl", "skills", "age"
  //gender_values: ["male", "female", "others"],

  const user = useSelector((store) => store.user);

  const initialState = {
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender || "",
    age: user.age || "",
    photoUrl: user.photoUrl,
    skills: user.skills,
    about: user.about,
  };

  // this reducer is not linked to redux.
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const updateFirstName = (firstName) => {
    dispatch({ type: actions.updateFirstName, payload: firstName });
  };
  const updateLastName = (lastName) => {
    dispatch({ type: actions.updateLastName, payload: lastName });
  };

  const updateGender = (gender) => {
    dispatch({ type: actions.updateGender, payload: gender });
  };

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

  // updating the user details from the /profile/edit itself to get the details updated in the redux store as well!
  const storeDispatch = useDispatch(); // redux store

  // calling the api to update the data:
  const handleUpdateProfile = async () => {
    try {
      const response = await axios.patch(BASE_URL + "/profile/edit", state, {
        withCredentials: true,
      });
      console.log(response.data.newEdittedUser);
      storeDispatch(addUser(response.data.newEdittedUser)); // adding the data using the userSlice in redux store
      setToastState(true);
      setTimeout(() => {
        setToastState(false);
        navigate("/profile");
      }, 1000);
    } catch (error) {
      setError(error?.response?.message || error.message + "!");
      console.log(error?.response?.message || error.message);
      console.log(error);
    }
  };

  // console.log(state);

  const [error, setError] = useState("");
  const [toastState, setToastState] = useState(false);

  return (
    <div className="flex items-center justify-center flex-col gap-7 p-20">
      <h1 className="font-bold text-4xl">Update Profile Details</h1>
      <div className="flex items-center justify-center gap-5">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              <label className="label">FirstName</label>
              <input
                type="text"
                className="input"
                placeholder="Enter New FirstName"
                value={state.firstName}
                onChange={(e) => {
                  updateFirstName(e.target.value);
                }}
              />
              <label className="label">LastName</label>
              <input
                type="text"
                className="input"
                placeholder="Enter New LastName"
                value={state.lastName}
                onChange={(e) => {
                  updateLastName(e.target.value);
                }}
              />
              <label className="label">Gender</label>
              <select
                name="gender"
                id="gender"
                className="input"
                onChange={(e) =>
                  updateGender(
                    e.target.value == "" ? state.gender : e.target.value
                  )
                }
              >
                <option value="">--Please choose an option--</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
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
              <textarea
                type="text"
                rows={2}
                cols={6}
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
                value={state.photoUrl != "/dummy.jpg" ? state.photoUrl : ""}
                onChange={(e) => {
                  changePhotoUrl(
                    e.target.value == "" ? "/dummy.jpg" : e.target.value
                  );
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
      {toastState && <DiasyToast data={"Profile Updated SuccessFully!"} />}
    </div>
  );
};
