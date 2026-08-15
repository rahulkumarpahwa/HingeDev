import React, { useEffect, useState } from "react";
import {
  motion,
  useDragControls,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { addFeed } from "../utils/feedSlice";

import Card from "../components/Card.jsx";

const SwipeCards = ({ onSwipeRight, onSwipeLeft }) => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const [cards, setCards] = useState(feed || []);

  const getFeedData = async () => {
    if (feed && feed.length > 0) {
      setCards(feed);
      return;
    }

    try {
      const response = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      const feedData = response?.data?.feed || [];

      dispatch(addFeed(feedData));
      setCards(feedData);
    } catch (error) {
      const errorMsg =
        typeof error?.response?.data === "string"
          ? error.response.data
          : error?.response?.data?.error || error.message;

      console.log(errorMsg);
      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    getFeedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (feed) {
      setCards(feed);
    }
  }, [feed]);

  if (!cards) return null;

  if (cards.length === 0) {
    return (
      <>
        <Toaster />

        <div className="text-center text-4xl font-bold min-h-[40rem] flex justify-center items-center">
          No Feed!
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster />

      <div className="grid h-[500px] w-full place-items-center bg-neutral-100">
        {cards.map((card) => (
          <SwipeableCard
            key={card._id}
            user={card}
            cards={cards}
            setCards={setCards}
            onSwipeRight={onSwipeRight}
            onSwipeLeft={onSwipeLeft}
          />
        ))}
      </div>
    </>
  );
};

const SwipeableCard = ({
  user,
  setCards,
  cards,
  onSwipeRight,
  onSwipeLeft,
}) => {
  const { _id } = user;

  const x = useMotionValue(0);
  const dragControls = useDragControls();

  const [swipeDirection, setSwipeDirection] = useState(null);

  const cardIndex = cards.findIndex((card) => card._id === _id);

  const isFront = cardIndex === cards.length - 1;

  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);

  const opacity = useTransform(x, [-300, 0, 300], [0, 1, 0]);

  const rotate = useTransform(() => {
    if (isFront) {
      return `${rotateRaw.get()}deg`;
    }

    const offset = cardIndex % 2 === 0 ? 5 : -5;

    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    const currentX = x.get();

    const swipeThreshold = 100;

    if (Math.abs(currentX) < swipeThreshold) {
      return;
    }

    const direction = currentX > 0 ? "right" : "left";

    setSwipeDirection(direction);
  };

  const handleSwipeAnimationComplete = () => {
    if (!swipeDirection) return;

    const direction = swipeDirection;

    // Remove the card locally
    setCards((prevCards) => prevCards.filter((card) => card._id !== _id));

    // Tell parent what happened
    if (direction === "right") {
      onSwipeRight?.(_id);
    } else {
      onSwipeLeft?.(_id);
    }

    setSwipeDirection(null);
  };

  const handlePointerDown = (event) => {
    if (isFront && !swipeDirection) {
      dragControls.start(event, {
        distanceThreshold: 0,
      });
    }
  };

  const exitX =
    swipeDirection === "right"
      ? "100vw"
      : swipeDirection === "left"
        ? "-100vw"
        : 0;

  /*
   * Button click from Card.jsx.
   *
   * We directly trigger the same swipe animation
   * instead of immediately removing the card.
   */
  const handleButtonSwipeRight = () => {
    if (!isFront || swipeDirection) return;

    setSwipeDirection("right");
  };

  const handleButtonSwipeLeft = () => {
    if (!isFront || swipeDirection) return;

    setSwipeDirection("left");
  };

  return (
    <motion.div
      draggable={false}
      onPointerDown={handlePointerDown}
      className="
        h-96
        w-72
        origin-bottom
        touch-none
        select-none
        rounded-lg
        hover:cursor-grab
        active:cursor-grabbing
      "
      style={{
        gridRow: 1,
        gridColumn: 1,
        zIndex: cardIndex + 1,

        pointerEvents: isFront && !swipeDirection ? "auto" : "none",

        x,
        opacity,
        rotate,

        boxShadow: isFront ? "0 3px 10px rgb(0,0,0,0.2)" : undefined,
      }}
      animate={{
        scale: isFront ? 1 : 0.98,
        x: exitX,
      }}
      transition={{
        x: {
          duration: 0.35,
          ease: "easeOut",
        },
        scale: {
          duration: 0.2,
        },
      }}
      drag={isFront && !swipeDirection ? "x" : false}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragSnapToOrigin
      onDragEnd={handleDragEnd}
      onAnimationComplete={handleSwipeAnimationComplete}
    >
      <Card
        user={user}
        isFront={isFront}
        onSwipeRight={handleButtonSwipeRight}
        onSwipeLeft={handleButtonSwipeLeft}
      />
    </motion.div>
  );
};

export default SwipeCards;
