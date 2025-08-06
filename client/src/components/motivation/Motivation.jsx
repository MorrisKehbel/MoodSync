import { useState, useEffect } from "react";
import { generateAi, generatePersonalizedReminder } from "../../data/aiSummary";
import insightImage from "../../assets/homePage/insight.png";

const Motivation = () => {
  const [personalizedReminder, setPersonalizedReminder] = useState("");
  const [dailyMotivation, setDailyMotivation] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingMotivation, setIsGeneratingMotivation] = useState(false);
  const [isGeneratingReminder, setIsGeneratingReminder] = useState(false);

  const fetchPersonalizedReminder = async () => {
    try {
      setIsGeneratingReminder(true);
      const response = await generatePersonalizedReminder();
      if (response && response.reminder) {
        setPersonalizedReminder(response.reminder);
      } else {
        setPersonalizedReminder("Great! All tasks completed for today.");
      }
    } catch (error) {
      console.error("Error generating personalized reminder:", error);
      setPersonalizedReminder("Keep making progress on your wellness journey!");
    } finally {
      setIsGeneratingReminder(false);
    }
  };

  const generateDailyMotivation = async () => {
    try {
      setIsGeneratingMotivation(true);
      const response = await generateAi("motivation");
      if (response && response.motivation) {
        setDailyMotivation(response.motivation);
      } else {
        setDailyMotivation("Keep moving forward!");
      }
    } catch (error) {
      console.error("Error generating motivation:", error);
      setDailyMotivation("You've got this today!");
    } finally {
      setIsGeneratingMotivation(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchPersonalizedReminder(),
        generateDailyMotivation(),
      ]);
      setIsLoading(false);
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md h-64">
        <div className="animate-pulse">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gray-200 rounded mr-3"></div>
            <div className="h-5 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="space-y-2 mb-6">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-gray-200 rounded mr-3"></div>
            <div className="h-5 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md h-64 overflow-y-auto">
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            Today's Reminder
          </h3>
        </div>

        <div className="space-y-2">
          {isGeneratingReminder ? (
            <div className="flex items-center text-sm text-gray-600 ml-11">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating reminder...
            </div>
          ) : (
            <div className="flex items-start ml-11">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {personalizedReminder}
              </p>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
            <img
              src={insightImage}
              alt="Motivation"
              className="w-5 h-5 object-contain"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            Daily Motivations
          </h3>
        </div>

        <div className="ml-11">
          {isGeneratingMotivation ? (
            <div className="flex items-center text-sm text-gray-600">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating motivation...
            </div>
          ) : (
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {dailyMotivation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Motivation;
