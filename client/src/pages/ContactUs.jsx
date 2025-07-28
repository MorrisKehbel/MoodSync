import { PageSlideContainer } from "../components/shared/wrapper/PageSlideContainer";
import { useState } from "react";

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sent:", formData);
    alert("Thank you!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <PageSlideContainer>
      <section className="flex flex-col">
        <div className="flex flex-col items-center gap-6 px-8 py-12 bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl max-w-xl mx-auto w-full">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center drop-shadow-lg leading-snug">
            Contact Us
          </h1>
          <p className="text-gray-700 text-center text-base max-w-md">
            We'd love to hear from you! Whether you have a question, feedback,
            or just want to say hello — send us a message.
          </p>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border border-gray-300 transition-all focus:outline-2 focus:outline-blue-400 bg-white/90"
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-2 focus:outline-blue-400 bg-white/90"
            />
            <textarea
              name="message"
              placeholder="Your message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg transition cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </PageSlideContainer>
  );
};
