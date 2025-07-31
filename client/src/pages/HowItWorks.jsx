import { PageSlideContainer } from "../components/shared/wrapper/PageSlideContainer";
import imgLog from "../assets/howitworks/img_log.webp";
import imgScore from "../assets/howitworks/img_score.webp";
import imgTips from "../assets/howitworks/img_tips.webp";

export const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Log Activities",
      desc: "Capture workouts, social moments, work sessions & more.",
      img: imgLog,
    },
    {
      id: 2,
      title: "Get Instant Score",
      desc: "Our AI rates the impact on your overall well-being.",
      img: imgScore,
    },
    {
      id: 3,
      title: "Receive Smart Tips",
      desc: "Actionable recommendations tailored to your lifestyle.",
      img: imgTips,
    },
  ];
  return (
    <PageSlideContainer>
      <section className="flex flex-col">
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text)]">
            How It Works
          </h1>
          <p className="text-[var(--color-text-muted)] text-lg mt-2">
            Start syncing your well-being in 3 simple steps
          </p>
          <div className="w-20 h-1 mx-auto mt-4 bg-gradient-to-r from-blue-600 to-pink-500 rounded-full mb-16" />
        </div>
        <div className="flex flex-col space-y-16 md:space-y-4 text-[var(--color-text)]">
          {steps.map((step, i) => (
            <div
              key={step.id}
              className={`flex flex-col md:flex-row gap-2 md:gap-4 xl:gap-8 items-center justify-center rounded-2xl hover:scale-105 transition-all delay-150 duration-500 ${
                i === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div>
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <p className="text-white text-2xl flex items-center justify-center font-black rounded-full p-2 h-10 w-10 bg-blue-600">
                    {step.id}
                  </p>
                  <h2 className="font-semibold text-xl">{step.title}</h2>
                </div>
                <p className="mt-2 text-center md:text-left">{step.desc}</p>
              </div>
              <div
                className="w-full max-w-[450px] aspect-[3/2] bg-cover bg-center select-none opacity-75 dark:opacity-85"
                style={{ backgroundImage: `url(${step.img})` }}
              />
            </div>
          ))}
        </div>
      </section>
    </PageSlideContainer>
  );
};
