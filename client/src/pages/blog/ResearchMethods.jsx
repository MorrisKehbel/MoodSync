import { Link } from "react-router";
import { imgResearchMethods } from "../../assets/blog";

export const ResearchMethods = () => {
  return (
    <div className="w-full pt-24 px-4 md:px-10 text-[var(--color-text)]">
      <div className="max-w-4xl flex flex-col justify-center items-center mx-auto p-8 rounded-2xl bg-white/40 dark:bg-white/20 border border-white/60 shadow-sm">
        <img
          src={imgResearchMethods}
          loading="lazy"
          className="w-full h-[250px] object-cover shadow-md rounded-2xl border border-black/20"
          alt="Why it Matters"
        />

        <h1 className="text-4xl leading-snug font-bold my-6 text-center">
          From Research to Recovery: How Science Shapes Mental Health Support
        </h1>

        <p className="text-lg leading-relaxed mb-6">
          Modern mental health research blends{" "}
          <span className="font-semibold">clinical insight</span> with{" "}
          <span className="font-semibold">technology</span> to better recognize
          and treat psychological conditions. To identify mental illness,
          professionals often rely on{" "}
          <span className="font-medium">clinical interviews</span>. These
          in-depth conversations help clinicians understand a person's mental
          state and life history, forming the foundation for accurate diagnosis.{" "}
          <span className="font-medium">Behavioral observation</span> also plays
          a key role.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Technology-driven methods further enhance this process.{" "}
          <span className="font-medium">Neuroimaging</span>, including MRI and
          PET scans, reveals how mental illness affects brain structure and
          activity. Scientists also explore{" "}
          <span className="font-medium">biomarkers</span> such as hormones or
          genetic patterns that can help detect mental health risks with greater
          precision.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          When it comes to treatment, randomized controlled trials (RCTs) are
          used to test medications and therapies. CBT, or{" "}
          <span className="font-medium">Cognitive Behavioral Therapy</span>, is
          one of the most studied and effective interventions. Apps inspired by
          CBT often guide users through exercises that challenge negative
          thinking and build healthier patterns.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Digital mental health tools are increasingly validated by science.
          Research shows that these apps can reduce symptoms when they include{" "}
          <span className="font-medium">evidence-based features</span> such as
          mood tracking, journaling, or mindfulness training. These tools make
          therapeutic strategies available anytime.
        </p>

        <p className="text-sm leading-relaxed italic border-t pt-6 text-[var(--color-text-muted)]">
          By grounding their design in well-established research methods,{" "}
          <span className="font-medium">MoodSync</span> creates a bridge between
          cutting-edge science and everyday self-care. The result is an app
          experience that not only feels supportive and personalized but also
          mirrors strategies that clinicians and scientists know to be
          effective.
        </p>
        <Link to="/science">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 mt-8 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition cursor-pointer">
            Return
          </button>
        </Link>
      </div>
    </div>
  );
};
