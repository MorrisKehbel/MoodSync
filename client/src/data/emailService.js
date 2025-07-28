import emailjs from "@emailjs/browser";

const EMAIL_CONFIG = {
  serviceID: import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_l7ljht9",
  templateID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_t6342xo",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "sQwe6SyvduUQRNwRS",
  recipientEmails:
    import.meta.env.VITE_EMAIL_RECIPIENTS ||
    "your-main-email@example.com, your-second-email@example.com",
};

export const sendContactEmail = async (formData) => {
  try {
    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      to_email: EMAIL_CONFIG.recipientEmails,
      from_name: formData.name,
      reply_to: formData.email,
    };

    const response = await emailjs.send(
      EMAIL_CONFIG.serviceID,
      EMAIL_CONFIG.templateID,
      templateParams,
      EMAIL_CONFIG.publicKey
    );

    console.log("Email sent successfully!", response.status, response.text);
    return {
      success: true,
      data: response,
      message: "Email sent successfully!",
    };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      error: error,
      message: "Failed to send email. Please try again.",
    };
  }
};

export const initializeEmailJS = () => {
  emailjs.init(EMAIL_CONFIG.publicKey);
};

export { EMAIL_CONFIG };
