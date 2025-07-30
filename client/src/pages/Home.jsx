import { Link } from "react-router";
import { PageSlideContainer } from "../components/shared/wrapper/PageSlideContainer";
import { useUser } from "../context";
import {
  FaHeart,
  FaBrain,
  FaChartLine,
  FaLightbulb,
  FaArrowRight,
  FaPlay,
} from "react-icons/fa";

import imgMood from "../assets/homePage/mood.png";
import imgInsights from "../assets/homePage/insight.png";
import imgAnalytics from "../assets/homePage/img_analytics.jpg";
import imgTips from "../assets/homePage/image-tips.png";

export const Home = () => {
  const { setShowAuth, setCurrentMode } = useUser();

  const features = [
    {
      icon: FaHeart,
      title: "Daily Mood Tracking",
      description: "Log how you feel each day to understand emotional trends.",
      img: imgMood,
    },
    {
      icon: FaBrain,
      title: "AI-Powered Insights",
      description: "Receive smart feedback based on your mood patterns.",
      img: imgInsights,
    },
    {
      icon: FaChartLine,
      title: "Progress Analytics",
      description: "Visual charts help you track emotional ups and downs.",
      img: imgAnalytics,
    },
    {
      icon: FaLightbulb,
      title: "Smart Tips & Guidance",
      description: "Practical advice personalized to your unique lifestyle.",
      img: imgTips,
    },
  ];

  return (
    <PageSlideContainer>
      <section className="flex flex-col">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl text-black/70 font-extrabold">
            Everything You Need for Mental Wellness
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Tools designed to help you track, reflect, and grow.
          </p>
          <div className="w-20 h-1 mx-auto mt-4 bg-gradient-to-r from-blue-600 to-pink-500 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 text-center flex flex-col items-center"
            >
              <img
                src={feature.img}
                alt={feature.title}
                className="w-20 h-20 rounded-xl object-cover mb-4"
              />
              <feature.icon className="text-blue-600 text-2xl mb-2" />
              <h3 className="text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="px-6 pb-16 pt-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl text-black/70 font-extrabold">
            Transform Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
              Mental Well-being
            </span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl mt-4 mb-8">
            Discover emotional patterns, build healthier habits, and get smart,
            AI-powered insights tailored for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => {
                setShowAuth(true);
                setCurrentMode("signup");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold text-base flex items-center gap-2 transition-all"
            >
              Start Your Journey <FaArrowRight />
            </button>
            <Link
              to="/how-it-works"
              className="border border-gray-300 px-8 py-3 rounded-full font-medium text-gray-700 flex items-center gap-2 hover:bg-gray-50 transition"
            >
              <FaPlay /> See How It Works
            </Link>
          </div>
        </div>
      </section>
    </PageSlideContainer>
  );
};
