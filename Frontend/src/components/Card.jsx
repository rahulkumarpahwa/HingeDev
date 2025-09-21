import { FaHeart } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import toast, { Toaster } from "react-hot-toast";

export const Card = ({ user, triggerSwipe }) => {
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
        if (triggerSwipe) triggerSwipe("right");
      } else {
        toast("😭 Ignored!");
        if (triggerSwipe) triggerSwipe("left");
      }
      dispatch(removeFeed(_toWhomWeAreInterested));
      // we are passing the user which will be on the feed and we have to remove it, when clicked interested or ignored.
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data || error.message);
    }
  };

  return (
    <div className="card bg-[#fff3f5] text-center shadow-xl border-2 border-zinc-300 w-full max-w-xs md:max-w-md mx-auto flex flex-col">
      <figure className="w-full h-48 md:h-84 overflow-hidden flex items-center justify-center">
        <img
          src={photoUrl}
          alt={firstName}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </figure>
      <div className="card-body flex flex-col gap-2 p-4">
        <p className="card-title flex flex-col md:flex-row items-center justify-center gap-2 text-lg md:text-xl italic">
          <span>
            {firstName} {lastName}
          </span>
          <div className="badge badge-primary text-xs md:text-sm">
            {age} {gender == "male" ? "M" : gender == "female" ? "F" : "O"}
          </div>
        </p>
        <p className="md:text-base text-justify">{about}</p>
        <div className="flex flex-wrap gap-2 justify-center items-center mb-2">
          {skills &&
            skills.map((skill, idx) => (
              <span
                key={skill + idx}
                className="inline-block bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs md:text-sm font-semibold border border-purple-300"
              >
                {skill}
              </span>
            ))}
        </div>
        <div className="card-actions justify-center text-2xl md:text-3xl gap-4 mt-2">
          <button
            className="text-green-600 btn btn-primary px-3 py-2 min-w-[120px]"
            onClick={() => handleRequestSend("interested", _id)}
          >
            <FaHeart size={20} />
          </button>
          <button
            className="text-red-500 btn btn-secondary px-3 py-2 min-w-[120px]"
            onClick={() => handleRequestSend("ignored", _id)}
          >
            <FaXmark size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
