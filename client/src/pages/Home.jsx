import { Link } from "react-router";
import { PageSlideContainer } from "../components/shared/wrapper/PageSlideContainer";

export const Home = () => {
  return (
    <PageSlideContainer>
      <section className="flex flex-col p-4">
        <div className="flex flex-col items-center gap-6 px-8 py-12 mb-16 mt-8 lg:mt-12 bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl max-w-xl">
          <p className="uppercase tracking-widest text-blue-600 font-semibold text-sm">
            Mental Health Tracking App
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center drop-shadow-lg">
            Always pay attention to your mental health
          </h1>
          {/* placeholder text */}
          <p className="text-lg text-gray-700 text-center max-w-md">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet.
          </p>
          <Link to="/signup">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition cursor-pointer">
              Start now
            </button>
          </Link>
        </div>
      </section>
    </PageSlideContainer>
  );
};
