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

const SwipeCards = ({ onSwipeRight, onSwipeLeft }) => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const [cards, setCards] = useState(feed || []);

  const getFeedData = async () => {
    // If feed already exists in Redux, use it.
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

  // Keep local cards in sync when Redux feed changes
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
          <Card
            key={card._id}
            cards={cards}
            setCards={setCards}
            onSwipeRight={onSwipeRight}
            onSwipeLeft={onSwipeLeft}
            {...card}
          />
        ))}
      </div>
    </>
  );
};

const Card = ({
  _id,
  photoUrl,
  setCards,
  cards,
  onSwipeRight,
  onSwipeLeft,
}) => {
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

    setCards((prevCards) => prevCards.filter((card) => card._id !== _id));

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
        bg-white
        bg-cover
        bg-center
        hover:cursor-grab
        active:cursor-grabbing
      "
      style={{
        backgroundImage: `url(${photoUrl})`,
        gridRow: 1,
        gridColumn: 1,
        zIndex: cardIndex + 1,
        pointerEvents: isFront && !swipeDirection ? "auto" : "none",
        x,
        opacity,
        rotate,
        boxShadow: isFront
          ? // ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
            "0 3px 10px rgb(0,0,0,0.2)"
          : // box-shadow: ;
            undefined,
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
    />
  );
};

export default SwipeCards;

/**

### Usage

jsx
<SwipeCards
  onSwipeRight={(cardId) => {
    console.log("Card completely left screen → RIGHT", cardId);

    // Example:
    // likeCard(cardId);
  }}
  onSwipeLeft={(cardId) => {
    console.log("Card completely left screen → LEFT", cardId);

    // Example:
    // rejectCard(cardId);
  }}
/>



The important flow

The card now behaves like:

```text
User drags
     ↓
Card follows finger
     ↓
User releases
     ↓
Did they cross 100px?
     │
   No ──────→ Card snaps back
     │
    Yes
     ↓
Determine LEFT / RIGHT
     ↓
Animate to -100vw / +100vw
     ↓
Card is completely off-screen
     ↓
onAnimationComplete()
     ↓
Remove card
     ↓
onSwipeLeft() / onSwipeRight()

One subtle improvement here is that **the callback is not fired merely because the user crossed the threshold**. It fires only after the throw animation completes, so if you're using the callback to make an API request, update a database, or move to the next item, it happens at the point you wanted.
***/
