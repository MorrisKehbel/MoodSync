import React from "react";

const activities = [
  "Active time",
  "Learning time",
  "Creative time",
  "Discovery time",
  "Quality time with parents",
  "Play-time",
  "Time with friends",
  "Helping time",
];

export const ChildrenCare = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Children care</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {activities.map((activity) => (
          <div
            key={activity}
            className="h-32 rounded-xl shadow-md bg-white flex items-center justify-center text-center p-4 font-medium"
          >
            {activity}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <button className="px-6 py-2 rounded-lg bg-gray-300 text-gray-700">
          Cancel
        </button>
        <button className="px-6 py-2 rounded-lg bg-blue-600 text-white">
          Save changes
        </button>
      </div>
    </div>
  );
};

export default ChildrenCare;
