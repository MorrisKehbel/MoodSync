import {
  getAllDailyActivities,
  getDailyActivitiesById,
} from "../data/activities";

import { fetchSummary } from "../data/aiSummary";

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

export const loadAllDailyActivities = (queryClient, user) => async () => {
  queryClient.prefetchQuery(useAllDailyActivitiesQuery());
  if (user?.settings?.aiTips === true) {
    queryClient.prefetchQuery(useAiSummary());
  }

  return null;
};
