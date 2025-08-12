import {
  getAllDailyActivities,
  getDailyActivitiesById,
} from "../data/activities";

import {
  fetchSummary,
  generateAi,
  generateTaskSuggestions,
  generatePersonalizedReminder,
} from "../data/aiSummary";

export const useDailyActivitiesQuery = (date) => ({
  queryKey: ["DailyActivities", date],
  queryFn: ({ signal }) => getDailyActivitiesById(signal, date),
});

export const useAllDailyActivitiesQuery = () => ({
  queryKey: ["allDailyActivities"],
  queryFn: ({ signal }) => getAllDailyActivities(signal),
  retry: false,
});

export const useAiSummary = () => ({
  queryKey: ["aiSummary"],
  queryFn: ({ signal }) => fetchSummary(signal),
  retry: false,
});

export const useDailyInsight = () => ({
  queryKey: ["dailyInsight"],
  queryFn: ({ signal }) => generateAi("dailyinsight", signal),
  retry: false,
});

export const useTaskSuggestionsQuery = () => ({
  queryKey: ["taskSuggestions"],
  queryFn: ({ signal }) => generateTaskSuggestions(signal),
  retry: false,
});

export const usePersonalizedReminderQuery = () => ({
  queryKey: ["personalizedReminder"],
  queryFn: ({ signal }) => generatePersonalizedReminder(signal),
  retry: false,
});

export const useMotivationQuery = () => ({
  queryKey: ["motivation"],
  queryFn: ({ signal }) => generateAi("motivation", signal),
  retry: false,
});

export const loadAllDailyActivities = (queryClient, user) => async () => {
  queryClient.prefetchQuery(useAllDailyActivitiesQuery());
  if (user?.settings?.aiTips === true) {
    queryClient.prefetchQuery(useDailyInsight());
  }

  return null;
};
