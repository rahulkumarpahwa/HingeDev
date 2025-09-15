import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { fetchUser } from "../utils/fetchUser.js";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (user) return;
    setLoading(true);
    try {
      fetchUser(dispatch);
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
    fetchData();
    // eslint-disable-next-line
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
