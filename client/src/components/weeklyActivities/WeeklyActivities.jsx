import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { getAllDailyActivities } from "../../data/activities";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useAllDailyActivitiesQuery } from "../../queries/queryHooks";
import { dailyTasksAPI } from "../../data/dailyTasks";

const ACTIVITY_CATEGORIES = {
  personal: { name: "Personal", color: "#8884d8" },
  social: { name: "Social", color: "#82ca9d" },
  work: { name: "Work", color: "#ffc658" },
  health: { name: "Health", color: "#ff7c7c" },
  education: { name: "Education", color: "#8dd1e1" },
  hobby: { name: "Hobby", color: "#d084d0" },
  other: { name: "Other", color: "#87d068" },
};

const categorizeActivity = (activityName) => {
  const activity = activityName.toLowerCase();

  if (
    activity.includes("exercise") ||
    activity.includes("gym") ||
    activity.includes("run") ||
    activity.includes("workout") ||
    activity.includes("walk") ||
    activity.includes("sleep") ||
    activity.includes("sport") ||
    activity.includes("eating") ||
    activity.includes("hydration") ||
    activity.includes("yoga")
  ) {
    return "health";
  }
  if (
    activity.includes("friend") ||
    activity.includes("family") ||
    activity.includes("dating") ||
    activity.includes("social") ||
    activity.includes("party") ||
    activity.includes("meeting")
  ) {
    return "social";
  }
  if (
    activity.includes("work") ||
    activity.includes("job") ||
    activity.includes("office") ||
    activity.includes("finances") ||
    activity.includes("planning") ||
    activity.includes("project")
  ) {
    return "work";
  }
  if (
    activity.includes("study") ||
    activity.includes("learn") ||
    activity.includes("course") ||
    activity.includes("read") ||
    activity.includes("education")
  ) {
    return "education";
  }
  if (
    activity.includes("hobby") ||
    activity.includes("gaming") ||
    activity.includes("tv") ||
    activity.includes("music") ||
    activity.includes("art") ||
    activity.includes("craft")
  ) {
    return "hobby";
  }
  if (
    activity.includes("personal") ||
    activity.includes("self") ||
    activity.includes("meditation") ||
    activity.includes("me-time") ||
    activity.includes("journal")
  ) {
    return "personal";
  }

  return "other";
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-md">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-sm text-gray-600">
          {payload[0].value.toFixed(1)}% ({payload[0].payload.count} activities)
        </p>
      </div>
    );
  }
  return null;
};

export const WeeklyActivities = () => {
  const [activityData, setActivityData] = useState([]);
  const [weekRange, setWeekRange] = useState("");
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [tasksError, setTasksError] = useState(null);

  const {
    data: { existingEntries = [] } = {},
    isLoading: entriesLoading,
    isFetching: entriesFetching,
    isError: entriesIsError,
    error: entriesError,
  } = useQuery(useAllDailyActivitiesQuery());

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const response = await dailyTasksAPI.getTasks();
        if (!alive) return;
        setTasks(response?.tasks || []);
      } catch (e) {
        if (!alive) return;
        console.error("Error fetching daily tasks:", e);
        setTasks([]);
        setTasksError(e);
      } finally {
        if (!alive) return;
        setTasksLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [entriesFetching]);

  useEffect(() => {
    setWeekRange(getWeekRange());
  }, []);

  const getWeekRange = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() + diff);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const options = { month: "short", day: "numeric" };
    const start = startOfWeek.toLocaleDateString("en-US", options);
    const end = endOfWeek.toLocaleDateString("en-US", options);

    return `${start} - ${end}`;
  };

  const processActivities = (activities) => {
    const categoryCount = {};
    const totalActivities = activities.length;

    activities.forEach((activity) => {
      const category = categorizeActivity(
        activity.name || activity.title || activity.activity || activity
      );
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    return Object.entries(categoryCount).map(([category, count]) => ({
      name: ACTIVITY_CATEGORIES[category].name,
      value: totalActivities > 0 ? (count / totalActivities) * 100 : 0,
      count,
      color: ACTIVITY_CATEGORIES[category].color,
    }));
  };

  useEffect(() => {
    if (entriesLoading || tasksLoading) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const day = today.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() + diff);
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const inThisWeek = (d) => {
      if (!d) return false;
      const nd = new Date(d);
      nd.setHours(0, 0, 0, 0);
      return nd >= startOfWeek && nd <= endOfWeek;
    };

    const weeklyActivities = (existingEntries || []).filter((e) =>
      inThisWeek(e.date)
    );
    const allActivities = [];
    weeklyActivities.forEach((entry) => {
      if (Array.isArray(entry.activities)) {
        entry.activities.forEach((activity) => {
          allActivities.push({
            name:
              activity?.name ||
              activity?.title ||
              activity?.activity ||
              activity,
            date: entry.date,
          });
        });
      }
    });

    const weeklyTasks = (tasks || []).filter((t) => inThisWeek(t.date));
    const doneTasks = weeklyTasks
      .filter((t) => t.completed && t.title)
      .map((t) => ({ name: t.title, date: t.date }));

    const allData = [...allActivities, ...doneTasks];

    const categorized = processActivities(allData);
    setActivityData(categorized);
  }, [entriesLoading, tasksLoading, existingEntries, tasks]);

  if (entriesLoading || tasksLoading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (entriesIsError || tasksError) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md h-full flex items-center justify-center">
        <div className="text-sm text-red-600">
          Error loading activities:{" "}
          {entriesError?.message || tasksError?.message || "Unknown error"}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md h-full flex flex-col">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">
          Weekly Activities
        </h3>
        <p className="text-sm text-gray-500">{weekRange}</p>
      </div>

      {activityData.length > 0 ? (
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={activityData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
                className="focus:outline-none"
              >
                {activityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={20}
                iconSize={8}
                wrapperStyle={{
                  fontSize: "12px",
                  lineHeight: "14px",
                }}
                formatter={(value) => (
                  <span style={{ fontSize: "12px" }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <p className="text-sm">No activities recorded this week</p>
            <p className="text-xs mt-1">
              Start tracking your daily activities!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
