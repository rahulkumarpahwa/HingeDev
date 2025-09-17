import { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

export const Login = () => {
  const [email, setEmail] = useState("applekumar@gmail.com");
  const [password, setPassword] = useState("Apple@1999");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginPostRequest = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { email, password },
        { withCredentials: true } // Add this if backend uses cookies
      );
      console.log(response.data.user);
      dispatch(addUser(response.data.user));
      return navigate("/feed"); // navigating to the home route.
    } catch (error) {
      error.response != null
        ? setError(error.response.data)
        : setError(error.message + "!");
      console.log(error);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
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
                <a className="link link-hover">Forgot password?</a>
              </div>
              <p className="text-red-500 text-center font-bold">{error}</p>
              <button
                className="btn btn-neutral mt-4"
                onClick={loginPostRequest}
              >
                Login
              </button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

// binding your state variable to UI component! like binding your input box to the state variable emailId. Also make sure to initial the state variable with some value otherwise it will be undefined and give errors.
// Now we will create a method to make the API call and for that we will create handleLogin function and it will aysnc and we will use the axios to make the call and it is binding the value to the state.
