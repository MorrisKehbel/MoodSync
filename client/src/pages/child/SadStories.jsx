import { PageSlideContainer } from "../../components/shared/wrapper/PageSlideContainer";
import { Link } from "react-router";

export const SadStories = () => {
  return (
    <PageSlideContainer>
      <section className="flex flex-col text-[var(--color-text)]">
        <div className="flex flex-col justify-center items-center text-center ">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Healing stories for children
          </h1>
          <div className="w-20 h-1 mx-auto mt-4 bg-gradient-to-r from-blue-600 to-pink-500 rounded-full" />
        </div>
        <div className="max-w-4xl flex flex-col justify-center items-center mx-auto p-8 mt-8 rounded-2xl bg-white/40 dark:bg-white/20 border border-white/60 shadow-sm">
          <p>
            placeholder placeholder placeholder placeholder placeholder
            placeholder placeholder placeholder placeholder placeholder
            placeholder placeholder placeholder placeholder placeholder
          </p>
          <Link to="/child-care">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 mt-8 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition cursor-pointer">
              Return
            </button>
          </Link>
        </div>
      </section>
    </PageSlideContainer>
  );
};
