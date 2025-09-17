import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addRequests } from "../utils/requestsSlice.js";
import { MdNotInterested } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { FaHeartBroken } from "react-icons/fa";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const getRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      // console.log(response.data.data);
      dispatch(addRequests(response.data.data));
    } catch (error) {
      console.log(error.message || error.response.message);
    }
  };

  useEffect(() => {
    getRequests();
  // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-[30rem] p-8 gap-4 flex items-center justify-center flex-col">
      <h1 className="text-center font-bold text-4xl">Requests</h1>

      <h2>Interested In You:</h2>

      <div className="flex items-center justify-center flex-col space-y-5">
        {requests &&
          requests.every((row) => row.status === "interested") &&
          requests.map((connection) => {
            const {
              _id,
              firstName,
              lastName,
              gender,
              age,
              about,
              photoUrl,
              skills,
            } = connection.fromUserId;
            return (
              <div
                key={_id}
                className="card  bg-base-100 card-xs shadow-sm"
              >
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
                    <p>Loves : {skills}</p>
                  </div>
                  <div className="justify-end card-actions">
                    <button className="btn btn-primary">
                      <SiTicktick />
                    </button>
                    <button className="btn btn-secondary">
                      <MdNotInterested />
                    </button>
                  </div>
                  ;
                </div>
              </div>
            );
          })}{" "}
      </div>

      <h2>Rejected You:</h2>

      <div className="flex items-center justify-center flex-col space-y-5">
        {requests &&
          requests.every((row) => row.status === "rejected") &&
          requests.map((connection) => {
            const {
              _id,
              firstName,
              lastName,
              gender,
              age,
              about,
              photoUrl,
              skills,
            } = connection.toUserId;
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
                  <div className="justify-end card-actions">
                    <button className="btn btn-secondary">
                      <FaHeartBroken />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}{" "}
      </div>
    </div>
  );
};

export default Requests;
