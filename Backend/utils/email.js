const Brevo = require('@getbrevo/brevo');

const sendOTP = async (email, otp) => {
  // Initialize the Brevo API client
  let defaultClient = Brevo.ApiClient.instance;
  let apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.BREVO_API_KEY;

  let apiInstance = new Brevo.TransactionalEmailsApi();
  let sendSmtpEmail = new Brevo.SendSmtpEmail();

  // Email Configuration
  sendSmtpEmail.subject = "Your Verification Code - IIEST Portal";
  sendSmtpEmail.htmlContent = `
    <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
      <h2 style="color: #003366;">IIEST Achievement Portal</h2>
      <p>Hello,</p>
      <p>Your One-Time Password (OTP) for account verification is:</p>
      <h1 style="color: #ff9800; letter-spacing: 5px; text-align: center;">${otp}</h1>
      <p>This code will expire in 10 minutes. Please do not share this code with anyone.</p>
      <hr/>
      <footer style="font-size: 12px; color: #777;">
        Department of CST, IIEST Shibpur.
      </footer>
    </div>
  `;
  sendSmtpEmail.sender = { "name": "CST Department", "email": process.env.EMAIL_USER };
  sendSmtpEmail.to = [{ "email": email }];

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('API called successfully. Message ID:', data.messageId);
    return true;
  } catch (error) {
    console.error("Brevo API Error:", error.response ? error.response.body : error.message);
    throw new Error("Email delivery failed via API.");
  }
};

module.exports = sendOTP;