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
});

export const useAiSummary = () => ({
  queryKey: ["aiSummary"],
  queryFn: ({ signal }) => fetchSummary(signal),
});

export const loadAllDailyActivities = (queryClient) => async () => {
  queryClient.prefetchQuery(useAllDailyActivitiesQuery());
  queryClient.prefetchQuery(useAiSummary());
  return null;
};
