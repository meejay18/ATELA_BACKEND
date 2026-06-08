// src/shared/email/templates/registerWorkspace.template.ts

export const registerWorkspaceTemplate = ({
  tenantName,
  email,
  code,
}: {
  tenantName: string;
  email: string;
  code: string;
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Welcome to ATELA</title>
  <style>
    body {
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: linear-gradient(135deg, #fff5f0, #f4f6f8);
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      max-width: 640px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
      overflow: hidden;
      animation: fadeIn 0.6s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .header {
      background: url('https://your-cdn.com/textile-bg.jpg') no-repeat center;
      background-size: cover;
      color: #ffffff;
      text-align: center;
      padding: 48px 24px;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      text-shadow: 0 3px 6px rgba(0,0,0,0.4);
      letter-spacing: 1px;
    }
    .content {
      padding: 36px;
      text-align: center;
    }
    .content h2 {
      color: #0d1b2a;
      font-size: 22px;
      margin-bottom: 20px;
      font-weight: 600;
    }
    .highlight {
      color: #e76f51; /* ATELA orange accent */
      font-weight: 700;
    }
    .otp-box {
      display: inline-block;
      background: linear-gradient(135deg, #ffecd2, #fcb69f);
      color: #0d1b2a;
      font-size: 30px;
      font-weight: bold;
      letter-spacing: 8px;
      padding: 20px 32px;
      border-radius: 12px;
      margin: 24px 0;
      box-shadow: 0 4px 12px rgba(231,111,81,0.3);
    }
    .btn {
      display: inline-block;
      background: #e76f51;
      color: #ffffff !important;
      text-decoration: none;
      padding: 14px 28px;
      border-radius: 8px;
      font-weight: 600;
      margin-top: 24px;
      transition: background 0.3s ease;
    }
    .btn:hover {
      background: #d65a3f;
    }
    .footer {
      background: #fafafa;
      text-align: center;
      padding: 20px;
      font-size: 13px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Welcome to ATELA 🎉</h1>
    </div>
    <div class="content">
      <h2>Your workspace <span class="highlight">${tenantName}</span> is live!</h2>
      <p>We’re thrilled to have you onboard. Your account <strong>${email}</strong> is now linked to this workspace.</p>
      <p>To complete your registration, please verify your email using the OTP below:</p>
      <div class="otp-box">${code}</div>
      <p>Enter this code in the verification screen to activate your workspace and start your journey with ATELA.</p>
      <a href="https://app.atela.com/login" class="btn">Verify & Access Dashboard</a>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} ATELA. All rights reserved.<br/>
      Crafted with ❤️ for growth and creativity.
    </div>
  </div>
</body>
</html>
`;
