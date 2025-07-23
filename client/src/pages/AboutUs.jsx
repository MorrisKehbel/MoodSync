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
      avatar: "https://avatars.githubusercontent.com/u/207018621?s=400&u=8c00e4adc4f5c1a510969d67c1fe1fd6855b9657&v=4",
      contact: [
        { href: "https://www.linkedin.com/in/shraddhabhikadiya/", 
          Icon: FaLinkedin },
        { href: "https://github.com/shraddhabhikadiya2017", Icon: FaGithubSquare },
      ],
    },
    {
      id: 3,
      name: "Placeholder",
      role: "Placeholder",
      avatar: "Placeholder",
      contact: [
        { href: "Placeholder", Icon: FaLinkedin },
        { href: "Placeholder", Icon: FaGithubSquare },
      ],
    },
    {
      id: 4,
      name: "Placeholder",
      role: "Placeholder",
      avatar: "Placeholder",
      contact: [
        { href: "Placeholder", Icon: FaLinkedin },
        { href: "Placeholder", Icon: FaGithubSquare },
      ],
    },
  ];

  return (
    <PageSlideContainer>
      <div className="flex flex-col p-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-16 mt-8 lg:mt-12 text-center">
          About Us
        </h1>

        <p className="text-gray-700 mx-auto text-center mb-12">
          What started as a final project at the WBS Coding School grew into a
          mission to support mental health. We believe evidence-based self-care
          should be accessible to everyone. Our mission is to empower daily
          growth by combining expert-backed methods with intuitive technology so
          your mental wellbeing becomes part of your daily routine.
        </p>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center items-center px-4">
        {team.map(({ id, name, role, avatar, contact }) => (
          <div
            key={id}
            className="
              flex flex-col border lg:border-0 rounded-2xl items-center text-center w-full py-4"
          >
            <img
              src={avatar}
              alt={`Avatar of ${name}`}
              className="w-24 h-24 rounded-full border-2 border-white/40 shadow-md mb-2"
            />
            <h3 className="font-semibold text-lg ">{name}</h3>
            <p className="text-sm text-gray-500">{role}</p>
            <div className="flex gap-4 mt-4">
              {contact.map(({ href, Icon }, i) => (
                <a
                  key={i}
                  href={href}
                  className="text-gray-700 hover:text-gray-600 hover:scale-105 transition"
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>
    </PageSlideContainer>
  );
};
