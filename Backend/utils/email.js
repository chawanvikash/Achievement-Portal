const brevo = require('@getbrevo/brevo');

const sendOTP = async (email, otp) => {
    try {
        let apiInstance = new brevo.TransactionalEmailsApi();

        apiInstance.setApiKey(
            brevo.TransactionalEmailsApiApiKeys.apiKey, 
            process.env.BREVO_API_KEY
        );

        let sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.subject = "Your Verification Code - IIEST Portal";
        sendSmtpEmail.htmlContent = `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
                <h2>Welcome to the Department Portal!</h2>
                <p>To verify your email address, please use the following One-Time Password (OTP):</p>
                <h1 style="color: #0d6efd; letter-spacing: 5px;">${otp}</h1>
                <p>This code expires in 10 minutes.</p>
            </div>
        `;
        

        sendSmtpEmail.sender = { "name": "IIEST Portal", "email": process.env.EMAIL_USER };
        sendSmtpEmail.to = [{ "email": email }];

        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log(`OTP sent successfully via Brevo API. Message ID: ${data.body.messageId}`);
    } catch (error) {
        console.error("Brevo API Error Details:", error.response ? error.response.body : error.message);
        throw new Error("Email sending failed via Brevo API.");
    }
};

module.exports = sendOTP;