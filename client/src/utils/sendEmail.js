import emailjs from "@emailjs/browser";

export const sendEmail = async (formRef) => {
  try {
    const result = await emailjs.sendForm(
      "service_l7ljht9",
      "template_d953j3a",
      formRef.current,
      "sQwe6SyvduUQRNwRS"
    );

    return {
      type: "success",
      text: "Password reset email sent successfully!",
    };
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      type: "error",
      text: `Failed to send email: ${
        error.message || error.text || "Please try again."
      }`,
    };
  }
};
