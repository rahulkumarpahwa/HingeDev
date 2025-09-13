// import { useEffect, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";

const Feed = () => {
  // const [feed, setFeed] = useState(null);

  // useEffect(() => {
  //   const getFeedData = async () => {
  //     try {
  //       const response = await axios.get(BASE_URL + "/user/feed", {
  //         withCredentials: true,
  //       });
  //       console.log(response.data);
  //       setFeed(response.data);
  //     } catch (error) {
  //       console.log(error.response.data);
  //     }
  //   };
  //   getFeedData();
  // }, []);

  return (
    <div className="flex justify-center items-center bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6"></p>
          <button className="btn btn-primary">FEED PAGE</button>
        </div>
      </div>
    </div>
  );
};

export default Feed;
