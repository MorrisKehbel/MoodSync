import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router";

import {
  FaHome,
  FaRegHeart,
  FaChartArea,
  FaRegSmileBeam,
  FaBars,
  FaHeartbeat,
  FaChalkboardTeacher,
  FaRegBell,
  FaHistory,
  FaAward,
} from "react-icons/fa";

import { useUser } from "../../context";
import { AuthModal } from "./auth";
import { AnimatedButton } from "./ui/AnimatedButton";

const publicNavItems = [
  { to: "/", icon: <FaHome size={20} />, label: "Home" },
  {
    to: "/how-it-works",
    icon: <FaRegHeart size={20} />,
    label: "How It Works",
  },
  {
    to: "/science",
    icon: <FaChartArea size={20} />,
    label: "Science-Backed",
  },
  { to: "/about", icon: <FaRegSmileBeam size={20} />, label: "About Us" },
];

const authNavItems = [
  { to: "/", icon: <FaHome size={20} />, label: "Home" },
  {
    to: "/dashboard",
    icon: <FaChalkboardTeacher size={20} />,
    label: "Dashboard",
  },
  {
    to: "/activity-goals",
    icon: <FaAward size={20} />,
    label: "Activity & Goals",
  },
  {
    to: "/history",
    icon: <FaHistory size={20} />,
    label: "Your History",
  },
];

export const PublicNavbar = () => {
  const { isAuthenticated, logout } = useUser();

  const navItems = isAuthenticated ? authNavItems : publicNavItems;

  const [showAuth, setShowAuth] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (showAuth) {
      setShowAuth(false);
    }
  }, [location]);

  return (
    <>
      {showAuth && (
        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      )}
      <nav
        aria-label="Main navigation"
        className="sticky top-12 left-0 w-full z-50 flex justify-center items-center"
      >
        <div className="flex justify-center items-center gap-8 sm:gap-16 lg:gap-4 px-8 sm:px-4 py-3 bg-gradient-to-r from-white/20 via-white/40 to-white/20 backdrop-blur-md shadow-xl rounded-2xl border border-white/60">
          <span className="lg:hidden text-blue-500">
            <FaBars size="25" />
          </span>
          <Link to="/" className="flex items-center gap-2">
            <FaHeartbeat className="hidden lg:flex text-blue-600" size="20" />

            <span className="text-2xl font-bold ">
              Mood<span className="text-blue-600">Sync</span>
            </span>
          </Link>

          <ul className="hidden lg:flex gap-2 mx-8">
            {navItems.map(({ to, icon, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-5 py-2 rounded-full group ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100/20 hover:bg-gray-100/60"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={
                          isActive
                            ? " text-white"
                            : "group-hover:text-blue-500 "
                        }
                      >
                        {icon}
                      </span>
                      <span
                        className={isActive ? "" : "group-hover:text-gray-700"}
                      >
                        {label}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 hidden sm:flex items-center justify-center rounded-full bg-white/40 shadow transition cursor-pointer border border-gray-200/60 hover:text-gray-600">
                <FaRegBell size={24} />
              </button>

              {/* placeholder logout btn*/}
              <button
                onClick={() => logout()}
                className="hidden lg:flex px-4 py-1 items-center justify-center rounded-full bg-white/40 shadow transition cursor-pointer border border-gray-200/60 hover:text-gray-600"
              >
                <FaBars size={24} />
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex">
              <AnimatedButton
                onClick={() => {
                  setShowAuth((prev) => !prev);
                }}
              >
                Sync Me In
              </AnimatedButton>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
