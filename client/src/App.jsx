import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router";

import { Home, HowItWorks, Science, AboutUs, Signup, OurMission } from "./pages";
import { Dashboard, ActivityGoals, History } from "./pages/auth";

import { MainLayout } from "./layouts/MainLayout";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="science" element={<Science />} />
        <Route path="about" element={<AboutUs />} />

        <Route path="our-mission" element={<OurMission/>}/>

        <Route path="signup" element={<Signup />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="activity-goals" element={<ActivityGoals />} />
        <Route path="history" element={<History />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
