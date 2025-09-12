import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  //the above one is the is subscribing to the user.
  const dispatch = useDispatch();
  return (
    <div className="navbar bg-[#89b0AE] shadow-lg py-3">
      <div className="flex-1">
        <a className="text-xl">
          <div className="w-24 h-24 ml-2">
            <img src="./logo.png" alt="logo" className="w-full" />
          </div>
        </a>
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
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Edit Profile</a>
                </li>
                <li>
                  <a>Change Password</a>
                </li>
                <li>
                  <button onClick={() => dispatch(removeUser())}>Logout</button>
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
