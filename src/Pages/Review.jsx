import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaQuoteRight } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";

const Review = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("https://ai-course-server.vercel.app/reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to load reviews:", err));
  }, []);

  if (reviews.length === 0) return null;

  const loopReviews = [...reviews, ...reviews]; // Loop for scroll effect

  return (
    <section className="bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white py-16 overflow-hidden space-y-12 relative">
      {/* Scroll animation styles */}
      <style>
  {`
    .scroll-left, .scroll-right {
      display: flex;
      width: max-content;
    }

    .group:hover .scroll-left,
    .group:hover .scroll-right {
      animation-play-state: paused;
    }

    .scroll-left {
      animation: scrollLeft 90s linear infinite;
    }

    .scroll-right {
      animation: scrollRight 150s linear infinite;
    }

    @keyframes scrollLeft {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }

    @keyframes scrollRight {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0%); }
    }
  `}
</style>


      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl md:ml-30 lg:ml-75 flex gap-3 text-cyan-400 font-bold text-center mb-15">
          <PiStudentBold className="" />What Our Students Say
        </h2>

        {/* 🔹 Scroll Left Line */}
       <div className="overflow-hidden whitespace-nowrap group mb-10">
  <div className="scroll-left gap-8">
    {loopReviews.map((review, i) => (
      <ReviewCard key={`left-${i}`} review={review} />
    ))}
  </div>
</div>


        
        <div className="overflow-hidden whitespace-nowrap group">
  <div className="scroll-right gap-8">
    {loopReviews.map((review, i) => (
      <ReviewCard key={`right-${i}`} review={review} />
    ))}
  </div>
</div>

      </div>
    </section>
  );
};

const ReviewCard = ({ review }) => (
  <div className="min-w-96 max-w-96 min-h-[320px] bg-[#1b1b2e] p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full overflow-hidden">
    
    <div className="flex mb-4 text-yellow-400 text-lg">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar
          key={i}
          className={i < Math.round(review.rating) ? "" : "text-gray-600"}
        />
      ))}
    </div>

    
    <p className="text-base text-gray-300 italic mb-6 leading-relaxed break-words whitespace-normal overflow-hidden">
      “{review.comment}”
    </p>

    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <img
          src={review.studentImage}
          alt={review.studentName}
          className="w-14 h-14 rounded-full border-2 border-transparent bg-gradient-to-br from-cyan-500 to-blue-600 p-[2px] object-cover"
        />
        <div>
          <h4 className="text-white font-semibold text-base">{review.studentName}</h4>
          <p className="text-sm text-gray-400">Student</p>
        </div>
      </div>
      <FaQuoteRight className="text-cyan-700 text-2xl" />
    </div>
  </div>
);

export default Review;
