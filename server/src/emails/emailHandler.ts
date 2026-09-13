import crypto from "crypto";
import { resendClient, sender } from "../config/resend.js";
import { verifyEmailHTML } from "./emailTemplate.js";
import { ENV } from "../config/env.js";
import { internalServerError } from "../utils/response.js";
import { authRepository } from "../repositories/auth.repository.js";

export const sendVerificationMessage = async (email: string) => {
  const token = crypto.randomBytes(32).toString("hex");

  const verificationUrl = `${ENV.API_URL}/api/auth/verify-email?token=${encodeURIComponent(token)}`;

  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Verify your email address",
    html: verifyEmailHTML(verificationUrl),
  });

  if (error) {
    console.error("Error sending verification email:", error);
    throw internalServerError("Failed to send verification email");
  }

  await authRepository.storeEmailVerificationToken(token, email);

  if (ENV.NODE_ENV === "development") {
    console.log("Verification email sent successfully:", data);
  }
};
