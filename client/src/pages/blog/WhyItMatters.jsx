import { Link } from "react-router";
import { imgWhyItMatters } from "../../assets/blog";

export const WhyItMatters = () => {
  return (
    <div className="w-full pt-24 px-4 md:px-10">
      <div className="max-w-4xl flex flex-col justify-center items-center mx-auto p-8 rounded-2xl bg-white/40 border border-white/60 shadow-sm">
        <img
          src={imgWhyItMatters}
          loading="lazy"
          className="w-full h-[250px] object-cover shadow-md rounded-2xl border border-black/20"
          alt="Why it Matters"
        />

        <h1 className="text-4xl leading-snug font-bold text-gray-800 my-6 text-center">
          Mental Health: Why It Matters
        </h1>

        <p className="text-lg leading-relaxed mb-6">
          Mental health is a state of well-being that enables people to cope
          with stress, work productively, and contribute to their community. For
          far too long, mental well-being was undervalued and shrouded in
          stigma, but today we recognize it as{" "}
          <span className="font-semibold">crucial to overall health</span>. In
          essence, caring for our mind is just as important as caring for our
          body.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Mental health challenges are also far more common than many realize.
          Around <span className="font-medium">one in eight people</span>{" "}
          worldwide lives with a mental disorder. In the United States, over{" "}
          <span className="font-medium">one in five adults</span> experiences a
          mental illness each year. These conditions range from anxiety and
          depression to more severe disorders, affecting people of all ages and
          backgrounds. Such prevalence underlines that mental health isn't a
          niche issue, it touches virtually every family and community.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          The impact of mental health on daily life is profound. Poor mental
          health can disrupt relationships, erode performance at school or work,
          and diminish overall quality of life. It's closely intertwined with
          physical health too. <span className="font-medium">Depression</span>,
          for example, can increase the risk of chronic conditions like heart
          disease or stroke, just as living with a chronic illness can heighten
          the risk of developing mental health issues. Conversely, when people
          have support and tools to nurture their mental well-being, they tend
          to cope better with life's challenges and maintain healthier
          lifestyles.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Left unaddressed, mental health challenges carry heavy costs. Mental
          disorders are a leading cause of disability globally and contribute to
          enormous economic losses. Depression and anxiety alone cause about{" "}
          <span className="font-medium">12 billion workdays</span> lost each
          year, costing the global economy around{" "}
          <span className="font-medium">$1 trillion</span> in lost productivity.
          Beyond the statistics, what truly matters are the human lives
          affected: suicide, often linked to untreated mental illness, ranks
          among the leading causes of death in young people. Yet, despite
          effective treatments existing, many do not receive help due to
          under-resourced services or lingering{" "}
          <span className="font-medium">stigma</span>.
        </p>

        <p className="text-sm leading-relaxed italic text-gray-700 border-t pt-6">
          All of this underscores why mental health deserves attention and
          support, it truly matters for everyone. By centering its mission on
          the fundamental importance of mental well-being,{" "}
          <span className="font-medium">MoodSync</span> builds a bridge between
          awareness and actionable self-care.
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
