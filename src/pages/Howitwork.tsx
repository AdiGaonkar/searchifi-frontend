import React from "react";
import { Search, Code, Github } from "lucide-react";

const steps = [
  {
    icon: <Search className="text-white" size={28} />,
    title: "Search Projects",
    description:
      "Find projects by technology, category, or keyword that match your interests.",
    bg: "from-purple-500 via-violet-600 to-indigo-500",
  },
  {
    icon: <Code className="text-white" size={28} />,
    title: "Access Code",
    description:
      "View source code, documentation, and demos to understand how things work.",
    bg: "from-pink-500 via-red-500 to-yellow-500",
  },
  {
    icon: <Github className="text-white" size={28} />,
    title: "Contribute",
    description:
      "Share your own projects or contribute to existing ones to help others learn.",
    bg: "from-green-400 via-blue-500 to-purple-600",
  },
];

const Howitwork = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-extrabold mb-4 tracking-tight">
            How Searchifi Works
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-lg">
            Discover, explore, and learn from projects with just a few clicks.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-zinc-900 p-8 rounded-3xl border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Icon Container */}
              <div
                className={`w-16 h-16 mb-6 rounded-full bg-gradient-to-tr ${step.bg} grid place-items-center mx-auto group-hover:scale-105 transition-transform duration-300`}
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-center mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-center text-zinc-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Howitwork;
