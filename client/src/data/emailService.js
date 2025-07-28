import emailjs from "@emailjs/browser";

const EMAIL_CONFIG = {
  serviceID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  recipientEmails: import.meta.env.VITE_EMAIL_RECIPIENTS,
};

const validateEmailConfig = () => {
  const requiredEnvVars = [
    { key: "VITE_EMAILJS_SERVICE_ID", value: EMAIL_CONFIG.serviceID },
    { key: "VITE_EMAILJS_TEMPLATE_ID", value: EMAIL_CONFIG.templateID },
    { key: "VITE_EMAILJS_PUBLIC_KEY", value: EMAIL_CONFIG.publicKey },
    { key: "VITE_EMAIL_RECIPIENTS", value: EMAIL_CONFIG.recipientEmails },
  ];

  const missingVars = requiredEnvVars.filter((envVar) => !envVar.value);

  if (missingVars.length > 0) {
    const missingKeys = missingVars.map((envVar) => envVar.key).join(", ");
    throw new Error(`Missing required environment variables: ${missingKeys}`);
  }
};

export const sendContactEmail = async (formData) => {
  try {
    validateEmailConfig();
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
  try {
    validateEmailConfig();
    emailjs.init(EMAIL_CONFIG.publicKey);
  } catch (error) {
    console.error("EmailJS initialization failed:", error.message);
    throw error;
  }
};

export { EMAIL_CONFIG };
