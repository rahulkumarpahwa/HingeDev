import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants.js";
import axios from "axios";
import { addUser } from "../utils/userSlice.js";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    if (user) return;
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      console.log(response.data);
      dispatch(addUser(response.data));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      error.response != null
        ? console.log(error.response.data)
        : console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
