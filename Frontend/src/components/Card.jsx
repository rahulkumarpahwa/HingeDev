import { FaHeart } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";

export const Card = ({ user, handleRequestSend }) => {
  const { _id, firstName, lastName, skills, photoUrl, about, age, gender } =
    user;
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
