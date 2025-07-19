import { PageSlideContainer } from "../components/shared/wrapper/PageSlideContainer";

export const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Log Activities",
      desc: "Capture workouts, social moments, work sessions & more.",
    },
    {
      id: 2,
      title: "Get Instant Score",
      desc: "Our AI rates the impact on your overall well-being.",
    },
    {
      id: 3,
      title: "Receive Smart Tips",
      desc: "Actionable recommendations tailored to your lifestyle.",
    },
  ];
  return (
    <PageSlideContainer>
      <div className="flex flex-col p-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-16 mt-8 lg:mt-12 text-center">
          How It Works
        </h1>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="p-6 border rounded-2xl shadow-sm transform hover:-translate-y-2 
         transition-transform duration-200 ease-in-out"
            >
              <p className="text-emerald-600 text-4xl font-black">{step.id}</p>
              <h2 className="mt-4 font-semibold text-lg">{step.title}</h2>
              <p className="mt-2 text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </PageSlideContainer>
  );
};
