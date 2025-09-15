import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { Card } from "../components/Card";

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
      console.log(response.data);
      dispatch(addFeed(response?.data?.data));
      // setFeed(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getFeedData();
    // eslint-disable-next-line
  }, []);

  return (
    feed && (
      <div className="flex justify-center items-center bg-base-200 p-8">
        <div className="stack w-xs stack-start">
          {feed.map((row, index) => {
            return <Card key={index} user={row} />;
          })}
        </div>
      </div>
    )
  );
};

export default Feed;

// we will call the feed API to get the feed and then put the data in the feed slice (new created one). don't forget to pass the credentials in the api.
// we will call the feed API whenever the data is not in the store only then we will call the api and get the data.
// we will put the method in the use effect to make it before the component actually loads.
