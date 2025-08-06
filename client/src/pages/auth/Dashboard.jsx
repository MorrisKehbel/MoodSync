import { PageSlideContainer } from "../../components/shared/wrapper/PageSlideContainer";
import { DailyTasks } from "../../components/dailyTasks";
import { Motivation } from "../../components/motivation";
import { EmotionMonthlyAverageChart } from "./dashboard/ProgressBarChart.jsx";

export const Dashboard = () => {
  return (
    <>
      <PageSlideContainer>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Motivation />
            <div className="bg-white rounded-lg p-6 shadow-md h-64"></div>
            <DailyTasks />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white rounded-lg p-6 shadow-md h-64">
              <EmotionMonthlyAverageChart />
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md h-64"></div>
          </div>
        </div>
      </PageSlideContainer>
    </>
  );
};
