import { useState, useReducer } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

import { reducer } from "../utils/signupProfileReducer";
import toast, { Toaster } from "react-hot-toast";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoginPage, setIsLoginPage] = useState(true);
  const dispatchStore = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    firstName: "",
    lastName: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const putFirstName = (firstName) => {
    dispatch({ type: "PUT_FIRSTNAME", payload: firstName });
  };
  const putLastName = (lastName) => {
    dispatch({ type: "PUT_LASTNAME", payload: lastName });
  };

  const loginPostRequest = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { email, password },
        { withCredentials: true } // Add this if backend uses cookies
      );
      console.log(response.data.user);
      dispatchStore(addUser(response.data.user));
      return navigate("/feed"); // navigating to the home route.
    } catch (error) {
      error.response != null
        ? setError(error.response.data)
        : setError(error.message + "!");
      console.log(error);
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/signup",
        { ...state, email, password },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      dispatchStore(addUser(response.data.data));
      setTimeout(() => {
        toast.success(response.data.message + "!");
        return navigate("/feed");
      }, 1000);
    } catch (error) {
      console.log(error);
      console.log(error?.message || error?.response?.data);
      toast.error(error?.message || error?.response?.data);
      setError(error?.message || error?.response?.data);
    }
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse gap-8 lg:space-x-16 px-4 lg:px-0">
        <div className="text-center lg:text-left space-y-4 flex flex-col w-full lg:w-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {isLoginPage ? "Login 🔏" : "Signup 🔑"}
          </h1>
          <p className="py-4 lg:py-6 font-semibold text-sm sm:text-base lg:text-xl">
            {isLoginPage
              ? "Login here to join back to the astonishing world of the Devs and connect with them."
              : "Signup here to be part of this new Social Discovery platform for the devs."}
          </p>
        </div>
        <div className="card w-full max-w-sm shrink-0 shadow-2xl lg:w-96">
          <div className="card-body p-4 sm:p-6">
            <fieldset className="fieldset">
              {!isLoginPage && (
                <>
                  <label className="label text-sm sm:text-base">
                    FirstName
                  </label>
                  <input
                    type="text"
                    className="input input-sm sm:input"
                    placeholder="FirstName"
                    value={state.firstName}
                    onChange={(e) => {
                      putFirstName(e.target.value);
                    }}
                  />
                  <label className="label text-sm sm:text-base">LastName</label>
                  <input
                    type="text"
                    className="input input-sm sm:input"
                    placeholder="LastName"
                    value={state.lastName}
                    onChange={(e) => {
                      putLastName(e.target.value);
                    }}
                  />
                </>
              )}
              <label className="label text-sm sm:text-base">Email</label>
              <input
                type="email"
                className="input input-sm sm:input"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label className="label text-sm sm:text-base">Password</label>
              <input
                type="password"
                className="input input-sm sm:input"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div>
                {isLoginPage && (
                  <a className="link link-hover text-xs sm:text-sm">
                    Forgot password?
                  </a>
                )}
              </div>
              <p className="text-red-500 text-center font-bold text-xs sm:text-sm">
                {error}
              </p>
              <button
                className="btn btn-neutral mt-4 text-sm sm:text-base hover:bg-[#fe3770] hover:border-[#fe3770] "
                onClick={isLoginPage ? loginPostRequest : handleSignUp}
              >
                {isLoginPage ? "Login" : "SignUp"}
              </button>
              <p
                className="link link-hover text-center pt-3 text-xs sm:text-sm"
                onClick={() => {
                  setIsLoginPage(!isLoginPage);
                }}
              >
                {isLoginPage
                  ? "New User? SignUp Here →"
                  : "Existing User? Login Here →"}
              </p>
            </fieldset>
          </div>
        </div>
        <Toaster position="top-center" />
      </div>
    </div>
  );
};

// binding your state variable to UI component! like binding your input box to the state variable emailId. Also make sure to initial the state variable with some value otherwise it will be undefined and give errors.
// Now we will create a method to make the API call and for that we will create handleLogin function and it will aysnc and we will use the axios to make the call and it is binding the value to the state.
