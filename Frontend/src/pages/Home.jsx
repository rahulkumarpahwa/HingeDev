import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(/home_photo.jpg)",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="">
          <h1 className="mb-5 text-5xl font-bold">
            "Because developers deserve their own match."
          </h1>
          <p className="mb-5">
            HingeDEV is a full-stack Social Discovery Platform for developers.
            Built with React.js, Tailwind CSS, DaisyUI, Redux Toolkit, Node.js,
            Express.js, MongoDB, and JWT authentication, it helps developers
            discover, connect, and collaborate with like-minded peers.
          </p>
          <button
            className="btn bg-[#fe3770] text-white"
            onClick={() => {
              user ? navigate("/feed") : navigate("/login");
            }}
          >
            Let's Find Match! <span></span>
          </button>
        </div>
      </div>
    </div>
  );
};
