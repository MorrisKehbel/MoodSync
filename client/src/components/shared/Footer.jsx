import { Link } from "react-router";
import { useUser } from "../../context";

import {
  FaHeartbeat,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

export const Footer = () => {
  const { isAuthenticated, setCurrentMode, setShowAuth } = useUser();

  return (
    <footer className="w-full bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:text-left">
          <div className="space-y-6 col-span-1 sm:col-span-2 flex flex-col justify-center mx-auto">
            <div className="flex text-2xl font-bold justify-center mx-auto items-center">
              <FaHeartbeat className="w-6 h-6 mr-1 text-[var(--color-primary)]" />
              <p>
                Mood
                <span className="text-[var(--color-primary)]">Sync</span>
              </p>
            </div>
            <p className="text-sm text-[var(--color-text)]">
              We empower you to track habits, sync life spheres & thrive
              everyday.
            </p>
            <section aria-label="Social media" className="flex gap-3 mx-auto">
              <a
                href="#"
                aria-label="Twitter"
                className="rounded-xl bg-gray-100/20 p-3 backdrop-blur transition hover:bg-gray-100/60 text-[var(--color-text)] hover:text-[var(--color-primary)]"
              >
                <FaTwitter className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="rounded-xl bg-gray-100/20 p-3 backdrop-blur transition hover:bg-gray-100/60 text-[var(--color-text)] hover:text-[var(--color-primary)]"
              >
                <FaInstagram className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="rounded-xl bg-gray-100/20 p-3 backdrop-blur transition hover:bg-gray-100/60 text-[var(--color-text)] hover:text-[var(--color-primary)]"
              >
                <FaLinkedin className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="Github"
                className="rounded-xl bg-gray-100/20 p-3 backdrop-blur transition hover:bg-gray-100/60 text-[var(--color-text)] hover:text-[var(--color-primary)]"
              >
                <FaGithub className="h-4 w-4" />
              </a>
            </section>
          </div>

          <div className="py-4 px-8 bg-gradient-to-r from-white/10 via-white/20 to-white/10 backdrop-blur-md shadow-sm sm:shadow-md rounded-2xl border border-white/60 space-y-4 text-[var(--color-text)] text-center lg:text-left">
            <h3 className="font-semibold text-lg">Services</h3>
            <ul className="space-y-2">
              <li>
                {isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    className="hover:text-[var(--color-primary)]"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setCurrentMode("login");
                      setShowAuth(true);
                    }}
                    className="hover:text-[var(--color-primary)] cursor-pointer"
                  >
                    Dashboard
                  </button>
                )}
              </li>
              <li>
                <Link
                  to="/child-care"
                  className="hover:text-[var(--color-primary)]"
                >
                  Child Care
                </Link>
              </li>

              <li>
                <Link
                  to="/how-it-works"
                  className="hover:text-[var(--color-primary)]"
                >
                  How it works
                </Link>
              </li>
            </ul>
          </div>

          <div className="py-4 px-8 bg-gradient-to-r from-white/10 via-white/20 to-white/10 backdrop-blur-md shadow-sm sm:shadow-md rounded-2xl border border-white/60 space-y-4 text-[var(--color-text)] text-center lg:text-left">
            <h3 className="font-semibold text-lg">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-[var(--color-primary)]">
                  About us
                </Link>
              </li>
              <li>
                <Link
                  to="/science"
                  className="hover:text-[var(--color-primary)]"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-[var(--color-primary)]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap justify-center sm:justify-between gap-4 pt-4 mt-12 border-t border-gray-400/40 text-[var(--color-text)] text-sm">
          <p>
            &copy; {new Date().getFullYear()} MoodSync. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              to="/terms-of-service"
              className="hover:text-[var(--color-primary)] underline"
            >
              Terms of service
            </Link>
            <Link
              to="/privacy-policy"
              className="hover:text-[var(--color-primary)] underline"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
