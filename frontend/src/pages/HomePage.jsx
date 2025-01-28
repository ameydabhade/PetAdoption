import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-gray-800 mb-6 animate-fade-in">
          Welcome to the
          <span className="text-purple-600"> Pet World</span>
        </h1>

        <h2 className="text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-12">
          Discover the joy of bringing home a furry friend. Together, let's give
          every pet a loving home they deserve.
        </h2>

        <div className="space-y-8">
          <Link to="/pet-listings">
            <button className="transform hover:scale-105 transition-all duration-300 bg-purple-600 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300">
              Find Your Perfect Companion
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
