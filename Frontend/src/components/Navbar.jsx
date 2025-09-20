import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router";
import Marquee from "./Marquee";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeFeed } from "../utils/feedSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  //the above one is the is subscribing to the user.
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      dispatch(removeFeed()); // deleting the feed is important, otherwise the next user on login will get the same feed.
      console.log(response);
      return navigate("/login");
    } catch (error) {
      console.log(error?.response?.data || "Something went wrong!");
    }
  };

  return (
    <div className="navbar flex flex-col items-center justify-center min-h-0 w-full bg-white shadow-sm shadow-[#fe3770] z-50">
      <div className="w-full flex flex-col items-center justify-center mb-2">
        <Link
          to="/"
          className="text-4xl font-extrabold text-[#fe3770] flex items-center gap-0.5"
          style={{ fontStyle: "italic" }}
        >
          <span className="relative inline-block">
            H
            <span className="relative inline-block">
              <span className="inline-block" style={{ position: "relative" }}>
                i
                <span
                  className="absolute left-1/2 -translate-x-1/3 -top-1.5 text-xs"
                  style={{ pointerEvents: "none" }}
                >
                  &#128151;
                </span>
              </span>
            </span>
            nge
          </span>
          <span
            className="font-extrabold text-transparent"
            style={{ WebkitTextStroke: "1px #ec4855" }}
          >
            &lt;DEV/&gt;
          </span>
        </Link>
      </div>
      {!user && <Marquee />}
      <div className="w-full flex justify-end items-center">
        {user && (
          <div className="flex justify-center gap-2 items-center">
            <span>Welcome! {user.firstName}</span>
            <div className="dropdown dropdown-end mx-2">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt={user.firstName} src={user.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link className="justify-between" to="/profile">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link className="justify-between" to="/feed">
                    Feed
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/editprofile"}>Edit Profile</Link>
                </li>
                <li>
                  <Link to={"/connections"}>Connections</Link>
                </li>

                <li>
                  <Link to={"/requests"}>Requests</Link>
                </li>
                <li>
                  <a>Change Password</a>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
