"use server";

import { Resend } from "resend";

// Initialize Resend with your API Key from .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  // 1. Extract data from the form
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  // 2. Basic Validation Guardrail
  if (!name || !email || !message) {
    return { success: false, error: "Please fill out all required fields." };
  }

  try {
    // 3. Send the email via Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "vinaymathpati16@gmail.com", // Your verified Resend email
      replyTo: email, // This lets you hit 'Reply' in Gmail to reach the sender
      subject: `Portfolio: ${subject || "New Message"}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("System Error:", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}