export const registerWorkspaceTemplate = ({
  tenantName,
  email,
}: {
  tenantName: string;
  email: string;
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Welcome to ATELA</title>
  <style>
    body {
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.08);
      overflow: hidden;
    }
    .header {
      background: url('https://your-cdn.com/textile-bg.jpg') no-repeat center;
      background-size: cover;
      color: #ffffff;
      text-align: center;
      padding: 40px 24px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      text-shadow: 0 2px 4px rgba(0,0,0,0.4);
    }
    .content {
      padding: 32px;
      text-align: center;
    }
    .content h2 {
      color: #0d1b2a;
      font-size: 20px;
      margin-bottom: 16px;
    }
    .highlight {
      color: #e76f51; /* ATELA orange accent */
      font-weight: 600;
    }
    .btn {
      display: inline-block;
      background: #e76f51;
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-weight: 600;
      margin-top: 20px;
    }
    .btn:hover {
      background: #d65a3f;
    }
    .footer {
      background: #f4f6f8;
      text-align: center;
      padding: 16px;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to ATELA</h1>
    </div>
    <div class="content">
      <h2>Your workspace <span class="highlight">${tenantName}</span> has been created!</h2>
      <p>We’re thrilled to have you onboard. Your account <strong>${email}</strong> is now linked to this workspace.</p>
      <p>Next step: set up your team and start managing your growth with ATELA.</p>
      <a href="https://app.atela.com/login" class="btn">Go to Dashboard</a>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} ATELA. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
