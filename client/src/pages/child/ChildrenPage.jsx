import { useState } from "react";
import { FaSadTear, FaAngry, FaMeh } from "react-icons/fa";

const moods = [
  { id: "angry", label: "ANGRY", icon: <FaAngry className="text-4xl" /> },
  { id: "sad", label: "SAD", icon: <FaSadTear className="text-4xl" /> },
  { id: "scared", label: "SCARED", icon: <FaMeh className="text-4xl" /> },
];

export const HealingStories = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleClick = (moodId) => {
    setSelectedMood(moodId);
    alert(`You clicked: ${moodId.toUpperCase()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">
          Healing stories for children
        </h1>
        <p className="text-center text-gray-700 mb-8 max-w-xl mx-auto">
          This collection of stories is created to support children and
          parents and help to develop emotional intelligence.

          Fairy tale therapy for children has a wonderful effect! 
          We offer you a collection of stories for your children 
          to make everyday life more comfortable and enjoyable.

          To start fairy tale therapy, simply click on an emotion, and 
          you will receive a collection of therapeutic stories that will 
          help your child process and navigate that emotion.
          <br />
          Click when your child feels:
        </p>

        <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-md grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => handleClick(mood.id)}
              className="flex flex-col items-center p-6 border border-gray-300 rounded-xl bg-white hover:bg-blue-100 transition shadow-sm"
            >
              <span className="font-bold text-lg mb-2">{mood.label}</span>
              <div>{mood.icon}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
