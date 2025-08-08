import { useEffect, useMemo, useState } from "react";
import { 
  BarChart,
  Bar,
  XAxis,  
  YAxis,
  Tooltip,
  CartesianGrid, 
  ResponsiveContainer,
  LabelList,
} from "recharts";
import {
  imgHappy,
  imgCalm,
  imgNeutral,
  imgSad,
  imgAngry,
} from "../../../assets/emotions/";

import { getAllDailyActivities } from "../../../data/activities";
import { easeIn } from "framer-motion";
const API_URL = import.meta.env.VITE_API_URL;
const baseURL = `${API_URL}/activities`;

const emotionImageMap = {
  1: imgAngry,
  2: imgSad,
  3: imgNeutral,
  4: imgCalm,
  5: imgHappy,
};

const emotions = [
  { id: 1, name: "Angry" },
  { id: 2, name: "Sad" },
  { id: 3, name: "Neutral" },
  { id: 4, name: "Calm" },
  { id: 5, name: "Happy" },
];

const getEmotionNameById = (id) => {
  const rounded = Math.round(id);
  const found = emotions.find((e) => e.id === rounded);
  return found ? found.name : "Unknown";
};

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",  
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const SlantedTopBar = ({ x, y, width, height, fill }) => {
  const slantHeight = 8; 

  const path = `
    M ${x},${y + slantHeight}
    L ${x + width},${y}
    L ${x + width},${y + height}
    L ${x},${y + height}
    Z
  `;

  return (
    <path
      d={path}
      fill={fill}
      focusable="false"          
      tabIndex={-1}              
      onMouseDown={(e) => e.preventDefault()}  
      onFocus={(e) => e.currentTarget.blur()}  
      style={{ outline: "none", WebkitTapHighlightColor: "transparent" }} 
    />
  );
};

export const EmotionMonthlyAverageChart =()  => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "emotion-chart-focus-fix";
    style.innerHTML = `
      .emotion-chart svg path,
      .emotion-chart svg rect,
      .emotion-chart svg g {
        outline: none !important;
        box-shadow: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      .emotion-chart svg path:focus,
      .emotion-chart svg rect:focus,
      .emotion-chart svg g:focus {
        outline: none !important;
        box-shadow: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.getElementById("emotion-chart-focus-fix")?.remove();
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchActivities = async () => {
      setLoading(true);
      setError(null);
      try {
        const payload = await getAllDailyActivities(); 

        const existingEntries = payload.existingEntries || [];

        const now = new Date();
        const currentYear = now.getFullYear();

        const buckets = {};
        for (let i=0; i<12; i++){
          buckets[i] = {sum: 0, count: 0};
        }

        existingEntries.forEach((entry) => {
          if (!entry.date || !entry.emotion) return;
          const dt = new Date(entry.date);
          if(isNaN(dt.getTime())) return;
          if(dt.getFullYear() !== currentYear) return;
          const month = dt.getMonth();

          const emotionObj = emotions.find((e) => e.name.toLowerCase() === entry.emotion.toLowerCase());
          if(!emotionObj) return;
          buckets[month].sum += emotionObj.id;
          buckets[month].count += 1;

        });

        const chartData = [];
        for(let i=0; i<12; i++){
          const {sum, count} = buckets[i];
          chartData.push({
            monthIndex: i,
            averageEmotion: count > 0 ? sum / count : null,
          });
        }
        console.debug("Computed chartData:", chartData);
        if (!cancelled) setData(chartData);
      } catch (err) {
        if (cancelled) return;
        if (err.name === "AbortError") return;
        setError(err.message || "Unknown error");
      } finally {
         if (!cancelled) setLoading(false);
      }
    };

    fetchActivities();
      return () => {
        cancelled = true;
      };
    }, []);

  const rechartsData = useMemo(() => {
    if(!data) return [];
    return data.map((d) => ({
      month: MONTH_LABELS[d.monthIndex],
      averageEmotion: d.averageEmotion,
      displayLabel: 
        d.averageEmotion !== undefined
          ? getEmotionNameById(d.averageEmotion) : "No Data",
    }));
  }, [data]);

  if(loading) {
    return(
      <div className="h-full flex items-center justify-center">
        <div className="text-sm font-medium">Loading emotion averages...</div>
      </div>
    );
  }

  if(error) {
    return(
      <div className="h-full flex items-center justify-center">
        <div className="text-sm text-red-600">
          Error loading data: {error}
        </div>
      </div>
    );
  }
  
  const EmojiYAxisTick = ({ x, y, payload }) => {
    const val = Math.round(payload.value);
    const src = emotionImageMap[val];
    if (!src) return null;
    const size = 20;
    return (
      <image
        href={src}
        x={x - size - 4} 
        y={y - size / 2 + 4}
        width={size}
        height={size}
      />
    );
  };

  const onMouseDownCapture = (e) => {
  const tag = String(e.target.tagName).toLowerCase();
  if (tag === "path" || tag === "rect" || tag === "g" || tag === "svg") {
    e.preventDefault();  
  }
  };

 
  return(
    <div className="emotion-chart h-full flex flex-col relative px-3 ">
      <div className="mt-[-13px] mb-2">
        <h3 className="text-xl font-bold text-gray-700">
          Progress of well-being ({new Date().getFullYear()})
        </h3>
      </div>

      <div className="flex-1" onMouseDownCapture={onMouseDownCapture}>
        <ResponsiveContainer width="100%" height="110%">
          <BarChart
            data={rechartsData}
            margin={{top:10, right: 16, left: 0, bottom: 0}}
          >
            <defs>
              <linearGradient id="emotionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" />     
                <stop offset="100%" stopColor="#93C5FD" />  
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false}  strokeDasharray="3 3" stroke="	#BFDBFE"/>
            <XAxis 
              dataKey="month"
              tick={{fill: "#60A5FA", fontSize:12, fontWeight:600}}
            />
            <YAxis 
              domain={[0, 5]}
              allowDecimals={false}
              ticks={[0, 1, 2, 3, 4, 5]}
              tick={({ x, y, payload }) => (
                <EmojiYAxisTick x={x} y={y} payload={payload} />
              )}
              width={50} 
              axisLine={false}
              tickLine={false}
            />
            
            <Tooltip
              cursor={{ fill: "rgba(79, 70, 229, 0.1)" }} 
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)", 
                border: "2px solid rgba(37, 99, 235, 0.5)",   
                borderRadius: 10,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",  
              }}
            formatter={(value) => {
              if (value === null || value === undefined) return ["No data", "Avg Emotion"];
              const avg = parseFloat(value).toFixed(2);
              const rounded = Math.round(value);
              const emotionName = getEmotionNameById(value);
              const emojiSrc = emotionImageMap[rounded];
              return [
                <span key="tooltip-content" className="flex items-center gap-1">
                  {emojiSrc && (
                    <img
                      src={emojiSrc}
                      alt={emotionName}
                      style={{ width: 16, height: 16, display: "inline-block" }}
                    />
                  )}
                  {`${avg} (${emotionName})`}
                </span>,
                "Avg Emotion",
                ];
              }}
            />
            <Bar 
              dataKey="averageEmotion"
              fill="url(#emotionGradient)"
              shape={<SlantedTopBar />}
              isAnimationActive
              animationEasing='ease-out' 
              radius={[5, 5, 0, 0]}
              barSize={26}
              className="no-focus"
              // style={{ outline: "none" }}
            >
              <LabelList
                dataKey="displayLabel"
                position="top"
                formatter={(val, entry) => {
                  if (!entry || entry.averageEmotion == null) return "";
                  return val;
                }}
                style={{ fill: "#2563EB", fontSize: 12, fontWeight: "bold" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        {rechartsData.every((d) => d.averageEmotion === null) && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="bg-white/80 px-4 py-2 rounded text-gray-600">
            No activity entries for this year.
           </div> 
          </div>
        )}
      </div>
    </div>
  );
};
