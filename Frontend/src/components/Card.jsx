import { FaHeart } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";

export const Card = ({ user }) => {
  const { firstName, lastName, skills, photoUrl, about, age, gender } =
    user;
  return (
    <div className="card bg-base-200 text-center shadow-xl border-2 border-zinc-300 w-md h-[35rem]" >
      <figure className="">
        <img src={photoUrl} alt={firstName} className="w-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
          <div className="badge badge-primary">{age}{"  "}{gender == "male" ? "M" : "F"}</div>
        </h2>
        <p>
         {about}
        </p>
        <p>
         Loves : {skills.toString()}
        </p>
        <div className="card-actions justify-center text-3xl">
          <div className="badge badge-outline text-green-600"><FaHeart  size={20} /></div>
          <div className="badge badge-outline text-red-500"><FaXmark size={20} /></div>
        </div>
      </div>
    </div>
  );
};
