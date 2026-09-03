import crypto from "crypto";
import { resendClient, sender } from "../config/resend.js";
import { otpEmailHtml } from "./emailTemplate.js";
import { ENV } from "../config/env.js";

export const sendOTPMessage = async (email: string) => {
  const otp = crypto.randomInt(100000, 999999).toString();

  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Your OTP Code",
    html: otpEmailHtml(otp),
  });

  if (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }

  if (ENV.NODE_ENV === "development") {
    console.log("OTP email sent successfully:", data);
  }
};
