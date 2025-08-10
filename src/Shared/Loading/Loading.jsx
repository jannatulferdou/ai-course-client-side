import React from 'react';
import { FaCircleNotch } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#020617] relative overflow-hidden">
      {/* Animated Glowing Background Circles */}
      <div className="absolute top-20 left-20 w-48 h-48 rounded-full bg-cyan-400 opacity-10 blur-3xl animate-pulse" />
      <div className="absolute bottom-16 right-16 w-32 h-32 rounded-full bg-blue-500 opacity-10 blur-2xl animate-pulse" />

      {/* Pulsing Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10" />

      <div className="z-10 text-center flex flex-col items-center space-y-6">
        <div className="animate-spin rounded-full border-t-4 border-cyan-500 border-opacity-60 w-16 h-16"></div>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-widest font-mono">
          Neuro<span className="text-cyan-400">Nest</span>
        </h2>

        <p className="text-sm text-gray-400 font-mono tracking-wider">
          Initializing core systems...
        </p>

        {/* Glowing Progress Line */}
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-cyan-400 to-blue-500 animate-[loading_2s_infinite] w-1/2 rounded-full" />
        </div>
      </div>

     
    </div>
  );
};

export default Loading;
