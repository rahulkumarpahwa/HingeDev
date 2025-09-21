import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { Card } from "../components/Card";
import toast, { Toaster } from "react-hot-toast";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeedData = async () => {
    if (feed) {
      // we will get the feed only when we don't have the feed in the store.
      return;
    }
    try {
      const response = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      // console.log(response);
      dispatch(addFeed(response?.data?.data));
      // setFeed(response.data);
    } catch (error) {
      const errorMsg =
        typeof error?.response?.data === "string"
          ? error?.response?.data
          : error?.response?.data?.error || error.message;
      console.log(errorMsg);
      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    getFeedData();
    // eslint-disable-next-line
  }, []);

  if (!feed) return;

  if (feed.length == 0)
    return (
      <div className="text-center text-4xl font-bold min-h-[40rem] flex justify-center items-center">
        No Feed!
      </div>
    );

  return (
    feed && (
      <div className="flex justify-center items-center  p-8">
        <div className="stack w-xs stack-start">
          {feed.map((row) => (
            <Card user={row} key={row._id} />
          ))}
        </div>
        <Toaster />
      </div>
    )
  );
};

export default Feed;

// we will call the feed API to get the feed and then put the data in the feed slice (new created one). don't forget to pass the credentials in the api.
// we will call the feed API whenever the data is not in the store only then we will call the api and get the data.
// we will put the method in the use effect to make it before the component actually loads.
