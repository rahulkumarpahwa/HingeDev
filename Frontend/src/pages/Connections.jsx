import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice.js";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const getConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(response.data.data);
      dispatch(addConnections(response.data.data));
    } catch (error) {
      console.log(error.message || error?.response?.message);
    }
  };

  useEffect(() => {
    getConnections();
  // eslint-disable-next-line
  }, []);

  if (connections && connections.length == 0)
    return (
      <div className="text-center text-4xl font-bold">
        No! Connections Found!
      </div>
    );

  return (
    <div className="min-h-[30rem] p-8 gap-4 flex items-center justify-center flex-col">
      <h1 className="text-center font-bold text-4xl">Connections</h1>
      <div className="flex items-center justify-center flex-col space-y-5">
      {connections &&
        connections.map((connection) => {
          const {
            _id,
            firstName,
            lastName,
            gender,
            age,
            about,
            photoUrl,
            skills,
          } = connection;
          return (
            <div key={_id} className="card bg-base-100 card-xs shadow-sm">
              <div className="p-4 flex items-center justify-center space-x-4">
                <div className="avatar">
                  <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                    <img src={photoUrl} />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="card-title">
                    {firstName + " " + lastName}{" "}
                    <div className="badge badge-primary">
                      {age}
                      {"  "}
                      {gender == "male" ? "M" : "F"}
                    </div>
                  </h2>
                  <p>{about}</p>
                  <p>Loves : {skills.toString()}</p>
                </div>
              </div>
            </div>
          );
        })}{" "}
        </div>
    </div>
  );
};
export default Connections;
