import { Link } from "react-router";
import { imgMoodTracking } from "../../assets/blog";

export const MoodTracking = () => {
  return (
    <div className="w-full pt-24 px-4 md:px-10">
      <div className="max-w-4xl flex flex-col justify-center items-center mx-auto p-8 rounded-2xl bg-white/40 border border-white/60 shadow-sm">
        <img
          src={imgMoodTracking}
          loading="lazy"
          className="w-full h-[250px] object-cover object-[50%_60%] shadow-md rounded-2xl border border-black/20"
          alt="Mood Tracking"
        />

        <h1 className="text-4xl font-bold text-gray-800 my-6 text-center">
          Mood Tracking: Why Self-Reflection Makes a Difference
        </h1>

        <p className="text-lg leading-relaxed mb-6">
          <span className="font-semibold">Mood tracking</span> is more than just
          writing down how you feel. Research shows it can improve{" "}
          <span className="font-medium">emotional awareness</span> and lead to
          better <span className="font-medium">mental well-being</span>. When
          you reflect on your emotions regularly, you start to recognize
          patterns and triggers. This deeper understanding of your inner state
          can help you respond more thoughtfully, rather than react impulsively.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Studies suggest that people who log their mood consistently are more
          likely to identify{" "}
          <span className="font-medium">thought patterns</span> that contribute
          to anxiety, depression, or stress. Tracking helps bring these thoughts
          to light so they can be addressed and changed over time. It also
          increases <span className="font-medium">self-regulation</span> and
          supports healthy coping strategies.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Making mood tracking a daily habit can reveal how factors like sleep,
          nutrition, or social interaction affect how you feel. When you start
          to see emotional patterns, you can take small steps to break negative
          cycles and reinforce positive ones. Over time, this process helps
          build <span className="font-medium">resilience</span> and gives you a
          greater sense of <span className="font-medium">control</span> over
          your mental health.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Consistent self-reflection through mood tracking also makes it easier
          to spot early signs of distress, before they become overwhelming. This
          kind of awareness is key for preventing burnout and improving
          long-term stability. It can also help inform conversations with
          therapists or doctors by offering a clear picture of how your feelings
          change over time.
        </p>

        <p className="text-sm leading-relaxed italic text-gray-700 border-t pt-6">
          At <span className="font-medium">MoodSync</span>, we make mood
          tracking simple and powerful. Our app helps users reflect, notice
          trends, and receive personalized guidance. By turning self-reflection
          into a daily habit, we empower people to take real steps toward
          feeling better.
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
