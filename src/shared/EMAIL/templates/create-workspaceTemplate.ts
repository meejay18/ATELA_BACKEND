// // src/shared/email/templates/registerWorkspace.template.ts

// export const registerWorkspaceTemplate = ({
//   tenantName,
//   email,
//   code,
// }: {
//   tenantName: string;
//   email: string;
//   code: string;
// }) => `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <title>Welcome to ATELA</title>
//   <style>
//     body {
//       font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
//       background: linear-gradient(135deg, #fff5f0, #f4f6f8);
//       margin: 0;
//       padding: 0;
//       color: #333;
//     }
//     .container {
//       max-width: 640px;
//       margin: 40px auto;
//       background: #ffffff;
//       border-radius: 16px;
//       box-shadow: 0 8px 24px rgba(0,0,0,0.1);
//       overflow: hidden;
//       animation: fadeIn 0.6s ease-in-out;
//     }
//     @keyframes fadeIn {
//       from { opacity: 0; transform: translateY(20px); }
//       to { opacity: 1; transform: translateY(0); }
//     }
//     .header {
//       background: url('https://your-cdn.com/textile-bg.jpg') no-repeat center;
//       background-size: cover;
//       color: #ffffff;
//       text-align: center;
//       padding: 48px 24px;
//     }
//     .header h1 {
//       margin: 0;
//       font-size: 28px;
//       font-weight: 700;
//       text-shadow: 0 3px 6px rgba(0,0,0,0.4);
//       letter-spacing: 1px;
//     }
//     .content {
//       padding: 36px;
//       text-align: center;
//     }
//     .content h2 {
//       color: #0d1b2a;
//       font-size: 22px;
//       margin-bottom: 20px;
//       font-weight: 600;
//     }
//     .highlight {
//       color: #e76f51; /* ATELA orange accent */
//       font-weight: 700;
//     }
//     .otp-box {
//       display: inline-block;
//       background: linear-gradient(135deg, #ffecd2, #fcb69f);
//       color: #0d1b2a;
//       font-size: 30px;
//       font-weight: bold;
//       letter-spacing: 8px;
//       padding: 20px 32px;
//       border-radius: 12px;
//       margin: 24px 0;
//       box-shadow: 0 4px 12px rgba(231,111,81,0.3);
//     }
//     .btn {
//       display: inline-block;
//       background: #e76f51;
//       color: #ffffff !important;
//       text-decoration: none;
//       padding: 14px 28px;
//       border-radius: 8px;
//       font-weight: 600;
//       margin-top: 24px;
//       transition: background 0.3s ease;
//     }
//     .btn:hover {
//       background: #d65a3f;
//     }
//     .footer {
//       background: #fafafa;
//       text-align: center;
//       padding: 20px;
//       font-size: 13px;
//       color: #888;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <h1>🎉 Welcome to ATELA 🎉</h1>
//     </div>
//     <div class="content">
//       <h2>Your workspace <span class="highlight">${tenantName}</span> is live!</h2>
//       <p>We’re thrilled to have you onboard. Your account <strong>${email}</strong> is now linked to this workspace.</p>
//       <p>To complete your registration, please verify your email using the OTP below:</p>
//       <div class="otp-box">${code}</div>
//       <p>Enter this code in the verification screen to activate your workspace and start your journey with ATELA.</p>
//       <a href="https://app.atela.com/login" class="btn">Verify & Access Dashboard</a>
//     </div>
//     <div class="footer">
//       &copy; ${new Date().getFullYear()} ATELA. All rights reserved.<br/>
//       Crafted with ❤️ for growth and creativity.
//     </div>
//   </div>
// </body>
// </html>
// `;

export const registerWorkspaceTemplate = ({
  tenantName,
  code,
}: {
  tenantName: string
  email: string
  code: string
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Welcome to ATELA</title>
</head>

<body style="margin:0;padding:0;background:#f7f4f1;font-family:Segoe UI,Arial,sans-serif;color:#1f2937;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f4f1;padding:20px 12px;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.08);">

          <!-- HERO GRADIENT BANNER -->
          <tr>
            <td style="background:linear-gradient(135deg,#e76f51 0%,#c85a3e 40%,#8b2e1a 100%);padding:44px 32px 36px;text-align:center;">
              <p style="margin:0 0 6px;font-size:11px;font-weight:600;color:rgba(255,255,255,0.65);text-transform:uppercase;letter-spacing:3px;">
                Fashion Management Platform
              </p>
              <h1 style="margin:0;font-size:32px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">
                ATELA
              </h1>
              <p style="margin:12px 0 0;font-size:15px;color:rgba(255,255,255,0.80);line-height:1.6;">
                Fashion business management made simple.
              </p>
            </td>
          </tr>

          <!-- ACCENT DIVIDER -->
          <tr>
            <td style="background:linear-gradient(90deg,#e76f51,#c85a3e,#8b2e1a);height:3px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="padding:32px 32px 20px;">
              <h2 style="color:#1f2937;font-size:20px;margin:0 0 14px;font-weight:600;">
                Your workspace is ready
              </h2>
              <p style="font-size:15px;line-height:1.8;color:#4b5563;margin:0 0 8px;">
                Hello,
              </p>
              <p style="font-size:15px;line-height:1.8;color:#4b5563;margin:0 0 8px;">
                Your workspace <strong style="color:#1f2937;">${tenantName}</strong> has been successfully
                created</strong>.
              </p>
              <p style="font-size:15px;line-height:1.8;color:#4b5563;margin:0;">
                Use the 6-digit code below to verify your email and unlock your dashboard.
              </p>
            </td>
          </tr>

          <!-- OTP SECTION -->
          <tr>
            <td align="center" style="padding:8px 32px 24px;">
              <table cellpadding="0" cellspacing="0"
                style="background:linear-gradient(135deg,#fff4ef 0%,#ffe8df 100%);border:1.5px solid #e76f51;border-radius:14px;width:100%;">
                <tr>
                  <td align="center" style="padding:24px 20px;">
                    <p style="margin:0;color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:600;">
                      Verification Code
                    </p>
                    <div style="margin-top:12px;font-size:38px;font-weight:700;color:#c85a3e;letter-spacing:10px;font-family:Courier New,monospace;">
                      ${code}
                    </div>
                    <p style="margin:10px 0 0;color:#9ca3af;font-size:12px;">
                      This code expires in 10 minutes
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FEATURES STRIP -->
          <tr>
            <td style="padding:0 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;overflow:hidden;">
                <tr>
                  <td width="33%" align="center"
                    style="background:linear-gradient(160deg,#fdf1ed,#fbe3da);padding:18px 12px;border-right:1px solid rgba(231,111,81,0.15);">
                    <p style="margin:0 0 4px;font-size:20px;font-weight:700;color:#c85a3e;">01</p>
                    <p style="margin:0 0 2px;font-size:13px;font-weight:600;color:#1f2937;">Inventory</p>
                    <p style="margin:0;font-size:11px;color:#6b7280;">Track products &amp; stock</p>
                  </td>
                  <td width="33%" align="center"
                    style="background:linear-gradient(160deg,#fbede8,#f8ddd4);padding:18px 12px;border-right:1px solid rgba(231,111,81,0.15);">
                    <p style="margin:0 0 4px;font-size:20px;font-weight:700;color:#c85a3e;">02</p>
                    <p style="margin:0 0 2px;font-size:13px;font-weight:600;color:#1f2937;">Orders</p>
                    <p style="margin:0;font-size:11px;color:#6b7280;">Manage orders easily</p>
                  </td>
                  <td width="33%" align="center"
                    style="background:linear-gradient(160deg,#f8e8e3,#f5d7cc);padding:18px 12px;">
                    <p style="margin:0 0 4px;font-size:20px;font-weight:700;color:#c85a3e;">03</p>
                    <p style="margin:0 0 2px;font-size:13px;font-weight:600;color:#1f2937;">Insights</p>
                    <p style="margin:0;font-size:11px;color:#6b7280;">Understand performance</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:linear-gradient(135deg,#2d1a12 0%,#8b2e1a 100%);padding:24px 32px;text-align:center;">
              <p style="margin:0;font-size:14px;font-weight:700;color:#ffffff;letter-spacing:1px;">ATELA</p>
              <p style="margin:6px 0 0;font-size:12px;color:rgba(255,255,255,0.60);line-height:1.6;">
                Helping fashion businesses grow with confidence.
              </p>
              <p style="margin:6px 0 0;font-size:11px;color:rgba(255,255,255,0.40);">
                &copy; ${new Date().getFullYear()} ATELA. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`

export const resendVerificationCodeTemplate = ({ email, code }: { email: string; code: string }) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>New Verification Code - ATELA</title>
</head>

<body style="margin:0;padding:0;background:#f7f4f1;font-family:Segoe UI,Arial,sans-serif;color:#1f2937;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f4f1;padding:20px 12px;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.08);">

          <!-- HERO GRADIENT BANNER -->
          <tr>
            <td style="background:linear-gradient(135deg,#e76f51 0%,#c85a3e 40%,#8b2e1a 100%);padding:44px 32px 36px;text-align:center;">
              <p style="margin:0 0 6px;font-size:11px;font-weight:600;color:rgba(255,255,255,0.65);text-transform:uppercase;letter-spacing:3px;">
                Fashion Management Platform
              </p>
              <h1 style="margin:0;font-size:32px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">
                ATELA
              </h1>
              <p style="margin:12px 0 0;font-size:15px;color:rgba(255,255,255,0.80);line-height:1.6;">
                Here is your new verification code.
              </p>
            </td>
          </tr>

          <!-- ACCENT DIVIDER -->
          <tr>
            <td style="background:linear-gradient(90deg,#e76f51,#c85a3e,#8b2e1a);height:3px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="padding:32px 32px 20px;">
              <h2 style="color:#1f2937;font-size:20px;margin:0 0 14px;font-weight:600;">
                New verification code requested
              </h2>
              <p style="font-size:15px;line-height:1.8;color:#4b5563;margin:0 0 8px;">
                Hello,
              </p>
              <p style="font-size:15px;line-height:1.8;color:#4b5563;margin:0 0 8px;">
                You requested a new verification code for <strong style="color:#1f2937;">${email}</strong>.
              </p>
              <p style="font-size:15px;line-height:1.8;color:#4b5563;margin:0;">
                Use the 6-digit code below to verify your email and access your dashboard.
              </p>
            </td>
          </tr>

          <!-- OTP SECTION -->
          <tr>
            <td align="center" style="padding:8px 32px 24px;">
              <table cellpadding="0" cellspacing="0"
                style="background:linear-gradient(135deg,#fff4ef 0%,#ffe8df 100%);border:1.5px solid #e76f51;border-radius:14px;width:100%;">
                <tr>
                  <td align="center" style="padding:24px 20px;">
                    <p style="margin:0;color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:600;">
                      Verification Code
                    </p>
                    <div style="margin-top:12px;font-size:38px;font-weight:700;color:#c85a3e;letter-spacing:10px;font-family:Courier New,monospace;">
                      ${code}
                    </div>
                    <p style="margin:10px 0 0;color:#9ca3af;font-size:12px;">
                      This code expires in 10 minutes
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SECURITY NOTICE -->
          <tr>
            <td style="padding:0 32px 28px;">
              <table cellpadding="0" cellspacing="0" width="100%"
                style="background:linear-gradient(160deg,#fdf1ed,#fbe3da);border-left:3px solid #e76f51;border-radius:0 10px 10px 0;padding:0;">
                <tr>
                  <td style="padding:14px 16px;">
                    <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#1f2937;">
                      Did not request this?
                    </p>
                    <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.6;">
                      If you did not request a new code, you can safely ignore this email.
                      Your account remains secure.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:linear-gradient(135deg,#2d1a12 0%,#8b2e1a 100%);padding:24px 32px;text-align:center;">
              <p style="margin:0;font-size:14px;font-weight:700;color:#ffffff;letter-spacing:1px;">ATELA</p>
              <p style="margin:6px 0 0;font-size:12px;color:rgba(255,255,255,0.60);line-height:1.6;">
                Helping fashion businesses grow with confidence.
              </p>
              <p style="margin:6px 0 0;font-size:11px;color:rgba(255,255,255,0.40);">
                &copy; ${new Date().getFullYear()} ATELA. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`
