if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const nodemailer = require('nodemailer');


const sendOTP = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
               user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS,
            }
        });

        await transporter.sendMail({
            from: `"IIEST Portal Gatekeeper" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Your Verification Code - IIEST Portal',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Welcome to the Department Portal!</h2>
                    <p>To verify your email address, please use the following One-Time Password (OTP):</p>
                    <h1 style="color: #0d6efd; letter-spacing: 5px;">${otp}</h1>
                    <p>This code expires in 10 minutes.</p>
                    <p>If you did not request this, please ignore this email.</p>
                </div>
            `
        });
        console.log(`OTP sent to ${email}`);
    } catch (error) {
        console.error("Nodemailer Error:", error);
        throw new Error("Email sending failed.");
    }
};

module.exports = sendOTP;