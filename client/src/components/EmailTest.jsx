import { useRef } from "react";
import emailjs from "@emailjs/browser";

export const EmailTest = () => {
  const form = useRef();

  const sendTestEmail = async (e) => {
    e.preventDefault();

    try {
      console.log("=== EMAILJS TEMPLATE TEST ===");

      // Populate form with test data
      const formElement = form.current;
      formElement.querySelector('input[name="to_email"]').value =
        "niloofarabi@gmail.com"; // Replace with your actual email
      formElement.querySelector('input[name="to_name"]').value = "Test User";
      formElement.querySelector('input[name="reset_link"]').value =
        "http://localhost:5173/reset-password?token=TEST_TOKEN_123456";
      formElement.querySelector('input[name="from_name"]').value =
        "MoodSync Team";
      formElement.querySelector('input[name="message"]').value =
        "This is a test email to verify template variables.";

      // Log what we're sending
      const formData = new FormData(formElement);
      console.log("Test data being sent:");
      for (let [key, value] of formData.entries()) {
        console.log(`  ${key}: ${value}`);
      }

      const result = await emailjs.sendForm(
        "service_l7ljht9",
        "template_d953j3a",
        formElement,
        "sQwe6SyvduUQRNwRS"
      );

      console.log("EmailJS Response:", result);
      alert("Test email sent! Check your inbox and console logs.");
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert(`Error: ${error.message || error.text}`);
    }
  };

  return (
    <div style={{ padding: "20px", background: "#f0f0f0", margin: "20px" }}>
      <h3>EmailJS Template Test</h3>
      <p>
        This component tests if your EmailJS template correctly displays
        variables.
      </p>

      <form ref={form} onSubmit={sendTestEmail}>
        <input type="hidden" name="to_email" />
        <input type="hidden" name="to_name" />
        <input type="hidden" name="reset_link" />
        <input type="hidden" name="from_name" />
        <input type="hidden" name="message" />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Send Test Email
        </button>
      </form>

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          background: "white",
          borderRadius: "5px",
        }}
      >
        <h4>Expected Template Variables:</h4>
        <ul>
          <li>
            <strong>{"{{to_name}}"}</strong> - Should show "Test User"
          </li>
          <li>
            <strong>{"{{to_email}}"}</strong> - Should show your email
          </li>
          <li>
            <strong>{"{{reset_link}}"}</strong> - Should show the clickable
            reset link
          </li>
          <li>
            <strong>{"{{from_name}}"}</strong> - Should show "MoodSync Team"
          </li>
          <li>
            <strong>{"{{message}}"}</strong> - Should show test message
          </li>
        </ul>
      </div>
    </div>
  );
};
