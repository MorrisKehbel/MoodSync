import { Link } from "react-router";

import { PageSlideContainer } from "../components/shared/wrapper/PageSlideContainer";
import imgWhyItMatters from "../assets/blog/img_why_it_matters.webp";

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
          <Link to="/why-it-matters">
            <img
              src={imgWhyItMatters}
              className="shadow-xl rounded-2xl border border-white/60 transition-all hover:scale-105 cursor-pointer h-45"
              alt="Why it Matters"
            />
          </Link>
          <Link to="#">
            <img
              src="placeholder"
              className="shadow-xl rounded-2xl border border-white/60 transition-all hover:scale-105 cursor-pointer h-45"
              alt=""
            />
          </Link>
          <Link to="#">
            <img
              src="placeholder"
              className="shadow-xl rounded-2xl border border-white/60 transition-all hover:scale-105 cursor-pointer h-45"
              alt=""
            />
          </Link>
          <Link to="#">
            <img
              src="placeholder"
              className="shadow-xl rounded-2xl border border-white/60 transition-all hover:scale-105 cursor-pointer h-45"
              alt=""
            />
          </Link>
        </div>
      </div>
    </PageSlideContainer>
  );
};
