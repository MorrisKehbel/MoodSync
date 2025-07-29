import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams, Link } from "react-router";

import { addDailyActivities, getDailyActivitiesById } from "../../data/user";
import { useUser } from "../../context";
import { PageSlideContainer } from "../../components/shared/wrapper/PageSlideContainer";
import {
  imgHappy,
  imgCalm,
  imgNeutral,
  imgSad,
  imgAngry,
} from "../../assets/emotions/";

import {
  FaUsers,
  FaHeart,
  FaShoppingCart,
  FaBook,
  FaGraduationCap,
  FaAppleAlt,
  FaTint,
  FaMoon,
  FaDumbbell,
  FaWalking,
  FaGamepad,
  FaTv,
  FaLaptop,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaStar,
} from "react-icons/fa";
import { GiMeditation, GiBathtub, GiSmartphone } from "react-icons/gi";

const activities = [
  {
    id: 1,
    name: "Family & Friends",
    icon: FaUsers,
  },
  {
    id: 2,
    name: "Dating",
    icon: FaHeart,
  },
  {
    id: 3,
    name: "Shopping",
    icon: FaShoppingCart,
  },
  {
    id: 4,
    name: "Meditation",
    icon: GiMeditation,
  },
  {
    id: 5,
    name: "Me-Time",
    icon: GiBathtub,
  },
  {
    id: 6,
    name: "Learning",
    icon: FaGraduationCap,
  },
  {
    id: 7,
    name: "Reading",
    icon: FaBook,
  },
  {
    id: 8,
    name: "Healthy Eating",
    icon: FaAppleAlt,
  },
  {
    id: 9,
    name: "Hydration",
    icon: FaTint,
  },
  {
    id: 10,
    name: "Sleep Early",
    icon: FaMoon,
  },
  {
    id: 11,
    name: "Sport",
    icon: FaDumbbell,
  },
  {
    id: 12,
    name: "Walking",
    icon: FaWalking,
  },
  {
    id: 13,
    name: "Gaming",
    icon: FaGamepad,
  },
  {
    id: 14,
    name: "Watching TV",
    icon: FaTv,
  },
  {
    id: 15,
    name: "Social Media",
    icon: GiSmartphone,
  },
  {
    id: 16,
    name: "Working",
    icon: FaLaptop,
  },
  {
    id: 17,
    name: "Review Finances",
    icon: FaMoneyBillWave,
  },
  {
    id: 18,
    name: "Weekly Planning",
    icon: FaCalendarAlt,
  },
  {
    id: 19,
    name: "Other Hobbys",
    icon: FaStar,
  },
];

const emotions = [
  { id: 1, name: "Happy", image: imgHappy },
  { id: 2, name: "Calm", image: imgCalm },
  { id: 3, name: "Neutral", image: imgNeutral },
  { id: 4, name: "Sad", image: imgSad },
  { id: 5, name: "Angry", image: imgAngry },
];

export const AddActivities = () => {
  const { isAuthenticated, checkSession, setCurrentMode, setShowAuth } =
    useUser();
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [value, setValue] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!isAuthenticated && !checkSession) {
      setCurrentMode("login");
      setShowAuth(true);
    }
  }, [isAuthenticated, checkSession]);

  const today = new Date();
  const localDate = today.toISOString().split("T")[0];
  const dateParam = searchParams.get("date");
  const effectiveDate = dateParam || localDate;

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const data = await getDailyActivitiesById(effectiveDate);
        const entry = data?.existingEntry;
        setValue(entry?.note || "");
        setSelectedActivities(entry?.activities || []);
        setSelectedEmotion(entry?.emotion || "");
      } catch (error) {
        console.error("Error loading your daily entry.", error);
      }
    };
    fetchEntry();
  }, [effectiveDate]);

  const toggleSelectActivities = (name) => {
    setSelectedActivities((prev) => {
      if (prev.includes(name)) {
        return prev.filter((n) => n !== name);
      } else {
        return [...prev, name];
      }
    });
  };

  const toggleSelectEmotion = (name) =>
    setSelectedEmotion((prev) => (prev === name ? "" : name));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !value.trim() &&
      selectedActivities.length === 0 &&
      selectedEmotion.length === 0
    ) {
      toast.error("Please add your activities, emotion, or a note.");
      return;
    }

    try {
      const data = await addDailyActivities({
        note: value,
        activities: selectedActivities,
        emotion: selectedEmotion,
        date: effectiveDate,
      });

      toast.success(
        data.message ||
          "Your activities, emotions, and note have been saved successfully!"
      );
    } catch (error) {
      toast.error(
        error.message || "An error occurred while saving your activities."
      );
    }
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
        <section className="flex flex-col">
          <div className="flex flex-col justify-center items-center text-center ">
            <h1 className="text-3xl md:text-4xl text-black/70 font-extrabold">
              {dateParam && dateParam !== localDate
                ? `How was your day on ${dateParam}?`
                : "How was your day?"}
            </h1>
            <p className="text-gray-500 text-lg mt-2">
              {dateParam && dateParam !== localDate
                ? `Which activities have you done that day, and how did you feel?`
                : "Which activities have you done today, and how do you feel?"}
            </p>
            <div className="w-20 h-1 mx-auto mt-4 bg-gradient-to-r from-blue-600 to-pink-500 rounded-full mb-12" />
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-x-2 gap-y-6">
            {activities.map(({ id, name, icon: Icon }) => {
              const isSelected = selectedActivities.includes(name);
              return (
                <div
                  key={id}
                  onClick={() => toggleSelectActivities(name)}
                  className="flex flex-col justify-center items-center cursor-pointer"
                >
                  <div
                    className={`w-16 h-16 rounded-full flex justify-center items-center select-none transition-all hover:scale-105 duration-300 ${
                      isSelected
                        ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 backdrop-blur-md shadow-sm sm:shadow-md border border-white/60 text-gray-100 outline-2 outline-white/80 hover:bg-blue-600"
                        : "bg-gradient-to-r from-white/10 via-white/20 to-white/10 backdrop-blur-md shadow-sm sm:shadow-md border border-white/60 text-gray-600 outline-0 hover:bg-gray-50/60"
                    }`}
                  >
                    <Icon size="32" />
                  </div>
                  <h3 className="font-semibold text-md text-center">{name}</h3>
                </div>
              );
            })}
          </div>
          <div className="bg-gradient-to-r from-white/10 via-white/20 to-white/10 backdrop-blur-md rounded-2xl shadow-sm sm:shadow-md border border-white/60 mt-12 p-8">
            <div className="flex flex-wrap justify-center items-center gap-6">
              {emotions.map(({ id, name, image: Image }) => {
                const isSelected = selectedEmotion === name;
                return (
                  <div
                    key={id}
                    onClick={() => toggleSelectEmotion(name)}
                    className={`w-full max-w-[70px] aspect-square bg-cover bg-center select-none cursor-pointer hover:opacity-100 transition-all duration-300 ${
                      isSelected
                        ? "opacity-100 outline-3 outline-blue-600/80 scale-110 rounded-full"
                        : "opacity-70"
                    }`}
                    style={{ backgroundImage: `url(${Image})` }}
                  ></div>
                );
              })}
            </div>
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="flex flex-col items-center w-full mx-auto mt-12"
            >
              <textarea
                id="notes"
                name="notes"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type something..."
                rows={4}
                className="flex-1 w-full px-4 py-2 border border-gray-50 rounded-lg bg-gray-50/40 shadow-sm focus:outline-2 focus:outline-blue-600"
              />
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                <button
                  type="submit"
                  className="px-4 py-2 mt-8 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-500 transition-colors"
                >
                  {value || selectedActivities.length > 0 || selectedEmotion
                    ? "Update your day"
                    : "Save your day"}
                </button>
                <Link to="/my-journey">
                  <button
                    type="button"
                    className="px-4 py-2 mt-8 bg-gray-600 text-white rounded-lg cursor-pointer hover:bg-gray-500 transition-colors"
                  >
                    Return
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </section>
      </PageSlideContainer>
    </>
  );
};
