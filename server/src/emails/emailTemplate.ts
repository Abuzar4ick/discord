export function otpEmailHtml(otp: string): string {
  const expiresIn = "5 minutes";
  const spacedCode = otp.split("").join(" ");

  const logoBlock = `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td align="center" style="padding: 32px 0 24px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="width: 48px; height: 48px; background-color: #5865F2; border-radius: 12px; text-align: center; vertical-align: middle;">
                <span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 700; color: #ffffff; line-height: 48px;">D</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify your account</title>
</head>
<body style="margin: 0; padding: 0; background-color: #2B2D31; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #2B2D31;">
    <tr>
      <td align="center" style="padding: 24px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="480" style="max-width: 480px; width: 100%; background-color: #313338; border-radius: 8px; overflow: hidden;">

          <!-- Logo -->
          <tr>
            <td>${logoBlock}</td>
          </tr>

          <!-- Heading -->
          <tr>
            <td align="center" style="padding: 0 32px;">
              <h1 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 600; color: #F2F3F5;">
                Verify your account
              </h1>
              <p style="margin: 0 0 28px 0; font-size: 14px; line-height: 20px; color: #B5BAC1;">
                Enter this code to finish signing in. It expires in ${expiresIn}.
              </p>
            </td>
          </tr>

          <!-- OTP Code -->
          <tr>
            <td align="center" style="padding: 0 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center" style="background-color: #2B2D31; border: 1px solid #1E1F22; border-radius: 8px; padding: 20px 16px;">
                    <span style="font-family: 'Courier New', Courier, monospace; font-size: 32px; font-weight: 700; letter-spacing: 6px; color: #ffffff;">
                      ${spacedCode}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Expiry note -->
          <tr>
            <td align="center" style="padding: 20px 32px 0 32px;">
              <p style="margin: 0; font-size: 13px; line-height: 18px; color: #949BA4;">
                This code will expire in <strong style="color: #B5BAC1;">${expiresIn}</strong>.
                Didn't request this? You can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 28px 32px 0 32px;">
              <hr style="border: none; border-top: 1px solid #3F4147; margin: 0;" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 20px 32px 32px 32px;">
              <p style="margin: 0; font-size: 12px; line-height: 16px; color: #6D6F78;">
                This is an automated message, please don't reply to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
