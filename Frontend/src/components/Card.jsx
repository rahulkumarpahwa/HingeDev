import React from "react";
import { FaHeart, FaTimes } from "react-icons/fa";
import { format } from "date-fns";

const Card = ({ user, onSwipeRight, onSwipeLeft, isFront = false }) => {
  if (!user) return null;

  const {
    _id,
    displayName,
    firstName,
    lastName,
    skills,
    photoUrl,
    bio,
    dateOfBirth,
    gender,
  } = user;

  const handleLike = (e) => {
    e.stopPropagation();
    onSwipeRight?.(_id);
  };

  const handleIgnore = (e) => {
    e.stopPropagation();
    onSwipeLeft?.(_id);
  };

  return (
    <div
      className="
        card
        text-center
        shadow-xl
        border-2
        border-zinc-300
        w-full
        max-w-xs
        md:max-w-md
        mx-auto
        flex
        flex-col
        justify-end
        items-center
        min-h-[450px]
        md:min-h-[500px]
        relative
        overflow-hidden
        rounded-lg
      "
      style={{
        backgroundImage: `url(${photoUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark gradient so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="flex flex-col relative z-10 w-full mt-auto text-white p-4">
        {/* Name + age/gender */}
        <div className="flex gap-2 text-lg md:text-xl italic items-center">
          <span className="font-semibold">
            {firstName} {lastName[0]}.
          </span>

          <div className="text-white not-italic flex items-center justify-center gap-1">
            {dateOfBirth && (
              <span>{format(new Date(dateOfBirth), "dd MMM, yyyy")}</span>
            )}
          </div>
        </div>

        {/* Bio */}
        {bio && (
          <p className="md:text-base text-sm text-left mt-1 line-clamp-3">
            {bio}
          </p>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <div className="flex gap-2 items-center py-2 overflow-x-auto overflow-y-hidden px-1 no-scrollbar">
            {skills.map((skill, idx) => (
              <span
                key={`${skill}-${idx}`}
                className="
                  inline-block
                  px-2
                  py-1
                  rounded-xl
                  text-xs
                  font-semibold
                  ring-1
                  ring-purple-500
                  bg-white/30
                  backdrop-saturate-125
                  text-white
                  whitespace-nowrap
                "
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Buttons */}
        {isFront && (
          <div className="flex justify-center items-center gap-6 mt-2">
            {/* Ignore */}
            <button
              type="button"
              className="
                text-red-500
                bg-white
                hover:bg-red-50
                rounded-full
                p-3
                shadow-lg
                transition
                hover:scale-110
              "
              onPointerDown={(e) => e.stopPropagation()}
              onClick={handleIgnore}
            >
              <FaTimes size={22} />
            </button>

            {/* Interested */}
            <button
              type="button"
              className="
                text-green-600
                bg-white
                hover:bg-green-50
                rounded-full
                p-3
                shadow-lg
                transition
                hover:scale-110
              "
              onPointerDown={(e) => e.stopPropagation()}
              onClick={handleLike}
            >
              <FaHeart size={22} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
