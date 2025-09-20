const Marquee = () => {
  return (
    <div
      className="relative w-full overflow-hidden h-4 flex items-center"
    >
      <div
        className="animate-marquee whitespace-nowrap text-[##ec4899] text-md font-bold"
        style={{ fontFamily: "Bitcount Ink" }}
      >
        {Array(6).fill(marqueeText)}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          min-width: 100%;
          animation: marquee 12s linear infinite;
        }
        @media (max-width: 640px) {
          .animate-marquee {
            font-size: 0.85rem;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
          .relative {
            height: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
};

const marqueeText = "Because developers deserve their own match.    ";
export default Marquee;
