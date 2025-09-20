import { useState, useReducer } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

import { reducer } from "../utils/signupProfileReducer";
import toast, { Toaster } from "react-hot-toast";

export const Login = () => {
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
      <div className="hero-content flex-col lg:flex-row-reverse space-x-16">
        <div className="lg:text-left space-y-4 flex flex-col">
          <h1 className="text-5xl font-bold">
            {isLoginPage ? "Login now!" : "SignUp Now!"}
          </h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              {!isLoginPage && (
                <>
                  <label className="label">FirstName</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="FirstName"
                    value={state.firstName}
                    onChange={(e) => {
                      putFirstName(e.target.value);
                    }}
                  />
                  <label className="label">LastName</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="LastName"
                    value={state.lastName}
                    onChange={(e) => {
                      putLastName(e.target.value);
                    }}
                  />
                </>
              )}
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div>
                {isLoginPage && (
                  <a className="link link-hover">Forgot password?</a>
                )}
              </div>
              <p className="text-red-500 text-center font-bold">{error}</p>
              <button
                className="btn btn-neutral mt-4"
                onClick={isLoginPage ? loginPostRequest : handleSignUp}
              >
                {isLoginPage ? "Login" : "SignUp"}
              </button>
              <p
                className="link link-hover text-center pt-3"
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
