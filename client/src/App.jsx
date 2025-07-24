import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router";

import {
  Home,
  HowItWorks,
  Science,
  AboutUs,
  OurMission,
  ResetPasswordPage,
} from "./pages";
import { Dashboard, MyJourney, GoalVision, UserSettings } from "./pages/auth";
import { WhyItMatters } from "./pages/blog";

import { MainLayout } from "./layouts/MainLayout";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
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

          <Route path="why-it-matters" element={<WhyItMatters />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
