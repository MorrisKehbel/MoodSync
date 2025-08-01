import { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import { PageSlideContainer } from "../../components/shared/wrapper/PageSlideContainer";

import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

import {
  useAllDailyActivitiesQuery,
  useAiSummary,
} from "../../queries/queryHooks";

import { updateDailyActivities } from "../../data/activities";
import {
  imgHappy,
  imgCalm,
  imgNeutral,
  imgSad,
  imgAngry,
} from "../../assets/emotions/";

import { useUser } from "../../context";

const emotions = [
  { id: 1, name: "Happy", image: imgHappy },
  { id: 2, name: "Calm", image: imgCalm },
  { id: 3, name: "Neutral", image: imgNeutral },
  { id: 4, name: "Sad", image: imgSad },
  { id: 5, name: "Angry", image: imgAngry },
];

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
  const [userData, setUserData] = useState([]);
  const [uiData, setAiData] = useState([]);
  const [selectedEmotions, setSelectedEmotions] = useState({});
  const { user } = useUser();
  const emotionTimers = useRef({});

  const [monthOffset, setMonthOffset] = useState(0);

  const targetDate = new Date(
    today.getFullYear(),
    today.getMonth() + monthOffset
  );
  const currentMonth = targetDate.getMonth();
  const currentYear = targetDate.getFullYear();

  const days = getMonthDays(currentYear, currentMonth);

  const { data: allDailyActivities } = useQuery(useAllDailyActivitiesQuery());
  const {
    data: aiSummary,
    isError,
    error,
  } = useQuery({
    ...useAiSummary(),
    enabled: user?.settings?.aiTips === true,
  });

  useEffect(() => {
    if (isError && error instanceof Error) {
      toast.error(error.message);
    }
  }, [isError, error]);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (allDailyActivities) {
      setUserData(allDailyActivities?.existingEntries || []);
    }

    if (aiSummary) {
      setAiData(aiSummary?.summary || []);
    }
  }, [allDailyActivities, aiSummary]);

  const dataByDate = useMemo(() => {
    return Object.fromEntries(
      userData.map((entry) => [entry.date, entry.emotion])
    );
  }, [userData]);

  const pendingUpdates = useRef({});

  const handleMoodChange = (dateStr) => {
    setSelectedEmotions((prev) => {
      const currentEmotion =
        prev[dateStr] || dataByDate[dateStr] || emotions[0].name;
      const currentIndex = emotions.findIndex((e) => e.name === currentEmotion);
      const nextEmotion = emotions[(currentIndex + 1) % emotions.length].name;

      pendingUpdates.current[dateStr] = nextEmotion;

      if (emotionTimers.current[dateStr]) {
        clearTimeout(emotionTimers.current[dateStr]);
      }

      emotionTimers.current[dateStr] = setTimeout(async () => {
        const entries = Object.entries(pendingUpdates.current).map(
          ([date, emotion]) => ({ date, emotion })
        );

        if (entries.length === 0) return;

        try {
          const data = await updateDailyActivities(entries);

          if (!data || typeof data !== "object") {
            throw new Error("No valid response from server");
          }
          queryClient.invalidateQueries({ queryKey: ["allDailyActivities"] });
          toast.success(
            data.message || "Your emotions have been saved successfully!"
          );
        } catch (error) {
          console.error("Failed to update emotions:", error);
          toast.error("Failed to save your emotions. Please try again.");
        }

        pendingUpdates.current = {};
      }, 2000);

      return {
        ...prev,
        [dateStr]: nextEmotion,
      };
    });
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        style={{ zIndex: 100 }}
      />
      <PageSlideContainer>
        <section className="flex flex-col justify-center items-center text-center">
          <div className="w-full ">
            {user.settings.aiTips ? (
              <textarea
                id="ai-summary"
                name="ai-summary"
                placeholder={
                  isError
                    ? error.message
                    : uiData.length > 0
                    ? uiData
                    : "Loading summary..."
                }
                rows={7}
                readOnly
                className="w-full p-4 text-gray-800 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none mb-6 bg-white/90"
              />
            ) : null}

            <div className="flex flex-col justify-center text-center mb-6 max-w-sm mx-auto">
              <div className="relative flex justify-center items-center mb-6">
                <button
                  onClick={() => setMonthOffset((prev) => prev - 1)}
                  className="absolute left-0 rounded-full bg-white shadow-sm border border-gray-300 w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition cursor-pointer"
                  aria-label="Previous month"
                >
                  <FaRegArrowAltCircleLeft size="26" />
                </button>
                <span className="text-3xl font-semibold text-[var(--color-text)]">
                  {targetDate.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <button
                  onClick={() => setMonthOffset((prev) => prev + 1)}
                  className="absolute right-0 rounded-full bg-white shadow-sm border border-gray-300 w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition cursor-pointer"
                  aria-label="Next month"
                >
                  <FaRegArrowAltCircleRight size="26" />
                </button>
              </div>
            </div>

            <div className="grid max-[320px]:grid-cols-3 grid-cols-4 sm:grid-cols-6 md:grid-cols-8 xl:grid-cols-11 gap-3 mb-8 text-center text-black text-sm">
              {days.map((day) => {
                const yyyy = day.getFullYear();
                const mm = String(day.getMonth() + 1).padStart(2, "0");
                const dd = String(day.getDate()).padStart(2, "0");
                const dateStr = `${yyyy}-${mm}-${dd}`;

                const isToday = day.toDateString() === today.toDateString();

                const isFuture = day > today;

                const emotionName =
                  selectedEmotions[dateStr] || dataByDate[dateStr] || null;
                const emotionObj = emotions.find((e) => e.name === emotionName);

                return (
                  <div
                    key={dateStr}
                    className={`relative w-full h-[100px] rounded-xl overflow-hidden ${
                      isFuture ? "pointer-events-none" : ""
                    }`}
                  >
                    {!isFuture ? (
                      <div className="group">
                        <div
                          className="absolute inset-0 z-0 group-hover:bg-white/60 bg-white/40 flex items-end justify-center p-2 transition cursor-pointer select-none"
                          onClick={() => handleMoodChange(dateStr)}
                        >
                          {emotionObj ? (
                            <img
                              src={emotionObj.image}
                              alt={emotionObj.name}
                              className="w-6 h-6 mx-auto mt-1 cursor-pointer group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <span className="text-[var(--color-text-muted)] block mt-1">
                              -
                            </span>
                          )}
                        </div>
                      </div>
                    ) : null}
                    <Link
                      className="w-full"
                      to={`/add-activities?date=${dateStr}`}
                    >
                      <div
                        className={`absolute top-0 left-0 right-0 z-10 p-3 rounded-xl transition cursor-pointer ${
                          isToday
                            ? "bg-blue-600 text-white hover:bg-blue-500"
                            : "bg-white hover:bg-gray-50 dark:hover:bg-blue-100"
                        }`}
                      >
                        <span className="block font-medium text-center">
                          {day.toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </span>
                        <span className="block text-sm text-center">
                          {day.getDate()}
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
            <Link to="/add-activities">
              <button className=" bg-blue-600 hover:bg-blue-500 text-white text-lg font-semibold py-2 px-6 rounded-full shadow-md transition cursor-pointer w-full sm:w-auto">
                Add your today's activities
              </button>
            </Link>
          </div>
        </section>
      </PageSlideContainer>
    </>
  );
};
