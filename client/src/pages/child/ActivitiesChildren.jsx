import { Link } from "react-router";
import topBg from "../../assets/child/top.png";
import angry from "../../assets/child/angry.png";
import sad from "../../assets/child/sad.png";
import scared from "../../assets/child/scared.png";

import { PageSlideContainer } from "../../components/shared/wrapper/PageSlideContainer";

const moods = [
  { id: "angry", label: "ANGRY", icon: angry },
  { id: "sad", label: "SAD", icon: sad },
  { id: "scared", label: "SCARED", icon: scared },
];

export const ChildrenCare = () => {
  return (
    <PageSlideContainer>
      <section className="mx-auto w-full flex flex-col justify-center items-center mb-12">
        <img
          src={topBg}
          fetchPriority="high"
          width="2653"
          height="1080"
          alt="Open book with a rainbow and sun illustration"
          className="mx-auto max-w-full h-auto object-contain object-center"
        />

        <div className="flex flex-col justify-center items-center text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text)]">
              Healing stories for children
            </h1>
            <div className="w-20 h-1 mx-auto mt-4 bg-gradient-to-r from-blue-600 to-pink-500 rounded-full" />

            <p className="mx-auto text-center mt-4 max-w-3xl text-[var(--color-text-muted)]">
              This collection of stories is created to support children and
              parents and help to develop emotional intelligence. Fairy tale
              therapy for children has a wonderful effect! We offer you a
              collection of stories for your children to make everyday life more
              comfortable and enjoyable. To start fairy tale therapy, simply
              click on an emotion, and you will receive a collection of
              therapeutic stories that will help your child process and navigate
              that emotion.
            </p>

            <div>
              <p className="mt-8 text-[var(--color-text)] font-semibold">
                Click how your child feels:
              </p>
            </div>
          </div>

          <div
            className="bg-white/60 backdrop-blur-md p-8 mt-2 rounded-2xl shadow-md
                  border-4 border-transparent bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-border"
          >
            <div className="flex flex-wrap justify-center gap-6">
              {moods.map((mood) => (
                <Link
                  key={mood.id}
                  to={`/child-care/${mood.id}`}
                  className="w-48 flex flex-col items-center p-6 border border-gray-300 rounded-xl bg-white hover:bg-blue-100/70 transition shadow-sm cursor-pointer group focus-visible:outline-4 focus-visible:outline-blue-200"
                >
                  <div className="text-gray-700 group-hover:text-black group-hover:scale-105 transition duration-300">
                    <img
                      src={mood.icon}
                      alt={mood.label}
                      className="w-auto h-24 object-contain"
                    />
                    <span className="font-bold text-lg mt-2 group-hover:scale-103 transition duration-300">
                      {mood.label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageSlideContainer>
  );
};

export default ChildrenCare;
