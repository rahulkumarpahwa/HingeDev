import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addRequests, removeRequests } from "../utils/requestsSlice.js";
import { MdNotInterested } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { FaHeartBroken } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const handleReviewRequest = async (status, interestedUserId) => {
    try {
      const response = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + interestedUserId,
        {},
        {
          // must pass the empty body in the post request where nothing to send.
          withCredentials: true,
        }
      );
      toast.success(response?.data?.message);
      // console.log(response);
      dispatch(removeRequests(interestedUserId));
      //interested UserID is the one which is sending request to the current user and we have to remove it from store only to show in current state once we have Accepted or Ignored.
    } catch (error) {
      console.log(error);
      error && toast.error(error?.response?.data || error.message);
      console.log(error?.message || error?.response?.data);
    }
  };

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

  if (requests && requests.length == 0)
    return (
      <div className="text-center text-4xl font-bold min-h-[40rem] flex justify-center items-center">
        No, Requests Found!
      </div>
    );

  return (
    <div className="min-h-[40rem] p-8 gap-4 flex items-center justify-center flex-col">
      <h1 className="text-center font-bold text-4xl">Requests</h1>

      <h2 className="font-bold text-xl">Interested In You:</h2>

      <div className="flex items-center justify-center flex-col space-y-5">
        {requests &&
          requests
            .filter((row) => row.status === "interested")
            .map((request) => {
              const {
                _id,
                firstName,
                lastName,
                gender,
                age,
                about,
                photoUrl,
                skills,
              } = request.fromUserId;
              return (
                <div key={_id} className="card  bg-base-100 card-xs shadow-sm">
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
                      <button
                        className="btn btn-primary"
                        onClick={() => handleReviewRequest("accepted", _id)}
                      >
                        <SiTicktick />
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleReviewRequest("rejected", _id)}
                      >
                        <MdNotInterested />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}{" "}
      </div>

      <h2 className="font-bold text-xl">Rejected You:</h2>

      <div className="flex items-center justify-center flex-col space-y-5">
        {requests &&
          requests
            .filter((row) => row.status === "rejected")
            .map((request) => {
              const {
                _id,
                firstName,
                lastName,
                gender,
                age,
                about,
                photoUrl,
                skills,
              } = request.toUserId;
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
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Requests;
