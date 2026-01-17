const nodemailer = require('nodemailer');

const sendOTP = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // Try 465 with secure: true
    secure: true, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    // Increased timeouts to handle cloud latency
    connectionTimeout: 20000, 
    greetingTimeout: 20000,
    socketTimeout: 20000,
});

        
        await transporter.verify();

        await transporter.sendMail({
            from: `"IIEST Portal Gatekeeper" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Your Verification Code - IIEST Portal',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #333;">Welcome to the Department Portal!</h2>
                    <p>To verify your email address, please use the following One-Time Password (OTP):</p>
                    <div style="background-color: #f8f9fa; padding: 10px; text-align: center; border-radius: 5px;">
                        <h1 style="color: #0d6efd; letter-spacing: 5px; margin: 0;">${otp}</h1>
                    </div>
                    <p style="margin-top: 20px;">This code expires in 10 minutes.</p>
                    <p style="color: #666; font-size: 12px;">If you did not request this, please ignore this email.</p>
                </div>
            `
        });
        console.log(`OTP sent to ${email}`);
    } catch (error) {
        console.error("Nodemailer Error Details:", error);
        throw new Error("Email sending failed.");
    }
};

module.exports = sendOTP;