// components/HeroFramerStyle.tsx

import React from 'react';

export default function HeroFramerStyle() {
  return (
    <section className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-6 text-center">
      {/* Glowing image */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-60 w-60 rounded-3xl blur-3xl bg-blue-600 opacity-50" />
        </div>
        <img
          src="/logo-glow.png" // replace this with your actual image e.g. /AI.png
          alt="Searchifi Icon"
          className="relative z-10 h-28 w-28 object-contain"
        />
      </div>

      {/* Headline */}
      <h1 className="mt-10 text-4xl sm:text-5xl font-bold text-white">
        Step into the <br className="hidden sm:block" />
        <span className="text-white/80">future of creation</span>
      </h1>

      {/* Subheadline */}
      <p className="mt-4 max-w-xl text-gray-400 text-lg">
        Join thousands of developers sharing beautiful UI components with live previews, AI assistance, and easy collaboration.
      </p>

      {/* CTA buttons */}
      <div className="mt-8 flex gap-4 flex-wrap justify-center">
        <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition">
          Start for free
        </button>
        <button className="bg-gray-800 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-700">
          Start with AI
        </button>
      </div>
    </section>
  );
}
