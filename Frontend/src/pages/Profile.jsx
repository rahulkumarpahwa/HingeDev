import { useSelector } from "react-redux";
import { GrEmptyCircle } from "react-icons/gr";
import { useNavigate } from "react-router";

export const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const { firstName, lastName, age, skills, about, photoUrl, gender } = user;
  return (
    user && (
      <div className="flex items-center justify-center ">
        <div className="flex items-start justify-center flex-col p-8 gap-8 min-h-full">
          <h1 className="text-center font-bold text-4xl">Profile Details</h1>
          <div className="flex items-center justify-between space-x-12 gap-40">
            <div className="flex items-center justify-center space-x-8">
              <div className="w-[150px] h-[150px]">
                <img
                  src={photoUrl}
                  alt={firstName}
                  className="w-full h-full rounded-full"
                />
              </div>
              <div className="flex items-center justify-center flex-col">
                <p className="font-bold text-2xl">
                  {firstName} {lastName}
                </p>
                <div className="grid grid-cols-2 gap-1 space-x-5">
                  <p>Age</p>
                  <p> {age}</p>
                  <p>Gender </p>
                  <p> {gender}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center flex-col space-y-3">
              <button
                className="border-2 p-2 w-48 rounded-xs border-blue-500 text-blue-400 font-bold hover:bg-blue-600 hover:text-white"
                onClick={() => navigate("/editprofile")}
              >
                Edit Profile
              </button>
              <button className="border-2 p-2 w-48 rounded-xs border-blue-500 text-blue-400 font-bold hover:bg-blue-600 hover:text-white">
                Change Password
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-3xl py-5">Skills</h2>
            <div className="grid grid-cols-4 gap-1 space-x-6">
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

          <div className="">
            <h2 className="text-3xl py-5 text-wrap">About Me</h2>
            <p className="line-clamp-2">{about}</p>
          </div>
        </div>
      </div>
    )
  );
};
