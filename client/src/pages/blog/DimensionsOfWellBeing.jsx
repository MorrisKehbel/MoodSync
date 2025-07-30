import { Link } from "react-router";
import { imgDimensionsWellbeing } from "../../assets/blog";

export const DimensionsOfWellBeing = () => {
  return (
    <div className="w-full pt-24 px-4 md:px-10">
      <div
        className="max-w-4xl flex flex-col justify-center items-center mx-auto p-8 rounded-2xl bg-white/40 border border-white/60 shadow-sm">
        <img
          src={imgDimensionsWellbeing}
          loading="lazy"
          className="
            w-full h-[250px] object-cover shadow-md rounded-2xl
            border border-black/20 dark:border-white/20
          "
          alt="Dimensions of Well-Being"
        />

        <h1 className="text-4xl leading-snug font-bold my-6 text-center text-[var(--color-text)]">
          The Dimensions of Well-Being
        </h1>

        <p className="text-lg leading-relaxed mb-6 text-[var(--color-muted)]">
          Mental health is influenced by more than just our thoughts and emotions. It is deeply connected to the different{" "}
          <span className="font-semibold text-[var(--color-text)]">pillars of our daily lives</span>, including{" "}
          <span className="font-medium text-[var(--color-text)]">social connection</span>,{" "}
          <span className="font-medium text-[var(--color-text)]">physical health</span>,{" "}
          <span className="font-medium text-[var(--color-text)]">emotional well-being</span>,{" "}
          <span className="font-medium text-[var(--color-text)]">career fulfillment</span>,{" "}
          <span className="font-medium text-[var(--color-text)]">financial stability</span>,{" "}
          <span className="font-medium text-[var(--color-text)]">personal growth</span>, and{" "}
          <span className="font-medium text-[var(--color-text)]">spiritual alignment</span>. Each of these areas plays a unique role in shaping how we feel, think, and cope with life's demands.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-[var(--color-muted)]">
          Strong relationships offer a sense of belonging and support. Taking 
          care of our body improves not only physical energy but also our mood. 
          When our work aligns with our values, we feel more purpose and motivation. 
          Managing finances wisely reduces stress and gives us peace of mind. Moments 
          of personal growth and self-reflection help us feel capable and confident. 
          And for many, spiritual practices offer deeper meaning and inner peace.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-[var(--color-muted)]">
          These dimensions do not operate separately. They are{" "}
          <span className="font-medium text-[var(--color-text)]">interconnected</span>. A positive change 
          in one area often uplifts others. For example, getting better sleep can improve emotional 
          regulation and decision-making. Feeling supported socially can motivate someone to exercise 
          more. This is why maintaining a balanced approach to life (even in small steps) can make 
          a big impact on our overall well-being.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-[var(--color-muted)]">
          But when one or more of these areas fall out of balance, our mental 
          health can begin to suffer. Constant stress at work, financial
          pressure, loneliness, or a lack of meaning can increase{" "}
          <span className="font-medium text-[var(--color-text)]">
            anxiety, burnout, or emotional exhaustion
          </span>
          . Recognizing where we feel off-balance is the first step toward 
          recovery. From there, even gentle daily actions can help us feel more 
          stable and connected again.
        </p>

        <p className="text-sm leading-relaxed italic border-t pt-6 text-[var(--color-muted)]">
          At <span className="font-medium text-[var(--color-text)]">MoodSync</span>, we believe mental 
          health is shaped by every part of life, not just how you feel, but how 
          you live. Our app helps you reflect across these areas, notice 
          imbalances early, and take meaningful steps toward holistic 
          well-being.
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
