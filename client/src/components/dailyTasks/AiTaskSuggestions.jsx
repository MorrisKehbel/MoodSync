import { useState } from "react";
import { generateTaskSuggestions } from "../../data/aiSummary";

const AiTaskSuggestions = ({ onAddTask, isAddingTask }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuggestions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await generateTaskSuggestions();
      setSuggestions(response.suggestions || []);
      setIsExpanded(true);
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSuggestion = async (suggestion) => {
    try {
      await onAddTask(suggestion);
      setSuggestions((prev) => prev.filter((s) => s !== suggestion));
    } catch (error) {
      console.error("Error adding suggested task:", error);
    }
  };

  if (!isExpanded) {
    return (
      <div className="mb-4">
        <button
          onClick={fetchSuggestions}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <span>
            {isLoading
              ? "Getting AI suggestions..."
              : "Get AI task suggestions"}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="mb-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
          <svg
            className="w-4 h-4 text-purple-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <span>AI Suggestions</span>
        </h4>
        <button
          onClick={() => setIsExpanded(false)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {error && (
        <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex space-x-2">
              <div className="h-3 bg-gray-200 rounded flex-1"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      ) : suggestions.length > 0 ? (
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white rounded-md p-2 border border-gray-200"
            >
              <span className="text-sm text-gray-700 flex-1">{suggestion}</span>
              <button
                onClick={() => handleAddSuggestion(suggestion)}
                disabled={isAddingTask}
                className="ml-2 bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors disabled:opacity-50"
              >
                {isAddingTask ? "..." : "Add"}
              </button>
            </div>
          ))}
          <button
            onClick={fetchSuggestions}
            disabled={isLoading}
            className="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded text-xs font-medium transition-colors"
          >
            Get new suggestions
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          No suggestions available. Try again later.
        </p>
      )}
    </div>
  );
};

export default AiTaskSuggestions;
