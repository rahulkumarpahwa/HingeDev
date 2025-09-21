import { FaHeart, FaTimes } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import toast, { Toaster } from "react-hot-toast";
import { FaTransgender } from "react-icons/fa6";

export const Card = ({ user }) => {
  const { _id, firstName, lastName, skills, photoUrl, about, age, gender } =
    user;
  const dispatch = useDispatch();

  const handleRequestSend = async (status, _toWhomWeAreInterested) => {
    try {
      const response = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _toWhomWeAreInterested,
        {},
        { withCredentials: true }
      );
      console.log(response);
      if (response && status == "interested") {
        toast("❤️ Interested!");
      } else {
        toast("😭 Ignored!");
      }
      dispatch(removeFeed(_toWhomWeAreInterested));
    } catch (error) {
      if (!_id) {
        toast.error("Not Valid Here! try in the feed!");
        return;
      }
      console.log(error);
      const errData = error?.response?.data;
      const msg =
        typeof errData === "string"
          ? errData
          : errData && typeof errData === "object"
          ? errData.error || errData.message || JSON.stringify(errData)
          : error?.message || "An error occurred";
      toast.error(msg);
    }
  };

  return (
    <div
      className="card text-center shadow-xl border-2 border-zinc-300 w-full max-w-xs md:max-w-md mx-auto flex flex-col justify-end items-center min-h-[450px] md:min-h-[500px] relative overflow-hidden"
      style={{
        backgroundImage: `url(${photoUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col relative z-10 w-full mt-auto text-white p-4">
        <div className="flex flex-row gap-2 text-lg md:text-xl italic">
          <span>
            {firstName} {_id == undefined && lastName}
          </span>
          <div className=" text-white not-italic flex items-center justify-center gap-1 ">
            {age}{" "}
            {gender == "male" ? (
              "♂️"
            ) : gender == "female" ? (
              "♀️"
            ) : (
              <FaTransgender color="pink" size={17} />
            )}
          </div>
        </div>
        <p className="md:text-base text-justify truncate hover:overflow-visible hover:text-wrap ">
          {about}
        </p>
        <div className="flex gap-2 items-center py-2 overflow-x-auto overflow-y-hidden px-1 no-scrollbar">
          {skills &&
            skills.map((skill, idx) => (
              <span
                key={skill + idx}
                className="inline-block px-2 py-1 rounded-xl text-xs font-semibold bg- ring-1 ring-purple-500 bg-white/30  backdrop-saturate-125 text-zinc-300"
              >
                {skill}
              </span>
            ))}
        </div>
        <div className="card-actions justify-center text-2xl md:text-3xl gap-4 mt-2">
          <button
            className="text-red-500 btn btn-secondary rounded-full p-2"
            onClick={() => handleRequestSend("ignored", _id)}
          >
            <FaTimes size={20} />
          </button>
          <button
            className="text-green-600 btn btn-primary rounded-full p-2"
            onClick={() => handleRequestSend("interested", _id)}
          >
            <FaHeart size={20} />
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};
