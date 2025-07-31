import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  Home,
  HowItWorks,
  Science,
  AboutUs,
  ResetPasswordPage,
  ContactUs,
} from "./pages";
import {
  Dashboard,
  MyJourney,
  AddActivities,
  GoalVision,
  UserSettings,
} from "./pages/auth";
import { ChildrenCare } from "./pages/child/ActivitiesChildren";
import {
  WhyItMatters,
  ResearchMethods,
  MoodTracking,
  DimensionsOfWellBeing,
} from "./pages/blog";

import { MainLayout } from "./layouts/MainLayout";

import { PulseLoader } from "react-spinners";

import { loadAllDailyActivities } from "./queries/queryHooks";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ProtectedRoute } from "./components/shared/wrapper/ProtectedRoutes";
import { useUser } from "./context";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const { user } = useUser();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="science" element={<Science />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<ContactUs />} />

        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-journey"
          loader={loadAllDailyActivities(queryClient, user)}
          hydrateFallbackElement={<PulseLoader />}
          element={
            <ProtectedRoute>
              <MyJourney />
            </ProtectedRoute>
          }
        />
        <Route
          path="add-activities"
          element={
            <ProtectedRoute>
              <AddActivities />
            </ProtectedRoute>
          }
        />
        <Route
          path="goals"
          element={
            <ProtectedRoute>
              <GoalVision />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute>
              <UserSettings />
            </ProtectedRoute>
          }
        />

        <Route path="blog/why-it-matters" element={<WhyItMatters />} />
        <Route path="blog/research-methods" element={<ResearchMethods />} />
        <Route path="blog/mood-tracking" element={<MoodTracking />} />
        <Route
          path="blog/dimensions-of-wellbeing"
          element={<DimensionsOfWellBeing />}
        />

        <Route path="reset-password" element={<ResetPasswordPage />} />

        <Route path="child-care" element={<ChildrenCare />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    )
  );
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
};

export default App;
