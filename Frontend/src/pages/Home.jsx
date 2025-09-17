import { useNavigate } from "react-router";
import { GiLovers } from "react-icons/gi";

export const Home = () => {
  const navigate = useNavigate();
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
            {" "}
            HingeDev <br />
            "Because developers deserve their own match."
          </h1>
          <p className="mb-5">
            HingeDev is a full-stack Social Discovery Platform for developers.
            Built with React.js, Tailwind CSS, DaisyUI, Redux Toolkit, Node.js,
            Express.js, MongoDB, and JWT authentication, it helps developers
            discover, connect, and collaborate with like-minded peers.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/login");
            }}
          >
            Let's Go! <span>
              <GiLovers  />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
