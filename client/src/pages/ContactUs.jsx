import { PageSlideContainer } from "../components/shared/wrapper/PageSlideContainer";
import { useRef, useState } from "react";
import { sendContactEmail } from "../data/emailService";

export const ContactUs = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await sendContactEmail(formData);

      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);

      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  return (
    <PageSlideContainer>
      <section className="flex flex-col">
        <div className="flex flex-col items-center gap-6 px-4 py-8  md:p-8 bg-white border border-white/60 shadow-sm backdrop-blur-md rounded-2xl max-w-xl mx-auto w-full">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center drop-shadow-lg leading-snug">
            Contact Us
          </h1>
          <p className="text-gray-700 text-center text-base max-w-md">
            We'd love to hear from you! Whether you have a question, feedback,
            or if you just want to say hello, send us a message.
          </p>
          {submitStatus === "success" && (
            <div className="w-full p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">
                  Message sent successfully! Thank you for reaching out.
                </span>
              </div>
            </div>
          )}
          {submitStatus === "error" && (
            <div className="w-full p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">
                  Failed to send message. Please try again.
                </span>
              </div>
            </div>
          )}
          <form
            ref={form}
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-4"
          >
            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-2 w-full p-3 rounded-xl border border-gray-300 transition-all focus:outline-2 focus:outline-blue-400 bg-gray-50"
            />
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 w-full p-3 rounded-xl border border-gray-300 transition-all focus:outline-2 focus:outline-blue-400 bg-gray-50"
            />
            <textarea
              name="message"
              placeholder="Your message"
              autoComplete="off"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-2 w-full p-3 rounded-xl border border-gray-300 transition-all focus:outline-2 focus:outline-blue-400 bg-gray-50"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-full font-bold text-lg shadow-lg transition cursor-pointer ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </div>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </section>
    </PageSlideContainer>
  );
};
