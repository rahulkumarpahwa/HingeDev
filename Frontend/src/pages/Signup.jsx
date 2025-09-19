import { useReducer, useState } from "react";
import { reducer } from "../utils/signupProfileReducer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

export const Signup = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const putFirstName = (firstName) => {
    dispatch({ type: "PUT_FIRSTNAME", payload: firstName });
  };
  const putLastName = (lastName) => {
    dispatch({ type: "PUT_LASTNAME", payload: lastName });
  };
  const putEmail = (email) => {
    dispatch({ type: "PUT_EMAIL", payload: email });
  };
  const putPassword = (password) => {
    dispatch({ type: "PUT_PASSWORD", payload: password });
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(BASE_URL + "/signup", state, {
        withCredentials: true,
      });
      console.log(response);
      setTimeout(() => {
        toast.success(response.data.message + "!");
        return navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
      console.log(error?.message || error?.response?.data);
      toast.error(error?.message || error?.response?.data);
      setError(error?.message || error?.response?.data);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
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
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={state.email}
                onChange={(e) => {
                  putEmail(e.target.value);
                }}
              />
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={state.password}
                onChange={(e) => {
                  putPassword(e.target.value);
                }}
              />
              <p className="text-red-500 text-center font-bold">{error}</p>
              <button className="btn btn-neutral mt-4" onClick={handleSignUp}>
                SignUp
              </button>
              <button
                className="btn btn-neutral mt-4"
                onClick={() => navigate("/login")}
              >
                Login Instead!
              </button>
            </fieldset>
          </div>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
      </div>
    </div>
  );
};
