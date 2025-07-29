import { useState } from "react";
import { PageSlideContainer } from "../../components/shared/wrapper/PageSlideContainer";

const moodIcons = ["😐", "🙂", "😊"];
const today = new Date();

const getMonthDays = (year, month) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

export const MyJourney = () => {
  const [summary, setSummary] = useState("");
  const [moods, setMoods] = useState({});
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const days = getMonthDays(currentYear, currentMonth);

  const handleMoodChange = (dateStr) => {
    const nextMood =
      ((moods[dateStr] ?? 0) + 1) % moodIcons.length;
    setMoods((prev) => ({ ...prev, [dateStr]: nextMood }));
  };

  const handleAddActivities = () => {
    alert("Redirect to activity entry page (coming soon!)");
  };

  return (
    <PageSlideContainer>
      <section className="flex flex-col px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-6">
          <textarea
            placeholder="ai summary / motivation / advice"
            className="w-full min-h-[120px] p-4 text-gray-800 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none mb-6 bg-white/90"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />

          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              July {currentYear}
            </h2>
            <div className="flex justify-center items-center gap-4 text-2xl">
              <button className="text-gray-400">&lt;</button>
              <button className="text-gray-400">&gt;</button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-3 mb-8 text-center text-sm">
            {days.map((day) => {
              const dateStr = day.toISOString().split("T")[0];
              const moodIndex = moods[dateStr] ?? 0;
              const isToday =
                day.toDateString() === today.toDateString();

              return (
                <div
                  key={dateStr}
                  className={`flex flex-col items-center justify-center rounded-xl border p-2 cursor-pointer transition ${
                    isToday
                      ? "bg-blue-600 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                  onClick={() => handleMoodChange(dateStr)}
                >
                  <span className="font-medium text-xs">
                    {day.toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </span>
                  <span className="text-sm">
                    {day.getDate()}
                  </span>
                  <span className="text-lg">
                    {moodIcons[moodIndex]}
                  </span>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleAddActivities}
            className="block w-full bg-blue-600 hover:bg-blue-500 text-white text-lg font-semibold py-3 rounded-full shadow-md transition hover:scale-105"
          >
            Add your today's activities
          </button>
        </div>
      </section>
    </PageSlideContainer>
  );
};
