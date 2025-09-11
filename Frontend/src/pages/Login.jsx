import { useState } from "react";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState("bananakumar@gmail.com");
  const [password, setPassword] = useState("Apple@1999");

  const loginPostRequest = async () => {
    try {
      const data = await axios.post(
        "http://localhost:8000/login",
        { email, password },
        { withCredentials: true } // Add this if backend uses cookies
      );
      console.log(data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data, error.response.status);
      } else {
        console.log(error.message);
      }
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
