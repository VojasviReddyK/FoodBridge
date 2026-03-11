import nodemailer from 'nodemailer';

export const sendOTP = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const info = await transporter.sendMail({
            from: `"FOODBRIDGE" <${process.env.SMTP_EMAIL}>`,
            to: email,
            subject: "Your OTP for Food Pickup",
            text: `Your OTP for the food pickup is: ${otp}. Please provide this to the volunteer when they arrive.`,
            html: `<b>Your OTP for the food pickup is: ${otp}</b><br/><p>Please provide this to the volunteer when they arrive.</p>`,
        });

        console.log("Message sent: %s", info.messageId);
        return true;
    } catch (error) {
        console.error("Error sending OTP email:", error);
        return false;
    }
};
