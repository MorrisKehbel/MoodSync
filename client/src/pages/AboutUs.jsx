import { PageSlideContainer } from "../components/shared/wrapper/PageSlideContainer";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";

export const AboutUs = () => {
  const team = [
    {
      id: 1,
      name: "Morris Kehbel",
      role: "Full-Stack Developer",
      avatar: "https://avatars.githubusercontent.com/u/207028766?v=4",
      contact: [
        {
          href: "https://www.linkedin.com/in/morris-kehbel/",
          Icon: FaLinkedin,
        },
        { href: "https://github.com/MorrisKehbel", Icon: FaGithubSquare },
      ],
    },
    {
      id: 2,
      name: "Shraddha Bhikadiya",
      role: "Full-Stack Developer",
      avatar:
        "https://avatars.githubusercontent.com/u/207018621?s=400&u=8c00e4adc4f5c1a510969d67c1fe1fd6855b9657&v=4",
      contact: [
        {
          href: "https://www.linkedin.com/in/shraddhabhikadiya/",
          Icon: FaLinkedin,
        },
        {
          href: "https://github.com/shraddhabhikadiya2017",
          Icon: FaGithubSquare,
        },
      ],
    },
    {
      id: 3,
      name: "Elham Nakhkoob",
      role: "Full-Stack Developer",
      avatar:
        "https://avatars.githubusercontent.com/u/67388693?s=400&u=89e654a6895040531f9d71cc57a0acfb839ee407&v=4",
      contact: [
        {
          href: "https://www.linkedin.com/in/elham-nakhkoob/",
          Icon: FaLinkedin,
        },
        { href: "https://github.com/ElhamNakhkoob", Icon: FaGithubSquare },
      ],
    },
    {
      id: 4,
      name: "Maryna Shymkova",
      role: "Full-Stack Developer",
      avatar: "https://avatars.githubusercontent.com/u/207185993?v=4",
      contact: [
        {
          href: "https://www.linkedin.com/in/marynashymkova/",
          Icon: FaLinkedin,
        },
        { href: "https://github.com/Maryna2221", Icon: FaGithubSquare },
      ],
    },
  ];

  return (
    <PageSlideContainer>
      <section className="flex flex-col">
        <div className="flex flex-col justify-center items-center text-center ">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text)]/70">
            About Us
          </h1>
          <p className="text-[var(--color-muted)] text-lg mt-2">
            The mission behind MoodSync and the team supporting your well-being
          </p>
          <div className="w-20 h-1 mx-auto mt-4 bg-gradient-to-r from-[var(--color-primary)] to-pink-500 rounded-full" />
          <p className="text-[var(--color-text)] mx-auto text-center mt-8 mb-12 max-w-xl">
            What started as a final project at the WBS Coding School grew into a
            mission to support mental health. We believe evidence-based
            self-care should be accessible to everyone. Our mission is to
            empower daily growth by combining expert-backed methods with
            intuitive technology so your mental wellbeing becomes part of your
            daily routine.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {team.map(({ id, name, role, avatar, contact }) => (
            <div
              key={id}
              className="
                flex flex-col border border-[var(--color-border)] lg:border-0 rounded-2xl items-center text-center w-full py-4
              "
            >
              <img
                src={avatar}
                alt={`Avatar of ${name}`}
                className="w-24 h-24 rounded-full border-2 border-white/40 shadow-md mb-2"
              />
              <h3 className="font-semibold text-lg text-[var(--color-text)]">{name}</h3>
              <p className="text-sm text-[var(--color-muted)]">{role}</p>
              <div className="flex gap-4 mt-4">
                {contact.map(({ href, Icon }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="text-[var(--color-text)] hover:text-[var(--color-primary)] hover:scale-105 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={22} />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageSlideContainer>
  );
};