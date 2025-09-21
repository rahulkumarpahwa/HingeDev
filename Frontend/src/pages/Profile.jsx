import { useSelector } from "react-redux";
import { GrEmptyCircle } from "react-icons/gr";
import { useNavigate } from "react-router";

export const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const { firstName, lastName, age, skills, about, photoUrl, gender } = user;
  return (
    user && (
      <div className="flex items-center justify-center w-full">
        <div className="flex items-center md:items-start justify-center flex-col p-4 gap-6 min-h-full w-full max-w-2xl">
          <h1 className="text-center font-bold text-2xl md:text-4xl">
            Profile Details
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-between md:space-x-12 gap-8 w-full">
            <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8 gap-4 w-full">
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-32 rounded-full ring-2 ring-offset-2">
                  <img src={photoUrl} />
                </div>
              </div>
              <div className="flex justify-center flex-col items-center md:items-start w-full">
                <p className="font-bold text-lg md:text-xl text-center md:text-left">
                  {firstName} {lastName}
                </p>
                {age && gender && (
                  <div className="grid grid-cols-2 gap-1 space-x-2 text-sm md:text-base">
                    <p>Age</p>
                    <p> {age}</p>
                    <p>Gender </p>
                    <p> {gender.charAt(0).toUpperCase() + gender.slice(1)}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center flex-col space-y-3 w-full md:w-auto mt-4 md:mt-0">
              <button
                className="border-2 p-2 w-40 md:w-48 rounded-xs border-blue-500 text-blue-400 font-bold hover:bg-blue-600 hover:text-white"
                onClick={() => navigate("/editprofile")}
              >
                Edit Profile
              </button>
              <button className="border-2 p-2 w-40 md:w-48 rounded-xs border-blue-500 text-blue-400 font-bold hover:bg-blue-600 hover:text-white">
                Change Password
              </button>
            </div>
          </div>

          <div className="w-full">
            <h2 className="text-2xl md:text-3xl py-5">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-1 md:space-x-6">
              {skills &&
                skills.map((item) => (
                  <div
                    className="flex justify-center items-center gap-2"
                    key={item}
                  >
                    <span>
                      <GrEmptyCircle />
                    </span>
                    {item}
                  </div>
                ))}
            </div>
          </div>

          <div className="w-full">
            <h2 className="text-2xl md:text-3xl py-5 text-wrap">About Me</h2>
            <p className="line-clamp-2 text-sm md:text-base">{about}</p>
          </div>
        </div>
      </div>
    )
  );
};
