import { Link } from "react-router";

import { PageSlideContainer } from "../components/shared/wrapper/PageSlideContainer";
import {
  imgWhyItMatters,
  imgResearchMethods,
  imgMoodTracking,
  imgDimensionsWellbeing,
} from "../assets/blog/";

const blogItems = [
  {
    to: "/blog/why-it-matters",
    title: "Why it Matters",
    src: imgWhyItMatters,
    alt: "Why it Matters",
  },
  {
    to: "/blog/research-methods",
    title: "From Research to Recovery",
    src: imgResearchMethods,
    alt: "Research Methods",
  },
  {
    to: "/blog/mood-tracking",
    title: "Mood Tracking - Makes a Difference",
    src: imgMoodTracking,
    alt: "Mood Tracking",
  },
  {
    to: "/blog/dimensions-of-wellbeing",
    title: "The Dimensions of Well-Being",
    src: imgDimensionsWellbeing,
    alt: "Dimensions of Wellbeing",
  },
];

export const Science = () => {
  return (
    <PageSlideContainer>
      <section className="flex flex-col">
        <div className="flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text)]">
            Built on Science. Backed by research.
          </h1>
          <p className="text-lg mt-2 text-[var(--color-text)] max-w-3xl">
            We use research-backed methods to turn reflection, habit tracking,
            and mood awareness into real personal growth.
          </p>
          <div className="w-20 h-1 mx-auto mt-4 bg-gradient-to-r from-blue-600 to-pink-500 rounded-full" />
          <p className="mx-auto text-center mt-8 mb-12 max-w-4xl text-[var(--color-text-muted)]">
            Here, we dive deeper into the research behind mental health,
            unpacking the ideas that guide our tools and help you understand
            yourself better. By understanding patterns in mood, lifestyle, and
            life domains, the app can interpret user input more meaningfully and
            offer smarter, more personalized support.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8 mx-auto px-4 max-w-7xl">
          {blogItems.map(({ to, src, alt, title }) => (
            <Link to={to} key={to} className="group">
              <img
                src={src}
                loading="lazy"
                alt={alt}
                className="
                  w-full aspect-[3/2] max-w-sm object-cover shadow-md 
                  group-hover:shadow-lg rounded-2xl border 
                  border-white/60 dark:border-black/60 
                  transition-all group-hover:scale-105 cursor-pointer 
                  duration-300 delay-50 select-none
                "
              />
              <h2
                className="text-center text-sm font-semibold mt-2 tracking-widest 
                transition-all group-hover:text-gray-600 dark:group-hover:text-gray-400 
                group-hover:scale-[1.02] duration-300 delay-50 text-[var(--color-text)]"
              >
                {title}
              </h2>
            </Link>
          ))}
        </div>
      </section>
    </PageSlideContainer>
  );
};
