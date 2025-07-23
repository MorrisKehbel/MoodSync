import { Link } from "react-router";

export const WhyItMatters = () => {
  return (
    <div className="w-full pt-24 px-4 md:px-10">
      <div className="max-w-3xl flex flex-col justify-center items-center mx-auto p-8 rounded-2xl bg-white/40 shadow-sm">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Understanding Mental Health Research: Why It Matters
        </h1>
        <p className="text-gray-700 mb-4 text-lg leading-relaxed">
          Mental health issues affect millions of people worldwide, and research
          plays a crucial role in how we understand, treat and support those who
          are struggling. Without science, many of the advancements we now take
          for granted—like therapy techniques, medication, and digital
          tools—wouldn’t exist.
        </p>
        <p className="text-gray-700 mb-4 text-lg leading-relaxed">
          Scientists use a variety of research methods to investigate mental
          illnesses. Longitudinal studies follow participants over time, helping
          to identify patterns in mental health. Randomized control trials
          (RCTs) test the effectiveness of treatments, providing reliable data
          on what actually works. These studies are reviewed and replicated by
          peers to ensure accuracy.
        </p>
        <p className="text-gray-700 mb-4 text-lg leading-relaxed">
          One of the most important aspects of mental health research is its
          focus on real-life application. When researchers discover a new
          therapy or tool that shows strong results, it can eventually become
          part of clinical practice. This is how scientific discoveries make
          their way into everyday life, helping therapists, doctors and even
          apps like ours support people more effectively.
        </p>
        <p className="text-gray-700 mb-4 text-lg leading-relaxed">
          Staying informed about new mental health research can empower you to
          make better decisions for yourself and those around you. By
          understanding how studies are conducted and what their results mean,
          you become more equipped to critically evaluate trends,
          recommendations and emerging tools.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          At the heart of all this research is a desire to improve lives.
          Whether you're dealing with stress, anxiety, depression or simply
          trying to maintain your wellbeing, the insights from mental health
          science offer valuable guidance on how to heal, grow and thrive.
        </p>
        <Link to="/science">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 mt-8 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition cursor-pointer">
            Return
          </button>
        </Link>
      </div>
    </div>
  );
};
