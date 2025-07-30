import { Outlet, useLocation } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { ScrollToTop } from "../components/shared/wrapper/ScrollToTop";

import {
  PublicNavbar,
  Footer,
  ErrorFallback,
} from "../components/shared/index";

import '../index.css'; // Import your global styles

export const MainLayout = () => {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300">
      <ScrollToTop />
      <PublicNavbar />

      <main className="flex-1 flex">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          resetKeys={[location.pathname]}
        >
          <Outlet />
        </ErrorBoundary>
      </main>

      <Footer />
      </div>
  );
};
