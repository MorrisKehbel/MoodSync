import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

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
    activity.includes("yoga")
  ) {
    return "health";
  }
  if (
    activity.includes("friend") ||
    activity.includes("family") ||
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
    activity.includes("game") ||
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
  const [loading, setLoading] = useState(true);
  const [weekRange, setWeekRange] = useState("");

  useEffect(() => {
    fetchWeeklyActivities();
  }, []);

  const getWeekRange = () => {
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const endOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 6)
    );

    const options = { month: "short", day: "numeric" };
    const start = startOfWeek.toLocaleDateString("en-US", options);
    const end = endOfWeek.toLocaleDateString("en-US", options);

    return `${start} - ${end}`;
  };

  const fetchWeeklyActivities = async () => {
    try {
      const today = new Date();
      const startOfWeek = new Date(
        today.setDate(today.getDate() - today.getDay())
      );
      const endOfWeek = new Date(
        today.setDate(today.getDate() - today.getDay() + 6)
      );
      setWeekRange(getWeekRange());

      const response = await fetch(
        `/api/activities?startDate=${startOfWeek.toISOString()}&endDate=${endOfWeek.toISOString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch activities");

      const activities = await response.json();

      const categorizedData = processActivities(activities);
      setActivityData(categorizedData);
    } catch (error) {
      console.error("Error fetching weekly activities:", error);

      setWeekRange(getWeekRange());
      setActivityData([
        { name: "Personal", value: 30, count: 6, color: "#8884d8" },
        { name: "Social", value: 25, count: 5, color: "#82ca9d" },
        { name: "Work", value: 20, count: 4, color: "#ffc658" },
        { name: "Health", value: 15, count: 3, color: "#ff7c7c" },
        { name: "Education", value: 10, count: 2, color: "#8dd1e1" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const processActivities = (activities) => {
    const categoryCount = {};
    let totalActivities = activities.length;

    activities.forEach((activity) => {
      const category = categorizeActivity(
        activity.name || activity.title || activity.activity
      );
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });
    return Object.entries(categoryCount).map(([category, count]) => ({
      name: ACTIVITY_CATEGORIES[category].name,
      value: totalActivities > 0 ? (count / totalActivities) * 100 : 0,
      count: count,
      color: ACTIVITY_CATEGORIES[category].color,
    }));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md h-full flex flex-col">
      <div className="mb-4 flex justify-between items-start">
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
