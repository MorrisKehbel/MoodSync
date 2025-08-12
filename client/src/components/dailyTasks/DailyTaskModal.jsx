import { useState, useEffect, useRef } from "react";
import { generateTaskSuggestions } from "../../data/aiSummary";
import { useUser } from "../../context";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useTaskSuggestionsQuery } from "../../queries/queryHooks";

const DailyTaskModal = ({ isOpen, onClose, onSubmit }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const hasTriggeredRef = useRef(false);
  const queryClient = useQueryClient();
  const {
    data: { suggestions = [] } = {},
    refetch,
    isLoading: isLoadingSuggestions,
    isFetching,
    error,
  } = useQuery({
    ...useTaskSuggestionsQuery(),
    enabled: false,
  });

  useEffect(() => {
    if (
      isOpen &&
      !hasTriggeredRef.current &&
      user?.settings?.aiTips &&
      !suggestions.length
    ) {
      hasTriggeredRef.current = true;
      void refetch();
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // const fetchSuggestions = async () => {
  //   if (!user.settings.aiTips) return;
  //   try {
  //     setIsLoadingSuggestions(true);
  //     const response = await generateTaskSuggestions();
  //     setSuggestions(response.suggestions || []);
  //   } catch (error) {
  //     console.error("Error fetching AI suggestions:", error);
  //   } finally {
  //     setIsLoadingSuggestions(false);
  //   }
  // };

  const handleSuggestionClick = (suggestion) => {
    setTaskTitle(suggestion);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(taskTitle.trim());
      setTaskTitle("");
    } finally {
      setIsSubmitting(false);

      queryClient.refetchQueries({
        queryKey: ["personalizedReminder"],
        type: "all",
      });
      queryClient.refetchQueries({ queryKey: ["motivation"], type: "all" });
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setTaskTitle("");
      // setSuggestions([]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Add Daily Task
          </h2>
          <button
            onClick={handleClose}
            aria-label="Close"
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {(suggestions?.length > 0 || isLoadingSuggestions) && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
              <svg
                className="w-4 h-4 text-blue-500"
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
              <span>Suggested tasks</span>
            </h4>

            {isLoadingSuggestions && user.settings.aiTips ? (
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-gray-200 rounded-full px-3 py-1 h-8 w-20"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full border border-blue-200 transition-colors cursor-pointer"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="taskTitle"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Task Description
            </label>
            <input
              type="text"
              id="taskTitle"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Enter your task..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength={200}
              disabled={isSubmitting}
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-1">
              {taskTitle.length}/200 characters
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              aria-label="Cancel"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-500 transition-colors disabled:opacity-30 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              aria-label="Add Task"
              disabled={!taskTitle.trim() || isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? "Adding..." : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DailyTaskModal;
