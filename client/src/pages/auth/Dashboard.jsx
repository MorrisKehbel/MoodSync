import { PageSlideContainer } from "../../components/shared/wrapper/PageSlideContainer";
import { DailyTasks } from "../../components/dailyTasks";
import { Motivation } from "../../components/motivation";
import { EmotionMonthlyAverageChart } from "./dashboard/ProgressBarChart.jsx";
import { WeeklyActivities } from "../../components/weeklyActivities/WeeklyActivities.jsx";
import { ChatBot } from "../../components/chatBot/ChatBot.jsx";

import { useState } from "react";
import { LayoutGroup, motion } from "framer-motion";

export const Dashboard = () => {
  const [chatbotExpanded, setChatbotExpanded] = useState(false);
  return (
    <>
      <PageSlideContainer>
        <LayoutGroup>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[16rem] [grid-auto-flow:dense]">
            <motion.div layout transition={{ layout: { duration: 0.35 } }}>
              <Motivation />
            </motion.div>

            <motion.div layout transition={{ layout: { duration: 0.35 } }}>
              <WeeklyActivities />
            </motion.div>

            <motion.div layout transition={{ layout: { duration: 0.35 } }}>
              <DailyTasks />
            </motion.div>

            <motion.div
              layout
              transition={{ layout: { duration: 0.35 } }}
              className={`md:col-span-2 bg-white rounded-lg p-6 shadow-md h-64 ${
                chatbotExpanded && "md:col-start-2 md:row-start-1"
              }`}
            >
              <EmotionMonthlyAverageChart />
            </motion.div>
            <motion.div
              layout
              transition={{ layout: { duration: 0.55 } }}
              className={`transition-all duration-300 ${
                chatbotExpanded &&
                "md:col-span-2 row-span-2 md:col-start-2 md:row-start-2"
              }`}
            >
              <ChatBot
                chatbotExpanded={chatbotExpanded}
                setChatbotExpanded={setChatbotExpanded}
              />
            </motion.div>
          </motion.div>
        </LayoutGroup>
      </PageSlideContainer>
    </>
  );
};
