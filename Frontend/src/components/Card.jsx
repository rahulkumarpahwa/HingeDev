import { FaHeart } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import toast, { Toaster } from "react-hot-toast";

export const Card = ({ user }) => {
  const { _id, firstName, lastName, skills, photoUrl, about, age, gender } =
    user;
  const dispatch = useDispatch();

  const handleRequestSend = async (status, _toWhomWeAreInterested) => {
    try {
      const response = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _toWhomWeAreInterested,
        {}, // always pass the empty body when nothing to send.
        { withCredentials: true }
      );
      console.log(response);
      if (response && status == "interested") {
        toast("❤️ Interested!");
      } else {
        toast("😭 Ignored!");
      }
      dispatch(removeFeed(_toWhomWeAreInterested));
      // we are passing the user which will be on the feed and we have to remove it, when clicked interested or ignored.
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data || error.message);
    }
  };

  return (
    <div className="card bg-base-200 text-center shadow-xl border-2 border-zinc-300 w-md">
      <figure className="">
        <img src={photoUrl} alt={firstName} className="w-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
          <div className="badge badge-primary">
            {age}
            {"  "}
            {gender == "male" ? "M" : "F"}
          </div>
        </h2>
        <p>{about}</p>
        <p>Loves : {skills.toString()}</p>
        <div className="card-actions justify-center text-3xl">
          <button
            className=" text-green-600 btn btn-primary"
            onClick={() => handleRequestSend("interested", _id)}
          >
            <FaHeart size={20} />
          </button>

          <button
            className=" text-red-500 btn btn-secondary"
            onClick={() => handleRequestSend("ignored", _id)}
          >
            <FaXmark size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
