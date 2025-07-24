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
    src: imgWhyItMatters,
    alt: "Why it Matters",
  },
  {
    to: "/blog/research-methods",
    src: imgResearchMethods,
    alt: "Research Methods",
  },
  {
    to: "/blog/mood-tracking",
    src: imgMoodTracking,
    alt: "Mood Tracking",
  },
  {
    to: "/blog/dimensions-of-wellbeing",
    src: imgDimensionsWellbeing,
    alt: "Dimensions of Wellbeing",
  },
];

export const Science = () => {
  return (
    <PageSlideContainer>
      <div className="flex flex-col p-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-16 mt-8 lg:mt-12">
          Built on Science. Backed by research.
        </h1>
        <p className="max-w-lg">
          MoodSync is built on proven methods from psychology, behavioral
          science, and neuroscience. Here, we dive deeper into the research
          behind mental health, unpacking the ideas that guide our tools and
          help you understand yourself better.
        </p>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8 mt-16 mx-auto">
          {blogItems.map(({ to, src, alt }) => (
            <Link to={to} key={to}>
              <img
                src={src}
                loading="lazy"
                className="w-full aspect-[3/2] max-w-sm object-cover shadow-md hover:shadow-xl rounded-2xl border border-white/60 transition-all hover:scale-105 cursor-pointer"
                alt={alt}
              />
            </Link>
          ))}
        </div>
      </div>
    </PageSlideContainer>
  );
};
