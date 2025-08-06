import { PageSlideContainer } from "../../components/shared/wrapper/PageSlideContainer";
import { EmotionMonthlyAverageChart } from "./dashboard/ProgressBarChart.jsx";

export const Dashboard = () => {
  return (
    <>
      <PageSlideContainer>
        <div className="space-y-6">
          {/* First Row - 3 boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md h-64"></div>
            <div className="bg-white rounded-lg p-6 shadow-md h-64"></div>
            <div className="bg-white rounded-lg p-6 shadow-md h-64"></div>
          </div>

          {/* Second Row - 1 long box + 1 box same size */}
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
