import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router";

import { Home, HowItWorks, Science, AboutUs, OurMission } from "./pages";
import { Dashboard, MyJourney, GoalVision, UserSettings } from "./pages/auth";
import {
  WhyItMatters,
  ResearchMethods,
  MoodTracking,
  DimensionsOfWellBeing,
} from "./pages/blog";

import { MainLayout } from "./layouts/MainLayout";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="science" element={<Science />} />
        <Route path="about" element={<AboutUs />} />

        <Route path="our-mission" element={<OurMission />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="activitys" element={<MyJourney />} />
        <Route path="goals" element={<GoalVision />} />
        <Route path="settings" element={<UserSettings />} />

        <Route path="blog/why-it-matters" element={<WhyItMatters />} />
        <Route path="blog/research-methods" element={<ResearchMethods />} />
        <Route path="blog/mood-tracking" element={<MoodTracking />} />
        <Route
          path="blog/dimensions-of-wellbeing"
          element={<DimensionsOfWellBeing />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
