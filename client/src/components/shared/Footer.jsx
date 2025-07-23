import { Link } from "react-router";

import {
  FaHeartbeat,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:text-left">
          <div className="space-y-6 col-span-1 sm:col-span-2 flex flex-col justify-center mx-auto">
            <div className="flex text-2xl font-bold justify-center mx-auto items-center">
              {/* //placeholder// */}
              <FaHeartbeat className="w-6 h-6 mr-1 text-blue-600" />
              {/* //placeholder// */}
              <p>
                Mood
                <span className="text-blue-600">Sync</span>
              </p>
            </div>
            <p className="text-sm text-gray-600">
              We empower you to track habits, sync life spheres & thrive
              everyday.
            </p>
            <section aria-label="Social media" className="flex gap-3 mx-auto">
              <a
                href="#"
                aria-label="Twitter"
                className="rounded-xl bg-gray-100/20 p-3 backdrop-blur transition hover:bg-gray-100/60"
              >
                <FaTwitter className="text-gray-700 h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="rounded-xl bg-gray-100/20 p-3 backdrop-blur transition hover:bg-gray-100/60"
              >
                <FaInstagram className="text-gray-700 h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="rounded-xl bg-gray-100/20 p-3 backdrop-blur transition hover:bg-gray-100/60"
              >
                <FaLinkedin className="text-gray-700 h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="Github"
                className="rounded-xl bg-gray-100/20 p-3 backdrop-blur transition hover:bg-gray-100/60"
              >
                <FaGithub className="text-gray-700 h-4 w-4" />
              </a>
            </section>
          </div>
          <div className="py-4 px-8 bg-gradient-to-r from-white/10 via-white/20 to-white/10 backdrop-blur-md shadow-sm sm:shadow-md rounded-2xl border border-white/60 space-y-4 text-gray-700 text-center lg:text-left">
            <h3 className="font-semibold text-lg">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="hover:text-gray-600">
                  Dashboard
                </Link>
              </li>

              <li>
                <Link to="/how-it-works" className="hover:text-gray-600">
                  How it works
                </Link>
              </li>
              <li>
                <Link to="/placeholder" className="hover:text-gray-600">
                  Placeholder
                </Link>
              </li>
              <li>
                <Link to="/placeholder" className="hover:text-gray-600">
                  Placeholder
                </Link>
              </li>
            </ul>
          </div>
          <div className="py-4 px-8 bg-gradient-to-r from-white/10 via-white/20 to-white/10 backdrop-blur-md shadow-sm sm:shadow-md rounded-2xl border border-white/60 space-y-4 text-gray-700 text-center lg:text-left">
            <h3 className="font-semibold text-lg">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/our-mission" className="hover:text-gray-600">
                  Our mission
                </Link>
              </li>
              <li>
                <Link to="/science" className="hover:text-gray-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-600">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-between gap-4 pt-4 mt-12 border-t border-gray-400/40 text-sm">
          <p>
            &copy; {new Date().getFullYear()} MoodSync. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              to="/terms-of-service"
              className="hover:text-gray-600 underline"
            >
              Terms of service
            </Link>
            <Link
              to="/privacy-policy"
              className="hover:text-gray-600 underline"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
