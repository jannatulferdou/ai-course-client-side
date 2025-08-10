import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import errorAnim from './error.json'; // Replace with your Lottie 404 file

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] relative overflow-hidden flex items-center justify-center px-4 py-20 font-mono">
      {/* Glowing Gradient Circles */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-400 opacity-10 blur-[150px] animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 opacity-10 blur-[200px] animate-ping" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-[0.05] z-0" />

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-xl w-full backdrop-blur-lg bg-white/5 border border-cyan-400/10 rounded-2xl shadow-2xl text-center px-6 py-12 space-y-6">

        {/* Lottie animation */}
        <div className="w-64 mx-auto">
          <Lottie animationData={errorAnim} loop />
        </div>

        {/* Title with flicker */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-wide">
          <span className="text-cyan-400 animate-flicker">404</span> - Page Not Found
        </h1>

        {/* Subtext */}
        <p className="text-gray-400 text-base md:text-lg leading-relaxed">
          Sorry, the page you're looking for doesn’t exist or has been relocated in the matrix.
        </p>

        {/* Action Button */}
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-md shadow-lg hover:scale-105 hover:shadow-cyan-500/40 transition-all duration-300 border border-cyan-400/30"
        >
          ⬅ Go Back to Home
        </button>
      </div>

   
    </div>
  );
};

export default ErrorPage;
