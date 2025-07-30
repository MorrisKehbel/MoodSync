import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import {
  FaHome,
  FaRegHeart,
  FaChartArea,
  FaRegSmileBeam,
  FaBars,
  FaHeartbeat,
  FaChalkboardTeacher,
  FaHistory,
  FaAward,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

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
  {
    to: "/dashboard",
    icon: <FaChalkboardTeacher size={20} />,
    label: "Dashboard",
  },
  {
    to: "/activitys",
    icon: <FaHistory size={20} />,
    label: "My Journey",
  },
  {
    to: "/goals",
    icon: <FaAward size={20} />,
    label: "Goal Vision",
  },
  { to: "/settings", icon: <FaGear size={20} />, label: "Settings" },
];

export const PublicNavbar = () => {
  const { isAuthenticated, logout, showAuth, setShowAuth } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = isAuthenticated ? authNavItems : publicNavItems;

  useEffect(() => {
    if (showAuth) {
      setShowAuth(false);
    }
    if (menuOpen) {
      setMenuOpen(false);
    }
  }, [location]);

  return (
    <>
      {showAuth && (
        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      )}
      <nav
        aria-label="Main navigation"
        className="sticky top-12 left-0 w-full z-25 lg:z-50 flex justify-center items-center"
      >
        <div className="flex justify-center items-center gap-8 sm:gap-16 lg:gap-4 px-8 sm:px-4 py-3 bg-gradient-to-r from-white/20 via-white/40 to-white/20 backdrop-blur-md shadow-xl rounded-2xl border border-white/60">
          <div className="flex flex-col gap-6">
            <div className="flex space-x-6 sm:space-x-8">
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="lg:hidden text-blue-500 cursor-pointer"
              >
                <FaBars size="25" />
              </button>
              <Link to="/" className="flex items-center">
                <FaHeartbeat
                  className="hidden lg:flex text-blue-600 mr-2"
                  size="20"
                />

                <span className="text-2xl font-bold ">
                  Mood<span className="text-blue-600">Sync</span>
                </span>
              </Link>
              <ul className="hidden lg:flex gap-2 items-center">
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
                                ? "text-white"
                                : "group-hover:text-blue-500 "
                            }
                          >
                            {icon}
                          </span>
                          <span
                            className={
                              isActive
                                ? "text-white"
                                : "group-hover:text-gray-700"
                            }
                          >
                            {label}
                          </span>
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="hidden sm:flex">
                {isAuthenticated ? (
                  <AnimatedButton
                    onClick={() => {
                      logout();
                      setShowAuth(true); // open login modal after logout
                    }}
                  >
                    Logout
                  </AnimatedButton>
                ) : (
                  <AnimatedButton
                    onClick={() => {
                      if (!showAuth) {
                        setShowAuth(true); // Show modal
                      } else {
                        setShowAuth(false); // Hide modal
                        navigate("/"); // Redirect to home
                      }
                    }}
                  >
                    Sync Me In
                  </AnimatedButton>
                )}
              </div>
            </div>
            {menuOpen && (
              <ul className="space-y-2 text-center lg:hidden">
                {navItems.map(({ to, icon, label }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        `flex items-center gap-2 py-2 px-4 rounded-full group ${
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
                                ? "text-white"
                                : "group-hover:text-blue-500 "
                            }
                          >
                            {icon}
                          </span>
                          <span
                            className={
                              isActive
                                ? "text-white"
                                : "group-hover:text-gray-700"
                            }
                          >
                            {label}
                          </span>
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
                <li className="mt-4 sm:hidden">
                  {isAuthenticated ? (
                    <AnimatedButton
                      onClick={() => {
                        setMenuOpen(false);
                        logout();
                      }}
                    >
                      Logout
                    </AnimatedButton>
                  ) : (
                    <AnimatedButton
                      onClick={() => {
                        setMenuOpen(false);
                        if (!showAuth) {
                          setShowAuth(true);
                        } else {
                          setShowAuth(false);
                          navigate("/");
                        }
                      }}
                    >
                      Sync Me In
                    </AnimatedButton>
                  )}
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
