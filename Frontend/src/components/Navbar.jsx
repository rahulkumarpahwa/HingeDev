import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

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
      console.log(response);
      return navigate("/login");
    } catch (error) {
      console.log(error?.response?.data || "Something went wrong!");
    }
  };

  return (
    <div className="navbar bg-[#89b0AE] shadow-lg py-3">
      <div className="flex-1">
        <Link className="text-xl" to="/">
          <div className="w-24 h-24 ml-2">
            <img src="./logo.png" alt="logo" className="w-full" />
          </div>
        </Link>
      </div>
      <div className="flex gap-2">
        {/* <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        /> */}
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
                  <a>Edit Profile</a>
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
